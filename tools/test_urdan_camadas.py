"""Regressões de composição de Urdan; não substituem a revisão visual."""

import json
import unittest

from PIL import Image

from retocar_camadas import CONFIG, ROOT, render
from retocar_pilotos import cell


class UrdanLayersTest(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.configs = json.loads(CONFIG.read_text(encoding='utf-8'))
        cls.config = cls.configs['urdan']
        cls.original = Image.open(ROOT / cls.config['source']).convert('RGBA')
        cls.result = render(cls.original, cls.config)

    def test_rest_head_and_feet_preserved(self):
        for row in range(4):
            self.assertEqual(cell(self.original, row, 1).tobytes(), cell(self.result, row, 1).tobytes())
            start = 28 if row == 0 else 27 if row == 3 else 25
            for col in [0, 2]:
                for box in [(0, 0, 40, start), (0, 46, 40, 55)]:
                    self.assertEqual(cell(self.original, row, col).crop(box).tobytes(),
                                     cell(self.result, row, col).crop(box).tobytes())

    def test_upper_body_no_longer_frozen(self):
        box = (0, 0, 40, 46)
        self.assertEqual(cell(self.original, 3, 0).crop(box).tobytes(),
                         cell(self.original, 3, 2).crop(box).tobytes())
        for row in range(4):
            for box in [(12, 28, 29, 35), (12, 35, 29, 44)]:
                self.assertNotEqual(cell(self.result, row, 0).crop(box).tobytes(),
                                    cell(self.result, row, 2).crop(box).tobytes())

    def test_profile_hands_survive_layer_composition(self):
        for pose in self.config['poses']:
            if pose['cell'] not in [[1, 2], [2, 2]]:
                continue
            arm = pose['layers'][-1]
            source = cell(self.original, *arm['source_cell'])
            target = cell(self.result, *pose['cell'])
            for y, left, right, dx, dy in arm['rows']:
                for x in range(left, right + 1):
                    pixel = source.getpixel((x, y))
                    if pixel[3]:
                        self.assertEqual(target.getpixel((x + dx, y + dy)), pixel)
            self.assertNotEqual(arm['rows'][0][3], arm['rows'][-1][3])

    def test_fourteen_accepted_sheets_unchanged(self):
        for name, config in self.configs.items():
            if name == 'urdan':
                continue
            source = Image.open(ROOT / config['source']).convert('RGBA')
            accepted = Image.open(ROOT / f'assets/terminus/personagens/{name}.png').convert('RGBA')
            self.assertEqual(render(source, config).tobytes(), accepted.tobytes(), name)


if __name__ == '__main__':
    unittest.main()
