"""Regressões da articulação de Pirka, separadas da aprovação visual."""

import json
import unittest

import numpy as np
from PIL import Image

from retocar_camadas import CONFIG, ROOT, paint_layer, render
from retocar_pilotos import cell


class PirkaLayersTest(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.configs = json.loads(CONFIG.read_text(encoding='utf-8'))
        cls.config = cls.configs['pirka']
        cls.original = Image.open(ROOT / cls.config['source']).convert('RGBA')
        cls.result = render(cls.original, cls.config)

    def test_rest_heads_and_braids_preserved(self):
        for row in range(4):
            self.assertEqual(cell(self.original, row, 1).tobytes(), cell(self.result, row, 1).tobytes())
            for col in [0, 2]:
                box = (0, 0, 40, 34 if row in [0, 3] else 36)
                self.assertEqual(cell(self.original, row, col).crop(box).tobytes(),
                                 cell(self.result, row, col).crop(box).tobytes())

    def test_frozen_front_and_back_are_replaced_with_articulation(self):
        for row in [0, 3]:
            box = (0, 0, 40, 46)
            self.assertEqual(cell(self.original, row, 0).crop(box).tobytes(),
                             cell(self.original, row, 2).crop(box).tobytes())
        for row in range(4):
            for box in [(14, 36, 24, 40), (14, 40, 24, 46)]:
                self.assertNotEqual(cell(self.result, row, 0).crop(box).tobytes(),
                                    cell(self.result, row, 2).crop(box).tobytes())

    def test_both_profile_legs_have_complete_soles(self):
        for pose in self.config['poses']:
            if pose['cell'][0] not in [1, 2]:
                continue
            layers = [layer for layer in pose['layers'] if layer['name'].startswith('perna_')]
            bottoms = []
            legs = Image.new('RGBA', (40, 55))
            for layer in layers:
                image = paint_layer(layer['spans'], self.config['palette'])
                legs.alpha_composite(image)
                y, x = np.nonzero(np.asarray(image)[:, :, 3])
                bottom = int(y.max())
                bottoms.append(bottom)
                sole = x[y == bottom]
                self.assertGreaterEqual(len(sole), 5)
                self.assertEqual(int(sole.max() - sole.min() + 1), len(sole))
            self.assertEqual(sorted(bottoms), [51, 52])
            self.assertEqual(legs.crop((0, 47, 40, 55)).tobytes(),
                             cell(self.result, *pose['cell']).crop((0, 47, 40, 55)).tobytes())

    def test_accepted_layers_remain_identical(self):
        for name in ['odrik', 'lethra', 'durn', 'elune', 'lurga', 'sivren', 'ivara',
                     'ossena', 'guedra', 'darvek', 'edrin', 'tessa', 'rask']:
            config = self.configs[name]
            original = Image.open(ROOT / config['source']).convert('RGBA')
            accepted = Image.open(ROOT / f'assets/terminus/personagens/{name}.png').convert('RGBA')
            self.assertEqual(render(original, config).tobytes(), accepted.tobytes(), name)


if __name__ == '__main__':
    unittest.main()
