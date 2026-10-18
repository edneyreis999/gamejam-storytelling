"""Regressões de composição; a aprovação de anatomia continua sendo visual."""

import json
import unittest

import numpy as np
from PIL import Image, ImageDraw

from retocar_camadas import CONFIG, ROOT, paint_layer, render
from retocar_pilotos import cell


class OdrikLayersTest(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.config = json.loads(CONFIG.read_text(encoding='utf-8'))['odrik']
        cls.before = Image.open(ROOT / cls.config['source']).convert('RGBA')
        cls.after = render(cls.before, cls.config)

    def test_front_back_and_upper_profiles_unchanged(self):
        for row in (0, 3):
            for col in range(3):
                self.assertEqual(cell(self.before, row, col).tobytes(), cell(self.after, row, col).tobytes())
        for row in (1, 2):
            for col in range(3):
                height = 46 if col == 1 else 43
                self.assertEqual(cell(self.before, row, col).crop((0, 0, 40, height)).tobytes(),
                                 cell(self.after, row, col).crop((0, 0, 40, height)).tobytes())

    def test_every_painted_pixel_below_clothing_survives(self):
        for pose in self.config['poses']:
            row, col = pose['cell']
            layer = Image.new('RGBA', (40, 55))
            for limb in pose['layers']:
                layer.alpha_composite(paint_layer(limb['spans'], self.config['palette']))
            expected = np.asarray(layer)
            actual = np.asarray(cell(self.after, row, col))
            mask = Image.new('1', (40, 55))
            draw = ImageDraw.Draw(mask)
            for polygon in pose['erase']:
                draw.polygon([tuple(p) for p in polygon], fill=1)
            region = np.asarray(mask)
            np.testing.assert_array_equal(actual[region], expected[region])

    def test_complete_boots_above_old_cut_and_across_center(self):
        # These are actual painted boots, not synthetic rectangles fitting the old crop.
        poses = {tuple(p['cell']): p for p in self.config['poses']}
        leg = np.asarray(paint_layer(poses[1, 0]['layers'][1]['spans'], self.config['palette']))
        self.assertTrue(leg[47, 16:21, 3].all())
        crossing = np.asarray(paint_layer(poses[2, 0]['layers'][1]['spans'], self.config['palette']))
        self.assertTrue(crossing[48, 19, 3] and crossing[48, 20, 3])
        # The rejected v3 did not retain the front boot toe at (11, 51).
        self.assertEqual(cell(self.before, 1, 0).getpixel((11, 51))[3], 0)
        self.assertEqual(cell(self.after, 1, 0).getpixel((11, 51))[3], 255)

    def test_supported_and_lifted_feet_have_complete_soles(self):
        for pose in self.config['poses']:
            if pose['cell'][1] == 1:
                continue
            bottoms = []
            for limb in pose['layers']:
                alpha = np.asarray(paint_layer(limb['spans'], self.config['palette']))[:, :, 3]
                y, x = np.nonzero(alpha)
                bottoms.append(int(y.max()))
                sole = x[y == y.max()]
                self.assertGreaterEqual(len(sole), 6)
                self.assertEqual(len(sole), int(sole.max() - sole.min() + 1))
            self.assertEqual(sorted(bottoms), [51, 52])

    def test_boots_are_not_clipped_or_pointing_backwards(self):
        for pose in self.config['poses']:
            mask = Image.new('1', (40, 55))
            for polygon in pose['erase']:
                ImageDraw.Draw(mask).polygon([tuple(p) for p in polygon], fill=1)
            for limb in pose['layers']:
                alpha = np.asarray(paint_layer(limb['spans'], self.config['palette']))[:, :, 3] > 0
                self.assertFalse((alpha[46:] & ~np.asarray(mask)[46:]).any())
                ys, xs = np.nonzero(alpha)
                sole = xs[ys == ys.max()]
                ankle = np.flatnonzero(alpha[48]).mean()
                if pose['cell'][0] == 1:
                    self.assertGreater(ankle - sole.min(), sole.max() - ankle)
                else:
                    self.assertGreater(sole.max() - ankle, ankle - sole.min())


class BlockOneLayersTest(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.configs = json.loads(CONFIG.read_text(encoding='utf-8'))
        cls.names = ('lethra', 'durn', 'elune', 'lurga', 'sivren', 'ivara', 'ossena')

    def test_only_individual_edit_masks_change(self):
        for name in self.names:
            with self.subTest(personagem=name):
                config = self.configs[name]
                original = Image.open(ROOT / config['source']).convert('RGBA')
                result = render(original, config)
                mask = Image.new('1', original.size)
                draw = ImageDraw.Draw(mask)
                for pose in config['poses']:
                    row, col = pose['cell']
                    for polygon in pose['erase']:
                        draw.polygon([(x + col * 40, y + row * 55) for x, y in polygon], fill=1)
                outside = ~np.asarray(mask)
                np.testing.assert_array_equal(np.asarray(original)[outside], np.asarray(result)[outside])

    def test_every_boot_is_inside_its_mask_and_faces_the_view(self):
        for name in self.names:
            config = self.configs[name]
            for pose in config['poses']:
                with self.subTest(personagem=name, pose=pose['cell']):
                    mask = Image.new('1', (40, 55))
                    for polygon in pose['erase']:
                        ImageDraw.Draw(mask).polygon([tuple(p) for p in polygon], fill=1)
                    for limb in pose['layers']:
                        alpha = np.asarray(paint_layer(limb['spans'], config['palette']))[:, :, 3] > 0
                        self.assertFalse((alpha[48:] & ~np.asarray(mask)[48:]).any())
                        ys, xs = np.nonzero(alpha)
                        sole = xs[ys == ys.max()]
                        ankle = np.flatnonzero(alpha[48]).mean()
                        self.assertEqual(len(sole), int(sole.max() - sole.min() + 1))
                        self.assertGreaterEqual(len(sole), 6)
                        if pose['cell'][0] == 1:
                            self.assertGreater(ankle - sole.min(), sole.max() - ankle)
                        else:
                            self.assertGreater(sole.max() - ankle, ankle - sole.min())

    def test_walking_feet_alternate_support_without_isolated_pixels(self):
        for name in self.names:
            config = self.configs[name]
            for pose in config['poses']:
                with self.subTest(personagem=name, pose=pose['cell']):
                    bottoms = []
                    for limb in pose['layers']:
                        alpha = np.asarray(paint_layer(limb['spans'], config['palette']))[:, :, 3] > 0
                        ys, xs = np.nonzero(alpha)
                        bottoms.append(int(ys.max()))
                        remaining = set(zip(xs.tolist(), ys.tolist()))
                        stack = [remaining.pop()]
                        while stack:
                            x, y = stack.pop()
                            for dx in (-1, 0, 1):
                                for dy in (-1, 0, 1):
                                    point = (x + dx, y + dy)
                                    if point in remaining:
                                        remaining.remove(point)
                                        stack.append(point)
                        self.assertFalse(remaining, limb['name'])
                    self.assertEqual(sorted(bottoms), [52, 52] if pose['cell'][1] == 1 else [51, 52])

    def test_lethra_sheath_stays_intact_beside_the_legs(self):
        config = self.configs['lethra']
        original = Image.open(ROOT / config['source']).convert('RGBA')
        result = render(original, config)
        for col in range(3):
            box = (col * 40 + 26, 55 + 44, col * 40 + 29, 55 + 47)
            self.assertEqual(original.crop(box).tobytes(), result.crop(box).tobytes())


if __name__ == '__main__':
    unittest.main()
