"""Regressões técnicas da amostra; não substituem a avaliação visual."""

import json
import unittest

import numpy as np
from PIL import Image

from retocar_camadas import CONFIG, ROOT, render
from retocar_pilotos import cell


class GuedraLayersTest(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.configs = json.loads(CONFIG.read_text(encoding='utf-8'))
        cls.config = cls.configs['guedra']
        cls.original = Image.open(ROOT / cls.config['source']).convert('RGBA')
        cls.result = render(cls.original, cls.config)

    def test_back_exposed_by_arm_is_present(self):
        for row, x, y in [(1, 28, 30), (1, 28, 33), (2, 11, 29)]:
            self.assertEqual(cell(self.original, row, 2).getpixel((x, y))[3], 0)
            self.assertEqual(cell(self.result, row, 2).getpixel((x, y))[3], 255)

    def test_head_brace_legs_rest_front_and_back_preserved(self):
        for row in range(4):
            for col in range(3):
                before = cell(self.original, row, col)
                after = cell(self.result, row, col)
                if row in (0, 3) or col == 1:
                    self.assertEqual(before.tobytes(), after.tobytes())
                else:
                    for box in [(0, 0, 40, 19), (0, 38, 40, 55)]:
                        self.assertEqual(before.crop(box).tobytes(), after.crop(box).tobytes())

    def test_whole_arm_pixels_survive_composition(self):
        for pose in self.config['poses']:
            arm = pose['layers'][-1]
            source = cell(self.original, *arm['source_cell'])
            result = cell(self.result, *pose['cell'])
            for y, left, right, dx, dy in arm['rows']:
                for x in range(left, right + 1):
                    pixel = source.getpixel((x, y))
                    if pixel[3]:
                        self.assertEqual(result.getpixel((x + dx, y + dy)), pixel)
            # A mão muda de posição em relação ao ombro, sem trasladar a figura.
            self.assertNotEqual(arm['rows'][0][3], arm['rows'][-1][3])

    def test_accepted_block_one_still_renders_identically(self):
        for name in ['odrik', 'lethra', 'durn', 'elune', 'lurga', 'sivren', 'ivara', 'ossena', 'guedra']:
            config = self.configs[name]
            source = Image.open(ROOT / config['source']).convert('RGBA')
            accepted = Image.open(ROOT / f'assets/terminus/personagens/{name}.png').convert('RGBA')
            self.assertTrue(np.array_equal(np.asarray(render(source, config)), np.asarray(accepted)), name)


if __name__ == '__main__':
    unittest.main()
