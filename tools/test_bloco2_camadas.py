"""Regressões dos quatro perfis; aprovação artística é registrada separadamente."""

import json
import unittest

import numpy as np
from PIL import Image, ImageDraw

from retocar_camadas import CONFIG, ROOT, render
from retocar_pilotos import cell


class BlockTwoTest(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        configs = json.loads(CONFIG.read_text(encoding='utf-8'))
        cls.cases = {}
        for name in ['darvek', 'edrin', 'tessa', 'rask']:
            config = configs[name]
            original = Image.open(ROOT / config['source']).convert('RGBA')
            cls.cases[name] = config, original, render(original, config)

    def test_missing_back_pixels_restored_in_both_directions(self):
        samples = {'darvek': [(27, 30), (12, 30)], 'edrin': [(26, 39), (13, 39)],
                   'tessa': [(26, 37), (12, 35)], 'rask': [(27, 35), (12, 34)]}
        for name, points in samples.items():
            _, original, result = self.cases[name]
            for row, point in enumerate(points, 1):
                self.assertEqual(cell(original, row, 2).getpixel(point)[3], 0, name)
                self.assertEqual(cell(result, row, 2).getpixel(point)[3], 255, name)

    def test_only_individual_masks_change(self):
        for name, (config, original, result) in self.cases.items():
            mask = Image.new('L', original.size)
            for pose in config['poses']:
                row, col = pose['cell']
                for polygon in pose['erase']:
                    ImageDraw.Draw(mask).polygon([(x + col * 40, y + row * 55) for x, y in polygon], fill=255)
            outside = np.asarray(mask) == 0
            self.assertTrue(np.array_equal(np.asarray(original)[outside], np.asarray(result)[outside]), name)

    def test_arms_and_accessories_survive_the_composition(self):
        for name, (config, original, result) in self.cases.items():
            for pose in config['poses']:
                expected = {}
                for layer in pose['layers']:
                    if layer['name'] not in ['braco_proximo', 'acessorio_preservado']:
                        continue
                    source = cell(original, *layer['source_cell'])
                    for y, left, right, dx, dy in layer['rows']:
                        for x in range(left, right + 1):
                            pixel = source.getpixel((x, y))
                            if pixel[3]:
                                expected[x + dx, y + dy] = pixel
                target = cell(result, *pose['cell'])
                for point, pixel in expected.items():
                    self.assertEqual(target.getpixel(point), pixel, (name, pose['cell'], point))

    def test_arm_articulation_is_independent_of_head_and_legs(self):
        for name, (config, original, result) in self.cases.items():
            start = config['preservacao']['cabeca_ate'] + 1
            end = config['preservacao']['pernas_desde']
            for row in [1, 2]:
                for col in [0, 2]:
                    before, after = cell(original, row, col), cell(result, row, col)
                    for box in [(0, 0, 40, start), (0, end, 40, 55)]:
                        self.assertEqual(before.crop(box).tobytes(), after.crop(box).tobytes(), name)
                self.assertNotEqual(cell(result, row, 0).crop((0, start, 40, end)).tobytes(),
                                    cell(result, row, 2).crop((0, start, 40, end)).tobytes(), name)


if __name__ == '__main__':
    unittest.main()
