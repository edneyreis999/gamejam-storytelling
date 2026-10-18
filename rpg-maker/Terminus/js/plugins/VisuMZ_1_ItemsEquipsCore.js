//=============================================================================
// VisuStella MZ - Items & Equips Core
// VisuMZ_1_ItemsEquipsCore.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_1_ItemsEquipsCore = true;

var VisuMZ = VisuMZ || {};
VisuMZ.ItemsEquipsCore = VisuMZ.ItemsEquipsCore || {};
VisuMZ.ItemsEquipsCore.version = 1.56;

//=============================================================================
/*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 1] [Version 1.56] [ItemsEquipsCore]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Items_and_Equips_Core_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * The Items & Equips Core makes improvements to the RPG Maker MZ item and
 * equipment dedicated scenes (including the shop) and how they're handled.
 * From more item categories, better parameter control, rulings, and more, game
 * devs are able to take control over key aspects of their game's items.
 *
 * Features include all (but not limited to) the following:
 *
 * * Modifying the appearances to the Item Scene, Equip Scene, and Shop Scene.
 * * Categorizing items in unique and multiple categories.
 * * Item Scene and Shop Scene will now display detailed information on items.
 * * NEW! marker can be displayed over recently acquired items in-game.
 * * Equipment notetags to adjust parameters past the editor limitations.
 * * Equipment Rulings to adjust what slot types can and can't be unequipped
 *   and/or optimized.
 * * Equipment Type Handling offers more control over equipment loadouts.
 * * Items sold in shops can be hidden/shown based on Switches.
 * * Items sold in shops can have varying prices adjusted by notetags.
 *
 * ============================================================================
 * Requirements
 * ============================================================================
 *
 * This plugin is made for RPG Maker MZ. This will not work in other iterations
 * of RPG Maker.
 *
 * ------ Tier 1 ------
 *
 * This plugin is a Tier 1 plugin. Place it under other plugins of lower tier
 * value on your Plugin Manager list (ie: 0, 1, 2, 3, 4, 5). This is to ensure
 * that your plugins will have the best compatibility with the rest of the
 * VisuStella MZ library.
 *
 * ============================================================================
 * Major Changes: New Hard-Coded Features
 * ============================================================================
 *
 * This plugin adds some new hard-coded features to RPG Maker MZ's functions.
 * The following is a list of them.
 *
 * ---
 *
 * Equipment Type Handling
 *
 * - Characters will no longer have one universal equipment slot setting.
 * Classes can have different equipment type loadouts, made possible through
 * the usage of notetags. Also, equipment types of matching names would be
 * treated as the same type, where previously, they would be different types.
 * This means if you have two "Accessory" slots, be it in the form of notetags
 * or through the Database > Types tab, they can both equip the same type of
 * accessories.
 *
 * - The Change Equip event command is now updated to reflect this new change.
 * When processing an equip change, the slot changed will go to the first
 * empty slot of matching type. If all of the actor's matching slot types are
 * equipped, then the equip will replace the last slot available.
 *
 * ---
 *
 * Shop Status Window
 *
 * - The Status Window found in the Shop Scene was originally barren and did
 * not display much information at all. This is changed through this plugin's
 * new features. While the contents of the Shop Status Window can be customized
 * through the Plugin Parameters, it is a change that cannot be reversed and
 * for the better since it gives players the much needed information revolving
 * around the game's items.
 *
 * ---
 *
 * Core Engine Compatibility: Modern Controls
 *
 * - If the VisuStella Core Engine is added to your game with Modern Controls
 * enabled, then the Item Menu Scene, Equip Menu Scene, and Shop Menu Scene's
 * controls will be changed a bit.
 *
 * - The Item Menu Scene will automatically have the Item List Window active,
 * with using the Left/Right (for single column) or Page Up/Page Down (for
 * multi-columns) to navigate between the Item Categories. Similar will occur
 * when trying to sell items in the Shop Menu Scene.
 *
 * - The Equip Menu Scene will automatically have the Equip Slots Window active
 * and only activate the command window upon moving up to it.
 *
 * ---
 *
 * ============================================================================
 * VisuStella MZ Compatibility
 * ============================================================================
 *
 * While this plugin is compatible with the majority of the VisuStella MZ
 * plugin library, it is not compatible with specific plugins or specific
 * features. This section will highlight the main plugins/features that will
 * not be compatible with this plugin or put focus on how the make certain
 * features compatible.
 *
 * ---
 *
 * VisuMZ_1_BattleCore
 *
 * Changing the "Damage Multiplier" or "Healing Multiplier" vocabulary for the
 * Item and Equip Core's Shop Status Window is not done with the Item and Equip
 * Core's Plugin Parameters if you have the Battle Core installed.
 *
 * Instead, go to Battle Core's Plugin Parameters, Damage Settings, Damage
 * Styles, and adjust the style's version of the "Damage Multiplier" or
 * "Healing Multiplier" text instead.
 *
 * Why does this work this way? Because not all damage styles work off
 * "Multipliers" so in order for it to convey the proper message to the player,
 * each damage style has its own vocabulary to be more accurate.
 *
 * In case you forget about that, when you visit the Item and Equip Core's
 * plugin parameters for these, it should also remind you in the parameter's
 * description on where to change it.
 *
 * ---
 *
 * VisuMZ_2_WeaponSwapSystem
 *
 * The custom equip slots feature from the VisuStella MZ Items and Equips Core
 * allowed you to add in extra weapon slots. This is now curated up to a max
 * of one weapon slot per character. This needs to be done to make the Weapon
 * Swap System viable.
 *
 * ---
 *
 * ============================================================================
 * Notetags
 * ============================================================================
 *
 * The following are notetags that have been added through this plugin. These
 * notetags will not work with your game if this plugin is OFF or not present.
 *
 * ---
 *
 * === General ===
 *
 * These notetags affect the Items, Weapons, and Armors on a general scale.
 *
 * ---
 *
 * <Max: x>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Determines the maximum quantity that can be held for this item.
 * - Replace 'x' with a number value to determine the maximum amount.
 *
 * ---
 *
 * <Color: x>
 * <Color: #rrggbb>
 *
 * - Used for: Item, Weapon, Armor, Skill Notetags
 * - Determines the color of the object inside the in-game menus.
 * - Replace 'x' with a number value depicting a window text color.
 * - Replace 'rrggbb' with a hex color code for a more custom color.
 *
 * ---
 *
 * <Category: x>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Arranges items into certain/multiple categories to work with the Category
 *   Plugin Parameter setting: "Category:x".
 * - Replace 'x' with a category name to mark this item as.
 *
 * ---
 *
 * <Categories>
 *  x
 *  x
 * </Categories>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Arranges items into certain/multiple categories to work with the Category
 *   Plugin Parameter setting: "Category:x".
 * - Replace each 'x' with a category name to mark this item as.
 *
 * ---
 *
 * <Conserve: x%>
 *
 * - Used for: Item
 * - Gives the item a percent chance when used to not consume the item.
 * - Replace 'x' with a number representing the percent chance to successfully
 *   conserve the item.
 * - If an item cannot be consumed, conserve chance will be 100% regardless.
 *
 * ---
 *
 * <ID Sort Priority: x>
 *
 * - Used for: Item, Weapon, and Armor Notetags
 * - Used for Scene_Item, Scene_Equip, Scene_Battle, and Scene_Shop's sell
 *   option (only when selling).
 * - Changes sorting priority by ID for item, weapon, or armor to 'x'.
 *   - Default priority level is '50'.
 * - Items, weapons, and armors with higher priority values will be sorted
 *   higher up on the list while lower values will be lower on the list.
 *
 * ---
 *
 * === Item Accessibility Notetags ===
 *
 * The following notetags allow you to choose when items can/cannot be used
 * based on switches.
 *
 * ---
 *
 * <Enable Switch: x>
 *
 * <Enable All Switches: x,x,x>
 * <Enable Any Switches: x,x,x>
 *
 * - Used for: Item Notetags
 * - Determines the enabled status of the item based on switches.
 * - Replace 'x' with the switch ID to determine the item's enabled status.
 * - If 'All' notetag variant is used, item will be disabled until all
 *   switches are ON. Then, it would be enabled.
 * - If 'Any' notetag variant is used, item will be enabled if any of the
 *   switches are ON. Otherwise, it would be disabled.
 *
 * ---
 *
 * <Disable Switch: x>
 *
 * <Disable All Switches: x,x,x>
 * <Disable Any Switches: x,x,x>
 *
 * - Used for: Item Notetags
 * - Determines the enabled status of the item based on switches.
 * - Replace 'x' with the switch ID to determine the item's enabled status.
 * - If 'All' notetag variant is used, item will be enabled until all switches
 *   are ON. Then, it would be disabled.
 * - If 'Any' notetag variant is used, item will be disabled if any of the
 *   switches are ON. Otherwise, it would be enabled.
 *
 * ---
 *
 * === JavaScript Notetags: Item Accessibility ===
 *
 * The following are notetags made for users with JavaScript knowledge to
 * determine if an item can be accessible by code.
 *
 * ---
 *
 * <JS Item Enable>
 *  code
 *  code
 *  enabled = code;
 * </JS Item Enable>
 *
 * - Used for: Item Notetags
 * - Determines the enabled status of the item based on JavaScript code.
 * - If the actor this is disabled for is the only party member, it will not be
 *   visible in the item list unless the VisuStella Battle Core is installed.
 *   - If the VisuStella Battle Core is installed, then all battle scope items
 *     will be visible even if they're disabled.
 * - Replace 'code' to determine the type enabled status of the item.
 * - The 'enabled' variable returns a boolean (true/false) to determine if the
 *   item will be enabled or not.
 * - The 'user' variable refers to the user with the item.
 * - The 'item' variable refers to the item being checked.
 * - All other item conditions must be met in order for this to code to count.
 *
 * ---
 *
 * === Equipment Notetags ===
 *
 * The following notetags provide equipment-related effects from deciding what
 * equip slots can be given to classes to the base parameter changes asigned
 * to weapons and armors.
 *
 * ---
 *
 * <Equip Slots>
 *  slotName
 *  slotName
 *  slotName
 * </Equip Slots>
 *
 * - Used for: Class Notetags
 * - Changes the equipment slot loadout for any actor who is that class.
 * - Replace 'slotName' with an Equipment Type name from Database > Types.
 *   This is case-sensitive.
 * - Insert or remove as many "slotName" equipment types as needed.
 *
 * ---
 *
 * <param: +x>
 * <param: -x>
 *
 * - Used for: Weapon, Armor Notetags
 * - Changes the base parameter value for the equip item.
 * - Replace 'param' with any of the following: 'MaxHP', 'MaxMP', 'ATK', 'DEF',
 *   'MAT', 'MDF', 'AGI', or 'LUK' to change that specific parameter's value.
 *   - These notetags do NOT work with X Parameters, S Parameters, or any
 *     custom parameters. These notetags ONLY work with the base parameters.
 * - Replace 'x' with a number value to set the parameter value to.
 * - This allows you to bypass the Database Editor's number limitations.
 *
 * ---
 *
 * <Equip Copy Limit: x>
 *
 * - Used for: Weapon, Armor Notetags
 * - Sets a maximum number of copies that the actor can wear of this equipment.
 * - Replace 'x' with a number value to determine the copy limit.
 * - This can be bypassed using Event Commands and/or Script Calls.
 * - Usage Example: Actors can only equip one copy of the "One-of-a-Kind Ring"
 *   on at any time despite having empty accessory slots because the ring has a
 *   <Equip Copy Limit: 1> notetag.
 *
 * ---
 *
 * <Equip Weapon Type Limit: x>
 *
 * - Used for: Weapon
 * - This weapon cannot be equipped with other weapons of the same type once
 *   the limited amount has been reached.
 * - Replace 'x' with a number value to determine the weapon type limit.
 * - This can be bypassed using Event Commands and/or Script Calls.
 * - Usage Example: A dualwielding warrior who can only equip one sword and a
 *   dagger but never two swords or two daggers because the swords and daggers
 *   all have the <Equip Weapon Type Limit: 1> notetags on them.
 *
 * ---
 *
 * <Equip Armor Type Limit: x>
 *
 * - Used for: Armor
 * - This armor cannot be equipped with other armors of the same type once the
 *   limited amount has been reached.
 * - Replace 'x' with a number value to determine the armor type limit.
 * - This can be bypassed using Event Commands and/or Script Calls.
 * - Usage Example: People cannot equip more than two glove accessories on at a
 *   time because the glove is a "Glove" armor-type and each glove item has the
 *   <Equip Armor Type Limit: 2> notetags on them.
 *
 * ---
 *
 * <Party Artifact>
 * <Troop Artifact>
 *
 * <Stackable Party Artifact>
 * <Stackable Troop Artifact>
 *
 * - Used for: Armor
 * - This armor cannot be equipped at all. However, by simply being in the
 *   party's inventory, its parameter bonuses and traits will be applied
 *   globally throughout the whole party or troop (depending on the notetag).
 * - Add both notetags to affect both groups.
 * - The normal versions of the notetag is only applied once regardless of the
 *   number of copies are found in the party's inventory.
 * - The stackable versions of the notetag will have the bonuses and traits
 *   stacked multiple times relative to the number of copies found in the
 *   party's inventory.
 * - This item will NOT be added during the setup phase for Battle Tests.
 *   - If you want to add the item, do it manually.
 *
 * ---
 *
 * <Equip For Class Only: x>
 * <Equip For Classes Only: x, x, x>
 * <Equip For Class Only: name>
 * <Equip For Classes Only: name, name, name>
 *
 * - Used for: Weapon, Armor Notetags
 * - This piece of equipment can only be worn by members with 'x' as the main
 *   class. If there are multiple classes listed, at least one of them need to
 *   be the actor's main class.
 * - Replace 'x' with a number representing the ID of the class required.
 * - For the 'name' variant, replace 'name' with the name of the required class
 *   the actor needs to have in order to equip this object.
 *
 * ---
 *
 * <Equip Requirements>
 *  requirement
 *  requirement
 *  requirement
 * </Equip Requirements>
 *
 * - Used for: Weapon, Armor Notetags
 * - Defines a requirement(s) for the actor to meet in order for the equip item
 *   to be equippable.
 * - Failure to meet these requirements will cause the equipment to unequip
 *   automatically.
 *   - Keep in mind that in some cases, this will not happen immediately.
 *     Things like switches will require the actor to meet its cache clear
 *     in order to trigger the automatic unequip.
 *   - Some ways to trigger a cache clear would be to change the actor's HP/MP,
 *     or adding and then removing a state for the actor (preferrably an unused
 *     state that has no real effect).
 * - Replace 'requirement' with one of the settings bellow:
 * - Add multiple 'requirement' lines for more requirements.
 *
 *   Requirements:
 *
 *   param > x
 *   param >= x
 *   param === x
 *   param <= x
 *   param < x
 *   - Replace 'param' with 'level', 'maxhp', 'maxmp', 'atk', 'def', 'mat',
 *     'mdf', 'agi', or 'luk'.
 *   - This will make the piece of equipment require the actor's base parameter
 *     to be greater than (>), greater than or equal to (>=), equal to (===),
 *     less than or equal to (<=), or less than (<).
 *   - This is NOT the value for the total parameter, only the base parameter.
 *   - The base parameter is calculated by the user's class parameter value and
 *     any bonuses received through permanent stat increases.
 *
 *   learned skill: x
 *   learned skill: name
 *   - This will make the piece of equipment require the actor to have learned
 *     skill 'x'.
 *   - If 'name' is used, priority will be given to the skill with the highest
 *     ID in the database.
 *   - The actor needs to have LEARNED the skill. This means that if you have
 *     added a skill to the actor's kit through a trait, it will not count.
 *
 *   switch: x
 *   - This will require switch X to be on.
 *   - If it isn't, the piece of equipment cannot be worn.
 *   - Insert multiple of these to add more switches that are are required to
 *     be on.
 *
 *   ***NOTE 1***
 *   There is no "class: x" for these equip requirements. Instead, use the
 *   <Equip For Class Only: x> notetags.
 *
 *   ***NOTE 2***
 *   For those wondering where "unique only" is, that does not exist in this
 *   plugin. Instead, use the <Equip Copy Limit: x> notetag listed above.
 *
 *   Example A:
 *
 *     <Equip Requirements>
 *     level >= 20
 *     </Equip Requirements>
 *
 *     - Requires the user to be at least level 20 in order to equip.
 *
 *   Example B:
 *
 *     <Equip Requirements>
 *     atk >= 50
 *     def <= 50
 *     </Equip Requirements>
 *     - Requires the user have at least 50 base ATK to equip.
 *     - Requires the user to be under 50 base DEF to equip.
 *
 * ---
 *
 * <Added EType: x>
 * <Added ETypes: x, x, x>
 *
 * - Used for: Armor Notetags
 * - This is for armors only and does NOT work with weapons!
 * - Allows a piece of armor to belong to multiple ETypes. This means a glove
 *   can be equipped as "Armgear" or as an "Accessory" if you so choose.
 * - Replace 'x' with a number representing the ID of the EType you wish to add
 *   to the list of ETypes.
 *   - Insert multiple 'x' entries to add more than one EType ID.
 *
 * ---
 *
 * <Cursed>
 *
 * - Used for: Weapon, Armor Notetags
 * - If this weapon or armor is equipped, it cannot manually be removed by the
 *   player until it is purified.
 * - To remove it, it must be done by event commands, script calls, or through
 *   the Purify-related Plugin Commands provided by this plugin.
 * - Once purified, the weapon or armor will become unequipped unless it has a
 *   purify transformation.
 *   - If the newly transformed weapon/armor is equippable, it will remain in
 *     the actor's equipment slots.
 * - If you are using VisuMZ_2_WeaponSwapSystem, weapons cannot become cursed
 *   in order to allow free weapon swapping. Weaponry will not be cursed
 *   if VisuMZ_2_WeaponSwapSystem is installed.
 *
 * ---
 *
 * <Purify Transform: id>
 * <Purify Transform: name>
 *
 * - Used for: Weapon, Armor Notetags
 * - If this notetag is present on a <Cursed> weapon or armor, then upon the
 *   actor receiving purification, the weapon or armor will transform into a
 *   different item.
 * - Replace 'id' with a number representing the transformed weapon/armor's ID.
 * - Replace 'name' with text representing the transformed weapon/armor's name.
 * - Weapons can only transform into weapons.
 * - Armors can only transform into armors.
 *
 * ---
 *
 * === JavaScript Notetags: Equipment ===
 *
 * The following are notetags made for users with JavaScript knowledge to
 * adjust the parameter through code.
 *
 * ---
 *
 * <JS Parameters>
 *  MaxHP = code;
 *  MaxMP = code;
 *  ATK = code;
 *  DEF = code;
 *  MAT = code;
 *  MDF = code;
 *  AGI = code;
 *  LUK = code;
 * </JS Parameters>
 *
 * - Used for: Weapon, Armor Notetags
 * - Uses JavaScript to determine the values for the basic parameters based on
 *   the code used to calculate its value.
 * - The variables 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI', and
 *   'LUK' are used to determine the finalized value of the parameter. This
 *   variable is case sensitive.
 * - If a parameter is not present, its value will be treated as +0.
 *
 * '''WARNING!''' If you are trying to calculate a value based off a full
 * parameter value, such as "ATK = user.atk * 0.10", it's going to break and
 * will cause an infinite loop. Use base parameter values instead.
 *
 * ---
 *
 * === Status Window Notetags ===
 *
 * The following notetags will affect the Shop Status Window info. If for any
 * reason the data that is displayed is not to your liking or insufficient,
 * you can change it up using the following notetags.
 *
 * ---
 *
 * <Status Info>
 *  key: data
 *  key: data
 *  key: data
 * </Status Info>
 *
 * - Used for: Skill, Item, Weapon, Armor Notetags
 * - If you do not like the generated data that's displayed, you can change it
 *   using this notetag to display what you want.
 * - Replace 'key' with one of the following for skills and items:
 *   - Consumable
 *   - Quantity
 *   - Occasion
 *   - Scope
 *   - Speed
 *   - Success Rate
 *   - Repeat
 *   - Hit Type
 *   - Element
 *   - Damage Multiplier
 *   - HP Recovery
 *   - MP Recovery
 *   - TP Recovery
 *   - HP Damage
 *   - MP Damage
 *   - TP Damage
 *   - User TP Gain
 *   - Added Effects
 *   - Removed Effects
 * - Replace 'key' with one of the following for weapons and armors:
 *   - 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI', or 'LUK'
 *   - For those with VisuMZ_0_CoreEngine:
 *     - 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT', 'HRG', 'MRG', 'TRG'
 *     - 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR', 'MDR', 'FDR', 'EXR'
 *   - Only relevant if the Draw Style for equipment is "classic" or "double".
 * - Replace 'data' with the text data you want to visually appear. You may use
 *   text codes for this.
 * - This only affects info entries that are already visible and won't make
 *   other categories suddenly appear.
 * - Insert or remove as many "key: data" lines as needed.
 *
 * ---
 *
 * <Custom Status Info>
 *  key: data
 *  key: data
 *  key: data
 * </Custom Status Info>
 *
 * - Used for: Skill, Item, Weapon, Armor Notetags
 * - If you want custom categories and data to be displayed for your items that
 *   aren't provided by the Shop Status Window Info to begin with, you can use
 *   this notetag to add in your own entries.
 *   - When used with weapon or armor database objects, this information is
 *     only relevant if the Draw Style for equipment is "classic" or "double".
 * - Replace 'key' with text of the exact label you want. You may use text
 *   codes for this.
 * - Replace 'data' with text of the exact text data you want. You may use text
 *   codes for this.
 * - Insert or remove as many "key: data" lines as needed.
 *
 * ---
 *
 * <Shop Picture Name: filename>
 *
 * - Used for: Skill, Item, Weapon, Armor Notetags
 * - Enables a shop picture for the status window. This image can be seen in
 *   the item scene, shop scene, and skill scene if enabled.
 * - If this notetag is not used, there will be no image.
 * - Replace 'filename' with the filename of the graphic to use from the game
 *   project's img/pictures/ folder. Filenames are case sensitive. Leave out
 *   the filename extension from the notetag.
 * - Use the supporting notetags to determine where the image appears. If not,
 *   they will default to the background, fit to the window dimensions,
 *   centered at the middle of the window.
 *
 * ---
 *
 * <Shop Picture Layer: Background>
 * <Shop Picture Layer: Foreground>
 *
 * - Used for: Skill, Item, Weapon, Armor Notetags
 * - Determines which layer the graphic will be drawn on.
 * - If the background layer is selected, the picture will appear behind the
 *   data text.
 * - If the foreground layer is selected, the picture will appear in front of
 *   the data text.
 * - If this notetag is not used, it will default to the background layer.
 *
 * ---
 *
 * <Shop Picture Max Width: x>
 * <Shop Picture Max Height: y>
 * <Shop Picture Max Dimensions: x, y>
 *
 * - Used for: Skill, Item, Weapon, Armor Notetags
 * - Determines the maximum width and/or height for the image.
 * - This means the image will be automatically scaled proportionally to that
 *   width or height as long as everything else does not break boundaries.
 * - Replace 'x' and 'y' with number values representing the maximum dimensions
 *   the image can be in pixels.
 * - If these notetags are not used, the image will be automatically scaled to
 *   the dimensions of the shop status window.
 *
 * ---
 *
 * <Shop Picture Alignment: Left>
 * <Shop Picture Alignment: Center>
 * <Shop Picture Alignment: Right>
 *
 * - Used for: Skill, Item, Weapon, Armor Notetags
 * - Adjusts the horizontal alignment for the image.
 * - Left, center, right determines how it's aligned horizontally if the
 *   image does not horizontally fit in the width of the window.
 * - If any of these notetags are not used, the image will default to the
 *   'center' alignment.
 *
 * ---
 *
 * <Shop Picture Position: Top>
 * <Shop Picture Position: Middle>
 * <Shop Picture Position: Bottom>
 *
 * - Used for: Skill, Item, Weapon, Armor Notetags
 * - Adjusts the vertical position for the image.
 * - Top, middle, bottom determines how it's positioned vertically if the
 *   image does not vertically fit in the width of the window.
 * - If any of these notetags are not used, the image will default to the
 *   'middle' position.
 *
 * ---
 *
 * <Shop Picture Offset X: +x>
 * <Shop Picture Offset X: -x>
 *
 * <Shop Picture Offset Y: +y>
 * <Shop Picture Offset Y: -y>
 *
 * <Shop Picture Offset: +x, +y>
 * <Shop Picture Offset: -y, -y>
 *
 * - Used for: Skill, Item, Weapon, Armor Notetags
 * - Offsets the X and Y positions of the image in the shop status window.
 * - X offsets adjust the horizontal position by x pixels.
 *   - Positive goes right.
 *   - Negative goes left.
 * - Y offsets adjust the horizontal position by y pixels.
 *   - Positive goes down.
 *   - Negative goes up.
 * - Replace 'x' and 'y' with number values representing the pixels to offset
 *   the image by. The '+' and '-' signs are required.
 * - If none of these notetags are used, there will be no offsets.
 *
 * ---
 *
 * <Shop Picture Opacity: x>
 * <Shop Picture Opacity: x%>
 *
 * - Used for: Skill, Item, Weapon, Armor Notetags
 * - Adjusts the opacity of the image used.
 * - When using 'x' and not 'x%', use a number between 0 and 255.
 *   - The closer to 0, the more transparent the image is.
 *   - The closer to 255, the more opaque the image is.
 * - When using 'x%' and not 'x', use a number between 0% and 100%.
 *   - The closer to 0%, the more transparent the image is.
 *   - The closer to 100%, the more opaque the image is.
 *
 * ---
 *
 * === Shop Menu Notetags ===
 *
 * These notetags adjust how prices and such are managed inside the Shop Menu
 * as well as whether or not some items are visible depending on switch states.
 *
 * ---
 *
 * <Price: x>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Adjusts the buying price for this item.
 * - Replace 'x' with a number depicting the desired value for the buy price.
 * - This allows you to bypass the RPG Maker MZ editor's limitation of 999,999.
 *
 * ---
 *
 * <Can Sell>
 * <Cannot Sell>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Makes the item either always sellable or cannot be sold.
 * - This bypasses the game's internal hard-coding to prevent items with a
 *   price of 0 from being able to be sold.
 * - This bypasses the game's internal hard-coding to always allow items with
 *   a price value of being able to be sold.
 *
 * ---
 *
 * <Sell Price: x>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Changes the sell price to be something different than the default amount.
 * - Replace 'x' with a number depicting the desired value for the sell price.
 *
 * ---
 *
 * <Show Shop Switch: x>
 *
 * <Show Shop All Switches: x,x,x>
 * <Show Shop Any Switches: x,x,x>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Determines the visibility of the shop item based on switches.
 * - Replace 'x' with the switch ID to determine the shop item's visibility.
 * - If 'All' notetag variant is used, item will be hidden until all switches
 *   are ON. Then, it would be shown.
 * - If 'Any' notetag variant is used, item will be shown if any of the
 *   switches are ON. Otherwise, it would be hidden.
 *
 * ---
 *
 * <Hide Shop Switch: x>
 *
 * <Hide Shop All Switches: x,x,x>
 * <Hide Shop Any Switches: x,x,x>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Determines the visibility of the shop item based on switches.
 * - Replace 'x' with the switch ID to determine the shop item's visibility.
 * - If 'All' notetag variant is used, item will be shown until all switches
 *   are ON. Then, it would be hidden.
 * - If 'Any' notetag variant is used, item will be hidden if any of the
 *   switches are ON. Otherwise, it would be shown.
 *
 * ---
 *
 * <Cannot Sell Switch: x>
 *
 * <Cannot Sell All Switches: x,x,x>
 * <Cannot Sell Any Switches: x,x,x>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Determines the sellability of the shop item based on switches.
 * - Replace 'x' with the switch ID to determine the shop item's sellability.
 * - If 'All' notetag variant is used, item cannot be sold until all switches
 *   are ON. Otherwise, it can be sold.
 * - If 'Any' notetag variant is used, item cannot be sold if any of the
 *   switches are ON. Otherwise, it can be sold.
 *
 * ---
 *
 * <Buy Turn On Switch: x>
 * <Buy Turn On Switches: x, x, x>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - When this item, weapon, or armor is bought in the shop scene, turn on the
 *   switch(es) 'x'.
 * - Replace 'x' with a number representing the ID of the switch to turn on.
 *   - Insert multiple 'x' values to turn on multiple switches upon buying.
 *
 * ---
 *
 * <Buy Turn Off Switch: x>
 * <Buy Turn Off Switches: x, x, x>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - When this item, weapon, or armor is bought in the shop scene, turn off the
 *   switch(es) 'x'.
 * - Replace 'x' with a number representing the ID of the switch to turn off.
 *   - Insert multiple 'x' values to turn off multiple switches upon buying.
 *
 * ---
 *
 * <Sell Turn On Switch: x>
 * <Sell Turn On Switches: x, x, x>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - When this item, weapon, or armor is sold in the shop scene, turn on the
 *   switch(es) 'x'.
 * - Replace 'x' with a number representing the ID of the switch to turn on.
 *   - Insert multiple 'x' values to turn on multiple switches upon selling.
 *
 * ---
 *
 * <Sell Turn Off Switch: x>
 * <Sell Turn Off Switches: x, x, x>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - When this item, weapon, or armor is sold in the shop scene, turn off the
 *   switch(es) 'x'.
 * - Replace 'x' with a number representing the ID of the switch to turn off.
 *   - Insert multiple 'x' values to turn off multiple switches upon selling.
 *
 * ---
 *
 * === JavaScript Notetags: Shop Menu ===
 *
 * The following are notetags made for users with JavaScript knowledge. These
 * notetags are primarily aimed at Buy and Sell prices.
 *
 * ---
 *
 * <JS Buy Price>
 *  code
 *  code
 *  price = code;
 * </JS Buy Price>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Replace 'code' to determine the buying 'price' of the item.
 * - Insert the final buy price into the 'price' variable.
 * - The 'item' variable refers to the item being bought.
 *
 * ---
 *
 * <JS Sell Price>
 *  code
 *  code
 *  price = code;
 * </JS Sell Price>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Replace 'code' to determine the selling 'price' of the item.
 * - Insert the final sell price into the 'price' variable.
 * - The 'item' variable refers to the item being sold.
 *
 * ---
 *
 * ============================================================================
 * Plugin Commands
 * ============================================================================
 *
 * The following are Plugin Commands that come with this plugin. They can be
 * accessed through the Plugin Command event command.
 *
 * ---
 *
 * === Actor Plugin Commands ===
 *
 * ---
 *
 * Actor: Change Equip Slots
 * - Forcefully change the actor(s) equip slots.
 * - These will persist through class changes.
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to affect.
 *
 *   Equip Slots:
 *   - Insert the equip slots you want the actor(s) to have.
 *   - These entries are case-sensitive.
 *
 * ---
 *
 * Actor: Reset Equip Slots
 * - Reset any forced equip slots for the actor(s).
 * - Equip slots will then be based on class.
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to affect.
 *
 * ---
 *
 * === Purify Plugin Commands ===
 *
 * ---
 *
 * Purify: Target Actor(s)
 * - Purifies target actor(s) of any cursed weapons or armors.
 * - Cannot be used in battle.
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to affect.
 *
 * ---
 *
 * Purify: Whole Party
 * - Purifies whole party of any cursed weapons or armors.
 * - Cannot be used in battle.
 *
 * ---
 *
 * === Shop Plugin Commands ===
 *
 * ---
 *
 * Shop: Advanced
 * - Make it easier to put together inventories for a shop.
 * - WARNING: Does not allow for event-specific prices.
 *
 *   Step 1: Item ID's
 *   - Select which Item ID ranges to add.
 *
 *   Step 2: Weapon ID's
 *   - Select which Weapon ID ranges to add.
 *
 *   Step 3: Armor ID's
 *   - Select which Armor ID ranges to add.
 *
 *   Step 4: Purchase Only?
 *   - Make the shop purchase-only?
 *
 *   Optional:
 *
 *     Blacklist
 *     - A list of categories to blacklist from the shop.
 *     - Not used if empty. Mark categories with <Category: x>
 *
 *     Whitelist
 *     - A list of categories to whitelist for the shop.
 *     - Not used if empty. Mark categories with <Category: x>
 *
 * This Plugin Command primarily functions as an alternative to the editor's
 * "Shop Processing" event command as that one requires you to add items one at
 * a time, making it extremely tedious to add large amounts of items. This
 * Plugin Command will mitigate that by allowing ID ranges to determine which
 * items to make available.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Item Menu Settings
 * ============================================================================
 *
 * The Item Menu Settings allow you to adjust specifics on how key objects and
 * windows in the Item Menu Scene operate.
 *
 * ---
 *
 * General Window
 *
 *   Use Updated Layout:
 *   - Use the Updated Item Menu Layout provided by this plugin?
 *   - This will automatically enable the Status Window.
 *   - This will override the Core Engine windows settings.
 *
 *   Layout Style:
 *   - If using an updated layout, how do you want to style the menu scene?
 *     - Upper Help, Left Input
 *     - Upper Help, Right Input
 *     - Lower Help, Left Input
 *     - Lower Help, Right Input
 *
 * ---
 *
 * List Window
 *
 *   Columns:
 *   - Number of maximum columns.
 *   - If you are using the VisuStella MZ Core Engine and the "Modern Controls"
 *     Plugin Parameter, please read through that section in case you have any
 *     questions about how to switch between categories when using multiple
 *     columns of items at a time.
 *
 * ---
 *
 * Item Quantity
 *
 *   Item Max:
 *   Weapon Max:
 *   Armor Max:
 *   - The default maximum quantity for items, weapons, and/or armors.
 *
 *   Quantity Format:
 *   - How to display an item's quantity.
 *   - %1 - Item Quantity
 *
 *   Font Size:
 *   - Default font size for item quantity.
 *
 * ---
 *
 * Shop Status Window
 *
 *   Show in Item Menu?:
 *   - Show the Shop Status Window in the Item Menu?
 *   - This is enabled if the Updated Layout is on.
 *
 *   Adjust List Window?:
 *   - Automatically adjust the Item List Window in the Item Menu if using the
 *     Shop Status Window?
 *
 *   Background Type:
 *   - Select background type for this window.
 *     - 0 - Window
 *     - 1 - Dim
 *     - 2 - Transparent
 *
 *   JS: X, Y, W, H:
 *   - Code used to determine the dimensions for this Status Window in the
 *     Item Menu.
 *
 * ---
 *
 * Button Assist Window
 *
 *   Switch Category:
 *   - Button assist text used for switching categories.
 *   - For VisuStella MZ's Core Engine's Button Assist Window.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Item Categories
 * ============================================================================
 *
 * Item Categories appear both in the Item Menu Scene and Shop Menu Scene (but
 * only under the Sell command). These Plugin Parameters give you the ability
 * to add in the specific categories you want displayed, remove the ones you
 * don't, and associate them with icons.
 *
 * ---
 *
 * List
 *
 *   Category List
 *   - A list of the item categories displayed in the Item/Shop menus.
 *
 *     Type:
 *     - A list of the item categories displayed in the Item/Shop menus.
 *     - Replace x with ID numbers or text.
 *     - AllItems, RegularItems, KeyItems
 *     - HiddenItemA, HiddenItemB
 *     - Consumable, Nonconsumable
 *     - AlwaysUsable, BattleUsable, FieldUsable, NeverUsable
 *     - AllWeapons, WType:x
 *     - AllArmors, AType:x, EType:x
 *     - Category:x
 *
 *     Icon:
 *     - Icon used for this category.
 *     - Use 0 for no icon.
 *
 *     Visibility Switch:
 *     - This Switch must be turned ON in order for the category to show.
 *     - Use 0 for no Switch requirement.
 *
 *     Sort By:
 *     - Sort this category (in Scene_Item and Scene_Shop only) this way.
 *
 *   Style:
 *   - How do you wish to draw categorie entries in the Category Window?
 *   - Text Only: Display only the text.
 *   - Icon Only: Display only the icon.
 *   - Icon + Text: Display the icon first, then the text.
 *   - Auto: Determine which is better to use based on the size of the cell.
 *
 *   Text Alignment
 *   - Decide how you want the text to be aligned.
 *
 * ---
 *
 * Vocabulary
 *
 *   Hidden Item A
 *   Hidden Item B
 *   Consumable
 *   Nonconsumable
 *   Always Usable
 *   Battle Usable
 *   Field Usable
 *   Never Usable
 *   - How these categories are named in the Item Menu.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: NEW! Labels
 * ============================================================================
 *
 * Whenever the player receives a new item(s), a NEW! Label can be placed on
 * top of the item's icon when browsing a menu displaying the item(s). This is
 * a quality of life addition from more modern RPG's to help players figure out
 * what they've recently received. The following are Plugin Parameters made to
 * adjust how the NEW! Labels are handled in-game.
 *
 * ---
 *
 * NEW! Labels
 *
 *   Use NEW! Labels?:
 *   - Use the NEW! Labels or not?
 *
 *   Icon:
 *   - The icon index used to represent the NEW! text.
 *   - Use 0 to not draw any icons.
 *
 *   Text:
 *   - The text written on the NEW! Label.
 *
 *     Font Color:
 *     - Use #rrggbb for custom colors or regular numbers for text colors from
 *       the Window Skin.
 *
 *     Font Size:
 *     - The font size used for the NEW! text.
 *
 *   Fade Limit:
 *   - What's the upper opaque limit before reversing?
 *
 *   Fade Speed:
 *   - What's the fade speed of the NEW! Label?
 *
 *   Offset X:
 *   - How much to offset the NEW! Label's X position by.
 *
 *   Offset Y:
 *   - How much to offset the NEW! Label's Y position by.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Equip Menu Settings
 * ============================================================================
 *
 * These Plugin Parameters adjust the Equipment Menu Scene, ranging from using
 * a more updated and modern layout, changing the styles of other windows, and
 * other key visual aspects of the Equip Menu Scene. Other settings here allow
 * you to adjust how equipment operate under certain rulings, too.
 *
 * ---
 *
 * General
 *
 *   Use Updated Layout:
 *   - Use the Updated Equip Layout provided by this plugin?
 *   - This will override the Core Engine windows settings.
 *
 *     Param Font Size:
 *     - The font size used for parameter values.
 *
 *     Show Menu Portraits?:
 *     - If Main Menu Core is installed, display the Menu Portraits instead of
 *       the actor's face in the status window?
 *
 *     JS: Portrait Upper:
 *     - If Menu Portraits are available, this is code used to draw the upper
 *       data like this in the Status Window.
 *
 *     JS: Face Upper:
 *     - If faces used used, this is code used to draw the upper data like this
 *       in the Status Window.
 *
 *     JS: Parameter Lower:
 *     - Code to determine how parameters are drawn in the Status Window.
 *
 *   Layout Style:
 *   - If using an updated layout, how do you want to style the menu scene?
 *     - Upper Help, Left Input
 *     - Upper Help, Right Input
 *     - Lower Help, Left Input
 *     - Lower Help, Right Input
 *
 *   Status Window Width:
 *   - The usual width of the status window if using the non-Updated Equip
 *     Menu Layout.
 *
 *   Show Back Rectangles?:
 *   - Show back rectangles of darker colors to display information better?
 *
 *     Back Rectangle Color:
 *     - Use #rrggbb for custom colors or regular numbers for text colors
 *       from the Window Skin.
 *
 *   Cursed Equip Popup:
 *   - Text popup appears when an actor equips a cursed weapon/armor.
 *   - Text codes allowed.
 *   - Requires VisuMZ_0_CoreEngine!
 *   - Empty to not use.
 *   -  %1 - Actor, %2 - Equip, %3 - Icon.
 *
 * ---
 *
 * Command Window
 *
 *   Style:
 *   - How do you wish to draw commands in the Command Window?
 *   - Text Only: Display only the text.
 *   - Icon Only: Display only the icon.
 *   - Icon + Text: Display the icon first, then the text.
 *   - Auto: Determine which is better to use based on the size of the cell.
 *
 *   Text Align:
 *   - Text alignment for the Command Window.
 *
 *   Equip Icon:
 *   - The icon used for the Equip command.
 *
 *     Help Description:
 *     - Help description used when this command is selected.
 *     - Text codes allowed.
 *
 *   Add Optimize Command?:
 *   - Add the "Optimize" command to the Command Window?
 *
 *     Help Description:
 *     - Help description used when this command is selected.
 *     - Text codes allowed.
 *
 *     Optimize Icon:
 *     - The icon used for the Optimize command.
 *
 *   Add Clear Command?:
 *   - Add the "Clear" command to the Command Window?
 *
 *     Help Description:
 *     - Help description used when this command is selected.
 *     - Text codes allowed.
 *
 *     Clear Icon:
 *     - The icon used for the Clear command.
 *
 * ---
 *
 * Remove Equip
 *
 *   Icon:
 *   - Icon used for equipment removal.
 *
 *   Text:
 *   - Text used for equipment removal.
 *
 *   Use SHIFT Shortcut?:
 *   - Add the "Shift" button as a shortcut key to removing items?
 *
 * ---
 *
 * Rulings
 *
 *   Equip-Adjust HP/MP:
 *   - Adjust HP/MP differences after changing equips with MaxHP/MaxMP values.
 *
 *   Non-Removable Types:
 *   - Insert ID's of the Equipment Types that must always have an item
 *     equipped and cannot be empty.
 *
 *   Non-Optimized Types:
 *   - Insert ID's of the Equipment Types that will be ignored when equipment
 *     is being optimized.
 *
 * ---
 *
 * Button Assist Window
 *
 *   SHIFT: Remove:
 *   - Button assist text used for the SHIFT Remove Shortcut.
 *   - For VisuStella MZ's Core Engine's Button Assist Window.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Shop Menu Settings
 * ============================================================================
 *
 * These Plugin Parameters allow you a number of options to adjust the Shop
 * Menu Scene. These options range from enabling an updated and modern layout,
 * adjust how various key visual aspects appear, and determine how prices can
 * be affected when it comes to selling them or buying them (for coders).
 *
 * ---
 *
 * General
 *
 *   Use Updated Layout:
 *   - Use the Updated Shop Layout provided by this plugin?
 *   - This will override the Core Engine windows settings.
 *
 *   Layout Style:
 *   - If using an updated layout, how do you want to style the menu scene?
 *     - Upper Help, Left Input
 *     - Upper Help, Right Input
 *     - Lower Help, Left Input
 *     - Lower Help, Right Input
 *
 * ---
 *
 * Switches:
 *
 *   Switch: Buy:
 *   - Buying items in the Shop Scene turns this Switch to ON.
 *   - Switch reverts to OFF whenever the Shop Scene opens.
 *
 *   Switch: Sell
 *   - Selling items in the Shop Scene turns this Switch to ON.
 *   - Switch reverts to OFF whenever the Shop Scene opens.
 *
 * ---
 *
 * Command Window
 *
 *   Hide Unavailable?:
 *   - Hide all unavailable commands like when a shop is set to Purchase Only?
 *
 *   Style:
 *   - How do you wish to draw commands in the Command Window?
 *   - Text Only: Display only the text.
 *   - Icon Only: Display only the icon.
 *   - Icon + Text: Display the icon first, then the text.
 *   - Auto: Determine which is better to use based on the size of the cell.
 *
 *   Text Align:
 *   - Text alignment for the Command Window.
 *
 *   Buy Icon:
 *   - The icon used for the Buy command.
 *
 *   Sell Icon:
 *   - The icon used for the Sell command.
 *
 *   Cancel Icon:
 *   - The icon used for the Cancel command.
 *
 *   Rename "Cancel":
 *   - Rename Cancel to something more logical for the Shop Menu Scene.
 *
 * ---
 *
 * Prices
 *
 *   Sell Price Rate:
 *   - The default sell price rate.
 *
 *   JS: Buy Price:
 *   - Modificatons made to the buy price before finalizing it.
 *
 *   JS: Sell Price:
 *   - Modificatons made to the sell price before finalizing it.
 *
 * ---
 *
 * Button Assist Window
 *
 *   Small Increment:
 *   Large Increment:
 *   - Text used for changing amount bought/sold.
 *   - For VisuStella MZ's Core Engine's Button Assist Window.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Shop Status Window
 * ============================================================================
 *
 * These Plugin Parameters focuses on the Shop Status Window and determines how
 * its data is displayed.
 *
 * ---
 *
 * General
 *
 *   Window Width:
 *   - The usual width of the status window.
 *
 *   Parameter Font Size:
 *   - Font size used for parameter changes.
 *
 *   Translucent Opacity:
 *   - Opacity setting used for translucent window objects.
 *
 *   Show Back Rectangles?:
 *   - Show back rectangles of darker colors to display information better?
 *
 *     Back Rectangle Color:
 *     - Use #rrggbb for custom colors or regular numbers for text colors
 *       from the Window Skin.
 *
 * ---
 *
 * Equipment Data
 *
 *   Data Style:
 *   - How do you wish to display equipment data?
 *     - Compare - Compares selected equip to equipped gear
 *       - Lists all main party actors
 *       - Displays the parameter differences when equipped
 *       - Calculates custom JS values
 *     - Classic - Shows basic parameters of selected equip
 *       - Involves no actors, only shows the item's stats
 *       - Shows weapon or armor specific parameters
 *       - Does not show custom JS values as those are calculated per actor
 *       - Does not show custom parameters as those are calculated per actor
 *       - Use <Status Info> and <Custom Status Info> notetags to overwrite or
 *         add custom data to classic equip data
 *     - Double - Shows basic parameters in double columns
 *       - Involves no actors, only shows the item's stats
 *       - Shows weapon or armor specific parameters
 *       - Does not show custom JS values as those are calculated per actor
 *       - Does not show custom parameters as those are calculated per actor
 *       - Use <Status Info> and <Custom Status Info> notetags to overwrite or
 *         add custom data to classic equip data
 *
 *     Compare Style:
 *
 *       Already Equipped:
 *       - Marker used to show an actor cannot equip an item.
 *
 *       Can't Equip:
 *       - Marker used to show an actor cannot equip an item.
 *
 *       No Changes:
 *       - Marker used to show no changes have occurred.
 *
 *       JS: Draw Equip Data:
 *       - Code used to draw the equipment data for the Shop Status Window.
 *
 *     Classic Style:
 *
 *       Added Weapon Params:
 *       Added Armor Params:
 *       - Display these parameters when a weapon/armor is selected.
 *       - Requires VisuMZ_0_CoreEngine!
 *
 *       JS: Draw Equip Data:
 *       - Code used to draw the equipment data for the Shop Status Window.
 *
 *     Double Style:
 *
 *       Added Weapon Params:
 *       Added Armor Params:
 *       - Display these parameters when a weapon/armor is selected.
 *       - Requires VisuMZ_0_CoreEngine!
 *
 *       JS: Draw Equip Data:
 *       - Code used to draw the equipment data for the Shop Status Window.
 *
 *   Delay MS:
 *   - How many milliseconds (MS) to delay the preview update?
 *   - This is to prevent lag spikes for equips only.
 *
 * ---
 *
 * Item Data
 *
 *   Max State/Buff Icons:
 *   - Maximum number of icons that can be displayed for Add/Remove
 *     States/Buffs.
 *
 *   Multiplier Standard:
 *   - Constant standard to filter out random values when calculating the
 *     damage multiplier.
 *
 *   JS: Draw Item Data:
 *   - Code used to draw the item data for the Shop Status Window.
 *
 * ---
 *
 * Vocabulary
 *
 *   Consumable:
 *   Occasions:
 *   Scope:
 *   Speed:
 *   Success Rate:
 *   Repeats:
 *   Hit Type:
 *   Element:
 *   Damage Type:
 *   Effects:
 *   - Vocabulary used for these data entries.
 *   - Some of these have Plugin Parameters have sub-entries.
 *
 *   NOTE: Regarding Damage Labels
 *
 *   If Visu_1_BattleCore is installed, priority goes to its Damage Style
 *   settings. The label displayed is based on the damage style settings in
 *   place for that specific skill or item.
 *
 *   Go to Battle Core > Plugin Parameters > Damage Settings > Style List >
 *   pick the damage style you want to edit > Damage Label and change the
 *   text settings you'd like there.
 *
 * ---
 *
 * ============================================================================
 * Terms of Use
 * ============================================================================
 *
 * 1. These plugins may be used in free or commercial games provided that they
 * have been acquired through legitimate means at VisuStella.com and/or any
 * other official approved VisuStella sources. Exceptions and special
 * circumstances that may prohibit usage will be listed on VisuStella.com.
 *
 * 2. All of the listed coders found in the Credits section of this plugin must
 * be given credit in your games or credited as a collective under the name:
 * "VisuStella".
 *
 * 3. You may edit the source code to suit your needs, so long as you do not
 * claim the source code belongs to you. VisuStella also does not take
 * responsibility for the plugin if any changes have been made to the plugin's
 * code, nor does VisuStella take responsibility for user-provided custom code
 * used for custom control effects including advanced JavaScript notetags
 * and/or plugin parameters that allow custom JavaScript code.
 *
 * 4. You may NOT redistribute these plugins nor take code from this plugin to
 * use as your own. These plugins and their code are only to be downloaded from
 * VisuStella.com and other official/approved VisuStella sources. A list of
 * official/approved sources can also be found on VisuStella.com.
 *
 * 5. VisuStella is not responsible for problems found in your game due to
 * unintended usage, incompatibility problems with plugins outside of the
 * VisuStella MZ library, plugin versions that aren't up to date, nor
 * responsible for the proper working of compatibility patches made by any
 * third parties. VisuStella is not responsible for errors caused by any
 * user-provided custom code used for custom control effects including advanced
 * JavaScript notetags and/or plugin parameters that allow JavaScript code.
 *
 * 6. If a compatibility patch needs to be made through a third party that is
 * unaffiliated with VisuStella that involves using code from the VisuStella MZ
 * library, contact must be made with a member from VisuStella and have it
 * approved. The patch would be placed on VisuStella.com as a free download
 * to the public. Such patches cannot be sold for monetary gain, including
 * commissions, crowdfunding, and/or donations.
 *
 * ============================================================================
 * Credits
 * ============================================================================
 *
 * If you are using this plugin, credit the following people in your game:
 *
 * Team VisuStella
 * * Yanfly
 * * Arisu
 * * Olivia
 * * Irina
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 *
 * Version 1.56: December 19, 2024
 * * Bug Fixes!
 * ** Fixed a bug where newly added equipment would cause crashes upon
 *    interaction. Fix made by Irina.
 *
 * Version 1.55: November 14, 2024
 * * Bug Fixes!
 * ** Fixed a bug where you can no longer attempt to equip an actor with zero
 *    equip slots and causing a crash. Fix made by Arisu.
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Updated <Status Info>
 * *** Used for: Skill, Item, Weapon, Armor Notetags
 * **** Replace 'key' with one of the following for weapons and armors:
 * ***** 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI', or 'LUK'
 * ***** For those with VisuMZ_0_CoreEngine:
 * ****** 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT', 'HRG', 'MRG', 'TRG'
 * ****** 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR', 'MDR', 'FDR', 'EXR'
 * **** Only relevant if the Draw Style for equipment is "classic" or "double".
 * ** Updated <Custom Status Info> notetag:
 * *** Used for: Skill, Item, Weapon, Armor Notetags
 * **** When used with weapon or armor database objects, this information is
 *      only relevant if the Draw Style for equipment is "classic" or "double".
 * * New Feature!
 * ** New Plugin Parameters:
 * *** Parameters > Shop Status Window > Data Style:
 * **** How do you wish to display equipment data?
 * ***** Compare - Compares selected equip to equipped gear
 * ****** Lists all main party actors
 * ****** Displays the parameter differences when equipped
 * ****** Calculates custom JS values
 * ***** Classic - Shows basic parameters of selected equip
 * ***** Double - Shows basic parameters in double columns
 * ****** Involves no actors, only shows the item's stats
 * ****** Shows weapon or armor specific parameters
 * ****** Does not show custom JS values as those are calculated per actor
 * ****** Does not show custom parameters as those are calculated per actor
 * ****** Use <Status Info> and <Custom Status Info> notetags to overwrite or
 *        add custom data to classic equip data
 * **** Data Style > Classic Style:
 * **** Data Style > Double Style:
 * ***** Added Weapon Params
 * ***** Added Armor Params
 * ****** Display these parameters when a weapon/armor is selected.
 * ****** Requires VisuMZ_0_CoreEngine!
 *
 * Version 1.54: October 17, 2024
 * * Feature Update!
 * ** If "Modern Controls" is selected while "Remove Equip" and "Optimize" are
 *    gone from the Equip Menu, right click will exit the menu. Feature added
 *    by Arisu.
 *
 * Version 1.53: July 18, 2024
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Added warning to <JS Parameters>:
 * *** If you are trying to calculate a value based off a full parameter value,
 *     such as "ATK = user.atk * 0.10", it's going to break and will cause an
 *     infinite loop. Use base parameter values instead.
 * * New Features!
 * ** New notetags added by Irina:
 * *** <ID Sort Priority: x>
 * **** Used for Scene_Item, Scene_Equip, Scene_Battle, and Scene_Shop's sell
 *      option (only when selling).
 * **** Changes sorting priority by ID for item, weapon, or armor to 'x'.
 * **** Default priority level is '50'.
 * **** Items, weapons, and armors with higher priority values will be sorted
 *      higher up on the list while lower values will be lower on the list.
 *
 * Version 1.52: May 16, 2024
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameter added by Irina:
 * *** Parameters > Item Categories > Category List > Category > Sorted By:
 * **** You can now sort specific item categories by ID or Name.
 * **** Only usable within Scene_Item and Scene_Shop.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 *
 * Version 1.51: December 14, 2023
 * * Bug Fixes!
 * ** Fixed a bug where if an item is unequipped, it may cause a crash. Fix
 *    made by Arisu.
 * ** Fixed a bug where <Proxy: id> did not properly give the proxy item. Fix
 *    made by Arisu.
 *
 * Version 1.50: November 16, 2023
 * * Bug Fixes!
 * ** <JS Buy Price> and <JS Sell Price> was not working properly. Fix made
 *    by Irina.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * * New Features!
 * ** New Notetags added by Arisu:
 * *** <Cursed>
 * **** If this weapon or armor is equipped, it cannot manually be removed by
 *      the player until it is purified.
 * **** To remove it, it must be done by event commands, script calls, or
 *     through the Purify-related Plugin Commands provided by this plugin.
 * **** Once purified, the weapon or armor will become unequipped unless it has
 *     a purify transformation.
 * **** If the newly transformed weapon/armor is equippable, it will remain in
 *     the actor's equipment slots.
 * **** If you are using VisuMZ_2_WeaponSwapSystem, weapons cannot become
 *      cursed in order to allow free weapon swapping. Weaponry will not be
 *      cursed if VisuMZ_2_WeaponSwapSystem is installed.
 * *** <Purify Transform: id>
 * *** <Purify Transform: name>
 * **** If this notetag is present on a <Cursed> weapon or armor, then upon the
 *      actor receiving purification, the weapon or armor will transform into a
 *      different item.
 * ** New Plugin Commands added by Arisu:
 * *** Purify: Target Actor(s)
 * **** Purifies target actor(s) of any cursed weapons or armors.
 * *** Purify: Whole Party
 * **** Purifies whole party of any cursed weapons or armors.
 * ** Added "Cursed Equip Popup" to Equip Scene Plugin Parameters.
 * *** Text popup appears when an actor equips a cursed weapon/armor.
 * ** Added "Ally or Enemy" or "Enemy or Ally" scopes to Shop Status Window
 *    Plugin Parameters.
 * *** If unused, will default to "1 Ally" or "1 Enemy" like usual.
 *     Added by Irina.
 *
 * Version 1.49: October 12, 2023
 * * Bug Fixes!
 * ** Fixed a problem where for weapon types, all weapon types are listed in
 *    the equip menu even when the actor cannot equip them (though they would
 *    be disabled). Fix made by Olivia.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New notetags added by Olivia and sponsored by AndyL:
 * *** <Added EType: x>
 * *** <Added ETypes: x, x, x>
 * **** This is for armors only and does NOT work with weapons!
 * **** Allows a piece of armor to belong to multiple ETypes. This means a
 *      glove can be equipped as "Armgear" or as an "Accessory" if you so
 *      choose.
 *
 * Version 1.48: September 14, 2023
 * * Bug Fixes!
 * ** Fixed a problem where the help window position of the non-updated layout
 *    would appear in the wrong position. Fix made by Irina.
 * * Optimization Update!
 * ** Plugin should run more optimized when weapons and armors exceed 2000
 *    in database quantity.
 *
 * Version 1.47: July 13, 2023
 * * Bug Fixes!
 * ** Fixed a bug that would cause the shop status window to display incorrect
 *    removed buffs and debuffs. Fix made by Olivia.
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * Feature Updates!
 * ** Changes made to dynamic shop listings in order to update upon listing
 *    changes rather than having to enter and exit the shop again. Update made
 *    by Arisu.
 * * New Features!
 * ** New notetag effects added by Arisu and sponsored by AndyL:
 * *** <Conserve: x%>
 * **** Gives the item a percent chance when used to not consume the item.
 * *** <Buy Turn On Switches: x, x, x>
 * *** <Buy Turn Off Switches: x, x, x>
 * *** <Sell Turn On Switches: x, x, x>
 * *** <Sell Turn Off Switches: x, x, x>
 * **** When buying/selling an item, weapon, or armor with these notetags,
 *      turn on/off switch(es) 'x'.
 * *** New Plugin Parameters added by Arisu:
 * **** Params > Settings > Shop Status Window > Equipment Data > Delay MS:
 * ***** How many milliseconds (MS) to delay the preview update?
 * ***** This is to prevent lag spikes for equips only.
 *
 * Version 1.46: June 15, 2023
 * * Bug Fixes!
 * ** Fixed a problem where the help and input modes are not adequately
 *    adjusted when not used with the updated layout or without the Options
 *    Core custom UI placement. Fix made by Arisu.
 *
 * Version 1.45: May 18, 2023
 * * Bug Fixes!
 * ** Fixed a bug that would cause equip slots to not be recognized properly if
 *    the equip slot name ends in a space.
 *
 * Version 1.44: April 13, 2023
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New notetag effects added by Arisu and sponsored by Anon:
 * *** <Equip For Class Only: x>
 * *** <Equip For Classes Only: x, x, x>
 * *** <Equip For Class Only: name>
 * *** <Equip For Classes Only: name, name, name>
 * **** The piece of equipment can only be worn by the listed classes.
 * *** <Equip Requirements> notetag added.
 * **** Define multiple requirements that the actor needs to meet in order for
 *      this equip item to be equippable.
 * **** See help file for more information on the types of requirements that
 *      can be added.
 *
 * Version 1.43: March 16, 2023
 * * Bug Fixes!
 * ** Artifact armors should now update and refresh the party members' cache
 *    upon acquisition. Fix made by Olivia.
 *
 * Version 1.42: February 16, 2023
 * * Bug Fixes!
 * ** Proxy items should no longer cause infinite loops if they're made to
 *    reference other proxy items in a circular fashion. Instead, they just
 *    give the exact first found proxy instead of cycling through others.
 *    Fix made by Arisu.
 *
 * Version 1.41: December 15, 2022
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameters added by Arisu and sponsored by Anon:
 * *** Equip Scene > Equip Command > Help Description
 * *** Equip Scene > Optimize Command > Help Description
 * *** Equip Scene > Clear Command > Help Description
 * **** Help description used when these commands are selected.
 *
 * Version 1.40: October 20, 2022
 * * Feature Update!
 * ** For the shop status window, when comparing equipment of a type where
 *    there are multiple equipment slots (such as accessories), the plugin will
 *    now check for an empty equipment slot first and then make calculations
 *    there. Otherwise, it will use the first available equipment slot of that
 *    type regardless of the equipped item. Update made by Arisu.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 *
 * Version 1.39: September 29, 2022:
 * * Feature Update!
 * ** Changed the default code for the equip scene's status window display to
 *    prevent the face graphic and basic actor stats from going above the
 *    window boundaries if there are too many parameters displayed in the
 *    status window at a time.
 * ** If you already have this plugin installed the changes will not be
 *    reflected unless you do the following:
 * **** BACKUP your game project.
 * **** REMOVE this plugin from the Plugin Manager list.
 * **** REINSTALL this plugin into the Plugin Manager list.
 * **** SAVE the game project.
 *
 * Version 1.38: March 3, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New mechanics and notetags added by Olivia and sponsored by Anon:
 * *** <Party Artifact>
 * *** <Troop Artifact>
 * *** <Stackable Party Artifact>
 * *** <Stackable Troop Artifact>
 * **** Armors only! This armor cannot be equipped at all. However, by simply
 *      being in the party's inventory, its parameter bonuses and traits will
 *      be applied globally throughout the whole party or troop (depending on
 *      the notetag). Add both notetags to affect both groups.
 * **** The normal versions of the notetag is only applied once regardless of
 *      the number of copies are found in the party's inventory.
 * **** The stackable versions of the notetag will have the bonuses and traits
 *      stacked multiple times relative to the number of copies found in the
 *      party's inventory.
 * **** This item will NOT be added during the setup phase for Battle Tests.
 * ***** If you want to add the item, do it manually.
 *
 * Version 1.37: December 23, 2021
 * * Compatibility Update
 * ** Created foundation for proxy items to be used in any applicable system
 *    and extension plugins. Update made by Arisu.
 *
 * Version 1.36: December 2, 2021
 * * Feature Update!
 * ** For those using custom parameters from the Core Engine and do not have
 *    the parameters all-capitalized, the plugin will automatically do it for
 *    you to prevent errors. Update made by Olivia.
 *
 * Version 1.35: November 18, 2021
 * * Compatibility Update!
 * ** If this plugin's updated scene is disabled, the Help Window locations for
 *    the Item, Equip, and Shop Scenes should now be at their designated
 *    locations as calculated by the VisuMZ Core Engine instead of the RMMZ
 *    default location. Update made by Irina.
 *
 * Version 1.34: October 28, 2021
 * * Feature Update
 * ** Added fail safe checks for projects that are using old data for starting
 *    equipment that no longer exist, thus preventing the game from opening.
 *    Update made by Arisu.
 *
 * Version 1.33: August 6, 2021
 * * Documentation Update!
 * ** Removed "Weapon" and "Armor" from "Used For" for <Status Info>. This was
 *    an unintended piece of documentation.
 *
 * Version 1.32: July 23, 2021
 * * Bug Fixes!
 * ** Fixed a bug that would cause armor duplication when changing to classes
 *    with unaligned equipment slot types. Fix made by Arisu.
 *
 * Version 1.31: July 9, 2021
 * * Feature Update!
 * ** Added a failsafe for price manipulation JavaScript to never have prices
 *    drop below 0 if possible. Update made by Arisu.
 *
 * Version 1.30: July 2, 2021
 * * Documentation Update!
 * ** Added an extra note to the help file for the following:
 *    Plugin Parameters > Item Menu Settings > List Window > Columns
 * *** If you are using the VisuStella MZ Core Engine and the "Modern Controls"
 *     Plugin Parameter, please read through that section in case you have any
 *     questions about how to switch between categories when using multiple
 *     columns of items at a time.
 *
 *
 * Version 1.29: June 25, 2021
 * * Compatibility Update
 * ** Compatibility update with RPG Maker MZ 1.3.0+.
 * * Feature Update!
 * ** Phantom data when changing equipment types in the database should no
 *    longer affect actors with cached equip ID's. Update made by Arisu.
 *
 * Version 1.28: June 4, 2021
 * * Optimization Update!
 * ** Plugin should run more optimized.
 *
 * Version 1.27: May 21, 2021
 * * Bug Fixes!
 * ** Using the mouse right click in the Equip Scene while inside of the item
 *    to slot window will no longer exit the Equip Scene. Fix made by Yanfly.
 *
 * Version 1.26: April 30, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** "VisuStella MZ Compatibility" added VisuMZ_1_BattleCore section regarding
 *    Damage Multiplier and Healing Multiplier vocabulary settings to reduce
 *    commonly asked questions.
 * * New Features!
 * ** New notetags added by Irina and sponsored by Archeia:
 * *** <Shop Picture Name: filename>
 * *** <Shop Picture Layer: x>
 * *** <Shop Picture Max Width: x>
 * *** <Shop Picture Max Height: y>
 * *** <Shop Picture Max Dimensions: x, y>
 * *** <Shop Picture Alignment: x>
 * *** <Shop Picture Position: y>
 * *** <Shop Picture Offset X: +x>
 * *** <Shop Picture Offset X: -x>
 * *** <Shop Picture Offset Y: +y>
 * *** <Shop Picture Offset Y: -y>
 * *** <Shop Picture Offset: +x, +y>
 * *** <Shop Picture Offset: -x, -y>
 * *** <Shop Picture Opacity: x>
 * *** <Shop Picture Opacity: x%>
 * **** Add images from the game project's img/pictures/ folder to display in
 *      the Shop Status Window.
 *
 * Version 1.25: April 23, 2021
 * * Documentation Update!
 * ** Added clarity to the <param: +x> and <param: -x> notetags:
 * *** These notetags do NOT work with X Parameters, S Parameters, or any
 *     custom parameters. These notetags ONLY work with the base parameters.
 *
 * Version 1.24: April 16, 2021
 * * Bug Fixes!
 * ** Changing an actor's equipment slots to past their original amount will no
 *    longer yield errors with duplicate slot types. Fix made by Arisu.
 * ** Completely selling an item should now refresh the help window to the new
 *    selected item's help description. Fix made by Arisu.
 * * Optimization Update!
 * ** Non-removable equipment restrictions for the equipment scene are now
 *    better optimized. Update made by Olivia.
 *
 * Version 1.23: April 2, 2021
 * * Optimization Update!
 * ** Plugin should run more optimized.
 *
 * Version 1.22: March 26, 2021
 * * Documentation Update!
 * ** Added "VisuStella MZ Compatibility" section for detailed compatibility
 *    explanations with the VisuMZ_4_BreakShields plugin.
 *
 * Version 1.21: March 5, 2021
 * * Feature Update!
 * ** Custom equipment slots are disabled during Battle Testing for better
 *    accuracy and results.
 *
 * Version 1.20: February 26, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameters added by Irina and sponsored by AndyL:
 * *** Plugin Parameters > Shop Menu Settings > Switches > Switch: Buy
 * *** Plugin Parameters > Shop Menu Settings > Switches > Switch: Sell
 * **** Buying/selling items in the Shop Scene turns this Switch to ON.
 * **** Switch reverts to OFF whenever the Shop Scene opens.
 * **** These switches can be used after a "Shop Processing" event command to
 *      determine if the player has bought an item, bought and sold an item,
 *      sold an item, or neither.
 *
 * Version 1.19: January 29, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New notetags added by Irina.
 * *** <Equip Copy Limit: x>
 * **** Sets a maximum number of copies that the actor can wear of this
 *      equipment. Usage Example: Actors can only equip one copy of the
 *      "One-of-a-Kind Ring" on at any time despite having empty accessory
 *      slots because the ring has a <Equip Copy Limit: 1> notetag.
 * *** <Equip Weapon Type Limit: x>
 * **** This weapon cannot be equipped with other weapons of the same type once
 *      the limited amount has been reached. Usage Example: A dualwielding
 *      warrior who can only equip one sword and a dagger but never two swords
 *      or two daggers because the swords and daggers all have the
 *      <Equip Weapon Type Limit: 1> notetags on them.
 * *** <Equip Armor Type Limit: x>
 * **** This armor cannot be equipped with other armors of the same type once
 *      the limited amount has been reached. Usage Example: People cannot equip
 *      more than two glove accessories on at a time because the glove is a
 *      "Glove" armor-type and each glove item has the
 *      <Equip Armor Type Limit: 2> notetags on them.
 *
 * Version 1.18: January 15, 2021
 * * Bug Fixes!
 * ** Pressing "Shift" to remove equipment will now refresh the status window
 *    unlike before. Fix made by Olivia.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Feature!
 * ** New Plugin Parameters added
 * *** Plugin Parameters > Item Menu Settings > Background Type
 *
 * Version 1.17: January 1, 2021
 * * Bug Fixes!
 * ** Equipping should be working properly again. Fix made by Yanfly.
 *
 * Version 1.16: December 25, 2020
 * * Bug Fixes!
 * ** Equip-Adjust HP/MP should work properly now. Fix made by Yanfly.
 * * Documentation Update!
 * ** Added more clarity for <JS Item Enable> to state that if the VisuStella
 *    Battle Core is installed, then all battle scope items are visible, but
 *    not necessarily enabled if they are disabled otherwise.
 *
 * Version 1.15: December 18, 2020
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: Unusable items on an individual-actor basis will no
 *    longer be overwritten by party-based usability for battle. Fix by Yanfly.
 * * Documentation Update!
 * ** Added more clarity for <JS Item Enable> to state that it removes the
 *    usable item from visibility as well if the actor unable to use it is the
 *    only person in the party.
 *
 * Version 1.14: December 11, 2020
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 *
 * Version 1.13: December 4, 2020
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * New Features!
 * ** New Plugin Commands added by Arisu!
 * *** Actor: Change Equip Slots
 * *** Actor: Reset Equip Slots
 * **** These plugin commands allow you to forcefully change the equip slots
 *      available to an actor regardless of the slots provided by its class as
 *      well as reset them.
 *
 * Version 1.12: November 15, 2020
 * * Optimization Update!
 * ** Plugin should run more optimized.
 *
 * Version 1.11: November 8, 2020
 * * Bug Fix!
 * ** Font size ratio for the shop status window now scales to a hard coded
 *    value to prevent smaller font sizes from expanding icon sizes. Fix made
 *    by Arisu.
 * * Feature Update!
 * ** Currency display in the shop menu is now reflected upon how the plugin
 *    parameters set them to display. Update made by Arisu.
 *
 * Version 1.10: November 1, 2020
 * * Feature Update!
 * ** Modern Controls compatibility with Core Engine no longer enables the
 *    Item Categories window and child classes to utilize the Home/End keys.
 *
 * Version 1.09: October 25, 2020
 * * Bug Fixes!
 * ** "All Items" category should now display the "Items" text. Fix by Irina.
 * ** WType, AType, and EType categories now work with text. Fix by Irina.
 *
 * Version 1.08: October 18, 2020
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 *
 * Version 1.07: October 11, 2020
 * * Bug Fixes!
 * ** XParams and SParams in the Window_EquipStatus window will no longer show
 *    a non-percentile difference if the original value is not a whole value.
 *    Fix made by Yanfly.
 *
 * Version 1.06: October 4, 2020
 * * Bug Fixes!
 * ** Select Item event command now displays the default amount of columns
 *    instead of whatever setting is made with the plugin parameters.
 *
 * Version 1.05: September 27, 2020
 * * Bug Fixes!
 * ** When using the updated shop layout, leaving the sell option will no
 *    longer cause the dummy window to appear.
 * * Documentation Update
 * ** "Use Updated Layout" plugin parameters now have the added clause:
 *    "This will override the Core Engine windows settings." to reduce
 *    confusion. Added by Irina.
 *
 * Version 1.04: September 13, 2020
 * * Bug Fixes!
 * ** Pressing Shift to quickly remove equipment should no longer crash the
 *    game. This will also clear the help window text. Fix made by Arisu.
 *
 * Version 1.03: September 6, 2020
 * * Bug Fixes!
 * ** If both Optimize and Clear commands have been removed and using modern
 *    controls, pressing up at the top of the slot window list will not go to
 *    the window. Fix made by Yanfly.
 * ** If both Optimize and Clear commands have been removed, the window will no
 *    longer appear and the slot window will be moved upward to fill any empty
 *    spaces. Fix made by Yanfly.
 * * New Features!
 * ** New Plugin Parameter added in NEW! Label to let you adjust the font face.
 * ** New Plugin Parameters added in Equip Menu Scene Settings for disabling
 *    the back rectangles and/or changing their colors.
 * ** New Plugin Parameters added in Shop Status Window Settings for disabling
 *    the back rectangles and/or changing their colors.
 *
 * Version 1.02: August 30, 2020
 * * Documentation Fix!
 * ** Added: NOTE: Regarding Damage Labels
 * *** If Visu_1_BattleCore is installed, priority goes to its Damage Style
 *   settings. The label displayed is based on the damage style settings in
 *   place for that specific skill or item.
 * *** Go to Battle Core > Plugin Parameters > Damage Settings > Style List >
 *   pick the damage style you want to edit > Damage Label and change the
 *   text settings you'd like there.
 * *** Documentation update added by Yanfly.
 *
 * Version 1.01: August 23, 2020
 * * Added failsafe to prevent non-existent equipment (because the database
 *   entries have been deleted) from being equipped as initial equipment.
 *   Fix made by Olivia.
 *
 * Version 1.00: August 20, 2020
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Begin
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActorChangeEquipSlots
 * @text Actor: Change Equip Slots
 * @desc Forcefully change the actor(s) equip slots.
 * These will persist through class changes.
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 *
 * @arg Slots:arraystr
 * @text Equip Slots
 * @type string[]
 * @desc Insert the equip slots you want the actor(s) to have.
 * These entries are case-sensitive.
 * @default ["Weapon","Shield","Head","Body","Accessory"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActorResetEquipSlots
 * @text Actor: Reset Equip Slots
 * @desc Reset any forced equip slots for the actor(s).
 * Equip slots will then be based on class.
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Purify
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PurifyActors
 * @text Purify: Target Actor(s)
 * @desc Purifies target actor(s) of any cursed weapons or armors.
 * Cannot be used in battle.
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PurifyParty
 * @text Purify: Whole Party
 * @desc Purifies whole party of any cursed weapons or armors.
 * Cannot be used in battle.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Shop
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command BatchShop
 * @text Shop: Advanced
 * @desc Make it easier to put together inventories for a shop.
 * WARNING: Does not allow for event-specific prices.
 *
 * @arg Step1
 * @text Step 1: Item ID's
 *
 * @arg Step1Start:num
 * @text Range Start
 * @parent Step1
 * @type item
 * @desc Select which Item ID to start from.
 * @default 1
 *
 * @arg Step1End:num
 * @text Range End
 * @parent Step1
 * @type item
 * @desc Select which Item ID to end at.
 * @default 4
 *
 * @arg Step2
 * @text Step 2: Weapon ID's
 *
 * @arg Step2Start:num
 * @text Range Start
 * @parent Step2
 * @type weapon
 * @desc Select which Weapon ID to start from.
 * @default 1
 *
 * @arg Step2End:num
 * @text Range End
 * @parent Step2
 * @type weapon
 * @desc Select which Weapon ID to end at.
 * @default 4
 *
 * @arg Step3
 * @text Step 3: Armor ID's
 *
 * @arg Step3Start:num
 * @text Range Start
 * @parent Step3
 * @type armor
 * @desc Select which Armor ID to start from.
 * @default 1
 *
 * @arg Step3End:num
 * @text Range End
 * @parent Step3
 * @type armor
 * @desc Select which Armor ID to end at.
 * @default 4
 *
 * @arg PurchaseOnly:eval
 * @text Step 4: Purchase Only?
 * @type boolean
 * @on Purchase-Only
 * @off Sell Accessible
 * @desc Make the shop purchase-only?
 * @default false
 *
 * @arg Optional
 *
 * @arg Blacklist:arraystr
 * @text Blacklisted Categories
 * @parent Optional
 * @type string[]
 * @desc A list of categories to blacklist from the shop.
 * Not used if empty. Mark categories with <Category: x>
 * @default []
 *
 * @arg Whitelist:arraystr
 * @text Whitelisted Categories
 * @parent Optional
 * @type string[]
 * @desc A list of categories to whitelist for the shop.
 * Not used if empty. Mark categories with <Category: x>
 * @default []
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_End
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @ ==========================================================================
 * @ Plugin Parameters
 * @ ==========================================================================
 *
 * @param BreakHead
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param ItemsEquipsCore
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param ItemScene:struct
 * @text Item Menu Settings
 * @type struct<ItemScene>
 * @desc Change the Item Menu Scene settings.
 * @default {"General":"","EnableLayout:eval":"true","LayoutStyle:str":"upper/left","ListWindow":"","ListWindowCols:num":"1","ItemQt":"","MaxItems:num":"99","MaxWeapons:num":"99","MaxArmors:num":"99","ItemQuantityFmt:str":"×%1","ItemQuantityFontSize:num":"22","ShopStatusWindow":"","ShowShopStatus:eval":"true","ItemSceneAdjustItemList:eval":"true","ItemMenuStatusRect:func":"\"const width = this.statusWidth();\\nconst height = this._itemWindow.height;\\nconst x = Graphics.boxWidth - width;\\nconst y = this._itemWindow.y;\\nreturn new Rectangle(x, y, width, height);\"","ButtonAssist":"","buttonAssistCategory:str":"Switch Category"}
 *
 * @param Categories:struct
 * @text Item Categories
 * @parent ItemScene:struct
 * @type struct<Categories>
 * @desc Change the categories displayed in the Item/Shop menus.
 * @default {"MainList":"","List:arraystruct":"[\"{\\\"Type:str\\\":\\\"FieldUsable\\\",\\\"Icon:num\\\":\\\"208\\\"}\",\"{\\\"Type:str\\\":\\\"BattleUsable\\\",\\\"Icon:num\\\":\\\"218\\\"}\",\"{\\\"Type:str\\\":\\\"NeverUsable\\\",\\\"Icon:num\\\":\\\"302\\\"}\",\"{\\\"Type:str\\\":\\\"AllWeapons\\\",\\\"Icon:num\\\":\\\"97\\\"}\",\"{\\\"Type:str\\\":\\\"EType:2\\\",\\\"Icon:num\\\":\\\"128\\\"}\",\"{\\\"Type:str\\\":\\\"EType:3\\\",\\\"Icon:num\\\":\\\"131\\\"}\",\"{\\\"Type:str\\\":\\\"EType:4\\\",\\\"Icon:num\\\":\\\"137\\\"}\",\"{\\\"Type:str\\\":\\\"EType:5\\\",\\\"Icon:num\\\":\\\"145\\\"}\",\"{\\\"Type:str\\\":\\\"KeyItems\\\",\\\"Icon:num\\\":\\\"195\\\"}\"]","Style:str":"icon","TextAlign:str":"center","Vocabulary":"","HiddenItemA:str":"Special Items","HiddenItemB:str":"Unique Items","Consumable:str":"Consumable","Nonconsumable:str":"Nonconsumable","AlwaysUsable:str":"Usable","BattleUsable:str":"Battle","FieldUsable:str":"Field","NeverUsable:str":"Materials"}
 *
 * @param New:struct
 * @text NEW! Labels
 * @parent ItemScene:struct
 * @type struct<NewLabel>
 * @desc Change how NEW! Labels apply to your game project.
 * @default {"Enable:eval":"true","Icon:num":"0","Text:str":"NEW!","FontColor:str":"17","FontFace:str":"Verdana","FontSize:str":"16","FadeLimit:num":"360","FadeSpeed:num":"4","OffsetX:num":"0","OffsetY:num":"4"}
 *
 * @param EquipScene:struct
 * @text Equip Menu Settings
 * @type struct<EquipScene>
 * @desc Adjust the settings regarding the Equip Menu Scene.
 * @default {"General":"","EnableLayout:eval":"true","ParamValueFontSize:num":"22","MenuPortraits:eval":"true","DrawPortraitJS:func":"\"// Declare Variables\\nconst lineHeight = this.lineHeight();\\nconst padding = this.itemPadding();\\nconst x1 = padding;\\nconst x2 = this.innerWidth - 128 - padding;\\n\\n// Draw Menu Image\\nthis.drawItemActorMenuImage(this._actor, 0, 0, this.innerWidth, this.innerHeight);\\n\\n// Draw Data\\nthis.drawActorName(this._actor, x1, lineHeight * 0);\\nthis.drawActorClass(this._actor, x1, lineHeight * 1);\\nthis.drawActorIcons(this._actor, x1, lineHeight * 2);\\nthis.drawActorLevel(this._actor, x2, lineHeight * 0);\\nthis.placeBasicGauges(this._actor, x2, lineHeight * 1);\"","DrawFaceJS:func":"\"// Declare Variables\\nconst lineHeight = this.lineHeight();\\nconst gaugeLineHeight = this.gaugeLineHeight();\\nconst x = Math.floor(this.innerWidth / 2);\\nconst limitHeight = this.innerHeight - (this.actorParams().length * lineHeight);\\nconst actorX = Math.floor((x - ImageManager.faceWidth) / 2);\\nconst actorY = Math.max(0, Math.floor((limitHeight - ImageManager.faceHeight) / 2));\\nlet dataHeight = lineHeight * 3;\\ndataHeight += gaugeLineHeight * ($dataSystem.optDisplayTp ? 3 : 2);\\nconst dataY = Math.max(0, Math.floor((limitHeight - dataHeight) / 2));\\n\\n// Draw Data\\nthis.drawActorFace(this._actor, actorX, actorY, ImageManager.faceWidth, ImageManager.faceHeight);\\nthis.drawActorIcons(this._actor, actorX + 16, actorY + ImageManager.faceHeight - lineHeight);\\nthis.drawActorName(this._actor, x, dataY + lineHeight * 0);\\nthis.drawActorLevel(this._actor, x, dataY + lineHeight * 1);\\nthis.drawActorClass(this._actor, x, dataY + lineHeight * 2);\\nthis.placeBasicGauges(this._actor, x, dataY + lineHeight * 3);\"","DrawParamJS:func":"\"// Declare variables\\nconst params = this.actorParams();\\nconst lineHeight = this.lineHeight();\\nconst padding = this.itemPadding();\\nconst baseX = 0;\\nconst baseY = this.innerHeight - params.length * lineHeight;\\nconst baseWidth = this.innerWidth;\\nconst valueFontSize = this.paramValueFontSize();\\n\\n// Calculate Widths\\nlet paramNameWidth = Math.max(...params.map(param => this.textWidth(TextManager.param(param))));\\nparamNameWidth += padding * 2;\\nif (this.isUseParamNamesWithIcons()) {\\n    paramNameWidth += ImageManager.iconWidth + 4;\\n}\\nlet arrowWidth = this.rightArrowWidth();\\nconst totalDivides = this.innerWidth >= 500 ? 3 : 2;\\nlet paramValueWidth = Math.floor((baseWidth - paramNameWidth - arrowWidth) / totalDivides);\\nparamNameWidth = baseWidth - (paramValueWidth * totalDivides) - arrowWidth;\\n\\n// Draw Parameters\\nlet x = baseX;\\nlet y = baseY;\\nlet value = 0;\\nlet diffValue = 0;\\nlet alter = 2;\\nfor (const paramId of params) {\\n    // Draw Param Name\\n    this.drawItemDarkRect(x, y, paramNameWidth, lineHeight, alter);\\n    this.drawUpdatedParamName(paramId, x, y, paramNameWidth);\\n    this.resetFontSettings();\\n    x += paramNameWidth;\\n\\n    // Draw Param Before\\n    this.contents.fontSize = valueFontSize;\\n    this.drawItemDarkRect(x, y, paramValueWidth, lineHeight, alter);\\n    this.drawUpdatedBeforeParamValue(paramId, x, y, paramValueWidth);\\n    this.resetFontSettings();\\n    x += paramValueWidth;\\n\\n    // Draw Arrow\\n    this.drawItemDarkRect(x, y, arrowWidth, lineHeight, alter);\\n    this.drawRightArrow(x, y);\\n    x += arrowWidth;\\n\\n    // Draw Param After\\n    this.contents.fontSize = valueFontSize;\\n    this.drawItemDarkRect(x, y, paramValueWidth, lineHeight, alter);\\n    this.drawUpdatedAfterParamValue(paramId, x, y, paramValueWidth);\\n    x += paramValueWidth;\\n\\n    // Draw Param Change\\n    if (totalDivides > 2) {\\n        this.drawItemDarkRect(x, y, paramValueWidth, lineHeight, alter);\\n        this.drawUpdatedParamValueDiff(paramId, x, y, paramValueWidth);\\n    }\\n\\n    // Prepare Next Parameter\\n    x = baseX;\\n    y += lineHeight;\\n    alter = alter === 2 ? 1 : 2;\\n}\"","LayoutStyle:str":"upper/right","StatusWindowWidth:num":"312","DrawBackRect:eval":"true","BackRectColor:str":"19","CursedTextPopup:json":"\"%1 is cursed by %3%2!\"","Command":"","CmdStyle:str":"auto","CmdTextAlign:str":"center","CmdIconEquip:num":"136","equipCmdDesc:json":"\"Pick and choose equipment to change.\"","CommandAddOptimize:eval":"true","optimizeCmdDesc:json":"\"Equip the strongest available equipment.\"","CmdIconOptimize:num":"137","CommandAddClear:eval":"true","clearCmdDesc:json":"\"Remove all available equipment.\"","CmdIconClear:num":"135","RemoveEquip":"","RemoveEquipIcon:num":"16","RemoveEquipText:str":"Remove","ShiftShortcutKey:eval":"true","Rulings":"","EquipAdjustHpMp:eval":"true","NonRemoveETypes:arraynum":"[]","NonOptimizeETypes:arraynum":"[]","ButtonAssist":"","buttonAssistRemove:str":"Unequip"}
 *
 * @param ShopScene:struct
 * @text Shop Menu Settings
 * @type struct<ShopScene>
 * @desc Change the Shop Menu Scene settings.
 * @default {"General":"","EnableLayout:eval":"true","LayoutStyle:str":"upper/left","Command":"","CmdHideDisabled:eval":"true","CmdStyle:str":"auto","CmdTextAlign:str":"center","CmdIconBuy:num":"208","CmdIconSell:num":"314","CmdIconCancel:num":"82","CmdCancelRename:str":"Exit","Prices":"","SellPriceRate:num":"0.50","BuyPriceJS:func":"\"// Declare variables\\nlet item = arguments[0];\\nlet price = arguments[1];\\n\\n// Return the finalized price\\nreturn price;\"","SellPriceJS:func":"\"// Declare variables\\nlet item = arguments[0];\\nlet price = arguments[1];\\n\\n// Return the finalized price\\nreturn price;\"","ButtonAssist":"","buttonAssistSmallIncrement:str":"-1/+1","buttonAssistLargeIncrement:str":"-10/+10"}
 *
 * @param StatusWindow:struct
 * @text Shop Status Window
 * @parent ShopScene:struct
 * @type struct<StatusWindow>
 * @desc Change the Item Status Window settings.
 * @default {"General":"","Width:num":"352","ParamChangeFontSize:num":"22","Translucent:num":"64","DrawBackRect:eval":"true","BackRectColor:str":"19","EquipData":"","EquipDataStyle:str":"compare","EquipDataCompare":"","AlreadyEquipMarker:str":"E","CannotEquipMarker:str":"-","NoChangeMarker:str":"-","DrawEquipData:func":"\"// Set Variables\\nconst lineHeight = this.lineHeight();\\nconst paramheight = this.gaugeLineHeight() + 8;\\nlet x = 0;\\nlet y = 0;\\nlet width = this.innerWidth;\\nlet height = this.innerHeight;\\nlet hw = Math.floor(width / 2);\\nlet hx = x + width - hw;\\n\\n// Draw Item Name, Type, and Quantity\\nthis.drawItemName(this._item, x + this.itemPadding(), y, width - this.itemPadding() * 2);\\nthis.drawItemDarkRect(x, y, width);\\ny += lineHeight;\\nif (this.drawItemEquipType(x, y, hw)) y += 0;\\nif (this.drawItemQuantity(hx, y, hw)) y += lineHeight;\\n\\n// Draw Parameter Names\\nconst params = this.actorParams();\\nconst backY = y;\\ny = height - (params.length * paramheight) - 4;\\nlet paramX = x;\\nlet paramWidth = 0;\\nlet tableY = y;\\nfor (const paramId of params) {\\n    paramWidth = Math.max(this.drawParamName(paramId, x + 4, y + 4, width), paramWidth);\\n    y += paramheight;\\n}\\n\\n// Draw Actor Data\\nconst actorMax = $gameParty.maxBattleMembers();\\nconst actorWidth = Math.floor((width - paramWidth) / actorMax);\\nparamWidth = width - (actorWidth * actorMax);\\nfor (const actor of $gameParty.battleMembers()) {\\n    const index = $gameParty.battleMembers().indexOf(actor);\\n    const actorX = paramX + paramWidth + (index * actorWidth);\\n    this.changePaintOpacity(actor.canEquip(this._item));\\n    this.drawActorCharacter(actor, actorX + (actorWidth / 2), tableY);\\n    let actorY = tableY;\\n\\n    // Draw Parameter Changes\\n    for (const paramId of params) {\\n        const diffY = actorY - ((lineHeight - paramheight) / 2);\\n        this.drawActorParamDifference(actor, paramId, actorX, diffY, actorWidth);\\n        actorY += paramheight;\\n    }\\n}\\n\\n// Draw Back Rectangles\\nthis.drawItemDarkRect(paramX, backY, paramWidth, tableY - backY);\\nfor (let i = 0; i < actorMax; i++) {\\n    const actorX = paramX + paramWidth + (i * actorWidth);\\n    this.drawItemDarkRect(actorX, backY, actorWidth, tableY - backY);\\n}\\nfor (const paramId of params) {\\n    this.drawItemDarkRect(paramX, tableY, paramWidth, paramheight);\\n    for (let i = 0; i < actorMax; i++) {\\n        const actorX = paramX + paramWidth + (i * actorWidth);\\n        this.drawItemDarkRect(actorX, tableY, actorWidth, paramheight);\\n    }\\n    tableY += paramheight;\\n}\"","EquipDataClassic":"","ClassicWeaponParameters:arraystr":"[\"HIT\"]","ClassicArmorParameters:arraystr":"[\"EVA\"]","DrawEquipClassicData:func":"\"// Set Variables\\nconst lineHeight = this.lineHeight();\\nlet x = 0;\\nlet y = 0;\\nlet width = this.innerWidth;\\nlet height = this.innerHeight;\\nlet hw = Math.floor(width / 2);\\nlet hx = x + width - hw;\\n\\n// Draw Item Name, Type, and Quantity\\nthis.drawItemName(this._item, x + this.itemPadding(), y, width - this.itemPadding() * 2);\\nthis.drawItemDarkRect(x, y, width);\\ny += lineHeight;\\nif (this.drawItemEquipType(x, y, hw)) y += 0;\\nif (this.drawItemQuantity(hx, y, hw)) y += lineHeight;\\n\\n// Draw Item Weapon Type or Armor Type\\nif (this.drawItemEquipSubType(x, y, width)) y += lineHeight;\\n\\n// Draw Parameter Values\\nconst params = this.actorParams();\\nfor (const paramId of params) {\\n    if (this.isCustomParameter(paramId)) continue;\\n    this.drawActorParamClassic(paramId, x, y, width);\\n    y += lineHeight;\\n}\\n\\n// Draw Custom Entries\\ny = this.drawItemCustomEntries(x, y, width);\\n\\n// Fill Rest of the Window\\nthis.drawItemDarkRect(x, y, width, height - y);\"","EquipDataDouble":"","DoubleWeaponParameters:arraystr":"[\"HIT\",\"CNT\"]","DoubleArmorParameters:arraystr":"[\"EVA\",\"GRD\"]","DrawEquipDoubleData:func":"\"// Set Variables\\nconst lineHeight = this.lineHeight();\\nlet x = 0;\\nlet y = 0;\\nlet width = this.innerWidth;\\nlet height = this.innerHeight;\\nlet hw = Math.floor(width / 2);\\nlet hx = x + width - hw;\\n\\n// Draw Item Name, Type, and Quantity\\nthis.drawItemName(this._item, x + this.itemPadding(), y, width - this.itemPadding() * 2);\\nthis.drawItemDarkRect(x, y, width);\\ny += lineHeight;\\nif (this.drawItemEquipType(x, y, hw)) y += 0;\\nif (this.drawItemQuantity(hx, y, hw)) y += lineHeight;\\n\\n// Draw Item Weapon Type or Armor Type\\nif (this.drawItemEquipSubType(x, y, width)) y += lineHeight;\\n\\n// Draw Parameter Values\\nconst params = this.actorParams();\\nfor (const paramId of params) {\\n    if (this.isCustomParameter(paramId)) continue;\\n    this.drawActorParamClassic(paramId, x, y, hw);\\n    if (x === hw) {\\n        y += lineHeight;\\n        x = 0;\\n    } else {\\n        x = hw;\\n    }\\n}\\n// Realign\\nif (x === hw) {\\n    this.drawItemDarkRect(hw, y, hw, lineHeight);\\n    y += lineHeight;\\n    x = 0;\\n}\\n\\n// Draw Custom Entries\\ny = this.drawItemCustomEntries(x, y, width);\\n\\n// Fill Rest of the Window\\nthis.drawItemDarkRect(x, y, width, height - y);\"","EquipDelayMS:num":"240","ItemData":"","ItemGeneral":"","MaxIcons:num":"8","MultiplierStandard:num":"1000000","DrawItemData:func":"\"const lineHeight = this.lineHeight();\\nlet x = 0;\\nlet y = 0;\\nlet width = this.innerWidth;\\nlet height = this.innerHeight;\\nlet hw = Math.floor(width / 2);\\nlet hx = x + width - hw;\\n\\n// Draw Item Name and Quantity\\nthis.drawItemName(this._item, x + this.itemPadding(), y, width - this.itemPadding() * 2);\\nthis.drawItemDarkRect(x, y, width);\\ny += lineHeight;\\n\\n// Draw Main Item Properties\\nif (this.drawItemConsumable(x, y, hw)) y += 0;\\nif (this.drawItemQuantity(hx, y, hw)) y += lineHeight;\\nif (this._item.occasion < 3) {\\n    y = this.drawItemDamage(x, y, width);\\n    y = this.drawItemEffects(x, y, width);\\n}\\ny = this.drawItemCustomEntries(x, y, width);\\n\\n// Draw Remaining Item Properties\\nif (this._item.occasion < 3) {\\n    if (this.drawItemOccasion(x, y, hw)) y += 0;\\n    if (this.drawItemScope(hx, y, hw)) y += lineHeight;\\n    if (this.drawItemHitType(x, y, hw)) y += 0;\\n    if (this.drawItemSuccessRate(hx, y, hw)) y += lineHeight;\\n    if (this.drawItemSpeed(x, y, hw)) y += 0;\\n    if (this.drawItemRepeats(hx, y, hw)) y += lineHeight;\\n}\\n\\n// Fill Rest of the Window\\nthis.drawItemDarkRect(x, y, width, height - y);\"","Vocabulary":"","LabelConsume:str":"Consumable","Consumable:str":"✔","NotConsumable:str":"✘","Occasions":"","Occasion0:str":"Anytime Use","Occasion1:str":"Battle-Only","Occasion2:str":"Field-Only","Occasion3:str":"-","Scope":"","Scope0:str":"No Target","Scope1:str":"1 Foe","Scope2:str":"All Foes","Scope3:str":"Random Foe","Scope4:str":"2 Random Foes","Scope5:str":"3 Random Foes","Scope6:str":"4 Random Foes","Scope7:str":"1 Ally","Scope8:str":"Alive Allies","Scope9:str":"Dead Ally","Scope10:str":"Dead Allies","Scope11:str":"User","Scope12:str":"Any Ally","Scope13:str":"All Allies","Scope14:str":"Everybody","BattleCore":"","ScopeRandomAny:str":"%1 Random Units","ScopeRandomEnemies:str":"%1 Random Foes","ScopeRandomAllies:str":"%1 Random Allies","ScopeAlliesButUser:str":"Other Allies","ScopeAllyOrEnemy:str":"Ally/Enemy","ScopeEnemyOrAlly:str":"Enemy/Ally","LabelSpeed:str":"Speed","Speed2000:str":"Fastest","Speed1000:str":"Faster","Speed1:str":"Fast","Speed0:str":"Normal","SpeedNeg999:str":"Slow","SpeedNeg1999:str":"Slower","SpeedNeg2000:str":"Slowest","LabelSuccessRate:str":"Accuracy","LabelRepeats:str":"Hits","LabelHitType:str":"Type","HitType0:str":"Neutral","HitType1:str":"Physical","HitType2:str":"Magical","LabelElement:str":"Element","ElementWeapon:str":"\\I[97]Weapon","ElementNone:str":"\\I[160]No Element","DamageType":"","DamageType1:str":"%1 Damage Multiplier","DamageType2:str":"%1 Damage Multiplier","DamageType3:str":"%1 Recovery Multiplier","DamageType4:str":"%1 Recovery Multiplier","DamageType5:str":"%1 Drain Multiplier","DamageType6:str":"%1 Drain Multiplier","Effects":"","LabelRecoverHP:str":"%1 Recovery","LabelRecoverMP:str":"%1 Recovery","LabelRecoverTP:str":"%1 Recovery","LabelSelfGainTP:str":"User %1","LabelDamageHP:str":"%1 Damage","LabelDamageMP:str":"%1 Damage","LabelDamageTP:str":"%1 Damage","LabelApply:str":"Applies","LabelRemove:str":"Removes","EquipType":"","WeaponType:str":"Weapon Type","ArmorType:str":"Armor Type","NoEquipTypeResult:str":"-"}
 *
 * @param BreakEnd1
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param End Of
 * @default Plugin Parameters
 *
 * @param BreakEnd2
 * @text --------------------------
 * @default ----------------------------------
 *
 */
/* ----------------------------------------------------------------------------
 * Item Menu Scene Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ItemScene:
 *
 * @param General
 *
 * @param EnableLayout:eval
 * @text Use Updated Layout
 * @parent General
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use the Updated Item Menu Layout provided by this plugin?
 * This will override the Core Engine windows settings.
 * @default true
 *
 * @param LayoutStyle:str
 * @text Layout Style
 * @parent General
 * @type select
 * @option Upper Help, Left Input
 * @value upper/left
 * @option Upper Help, Right Input
 * @value upper/right
 * @option Lower Help, Left Input
 * @value lower/left
 * @option Lower Help, Right Input
 * @value lower/right
 * @desc If using an updated layout, how do you want to style
 * the menu scene layout?
 * @default upper/left
 *
 * @param ListWindow
 * @text List Window
 *
 * @param ListWindowCols:num
 * @text Columns
 * @parent ListWindow
 * @type number
 * @min 1
 * @desc Number of maximum columns.
 * @default 1
 *
 * @param ItemQt
 * @text Item Quantity
 *
 * @param MaxItems:num
 * @text Item Max
 * @parent ItemQt
 * @desc The default maximum quantity for items.
 * @default 99
 *
 * @param MaxWeapons:num
 * @text Weapon Max
 * @parent ItemQt
 * @desc The default maximum quantity for weapons.
 * @default 99
 *
 * @param MaxArmors:num
 * @text Armor Max
 * @parent ItemQt
 * @desc The default maximum quantity for armors.
 * @default 99
 *
 * @param ItemQuantityFmt:str
 * @text Quantity Format
 * @parent ItemQt
 * @desc How to display an item's quantity.
 * %1 - Item Quantity
 * @default ×%1
 *
 * @param ItemQuantityFontSize:num
 * @text Font Size
 * @parent ItemQt
 * @desc Default font size for item quantity.
 * @default 22
 *
 * @param ShopStatusWindow
 * @text Shop Status Window
 *
 * @param ShowShopStatus:eval
 * @text Show in Item Menu?
 * @parent ShopStatusWindow
 * @type boolean
 * @on Show
 * @off Don't Show
 * @desc Show the Shop Status Window in the Item Menu?
 * This is enabled if the Updated Layout is on.
 * @default true
 *
 * @param ItemSceneAdjustItemList:eval
 * @text Adjust List Window?
 * @parent ShopStatusWindow
 * @type boolean
 * @on Adjust
 * @off Don't
 * @desc Automatically adjust the Item List Window in the Item Menu if using the Shop Status Window?
 * @default true
 *
 * @param ItemMenuStatusBgType:num
 * @text Background Type
 * @parent ShopStatusWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ItemMenuStatusRect:func
 * @text JS: X, Y, W, H
 * @parent ShopStatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this Status Window in the Item Menu.
 * @default "const width = this.statusWidth();\nconst height = this._itemWindow.height;\nconst x = Graphics.boxWidth - width;\nconst y = this._itemWindow.y;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ButtonAssist
 * @text Button Assist Window
 *
 * @param buttonAssistCategory:str
 * @text Switch Category
 * @parent ButtonAssist
 * @desc Button assist text used for switching categories.
 * For VisuStella MZ's Core Engine's Button Assist Window.
 * @default Switch Category
 *
 */
/* ----------------------------------------------------------------------------
 * Item Categories
 * ----------------------------------------------------------------------------
 */
/*~struct~Categories:
 *
 * @param MainList
 * @text List
 *
 * @param List:arraystruct
 * @text Category List
 * @parent MainList
 * @type struct<Category>[]
 * @desc A list of the item categories displayed in the Item/Shop menus.
 * @default ["{\"Type:str\":\"RegularItems\",\"Icon:num\":\"208\"}","{\"Type:str\":\"AllWeapons\",\"Icon:num\":\"97\"}","{\"Type:str\":\"AllArmors\",\"Icon:num\":\"137\"}","{\"Type:str\":\"KeyItems\",\"Icon:num\":\"195\"}"]
 *
 * @param Style:str
 * @text Category Style
 * @parent MainList
 * @type select
 * @option Text Only
 * @value text
 * @option Icon Only
 * @value icon
 * @option Icon + Text
 * @value iconText
 * @option Automatic
 * @value auto
 * @desc How do you wish to draw categorie entries in the Category Window?
 * @default icon
 *
 * @param TextAlign:str
 * @text Text Alignment
 * @parent MainList
 * @type combo
 * @option left
 * @option center
 * @option right
 * @desc Decide how you want the text to be aligned.
 * @default center
 *
 * @param Vocabulary
 *
 * @param HiddenItemA:str
 * @text Hidden Item A
 * @parent Vocabulary
 * @desc How this category is named in the Item Menu.
 * @default Special Items
 *
 * @param HiddenItemB:str
 * @text Hidden Item B
 * @parent Vocabulary
 * @desc How this category is named in the Item Menu.
 * @default Unique Items
 *
 * @param Consumable:str
 * @text Consumable
 * @parent Vocabulary
 * @desc How this category is named in the Item Menu.
 * @default Consumable
 *
 * @param Nonconsumable:str
 * @text Nonconsumable
 * @parent Vocabulary
 * @desc How this category is named in the Item Menu.
 * @default Nonconsumable
 *
 * @param AlwaysUsable:str
 * @text Always Usable
 * @parent Vocabulary
 * @desc How this category is named in the Item Menu.
 * @default Usable
 *
 * @param BattleUsable:str
 * @text Battle Usable
 * @parent Vocabulary
 * @desc How this category is named in the Item Menu.
 * @default Battle
 *
 * @param FieldUsable:str
 * @text Field Usable
 * @parent Vocabulary
 * @desc How this category is named in the Item Menu.
 * @default Field
 *
 * @param NeverUsable:str
 * @text Never Usable
 * @parent Vocabulary
 * @desc How this category is named in the Item Menu.
 * @default Materials
 *
 */
/* ----------------------------------------------------------------------------
 * Category Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Category:
 *
 * @param Type:str
 * @text Type
 * @type combo
 * @option AllItems
 * @option
 * @option RegularItems
 * @option KeyItems
 * @option HiddenItemA
 * @option HiddenItemB
 * @option
 * @option Consumable
 * @option Nonconsumable
 * @option
 * @option AlwaysUsable
 * @option BattleUsable
 * @option FieldUsable
 * @option NeverUsable
 * @option
 * @option AllWeapons
 * @option WType:x
 * @option
 * @option AllArmors
 * @option AType:x
 * @option
 * @option EType:x
 * @option
 * @option Category:x
 * @option
 * @desc A list of the item categories displayed in the Item/Shop
 * menus. Replace x with ID numbers or text.
 * @default RegularItems
 *
 * @param Icon:num
 * @text Icon
 * @desc Icon used for this category.
 * Use 0 for no icon.
 * @default 0
 *
 * @param SwitchID:num
 * @text Visibility Switch
 * @type switch
 * @desc This Switch must be turned ON in order for the category to show.
 * Use 0 for no Switch requirement.
 * @default 0
 *
 * @param SortBy:str
 * @text Sorted By
 * @type select
 * @option ID
 * @option Name
 * @desc Sort this category (in Scene_Item and Scene_Shop only) this way.
 * @default ID
 *
 */
/* ----------------------------------------------------------------------------
 * New Label Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~NewLabel:
 *
 * @param Enable:eval
 * @text Use NEW! Labels?
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use the NEW! Labels or not?
 * @default true
 *
 * @param Icon:num
 * @text Icon
 * @desc The icon index used to represent the NEW! text.
 * Use 0 to not draw any icons.
 * @default 0
 *
 * @param Text:str
 * @text Text
 * @desc The text written on the NEW! Label.
 * @default NEW!
 *
 * @param FontColor:str
 * @text Font Color
 * @parent Text:str
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 17
 *
 * @param FontFace:str
 * @text Font Face
 * @parent Text:str
 * @desc Font face used for the NEW! Label.
 * @default Verdana
 *
 * @param FontSize:str
 * @text Font Size
 * @parent Text:str
 * @desc The font size used for the NEW! text.
 * @default 16
 *
 * @param FadeLimit:num
 * @text Fade Limit
 * @desc What's the upper opaque limit before reversing?
 * @default 360
 *
 * @param FadeSpeed:num
 * @text Fade Speed
 * @desc What's the fade speed of the NEW! Label?
 * @default 4
 *
 * @param OffsetX:num
 * @text Offset X
 * @desc How much to offset the NEW! Label's X position by.
 * @default 0
 *
 * @param OffsetY:num
 * @text Offset Y
 * @desc How much to offset the NEW! Label's Y position by.
 * @default 4
 *
 */
/* ----------------------------------------------------------------------------
 * Equip Menu Scene Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~EquipScene:
 *
 * @param General
 *
 * @param EnableLayout:eval
 * @text Use Updated Layout
 * @parent General
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use the Updated Equip Layout provided by this plugin?
 * This will override the Core Engine windows settings.
 * @default true
 *
 * @param LayoutStyle:str
 * @text Layout Style
 * @parent General
 * @type select
 * @option Upper Help, Left Input
 * @value upper/left
 * @option Upper Help, Right Input
 * @value upper/right
 * @option Lower Help, Left Input
 * @value lower/left
 * @option Lower Help, Right Input
 * @value lower/right
 * @desc If using an updated layout, how do you want to style
 * the menu scene layout?
 * @default upper/right
 *
 * @param ParamValueFontSize:num
 * @text Param Font Size
 * @parent EnableLayout:eval
 * @desc The font size used for parameter values.
 * @default 22
 *
 * @param MenuPortraits:eval
 * @text Show Menu Portraits?
 * @parent EnableLayout:eval
 * @type boolean
 * @on Use Portraits
 * @off Use Faces
 * @desc If Main Menu Core is installed, display the Menu Portraits
 * instead of the actor's face in the status window?
 * @default true
 *
 * @param DrawPortraitJS:func
 * @text JS: Portrait Upper
 * @parent EnableLayout:eval
 * @type note
 * @desc If Menu Portraits are available, this is code used to draw
 * the upper data like this in the Status Window.
 * @default "// Declare Variables\nconst lineHeight = this.lineHeight();\nconst padding = this.itemPadding();\nconst x1 = padding;\nconst x2 = this.innerWidth - 128 - padding;\n\n// Draw Menu Image\nthis.drawItemActorMenuImage(this._actor, 0, 0, this.innerWidth, this.innerHeight);\n\n// Draw Data\nthis.drawActorName(this._actor, x1, lineHeight * 0);\nthis.drawActorClass(this._actor, x1, lineHeight * 1);\nthis.drawActorIcons(this._actor, x1, lineHeight * 2);\nthis.drawActorLevel(this._actor, x2, lineHeight * 0);\nthis.placeBasicGauges(this._actor, x2, lineHeight * 1);"
 *
 * @param DrawFaceJS:func
 * @text JS: Face Upper
 * @parent EnableLayout:eval
 * @type note
 * @desc If faces used used, this is code used to draw the upper
 * data like this in the Status Window.
 * @default "// Declare Variables\nconst lineHeight = this.lineHeight();\nconst gaugeLineHeight = this.gaugeLineHeight();\nconst x = Math.floor(this.innerWidth / 2);\nconst limitHeight = this.innerHeight - (this.actorParams().length * lineHeight);\nconst actorX = Math.floor((x - ImageManager.faceWidth) / 2);\nconst actorY = Math.max(0, Math.floor((limitHeight - ImageManager.faceHeight) / 2));\nlet dataHeight = lineHeight * 3;\ndataHeight += gaugeLineHeight * ($dataSystem.optDisplayTp ? 3 : 2);\nconst dataY = Math.max(0, Math.floor((limitHeight - dataHeight) / 2));\n\n// Draw Data\nthis.drawActorFace(this._actor, actorX, actorY, ImageManager.faceWidth, ImageManager.faceHeight);\nthis.drawActorIcons(this._actor, actorX + 16, actorY + ImageManager.faceHeight - lineHeight);\nthis.drawActorName(this._actor, x, dataY + lineHeight * 0);\nthis.drawActorLevel(this._actor, x, dataY + lineHeight * 1);\nthis.drawActorClass(this._actor, x, dataY + lineHeight * 2);\nthis.placeBasicGauges(this._actor, x, dataY + lineHeight * 3);"
 *
 * @param DrawParamJS:func
 * @text JS: Parameter Lower
 * @parent EnableLayout:eval
 * @type note
 * @desc Code to determine how parameters are drawn in the
 * Status Window.
 * @default "// Declare variables\nconst params = this.actorParams();\nconst lineHeight = this.lineHeight();\nconst padding = this.itemPadding();\nconst baseX = 0;\nconst baseY = this.innerHeight - params.length * lineHeight;\nconst baseWidth = this.innerWidth;\nconst valueFontSize = this.paramValueFontSize();\n\n// Calculate Widths\nlet paramNameWidth = Math.max(...params.map(param => this.textWidth(TextManager.param(param))));\nparamNameWidth += padding * 2;\nif (this.isUseParamNamesWithIcons()) {\n    paramNameWidth += ImageManager.iconWidth + 4;\n}\nlet arrowWidth = this.rightArrowWidth();\nconst totalDivides = this.innerWidth >= 500 ? 3 : 2;\nlet paramValueWidth = Math.floor((baseWidth - paramNameWidth - arrowWidth) / totalDivides);\nparamNameWidth = baseWidth - (paramValueWidth * totalDivides) - arrowWidth;\n\n// Draw Parameters\nlet x = baseX;\nlet y = baseY;\nlet value = 0;\nlet diffValue = 0;\nlet alter = 2;\nfor (const paramId of params) {\n    // Draw Param Name\n    this.drawItemDarkRect(x, y, paramNameWidth, lineHeight, alter);\n    this.drawUpdatedParamName(paramId, x, y, paramNameWidth);\n    this.resetFontSettings();\n    x += paramNameWidth;\n\n    // Draw Param Before\n    this.contents.fontSize = valueFontSize;\n    this.drawItemDarkRect(x, y, paramValueWidth, lineHeight, alter);\n    this.drawUpdatedBeforeParamValue(paramId, x, y, paramValueWidth);\n    this.resetFontSettings();\n    x += paramValueWidth;\n\n    // Draw Arrow\n    this.drawItemDarkRect(x, y, arrowWidth, lineHeight, alter);\n    this.drawRightArrow(x, y);\n    x += arrowWidth;\n\n    // Draw Param After\n    this.contents.fontSize = valueFontSize;\n    this.drawItemDarkRect(x, y, paramValueWidth, lineHeight, alter);\n    this.drawUpdatedAfterParamValue(paramId, x, y, paramValueWidth);\n    x += paramValueWidth;\n\n    // Draw Param Change\n    if (totalDivides > 2) {\n        this.drawItemDarkRect(x, y, paramValueWidth, lineHeight, alter);\n        this.drawUpdatedParamValueDiff(paramId, x, y, paramValueWidth);\n    }\n\n    // Prepare Next Parameter\n    x = baseX;\n    y += lineHeight;\n    alter = alter === 2 ? 1 : 2;\n}"
 *
 * @param StatusWindowWidth:num
 * @text Status Window Width
 * @parent General
 * @desc The usual width of the status window if using the 
 * non-Updated Equip Menu Layout.
 * @default 312
 *
 * @param DrawBackRect:eval
 * @text Show Back Rectangles?
 * @parent General
 * @type boolean
 * @on Draw
 * @off Don't Draw
 * @desc Show back rectangles of darker colors to display information better?
 * @default true
 *
 * @param BackRectColor:str
 * @text Back Rectangle Color
 * @parent DrawBackRect:eval
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 19
 *
 * @param CursedTextPopup:json
 * @text Cursed Equip Popup
 * @parent General
 * @type note
 * @desc %1 - Actor, %2 - Equip, %3 - Icon. Text codes allowed.
 * Requires VisuMZ_0_CoreEngine! Empty to not use.
 * @default "%1 is cursed by %3%2!"
 *
 * @param Command
 * @text Command Window
 *
 * @param CmdStyle:str
 * @text Style
 * @parent Command
 * @type select
 * @option Text Only
 * @value text
 * @option Icon Only
 * @value icon
 * @option Icon + Text
 * @value iconText
 * @option Automatic
 * @value auto
 * @desc How do you wish to draw commands in the Command Window?
 * @default auto
 *
 * @param CmdTextAlign:str
 * @text Text Align
 * @parent Command
 * @type combo
 * @option left
 * @option center
 * @option right
 * @desc Text alignment for the Command Window.
 * @default center
 *
 * @param CmdIconEquip:num
 * @text Equip Icon
 * @parent Command
 * @desc The icon used for the Equip command.
 * @default 136
 *
 * @param equipCmdDesc:json
 * @text Help Description
 * @parent CmdIconEquip:num
 * @type note
 * @desc Help description used when this command is selected.
 * Text codes allowed.
 * @default "Pick and choose equipment to change."
 *
 * @param CommandAddOptimize:eval
 * @text Add Optimize Command?
 * @parent Command
 * @type boolean
 * @on Add
 * @off Don't
 * @desc Add the "Optimize" command to the Command Window?
 * @default true
 *
 * @param optimizeCmdDesc:json
 * @text Help Description
 * @parent CommandAddOptimize:eval
 * @type note
 * @desc Help description used when this command is selected.
 * Text codes allowed.
 * @default "Equip the strongest available equipment."
 *
 * @param CmdIconOptimize:num
 * @text Optimize Icon
 * @parent CommandAddOptimize:eval
 * @desc The icon used for the Optimize command.
 * @default 137
 *
 * @param CommandAddClear:eval
 * @text Add Clear Command?
 * @parent Command
 * @type boolean
 * @on Add
 * @off Don't
 * @desc Add the "Clear" command to the Command Window?
 * @default true
 *
 * @param clearCmdDesc:json
 * @text Help Description
 * @parent CommandAddClear:eval
 * @type note
 * @desc Help description used when this command is selected.
 * Text codes allowed.
 * @default "Remove all available equipment."
 *
 * @param CmdIconClear:num
 * @text Clear Icon
 * @parent CommandAddClear:eval
 * @desc The icon used for the Clear command.
 * @default 135
 *
 * @param RemoveEquip
 * @text Remove Equip
 *
 * @param RemoveEquipIcon:num
 * @text Icon
 * @parent RemoveEquip
 * @desc Icon used for equipment removal.
 * @default 16
 *
 * @param RemoveEquipText:str
 * @text Text
 * @parent RemoveEquip
 * @desc Text used for equipment removal.
 * @default Remove
 *
 * @param ShiftShortcutKey:eval
 * @text Use SHIFT Shortcut?
 * @parent RemoveEquip
 * @type boolean
 * @on Use
 * @off Don't
 * @desc Add the "Shift" button as a shortcut key to removing items?
 * @default true

 * @param Rulings
 *
 * @param EquipAdjustHpMp:eval
 * @text Equip-Adjust HP/MP
 * @parent Rulings
 * @type boolean
 * @on Adjust
 * @off Don't
 * @desc Adjust HP/MP differences after changing equips with MaxHP/MaxMP values.
 * @default true
 * 
 * @param NonRemoveETypes:arraynum
 * @text Non-Removable Types
 * @parent Rulings
 * @type number[]
 * @min 1
 * @max 100
 * @desc Insert ID's of the Equipment Types that must always have
 * an item equipped and cannot be empty.
 * @default []
 *
 * @param NonOptimizeETypes:arraynum
 * @text Non-Optimized Types
 * @parent Rulings
 * @type number[]
 * @min 1
 * @max 100
 * @desc Insert ID's of the Equipment Types that will be ignored
 * when equipment is being optimized.
 * @default []
 *
 * @param ButtonAssist
 * @text Button Assist Window
 *
 * @param buttonAssistRemove:str
 * @text SHIFT: Remove
 * @parent ButtonAssist
 * @desc Button assist text used for the SHIFT Remove Shortcut.
 * For VisuStella MZ's Core Engine's Button Assist Window.
 * @default Unequip
 * 
 */
/* ----------------------------------------------------------------------------
 * Shop Menu Scene Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ShopScene:
 *
 * @param General
 *
 * @param EnableLayout:eval
 * @text Use Updated Layout
 * @parent General
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use the Updated Shop Layout provided by this plugin?
 * This will override the Core Engine windows settings.
 * @default true
 *
 * @param LayoutStyle:str
 * @text Layout Style
 * @parent General
 * @type select
 * @option Upper Help, Left Input
 * @value upper/left
 * @option Upper Help, Right Input
 * @value upper/right
 * @option Lower Help, Left Input
 * @value lower/left
 * @option Lower Help, Right Input
 * @value lower/right
 * @desc If using an updated layout, how do you want to style
 * the menu scene layout?
 * @default upper/left
 *
 * @param Switches
 *
 * @param SwitchBuy:num
 * @text Switch: Buy
 * @parent Switches
 * @type switch
 * @desc Buying items in the Shop Scene turns this Switch to ON.
 * Switch reverts to OFF whenever the Shop Scene opens.
 * @default 0
 *
 * @param SwitchSell:num
 * @text Switch: Sell
 * @parent Switches
 * @type switch
 * @desc Selling items in the Shop Scene turns this Switch to ON.
 * Switch reverts to OFF whenever the Shop Scene opens.
 * @default 0
 *
 * @param Command
 * @text Command Window
 *
 * @param CmdHideDisabled:eval
 * @text Hide Unavailable?
 * @parent Command
 * @type boolean
 * @on Hide
 * @off Default
 * @desc Hide all unavailable commands like when a shop is set to Purchase Only?
 * @default true
 *
 * @param CmdStyle:str
 * @text Style
 * @parent Command
 * @type select
 * @option Text Only
 * @value text
 * @option Icon Only
 * @value icon
 * @option Icon + Text
 * @value iconText
 * @option Automatic
 * @value auto
 * @desc How do you wish to draw commands in the Command Window?
 * @default auto
 *
 * @param CmdTextAlign:str
 * @text Text Align
 * @parent Command
 * @type combo
 * @option left
 * @option center
 * @option right
 * @desc Text alignment for the Command Window.
 * @default center
 *
 * @param CmdIconBuy:num
 * @text Buy Icon
 * @parent Command
 * @desc The icon used for the Buy command.
 * @default 208
 *
 * @param CmdIconSell:num
 * @text Sell Icon
 * @parent Command
 * @desc The icon used for the Sell command.
 * @default 314
 *
 * @param CmdIconCancel:num
 * @text Cancel Icon
 * @parent Command
 * @desc The icon used for the Cancel command.
 * @default 82
 *
 * @param CmdCancelRename:str
 * @text Rename "Cancel"
 * @parent Command
 * @desc Rename Cancel to something more logical for the Shop Menu Scene.
 * @default Exit
 *
 * @param Prices
 *
 * @param SellPriceRate:num
 * @text Sell Price Rate
 * @parent Prices
 * @desc The default sell price rate.
 * @default 0.50
 *
 * @param BuyPriceJS:func
 * @text JS: Buy Price
 * @parent Prices
 * @type note
 * @desc Modificatons made to the buy price before finalizing it.
 * @default "// Declare variables\nlet item = arguments[0];\nlet price = arguments[1];\n\n// Return the finalized price\nreturn price;"
 *
 * @param SellPriceJS:func
 * @text JS: Sell Price
 * @parent Prices
 * @type note
 * @desc Modificatons made to the sell price before finalizing it.
 * @default "// Declare variables\nlet item = arguments[0];\nlet price = arguments[1];\n\n// Return the finalized price\nreturn price;"
 *
 * @param ButtonAssist
 * @text Button Assist Window
 *
 * @param buttonAssistSmallIncrement:str
 * @text Small Increment
 * @parent ButtonAssist
 * @desc Text used for changing amount bought/sold.
 * For VisuStella MZ's Core Engine's Button Assist Window.
 * @default -1/+1
 *
 * @param buttonAssistLargeIncrement:str
 * @text Large Increment
 * @parent ButtonAssist
 * @desc Text used for changing amount bought/sold.
 * For VisuStella MZ's Core Engine's Button Assist Window.
 * @default -10/+10
 *
 */
/* ----------------------------------------------------------------------------
 * Shop Status Window Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~StatusWindow:
 *
 * @param General
 *
 * @param Width:num
 * @text Window Width
 * @parent General
 * @desc The usual width of the status window.
 * @default 352
 *
 * @param ParamChangeFontSize:num
 * @text Parameter Font Size
 * @parent General
 * @desc Font size used for parameter changes.
 * @default 22
 *
 * @param Translucent:num
 * @text Translucent Opacity
 * @parent General
 * @desc Opacity setting used for translucent window objects.
 * @default 64
 *
 * @param DrawBackRect:eval
 * @text Show Back Rectangles?
 * @parent General
 * @type boolean
 * @on Draw
 * @off Don't Draw
 * @desc Show back rectangles of darker colors to display information better?
 * @default true
 *
 * @param BackRectColor:str
 * @text Back Rectangle Color
 * @parent DrawBackRect:eval
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 19
 *
 * @param EquipData
 * @text Equipment Data
 *
 * @param EquipDataStyle:str
 * @text Data Style
 * @parent EquipData
 * @type select
 * @option Compare - Compares selected equip to equipped gear
 * @value compare
 * @option Classic - Shows basic parameters of selected equip
 * @value classic
 * @option Double - Shows basic parameters in double columns
 * @value double
 * @desc How do you wish to display equipment data?
 * @default compare
 *
 * @param EquipDataCompare
 * @text Compare Style
 * @parent EquipDataStyle:str
 *
 * @param AlreadyEquipMarker:str
 * @text Already Equipped
 * @parent EquipDataCompare
 * @desc Marker used to show an actor cannot equip an item.
 * @default E
 *
 * @param CannotEquipMarker:str
 * @text Can't Equip
 * @parent EquipDataCompare
 * @desc Marker used to show an actor cannot equip an item.
 * @default -
 *
 * @param NoChangeMarker:str
 * @text No Changes
 * @parent EquipDataCompare
 * @desc Marker used to show no changes have occurred.
 * @default -
 *
 * @param DrawEquipData:func
 * @text JS: Draw Equip Data
 * @parent EquipDataCompare
 * @type note
 * @desc Code used to draw the equipment data for the Shop Status Window.
 * @default "// Set Variables\nconst lineHeight = this.lineHeight();\nconst paramheight = this.gaugeLineHeight() + 8;\nlet x = 0;\nlet y = 0;\nlet width = this.innerWidth;\nlet height = this.innerHeight;\nlet hw = Math.floor(width / 2);\nlet hx = x + width - hw;\n\n// Draw Item Name, Type, and Quantity\nthis.drawItemName(this._item, x + this.itemPadding(), y, width - this.itemPadding() * 2);\nthis.drawItemDarkRect(x, y, width);\ny += lineHeight;\nif (this.drawItemEquipType(x, y, hw)) y += 0;\nif (this.drawItemQuantity(hx, y, hw)) y += lineHeight;\n\n// Draw Parameter Names\nconst params = this.actorParams();\nconst backY = y;\ny = height - (params.length * paramheight) - 4;\nlet paramX = x;\nlet paramWidth = 0;\nlet tableY = y;\nfor (const paramId of params) {\n    paramWidth = Math.max(this.drawParamName(paramId, x + 4, y + 4, width), paramWidth);\n    y += paramheight;\n}\n\n// Draw Actor Data\nconst actorMax = $gameParty.maxBattleMembers();\nconst actorWidth = Math.floor((width - paramWidth) / actorMax);\nparamWidth = width - (actorWidth * actorMax);\nfor (const actor of $gameParty.battleMembers()) {\n    const index = $gameParty.battleMembers().indexOf(actor);\n    const actorX = paramX + paramWidth + (index * actorWidth);\n    this.changePaintOpacity(actor.canEquip(this._item));\n    this.drawActorCharacter(actor, actorX + (actorWidth / 2), tableY);\n    let actorY = tableY;\n\n    // Draw Parameter Changes\n    for (const paramId of params) {\n        const diffY = actorY - ((lineHeight - paramheight) / 2);\n        this.drawActorParamDifference(actor, paramId, actorX, diffY, actorWidth);\n        actorY += paramheight;\n    }\n}\n\n// Draw Back Rectangles\nthis.drawItemDarkRect(paramX, backY, paramWidth, tableY - backY);\nfor (let i = 0; i < actorMax; i++) {\n    const actorX = paramX + paramWidth + (i * actorWidth);\n    this.drawItemDarkRect(actorX, backY, actorWidth, tableY - backY);\n}\nfor (const paramId of params) {\n    this.drawItemDarkRect(paramX, tableY, paramWidth, paramheight);\n    for (let i = 0; i < actorMax; i++) {\n        const actorX = paramX + paramWidth + (i * actorWidth);\n        this.drawItemDarkRect(actorX, tableY, actorWidth, paramheight);\n    }\n    tableY += paramheight;\n}"
 *
 * @param EquipDataClassic
 * @text Classic Style
 * @parent EquipDataStyle:str
 *
 * @param ClassicWeaponParameters:arraystr
 * @text Added Weapon Params
 * @parent EquipDataClassic
 * @type combo[]
 * @option MaxHP
 * @option MaxMP
 * @option ATK
 * @option DEF
 * @option MAT
 * @option MDF
 * @option AGI
 * @option LUK
 * @option HIT
 * @option EVA
 * @option CRI
 * @option CEV
 * @option MEV
 * @option MRF
 * @option CNT
 * @option HRG
 * @option MRG
 * @option TRG
 * @option TGR
 * @option GRD
 * @option REC
 * @option PHA
 * @option MCR
 * @option TCR
 * @option PDR
 * @option MDR
 * @option FDR
 * @option EXR
 * @desc Display these parameters when a weapon is selected.
 * Requires VisuMZ_0_CoreEngine!
 * @default ["HIT"]
 *
 * @param ClassicArmorParameters:arraystr
 * @text Added Armor Params
 * @parent EquipDataClassic
 * @type combo[]
 * @option MaxHP
 * @option MaxMP
 * @option ATK
 * @option DEF
 * @option MAT
 * @option MDF
 * @option AGI
 * @option LUK
 * @option HIT
 * @option EVA
 * @option CRI
 * @option CEV
 * @option MEV
 * @option MRF
 * @option CNT
 * @option HRG
 * @option MRG
 * @option TRG
 * @option TGR
 * @option GRD
 * @option REC
 * @option PHA
 * @option MCR
 * @option TCR
 * @option PDR
 * @option MDR
 * @option FDR
 * @option EXR
 * @desc Display these parameters when an armor is selected.
 * Requires VisuMZ_0_CoreEngine!
 * @default ["EVA"]
 *
 * @param DrawEquipClassicData:func
 * @text JS: Draw Equip Data
 * @parent EquipDataClassic
 * @type note
 * @desc Code used to draw the equipment data for the Shop Status Window.
 * @default "// Set Variables\nconst lineHeight = this.lineHeight();\nlet x = 0;\nlet y = 0;\nlet width = this.innerWidth;\nlet height = this.innerHeight;\nlet hw = Math.floor(width / 2);\nlet hx = x + width - hw;\n\n// Draw Item Name, Type, and Quantity\nthis.drawItemName(this._item, x + this.itemPadding(), y, width - this.itemPadding() * 2);\nthis.drawItemDarkRect(x, y, width);\ny += lineHeight;\nif (this.drawItemEquipType(x, y, hw)) y += 0;\nif (this.drawItemQuantity(hx, y, hw)) y += lineHeight;\n\n// Draw Item Weapon Type or Armor Type\nif (this.drawItemEquipSubType(x, y, width)) y += lineHeight;\n\n// Draw Parameter Values\nconst params = this.actorParams();\nfor (const paramId of params) {\n    if (this.isCustomParameter(paramId)) continue;\n    this.drawActorParamClassic(paramId, x, y, width);\n    y += lineHeight;\n}\n\n// Draw Custom Entries\ny = this.drawItemCustomEntries(x, y, width);\n\n// Fill Rest of the Window\nthis.drawItemDarkRect(x, y, width, height - y);"
 *
 * @param EquipDataDouble
 * @text Double Style
 * @parent EquipDataStyle:str
 *
 * @param DoubleWeaponParameters:arraystr
 * @text Added Weapon Params
 * @parent EquipDataDouble
 * @type combo[]
 * @option MaxHP
 * @option MaxMP
 * @option ATK
 * @option DEF
 * @option MAT
 * @option MDF
 * @option AGI
 * @option LUK
 * @option HIT
 * @option EVA
 * @option CRI
 * @option CEV
 * @option MEV
 * @option MRF
 * @option CNT
 * @option HRG
 * @option MRG
 * @option TRG
 * @option TGR
 * @option GRD
 * @option REC
 * @option PHA
 * @option MCR
 * @option TCR
 * @option PDR
 * @option MDR
 * @option FDR
 * @option EXR
 * @desc Display these parameters when a weapon is selected.
 * Requires VisuMZ_0_CoreEngine!
 * @default ["HIT","CNT"]
 *
 * @param DoubleArmorParameters:arraystr
 * @text Added Armor Params
 * @parent EquipDataDouble
 * @type combo[]
 * @option MaxHP
 * @option MaxMP
 * @option ATK
 * @option DEF
 * @option MAT
 * @option MDF
 * @option AGI
 * @option LUK
 * @option HIT
 * @option EVA
 * @option CRI
 * @option CEV
 * @option MEV
 * @option MRF
 * @option CNT
 * @option HRG
 * @option MRG
 * @option TRG
 * @option TGR
 * @option GRD
 * @option REC
 * @option PHA
 * @option MCR
 * @option TCR
 * @option PDR
 * @option MDR
 * @option FDR
 * @option EXR
 * @desc Display these parameters when an armor is selected.
 * Requires VisuMZ_0_CoreEngine!
 * @default ["EVA","GRD"]
 *
 * @param DrawEquipDoubleData:func
 * @text JS: Draw Equip Data
 * @parent EquipDataDouble
 * @type note
 * @desc Code used to draw the equipment data for the Shop Status Window.
 * @default "// Set Variables\nconst lineHeight = this.lineHeight();\nlet x = 0;\nlet y = 0;\nlet width = this.innerWidth;\nlet height = this.innerHeight;\nlet hw = Math.floor(width / 2);\nlet hx = x + width - hw;\n\n// Draw Item Name, Type, and Quantity\nthis.drawItemName(this._item, x + this.itemPadding(), y, width - this.itemPadding() * 2);\nthis.drawItemDarkRect(x, y, width);\ny += lineHeight;\nif (this.drawItemEquipType(x, y, hw)) y += 0;\nif (this.drawItemQuantity(hx, y, hw)) y += lineHeight;\n\n// Draw Item Weapon Type or Armor Type\nif (this.drawItemEquipSubType(x, y, width)) y += lineHeight;\n\n// Draw Parameter Values\nconst params = this.actorParams();\nfor (const paramId of params) {\n    if (this.isCustomParameter(paramId)) continue;\n    this.drawActorParamClassic(paramId, x, y, hw);\n    if (x === hw) {\n        y += lineHeight;\n        x = 0;\n    } else {\n        x = hw;\n    }\n}\n// Realign\nif (x === hw) {\n    this.drawItemDarkRect(hw, y, hw, lineHeight);\n    y += lineHeight;\n    x = 0;\n}\n\n// Draw Custom Entries\ny = this.drawItemCustomEntries(x, y, width);\n\n// Fill Rest of the Window\nthis.drawItemDarkRect(x, y, width, height - y);"
 *
 * @param EquipDelayMS:num
 * @text Delay MS
 * @parent EquipData
 * @type number
 * @min 1
 * @max 999
 * @desc How many milliseconds (MS) to delay the preview update?
 * This is to prevent lag spikes for equips only.
 * @default 240
 *
 * @param ItemData
 * @text Item Data
 *
 * @param ItemGeneral
 * @parent ItemData
 * @text Data Settings
 *
 * @param MaxIcons:num
 * @text Max State/Buff Icons
 * @parent ItemGeneral
 * @desc Maximum number of icons that can be displayed for Add/Remove States/Buffs.
 * @default 8
 *
 * @param MultiplierStandard:num
 * @text Multiplier Standard
 * @parent ItemGeneral
 * @desc Constant standard to filter out random values when calculating the damage multiplier.
 * @default 1000000
 *
 * @param DrawItemData:func
 * @text JS: Draw Item Data
 * @parent ItemGeneral
 * @type note
 * @desc Code used to draw the item data for the Shop Status Window.
 * @default "const lineHeight = this.lineHeight();\nlet x = 0;\nlet y = 0;\nlet width = this.innerWidth;\nlet height = this.innerHeight;\nlet hw = Math.floor(width / 2);\nlet hx = x + width - hw;\n\n// Draw Item Name and Quantity\nthis.drawItemName(this._item, x + this.itemPadding(), y, width - this.itemPadding() * 2);\nthis.drawItemDarkRect(x, y, width);\ny += lineHeight;\n\n// Draw Main Item Properties\nif (this.drawItemConsumable(x, y, hw)) y += 0;\nif (this.drawItemQuantity(hx, y, hw)) y += lineHeight;\nif (this._item.occasion < 3) {\n    y = this.drawItemDamage(x, y, width);\n    y = this.drawItemEffects(x, y, width);\n}\ny = this.drawItemCustomEntries(x, y, width);\n\n// Draw Remaining Item Properties\nif (this._item.occasion < 3) {\n    if (this.drawItemOccasion(x, y, hw)) y += 0;\n    if (this.drawItemScope(hx, y, hw)) y += lineHeight;\n    if (this.drawItemHitType(x, y, hw)) y += 0;\n    if (this.drawItemSuccessRate(hx, y, hw)) y += lineHeight;\n    if (this.drawItemSpeed(x, y, hw)) y += 0;\n    if (this.drawItemRepeats(hx, y, hw)) y += lineHeight;\n}\n\n// Fill Rest of the Window\nthis.drawItemDarkRect(x, y, width, height - y);"
 *
 * @param Vocabulary
 * @parent ItemData
 *
 * @param LabelConsume:str
 * @text Consumable
 * @parent Vocabulary
 * @desc Vocabulary used for this data entry.
 * @default Consumable
 *
 * @param Consumable:str
 * @text Yes
 * @parent LabelConsume:str
 * @desc Vocabulary used for this data entry.
 * @default ✔
 *
 * @param NotConsumable:str
 * @text No
 * @parent LabelConsume:str
 * @desc Vocabulary used for this data entry.
 * @default ✘
 *
 * @param Occasions
 * @parent Vocabulary
 *
 * @param Occasion0:str
 * @text Always
 * @parent Occasions
 * @desc Vocabulary used for this data entry.
 * @default Anytime Use
 *
 * @param Occasion1:str
 * @text Battle Screen
 * @parent Occasions
 * @desc Vocabulary used for this data entry.
 * @default Battle-Only
 *
 * @param Occasion2:str
 * @text Menu Screen
 * @parent Occasions
 * @desc Vocabulary used for this data entry.
 * @default Field-Only
 *
 * @param Occasion3:str
 * @text Never
 * @parent Occasions
 * @desc Vocabulary used for this data entry.
 * @default -
 *
 * @param Scope
 * @parent Vocabulary
 *
 * @param Scope0:str
 * @text None
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default No Target
 *
 * @param Scope1:str
 * @text 1 Enemy
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default 1 Foe
 *
 * @param Scope2:str
 * @text All Enemies
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default All Foes
 *
 * @param Scope3:str
 * @text 1 Random Enemy
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default Random Foe
 *
 * @param Scope4:str
 * @text 2 Random Enemies
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default 2 Random Foes
 *
 * @param Scope5:str
 * @text 3 Random Enemies
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default 3 Random Foes
 *
 * @param Scope6:str
 * @text 4 Random Enemies
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default 4 Random Foes
 *
 * @param Scope7:str
 * @text 1 Ally
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default 1 Ally
 *
 * @param Scope8:str
 * @text All Allies
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default Alive Allies
 *
 * @param Scope9:str
 * @text 1 Ally (Dead)
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default Dead Ally
 *
 * @param Scope10:str
 * @text All Allies (Dead)
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default Dead Allies
 *
 * @param Scope11:str
 * @text The User
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default User
 *
 * @param Scope12:str
 * @text 1 Ally (DoA)
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default Any Ally
 *
 * @param Scope13:str
 * @text All Allies (DoA)
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default All Allies
 *
 * @param Scope14:str
 * @text Enemies & Allies
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default Everybody
 *
 * @param BattleCore
 * @text Battle Core Support
 * @parent Vocabulary
 *
 * @param ScopeRandomAny:str
 * @text x Random Any
 * @parent BattleCore
 * @desc Vocabulary used for <Target: x Random Any> notetag.
 * @default %1 Random Units
 *
 * @param ScopeRandomEnemies:str
 * @text x Random Enemies
 * @parent BattleCore
 * @desc Vocabulary used for <Target: x Random Enemies> notetag.
 * @default %1 Random Foes
 *
 * @param ScopeRandomAllies:str
 * @text x Random Allies
 * @parent BattleCore
 * @desc Vocabulary used for <Target: x Random Allies> notetag.
 * @default %1 Random Allies
 *
 * @param ScopeAlliesButUser:str
 * @text All Allies But User
 * @parent BattleCore
 * @desc Vocabulary used for <Target: All Allies But User> notetag.
 * @default Other Allies
 *
 * @param ScopeAllyOrEnemy:str
 * @text Ally or Enemy
 * @parent BattleCore
 * @desc Vocabulary used for <Target: Ally or Enemy> notetag.
 * @default Ally/Enemy
 *
 * @param ScopeEnemyOrAlly:str
 * @text Enemy or Ally
 * @parent BattleCore
 * @desc Vocabulary used for <Target: Enemy or Ally> notetag.
 * @default Enemy/Ally
 *
 * @param LabelSpeed:str
 * @text Speed
 * @parent Vocabulary
 * @desc Vocabulary used for this data entry.
 * @default Speed
 *
 * @param Speed2000:str
 * @text >= 2000 Speed
 * @parent LabelSpeed:str
 * @desc Vocabulary used for this data entry.
 * @default Fastest
 *
 * @param Speed1000:str
 * @text >= 1000 Speed
 * @parent LabelSpeed:str
 * @desc Vocabulary used for this data entry.
 * @default Faster
 *
 * @param Speed1:str
 * @text >= 1 Speed
 * @parent LabelSpeed:str
 * @desc Vocabulary used for this data entry.
 * @default Fast
 *
 * @param Speed0:str
 * @text == 0 Speed
 * @parent LabelSpeed:str
 * @desc Vocabulary used for this data entry.
 * @default Normal
 *
 * @param SpeedNeg999:str
 * @text >= -999 Speed
 * @parent LabelSpeed:str
 * @desc Vocabulary used for this data entry.
 * @default Slow
 *
 * @param SpeedNeg1999:str
 * @text >= -1999 Speed
 * @parent LabelSpeed:str
 * @desc Vocabulary used for this data entry.
 * @default Slower
 *
 * @param SpeedNeg2000:str
 * @text <= -2000 Speed
 * @parent LabelSpeed:str
 * @desc Vocabulary used for this data entry.
 * @default Slowest
 *
 * @param LabelSuccessRate:str
 * @text Success Rate
 * @parent Vocabulary
 * @desc Vocabulary used for this data entry.
 * @default Accuracy
 *
 * @param LabelRepeats:str
 * @text Repeats
 * @parent Vocabulary
 * @desc Vocabulary used for this data entry.
 * @default Hits
 *
 * @param LabelHitType:str
 * @text Hit Type
 * @parent Vocabulary
 * @desc Vocabulary used for this data entry.
 * @default Type
 *
 * @param HitType0:str
 * @text Certain Hit
 * @parent LabelHitType:str
 * @desc Vocabulary used for this data entry.
 * @default Neutral
 *
 * @param HitType1:str
 * @text Physical
 * @parent LabelHitType:str
 * @desc Vocabulary used for this data entry.
 * @default Physical
 *
 * @param HitType2:str
 * @text Magical
 * @parent LabelHitType:str
 * @desc Vocabulary used for this data entry.
 * @default Magical
 *
 * @param LabelElement:str
 * @text Element
 * @parent Vocabulary
 * @desc Vocabulary used for this data entry.
 * @default Element
 *
 * @param ElementWeapon:str
 * @text Weapon-Based
 * @parent LabelElement:str
 * @desc Vocabulary used for this data entry.
 * @default \I[97]Weapon
 *
 * @param ElementNone:str
 * @text Nonelement Element
 * @parent LabelElement:str
 * @desc Vocabulary used for this data entry.
 * @default \I[160]No Element
 *
 * @param DamageType
 * @text Damage Type
 * @parent Vocabulary
 *
 * @param DamageType1:str
 * @text HP Damage
 * @parent DamageType
 * @desc Vocabulary used for this data entry. If Visu_1_BattleCore
 * is installed, priority goes to its Damage Style settings.
 * @default %1 Damage Multiplier
 *
 * @param DamageType2:str
 * @text MP Damage
 * @parent DamageType
 * @desc Vocabulary used for this data entry. If Visu_1_BattleCore
 * is installed, priority goes to its Damage Style settings.
 * @default %1 Damage Multiplier
 *
 * @param DamageType3:str
 * @text HP Recovery
 * @parent DamageType
 * @desc Vocabulary used for this data entry. If Visu_1_BattleCore
 * is installed, priority goes to its Damage Style settings.
 * @default %1 Recovery Multiplier
 *
 * @param DamageType4:str
 * @text MP Recovery
 * @parent DamageType
 * @desc Vocabulary used for this data entry. If Visu_1_BattleCore
 * is installed, priority goes to its Damage Style settings.
 * @default %1 Recovery Multiplier
 *
 * @param DamageType5:str
 * @text HP Drain
 * @parent DamageType
 * @desc Vocabulary used for this data entry. If Visu_1_BattleCore
 * is installed, priority goes to its Damage Style settings.
 * @default %1 Drain Multiplier
 *
 * @param DamageType6:str
 * @text MP Drain
 * @parent DamageType
 * @desc Vocabulary used for this data entry. If Visu_1_BattleCore
 * is installed, priority goes to its Damage Style settings.
 * @default %1 Drain Multiplier
 *
 * @param Effects
 * @parent Vocabulary
 *
 * @param LabelRecoverHP:str
 * @text Recover HP
 * @parent Effects
 * @desc Vocabulary used for this data entry.
 * @default %1 Recovery
 *
 * @param LabelRecoverMP:str
 * @text Recover MP
 * @parent Effects
 * @desc Vocabulary used for this data entry.
 * @default %1 Recovery
 *
 * @param LabelRecoverTP:str
 * @text Recover TP
 * @parent Effects
 * @desc Vocabulary used for this data entry.
 * @default %1 Recovery
 *
 * @param LabelSelfGainTP:str
 * @text Self Gain TP
 * @parent Effects
 * @desc Vocabulary used for this data entry.
 * @default User %1
 *
 * @param LabelDamageHP:str
 * @text Damage HP
 * @parent Effects
 * @desc Vocabulary used for this data entry.
 * @default %1 Damage
 *
 * @param LabelDamageMP:str
 * @text Damage MP
 * @parent Effects
 * @desc Vocabulary used for this data entry.
 * @default %1 Damage
 *
 * @param LabelDamageTP:str
 * @text Damage TP
 * @parent Effects
 * @desc Vocabulary used for this data entry.
 * @default %1 Damage
 *
 * @param LabelApply:str
 * @text Add State/Buff
 * @parent Effects
 * @desc Vocabulary used for this data entry.
 * @default Applies
 *
 * @param LabelRemove:str
 * @text Remove State/Buff
 * @parent Effects
 * @desc Vocabulary used for this data entry.
 * @default Removes
 *
 * @param EquipType
 * @parent Vocabulary
 * @text Equip Type
 *
 * @param WeaponType:str
 * @text Weapon Type
 * @parent EquipType
 * @desc Vocabulary used for this data entry.
 * @default Weapon Type
 *
 * @param ArmorType:str
 * @text Armor Type
 * @parent EquipType
 * @desc Vocabulary used for this data entry.
 * @default Armor Type
 *
 * @param NoEquipTypeResult:str
 * @text No Equip Type
 * @parent EquipType
 * @desc Marker used to show an unlisted equip type.
 * @default -
 *
 */
//=============================================================================

function _0x5248() {
  const _0x126786 = [
    'getClassIdWithName',
    'meetsItemConditionsNotetags',
    'processTouchModernControls',
    'sellPriceRate',
    'LabelDamageHP',
    'getItemEffectsHpDamageLabel',
    'isClicked',
    'description',
    'MAXMP',
    'push',
    'Param',
    '1735194orvwTR',
    'getItemSpeedLabel',
    'deactivate',
    'Scene_Equip_commandEquip',
    'statusWidth',
    'CmdStyle',
    'setBackgroundType',
    'drawItemName',
    'reloadMapIfUpdated',
    'activate',
    '%1%',
    'fontSizeRatio',
    'CmdIconCancel',
    'isSellCommandEnabled',
    'mainFontSize',
    'sellWindowRect',
    'ItemQuantityFontSize',
    'setHp',
    'Pick\x20and\x20choose\x20equipment\x20to\x20change.',
    'setStatusWindow',
    'floor',
    'middle',
    'proxyItem',
    '_bypassNewLabel',
    'ArmorType',
    'ARRAYNUM',
    'CmdCancelRename',
    'SPEED',
    'CmdIconOptimize',
    'min',
    'getItemColor',
    'getItemEffectsRemovedStatesBuffsLabel',
    'ADDED\x20EFFECTS',
    'buyWindowRectItemsEquipsCore',
    'getWeaponIdWithName',
    'initNewItemsList',
    'changeTextColor',
    'onSlotCancel',
    'gainItem',
    'isNewItem',
    'setHelpWindowItem',
    'localeCompare',
    'MP\x20DAMAGE',
    '_scene',
    'paintOpacity',
    'SellTurnSwitchOn',
    'DrawEquipDoubleData',
    'contents',
    'ScopeAllyOrEnemy',
    'Game_Actor_discardEquip',
    'SellPriceJS',
    'clamp',
    'Scene_Equip_onSlotOk',
    'addLoadListener',
    'playOkSound',
    'troopArtifacts',
    'drawActorParamClassic',
    'update',
    'Consumable',
    'armor-%1',
    'anyEmptyEquipSlotsOfSameEtype',
    'ParseWeaponNotetags',
    'item-%1',
    'code',
    'isProxyItem',
    'Window_ItemList_maxCols',
    '_commandNameWindow',
    'ElementWeapon',
    'maxCols',
    'nonOptimizeEtypes',
    'isEquipWtypeOk',
    'gainTP',
    'LabelConsume',
    'setHandler',
    'getEquipRequirements',
    'drawItem',
    'weaponTypes',
    '_forcedSlots',
    'buttonAssistCategory',
    'Scene_Shop_doSell',
    'inBattle',
    'VisuMZ_2_WeaponSwapSystem',
    'mainCommandWidth',
    'ParseItemNotetags',
    'postCreateItemWindowModernControls',
    '_list',
    '_buttonAssistWindow',
    'getItemRepeatsText',
    'isEquipItem',
    'cursorLeft',
    '3280464jBwMFb',
    '\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20MaxHP\x20=\x200;\x20let\x20MaxMP\x20=\x200;\x20let\x20ATK\x20=\x200;\x20let\x20DEF\x20=\x200;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20MAT\x20=\x200;\x20let\x20MDF\x20=\x200;\x20let\x20AGI\x20=\x200;\x20let\x20LUK\x20=\x200;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20[MaxHP,\x20MaxMP,\x20ATK,\x20DEF,\x20MAT,\x20MDF,\x20AGI,\x20LUK][paramId];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20',
    'JSON',
    'drawItemEffectsSelfTpGain',
    'values',
    'HideAllSwitches',
    '===',
    'every',
    'Game_BattlerBase_paramPlus_artifact',
    'FUNC',
    'mhp',
    'isOpen',
    'etypeId',
    'optimize',
    'activateSellWindow',
    'scope',
    'LayoutStyle',
    'AllWeapons',
    'meetsEquipRequirement',
    'Window_EquipSlot_isEnabled',
    'getItemConsumableText',
    'addChild',
    'SpeedNeg999',
    'numItems',
    'getShopTrackingItem',
    'drawEquipData',
    'NoEquipTypeResult',
    'getItemEffectsHpRecoveryText',
    'isHoverEnabled',
    'SortByIDandPriority',
    'ParseArmorNotetags',
    'Scene_Shop_onBuyCancel',
    'Scene_Shop_createCategoryWindow',
    'HIT',
    'DrawIcons',
    'actor',
    'DrawItemData',
    'isPressed',
    'isClearEquipOk',
    'Game_Actor_forceChangeEquip',
    '_doubleTouch',
    'rateHP',
    'ClassicWeaponParameters',
    'limitedPageUpDownSceneCheck',
    'occasion',
    'ExtDisplayedParams',
    'createBitmap',
    'some',
    'addBuyCommand',
    'buttonAssistText3',
    'createCommandNameWindow',
    'consumeItem',
    'addEquipCommand',
    'updateChangedSlots',
    'Blacklist',
    'categoryNameWindowDrawBackground',
    'clearCmdDesc',
    'alterSkillName',
    'addInnerChild',
    'center',
    'categoryList',
    'helpDesc',
    'LabelRepeats',
    'isDrawItemNumber',
    'drawParamsItemsEquipsCore',
    'getItemEffectsSelfTpGainLabel',
    '_item',
    'onBuyCancelItemsEquipsCore',
    'isSceneShop',
    'onCategoryCancel',
    '_allowArtifactTraitObjects',
    'Scope%1',
    'updateSmoothScroll',
    '_shopStatusMenuAlly',
    'gaugeBackColor',
    'DrawPortraitJS',
    'Actors',
    'Scene_Item',
    'optimizeEquipments',
    'PurchaseOnly',
    'modifiedBuyPriceItemsEquipsCore',
    'Speed0',
    'SetupArtifactItemIDs',
    'placeItemNewLabel',
    'ShopScene',
    'ItemQuantityFmt',
    'textColor',
    'processShiftRemoveShortcut',
    'itemHasEquipLimit',
    'PHA',
    '_commandWindow',
    'refreshActorEquipSlotsIfUpdated',
    'SwitchSell',
    'buttonAssistOffset3',
    'CEV',
    'MANUAL',
    '_helpWindow',
    'Step2End',
    'setupItemDamageTempActors',
    'refreshActor',
    'isClearCommandAdded',
    'onSellOkItemsEquipsCore',
    'mainAreaHeight',
    'isUseModernControls',
    'isArtifact',
    'Window_ShopBuy_item',
    'Scene_Item_itemWindowRect',
    'isCommandEnabled',
    'drawItemNumber',
    'Speed2000',
    'HRG',
    'drawItemCustomEntryLine',
    'equip2',
    'auto',
    'MenuPortraits',
    'pop',
    'textLocale',
    'Window_Selectable_setHelpWindowItem',
    'RemoveEquipIcon',
    'Text',
    'BackRectColor',
    'drawItemDarkRect',
    'isEnabled',
    '_slotWindow',
    'Window_ItemCategory_setItemWindow',
    'Window_ShopBuy_goodsToItem',
    'addShopTrackingItem',
    'match',
    'onSlotOkAutoSelect',
    'KeyItemProtect',
    'maxItems',
    'Scene_Item_categoryWindowRect',
    'addState',
    'meetsItemConditions',
    'cancel',
    'forceResetEquipSlots',
    'isCursedItem',
    'start',
    'meetsShopListingConditions',
    'paramchangeTextColor',
    'prepareRefreshItemsEquipsCoreLayout',
    'smallParamFontSize',
    'prepareNewEquipSlotsOnLoad',
    'ARMOR',
    'maxmp',
    'setHelpWindow',
    'equipItems',
    'foreground',
    'getItemQuantityText',
    'successRate',
    'meetsEquipRequirements',
    'CmdIconSell',
    'iconWidth',
    'buttonAssistKey3',
    'armor',
    'speed',
    '_allowArtifactParamBase',
    'buttonAssistSlotWindowShift',
    'EquipParams',
    'getItemDamageAmountLabelBattleCore',
    'fill',
    'isBuyCommandEnabled',
    'Parse_Notetags_Prices',
    'OffsetX',
    'hideDisabledCommands',
    'loadPicture',
    'New',
    'HP\x20DAMAGE',
    'EFFECT_RECOVER_HP',
    'MaxHP',
    'FieldUsable',
    'commandName',
    'canConsumeItem',
    'uiMenuStyle',
    'getShopTrackingData',
    'drawItemEffectsAddedStatesBuffs',
    'isCancelled',
    'Window_Selectable_refresh',
    'artifacts',
    'CursedTextPopup',
    'equips',
    'index',
    'ItemMenuStatusRect',
    'map',
    'createSellWindow',
    'getItemEffectsTpRecoveryText',
    'double',
    'EFFECT_ADD_DEBUFF',
    'getProxyItem',
    '(%1)',
    '_itemIDs',
    'HiddenItemB',
    'isEquipTypeSealed',
    'getItemDamageAmountTextBattleCore',
    '#%1',
    'deepCopy',
    'damage',
    '_cache_etypeIDs',
    'n/a',
    '_getEquipRequirements',
    'onBuyItem',
    'purifyCursedEquips',
    'Parse_Notetags_ParamValues',
    'Settings',
    'drawItemEffectsTpDamage',
    'createSlotWindow',
    'Type',
    'activateItemWindow',
    'height',
    '_shopStatusMenuMode',
    'MaxArmors',
    'processCursorMoveModernControls',
    '0000',
    '_sellWindow',
    'Scene_Item_createItemWindow',
    'Scene_Shop_sellWindowRect',
    'armors',
    'buyingPrice',
    'hide',
    'Slots',
    'MCR',
    '\x5cI[%1]',
    'DrawFaceJS',
    'items',
    'Game_Party_gainItem',
    'Window_EquipCommand_initialize',
    'call',
    'DrawEquipClassicData',
    '%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.',
    'loseItem',
    'refreshCursor',
    'Categories',
    'UNDEFINED!',
    'uiInputPosition',
    '+%1%',
    'possession',
    'geUpdatedLayoutStatusWidth',
    'active',
    'buffIconIndex',
    'ItemScene',
    'registerCommand',
    'canUse',
    'isOptimizeEquipOk',
    'slotWindowRect',
    'isHandled',
    '_resetFontSize',
    'ARRAYSTRUCT',
    'itemWindowRectItemsEquipsCore',
    'commandEquip',
    'getItemEffectsTpRecoveryLabel',
    'processHandling',
    '_newLabelSprites',
    'forceChangeEquip',
    'AGI',
    'categoryItemTypes',
    'PurifyActors',
    'isCursorMovable',
    'ScopeRandomEnemies',
    'prepareNextScene',
    'LabelElement',
    'onTouchSelectModern',
    'sort',
    'updateMoneyAmount',
    'Game_BattlerBase_param',
    'price',
    'FontSize',
    '_newLabelOpacityChange',
    'categoryNameWindowCenter',
    'setValue',
    '_handlers',
    'getInputButtonString',
    'addCommand',
    'ShiftShortcutKey',
    'EFFECT_REMOVE_BUFF',
    'Window_ItemList_updateHelp',
    'SortBy',
    'note',
    'USER\x20TP\x20GAIN',
    'includes',
    'setNewItem',
    'initEquips',
    'onTouchSelect',
    'textWidth',
    'Icon',
    '_newItemsList',
    'tpGain',
    'Scene_ItemBase_activateItemWindow',
    '1224875FDhqHR',
    'Window_ShopBuy_price',
    'NeverUsable',
    'Scene_Equip_slotWindowRect',
    'Window_ShopCommand_initialize',
    'flatHP',
    'traitObjects',
    'categoryWindowRect',
    'commandNameWindowDrawText',
    'CheckCursedItemMsg',
    'toUpperCase',
    'fontSize',
    'drawCustomShopGraphic',
    'defaultItemMax',
    'createNewLabelSprite',
    'EFFECT_ADD_STATE',
    'itemTextAlign',
    'ScopeRandomAny',
    'ScopeEnemyOrAlly',
    'SetupProxyItemGroup',
    'EFFECT_RECOVER_MP',
    'Scene_Equip_createCommandWindow',
    'isPurifyItemSwapOk',
    'getItemRepeatsLabel',
    'version',
    'SellPriceRate',
    'changeEquipBase',
    '\x5cI[%1]%2',
    'commandNameWindowCenter',
    'sellPriceOfItem',
    'addShopTrackingGoldBuy',
    'Weapon\x20Type',
    'paramJS',
    '_dummyWindow',
    'HitType%1',
    'drawEquipDataClassic',
    'powerDownColor',
    'REC',
    'isEquipped',
    'ShopListingRegExp',
    'MP\x20RECOVERY',
    'Step3Start',
    'drawItemDamageAmount',
    'Enable',
    'value',
    'classic',
    '120057leEwoz',
    'Scene_Shop_categoryWindowRect',
    'Scene_Shop',
    'HP\x20RECOVERY',
    'filter',
    'ItemMenuStatusBgType',
    'gaugeLineHeight',
    'hitIndex',
    'revertGlobalNamespaceVariables',
    'ClassicArmorParameters',
    'CoreEngine',
    'MAT',
    'canSortListItemScene',
    'trim',
    'NoChangeMarker',
    'Step1End',
    'bitmap',
    'drawText',
    'MDF',
    'atk',
    'drawItemEffectsMpDamage',
    'tradeItemWithParty',
    'setItem',
    'determineBaseSellingPrice',
    'playCursorSound',
    'commandBuy',
    'drawItemEffectsHpRecovery',
    'selfTP',
    'onSlotOk',
    'helpAreaTop',
    'getSkillIdWithName',
    'process_VisuMZ_ItemsEquipsCore_RegExp',
    'drawItemData',
    'createCategoryNameWindow',
    'getItemEffectsRemovedStatesBuffsText',
    'isPageChangeRequested',
    'Scene_Shop_statusWindowRect',
    '_getClassRequirements',
    'itemPadding',
    'DoubleWeaponParameters',
    'elements',
    'visible',
    'repeats',
    'buttonAssistText2',
    'setCategory',
    'ATK',
    'isGoodShown',
    'onCategoryCancelItemsEquipsCore',
    'round',
    'EQUIP_DELAY_MS',
    'Game_Actor_equips_artifacts',
    'QoL',
    'parse',
    '_itemData',
    'text',
    'versionId',
    'FontColor',
    'left',
    'resetTextColor',
    'Armor\x20Type',
    'createCommandWindow',
    'exit',
    'forceChangeEquipSlots',
    'isArray',
    'isShiftShortcutKeyForRemove',
    'getItemScopeText',
    'onBuyOk',
    'checkItemConditionsSwitchNotetags',
    'Occasion%1',
    'bestEquipItem',
    'mmp',
    'changeEquip',
    'createItemWindow',
    'atypeId',
    'getItemSuccessRateLabel',
    'Game_Item_setObject',
    'getItemDamageAmountLabelOriginal',
    '_category',
    'CONSUMABLE',
    'LabelDamageMP',
    'initShopTrackingData',
    'loadSystem',
    'MaxMP',
    'isOpenAndActive',
    'currentSymbol',
    '_customItemInfo',
    'StatusWindowWidth',
    'NUM',
    'shouldCommandWindowExist',
    'isOptimizeCommandEnabled',
    'commandSellItemsEquipsCore',
    'discardEquip',
    'length',
    'needsNewTempActor',
    'artifactIDs',
    'LabelDamageTP',
    'Scene_Shop_create',
    'getPurifyTransformation',
    'refresh',
    'processCursorMove',
    'value2',
    'sortListItemScene',
    'process_VisuMZ_ItemsEquipsCore_EquipSlots',
    'categoryNameWindowDrawText',
    'getItemEffectsMpRecoveryText',
    'icon',
    'onTouchSelectModernControls',
    'level',
    'allowCreateStatusWindow',
    '?????',
    'cursorRight',
    'CommandAddClear',
    'itypeId',
    'IconSet',
    '_goodsCount',
    'getItemEffectsSelfTpGainText',
    'getParamValueClassicNoCore',
    '\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20enabled\x20=\x20true;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20enabled;\x0a\x20\x20\x20\x20\x20\x20\x20\x20',
    'ITEMS_EQUIPS_CORE',
    'normalColor',
    'updateCommandNameWindow',
    'getNextAvailableEtypeId',
    'buyWindowRect',
    'isUseItemsEquipsCoreUpdatedLayout',
    'goodsToItem',
    'weapon-%1',
    'SpeedNeg1999',
    'addWindow',
    'TGR',
    'hideNewLabelSprites',
    'sortPriority',
    'adjustHiddenShownGoods',
    'makeCommandList',
    'ItemsEquipsCore',
    'drawEquipDataDouble',
    'paramId',
    'commandStyleCheck',
    'currencyUnit',
    'LabelRecoverMP',
    'DEF',
    '_checkEquipRequirements',
    'equip',
    'itemEnableJS',
    'onDatabaseLoaded',
    'setTopRow',
    'category',
    'getShopTrackingGoldSell',
    'LUK',
    'getItemSuccessRateText',
    'Parse_Notetags_EquipSlots',
    'getMenuImage',
    'MultiplierStandard',
    'isEquipAtypeOk',
    'Scene_Shop_onSellCancel',
    'Game_BattlerBase_canEquip_artifact',
    'Scene_Equip_statusWindowRect',
    'getItemDamageElementLabel',
    'getItemEffectsMpDamageLabel',
    'ARRAYFUNC',
    'isUseParamNamesWithIcons',
    'getItemDamageElementText',
    'isClearCommandEnabled',
    'lineHeight',
    'ParseClassNotetags',
    'isEquipCommandEnabled',
    'textSizeEx',
    'Style',
    'hideAdditionalSprites',
    'itemAt',
    '_tempActor',
    'calcEquipItemPerformance',
    'SCOPE',
    '44QFxWED',
    'mainAreaTop',
    'MRF',
    'getEtypeIDs',
    'Step1Start',
    'drawEquipDataCompare',
    'createTempActorEquips',
    'clearNewItem',
    'Speed1000',
    'weapon',
    'Scene_Boot_onDatabaseLoaded',
    'updateCategoryNameWindow',
    'Window_EquipItem_includes',
    '_categoryNameWindow',
    'agi',
    'buttonAssistLargeIncrement',
    'maxBattleMembers',
    'commandNameWindowDrawBackground',
    'drawItemOccasion',
    'equipAdjustHpMp',
    'numberWindowRect',
    'getItemConsumableLabel',
    'SetupProxyItemGroups',
    'systemColor',
    'helpDescriptionText',
    '(+%1)',
    'isSoleWeaponType',
    'isStackableArtifact',
    'createStatusWindow',
    'setMp',
    'MRG',
    'Scene_Equip_createSlotWindow',
    'innerWidth',
    'user',
    'ListWindowCols',
    'drawItemEffectsRemovedStatesBuffs',
    'STR',
    'max',
    'Nonconsumable',
    'ParamChangeFontSize',
    'right',
    'onTouchCancel',
    'CmdHideDisabled',
    'updateHelp',
    'initialize',
    'commandBuyItemsEquipsCore',
    'numberWindowRectItemsEquipsCore',
    'STRUCT',
    'SellTurnSwitchOff',
    'Parse_Notetags_Sorting',
    'isRightInputMode',
    'Scene_Item_create',
    'updatedLayoutStyle',
    'status',
    'categoryStyleCheck',
    'Scene_Shop_onSellOk',
    'isDualWield',
    'isMainMenuCoreMenuImageOptionAvailable',
    'removeBuff',
    'initNewLabelSprites',
    'removeDebuff',
    'adjustItemWidthByStatus',
    '2564452JQoYVI',
    'SwitchID',
    'sell',
    'ARRAYEVAL',
    'isTriggered',
    'elementId',
    'equipSlotIndex',
    'drawItemEquipType',
    'Game_BattlerBase_param_artifact',
    'boxWidth',
    'optKeyItemsNumber',
    'battleMembers',
    'buttonAssistKey1',
    'addClearCommand',
    'wtypeId',
    'postCreateItemsEquipsCore',
    'Scene_Shop_buyingPrice',
    '_skillIDs',
    'CmdIconBuy',
    'isItem',
    'onTouchOk',
    'ShopMenuStatusStandard',
    'Parse_Notetags_ParamJS',
    'paramValueByName',
    '_equips',
    'drawItemEffectsMpRecovery',
    'damageColor',
    'getClassRequirements',
    'pagedown',
    'mat',
    'HIT\x20TYPE',
    '_classIDs',
    'drawNewLabelIcon',
    'maxItemAmount',
    'Scope7',
    'Game_Actor_changeClass',
    'sellingPrice',
    'StatusWindow',
    'cursorPagedown',
    'LabelHitType',
    'Step2Start',
    'drawTextEx',
    'goldWindowRect',
    'getEtypeIdWithName',
    'itemLineRect',
    'RegularItems',
    'canEquip',
    'uiHelpPosition',
    'isCustomParameter',
    'itemWindowRect',
    'cursorDown',
    'Window_EquipStatus_refresh',
    'Scene_Shop_buyWindowRect',
    'getItemEffectsTpDamageText',
    'commandSell',
    'pageup',
    'Scene_Shop_activateSellWindow',
    'helpWindowRectItemsEquipsCore',
    'param',
    'paramPlus',
    'keyItem',
    'isOptimizeCommandAdded',
    'show',
    'onBuyCancel',
    'drawItemQuantity',
    'addShopTrackingGoldSell',
    'Window_ShopBuy_refresh',
    'List',
    'getItemSpeedText',
    'buttonAssistSmallIncrement',
    'drawItemConsumable',
    'Window_ItemList_colSpacing',
    '×%1',
    'getItemEffects',
    '_calculatingJSParameters',
    '_data',
    'drawItemStyleIcon',
    '_tempActorA',
    'paramBase',
    'CmdIconClear',
    'getTextColor',
    'LabelSelfGainTP',
    '_goods',
    '_categoryWindow',
    'LabelRecoverTP',
    'onSellOk',
    'resetFontSettings',
    'DrawParamJS',
    'scrollTo',
    'Scene_Battle',
    '_newLabelOpacity',
    'BattleUsable',
    'getShopTrackingGoldBuy',
    'EquipScene',
    'Width',
    'commandWindowRectItemsEquipsCore',
    'DamageType%1',
    'drawItemHitType',
    'AllItems',
    'buttonAssistText1',
    'EXR',
    'VisuMZ_1_SkillsStatesCore',
    'getEquipDataStyle',
    'drawUpdatedParamName',
    'prepareItemCustomData',
    'indexOf',
    'clear',
    'drawItemEquipSubType',
    'drawActorParamDifference',
    'changePaintOpacity',
    'getItemEffectsTpDamageLabel',
    'mainFontFace',
    'updateNewLabelOpacity',
    'addOptimizeCommand',
    'ARRAYJSON',
    '_resetFontColor',
    'iconHeight',
    'drawItemCost',
    'ShowAnySwitches',
    'processShopCondListingOnBuyItem',
    'makeItemData',
    'WeaponType',
    'drawRemoveItem',
    'troopArtifactIDs',
    'ARRAYSTR',
    'Parse_Notetags_EnableJS',
    'traits',
    'test',
    'width',
    'ParamValueFontSize',
    'drawIcon',
    'addShopTrackingItemSell',
    'drawItemCustomEntries',
    'getEtypeIDsCache',
    'drawItemRepeats',
    'getItemEffectsHpRecoveryLabel',
    'ConvertParams',
    'isEquipCommandAdded',
    'setObject',
    'SUCCESS\x20RATE',
    'Scene_Shop_goldWindowRect',
    'doBuy',
    'VisuMZ_0_CoreEngine',
    'cursorPageup',
    'removeStateBuffChanges',
    'Scene_Shop_prepare',
    'colSpacing',
    'Game_BattlerBase_meetsItemConditions',
    'select',
    'statusWindowRect',
    'EFFECT_REMOVE_DEBUFF',
    'EFFECT_GAIN_TP',
    'MaxIcons',
    'drawCustomShopGraphicLoad',
    'iconIndex',
    'Game_Party_initialize',
    'loadCharacter',
    'blt',
    'getArmorIdWithName',
    'dataId',
    'drawItemDamageElement',
    'removeBattleTestArtifacts',
    'placeNewLabel',
    'members',
    'currentClass',
    'statusWindowRectItemsEquipsCore',
    'switchProxyItem',
    'isKeyItem',
    'Game_Actor_paramPlus',
    'helpWindowRect',
    'slotWindowRectItemsEquipsCore',
    '_scrollDuration',
    'ceil',
    'addItemCategories',
    'isShiftRemoveShortcutEnabled',
    'allowShiftScrolling',
    'Scene_Equip_onSlotCancel',
    'VisuMZ_1_BattleCore',
    'format',
    'Window_ShopStatus_setItem',
    'Game_Party_gainItem_artifact',
    'isWeapon',
    'TextAlign',
    'prototype',
    'Game_Party_numItems',
    'loadFaceImages',
    'callUpdateHelp',
    'addCancelCommand',
    'constructor',
    'Parse_Notetags_Batch',
    'setupBattleTestItems',
    'postCreateCategoryWindowItemsEquipsCore',
    'Scene_Shop_helpWindowRect',
    'smoothSelect',
    'BuyTurnSwitchOn',
    'params',
    '_tempActorB',
    'onActorChange',
    'Scene_Equip_create',
    'helpAreaHeight',
    'TP\x20DAMAGE',
    'drawParamText',
    'SpeedNeg2000',
    'processDrawIcon',
    'isSkill',
    'newLabelEnabled',
    'REMOVED\x20EFFECTS',
    'DAMAGE\x20MULTIPLIER',
    'NonOptimizeETypes',
    'postCreateSellWindowItemsEquipsCore',
    'Scene_Shop_createSellWindow',
    'DrawBackRect',
    'onSellCancel',
    'BorderRegExp',
    'ActorChangeEquipSlots',
    'isPartyArtifact',
    'isHovered',
    'paramPlusItemsEquipsCoreCustomJS',
    'getItemIdWithName',
    'drawItemStyleIconText',
    'isBottomHelpMode',
    'drawUpdatedAfterParamValue',
    'meetsItemConditionsJS',
    'getItemEffectsAddedStatesBuffsText',
    'contentsBack',
    'isSoleArmorType',
    'Game_Party_consumeItem',
    'GRD',
    'iconText',
    'refreshItemsEquipsCoreNoMenuImage',
    'CmdIconEquip',
    'value1',
    'isPlaytest',
    'Scene_Equip_onActorChange',
    '_paramPlus',
    'buttonAssistItemListRequirement',
    'drawItemKeyData',
    'NotConsumable',
    'drawItemActorMenuImage',
    'luk',
    'LabelSpeed',
    'Window_ItemList_drawItem',
    'getColor',
    '_statusWindow',
    'log',
    'process_VisuMZ_ItemsEquipsCore_Notetags',
    'Game_Actor_artifact',
    'drawItemEffectsHpDamage',
    'HideAnySwitches',
    'addItemCategory',
    'DrawEquipData',
    'MEV',
    'getDamageStyle',
    '_shopTrackingData',
    'EquipDataStyle',
    'popScene',
    'getParamValueClassicCore',
    'fontFace',
    'Game_Enemy_traitObjects_artifact',
    'equipSlots',
    'CommandAddOptimize',
    'categoryWindowRectItemsEquipsCore',
    'onCategoryOk',
    'drawItemScope',
    'Translucent',
    'setItemWindow',
    'HiddenItemA',
    '_weaponIDs',
    'armorTypes',
    'commandWindowRect',
    'isBattleTest',
    'RegExp',
    '54738yblsFw',
    'NAME',
    'isShowNew',
    'TP\x20RECOVERY',
    'fillRect',
    'object',
    'addStateBuffChanges',
    'drawPossession',
    'TRG',
    'resetShopSwitches',
    'CNT',
    'getMatchingInitEquip',
    'getInputMultiButtonStrings',
    'Step3End',
    'partyArtifacts',
    '_slotId',
    'setText',
    'Scene_Equip_helpWindowRect',
    'MaxItems',
    'mdf',
    'allMembers',
    '_bypassProxy',
    'A%1',
    'SwitchBuy',
    'mainAreaBottom',
    'ElementNone',
    'opacity',
    'Speed1',
    'setShopStatusWindowMode',
    'Equip\x20the\x20strongest\x20available\x20equipment.',
    'playCancel',
    'EquipAdjustHpMp',
    'Scene_Shop_onBuyOk',
    'create',
    'remove',
    'createCategoryWindow',
    'drawNewLabelText',
    'baseSellingPrice',
    'getItemsEquipsCoreBackColor2',
    '_cache',
    'getItemEffectsMpRecoveryLabel',
    'Game_Party_setupBattleTestItems_artifact',
    'nextActor',
    '120IaiKyZ',
    'commandStyle',
    'Scene_Shop_commandSell',
    'Scene_Shop_sellingPrice',
    'concat',
    'cursorUp',
    'setItemDelay',
    '_buyWindow',
    'drawUpdatedBeforeParamValue',
    '%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.',
    'removeState',
    'Scene_Item_createCategoryWindow',
    'playEquip',
    'Game_Actor_isEquipChangeOk',
    '<%1:[\x20]([\x5c+\x5c-]\x5cd+)>',
    'getItemEffectsAddedStatesBuffsLabel',
    'replace',
    'WEAPON',
    'getItemDamageAmountText',
    'addShopTrackingItemBuy',
    'drawItemSpeed',
    'clearNewLabelFromItem',
    'Window_EquipItem_isEnabled',
    'Window_ItemCategory_initialize',
    'find',
    'onSellItem',
    'ItemSceneAdjustItemList',
    'processCursorSpecialCheckModernControls',
    '_itemWindow',
    'actorId',
    'actorParams',
    'categoryStyle',
    'REPEAT',
    'drawItemEffectsTpRecovery',
    'LabelApply',
    'AlwaysUsable',
    '%1-%2',
    'Window_ShopSell_isEnabled',
    '_etypeIDs',
    'nonRemovableEtypes',
    'background',
    'split',
    'getItemOccasionText',
    'English',
    'flatMP',
    '_buyWindowLastIndex',
    'formula',
    'getItemEffectsMpDamageText',
    'categories',
    'deselect',
    'item',
    'Damage\x20Formula\x20Error\x20for\x20%1',
    'CmdTextAlign',
    'toLowerCase',
    'isTroopArtifact',
    'bind',
    'KeyItems',
    'MDR',
    'calcWindowHeight',
    'EFFECT_ADD_BUFF',
    'canShiftRemoveEquipment',
    'EVA',
    '_actor',
    'Whitelist',
    'buy',
    'splice',
    'NonRemoveETypes',
    'AllArmors',
    '+%1',
    'type',
    'postCreateSlotWindowItemsEquipsCore',
    'innerHeight',
    'effects',
    'changeBuff',
    '367207bWMMht',
    'getEmptyEquipSlotOfSameEtype',
    '_numberWindow',
    'checkShiftRemoveShortcut',
    'processDownCursorSpecialCheckModernControls',
    'MaxWeapons',
    'translucentOpacity',
    'drawParamName',
    'convertInitEquipsToItems',
    'PDR',
    'down',
    'onMenuImageLoad',
    'Remove\x20all\x20available\x20equipment.',
    'gold',
    'rateMP',
    'shift',
    'VisuMZ_1_MainMenuCore',
    'getItemDamageAmountTextOriginal',
    'Scene_Item_helpWindowRect',
    'name',
    'buttonAssistKey2',
    'powerUpColor',
    '_bypassReleaseUnequippableItemsItemsEquipsCore',
    'Scene_Shop_commandWindowRect',
    'EFFECT_REMOVE_STATE',
    'releaseUnequippableItems',
    'FDR',
    'EnableLayout',
    'Scene_Equip_commandWindowRect',
    'hasItem',
    'windowPadding',
    '\x5cb%1\x5cb',
    'LabelRemove',
    'Window_ItemList_item',
    'isEquipChangeOk',
    '_armorIDs',
    'IncludeShopItem',
    'addSellCommand',
    'isRepeated',
    'isLearnedSkill',
    'Scene_Shop_numberWindowRect',
    'consumable',
    'isArmor',
    'Parse_Notetags_Category',
    'makeDeepCopy',
    'OCCASION',
    'equipTypes',
  ];
  _0x5248 = function () {
    return _0x126786;
  };
  return _0x5248();
}
const _0x412469 = _0x2447;
function _0x2447(_0x49e52c, _0xff08c9) {
  const _0x5248ec = _0x5248();
  return (
    (_0x2447 = function (_0x2447d2, _0x10a9f7) {
      _0x2447d2 = _0x2447d2 - 0x1a6;
      let _0x2edb38 = _0x5248ec[_0x2447d2];
      return _0x2edb38;
    }),
    _0x2447(_0x49e52c, _0xff08c9)
  );
}
(function (_0x3129b5, _0x5679f5) {
  const _0x26496f = _0x2447,
    _0x2455fc = _0x3129b5();
  while (!![]) {
    try {
      const _0x13548c =
        parseInt(_0x26496f(0x3ff)) / 0x1 +
        (-parseInt(_0x26496f(0x23c)) / 0x2) * (-parseInt(_0x26496f(0x38a)) / 0x3) +
        -parseInt(_0x26496f(0x27a)) / 0x4 +
        parseInt(_0x26496f(0x5b2)) / 0x5 +
        parseInt(_0x26496f(0x439)) / 0x6 +
        (-parseInt(_0x26496f(0x5e0)) / 0x7) * (parseInt(_0x26496f(0x3b5)) / 0x8) +
        parseInt(_0x26496f(0x493)) / 0x9;
      if (_0x13548c === _0x5679f5) break;
      else _0x2455fc['push'](_0x2455fc['shift']());
    } catch (_0x3e51da) {
      _0x2455fc['push'](_0x2455fc['shift']());
    }
  }
})(_0x5248, 0xbbb8f);
var label = _0x412469(0x215),
  tier = tier || 0x0,
  dependencies = [],
  pluginData = $plugins[_0x412469(0x5e4)](function (_0x458dcd) {
    const _0x279406 = _0x412469;
    return _0x458dcd[_0x279406(0x271)] && _0x458dcd[_0x279406(0x435)][_0x279406(0x5a9)]('[' + label + ']');
  })[0x0];
(VisuMZ[label][_0x412469(0x55e)] = VisuMZ[label][_0x412469(0x55e)] || {}),
  (VisuMZ[_0x412469(0x302)] = function (_0x271524, _0x3a0146) {
    const _0x4fdd45 = _0x412469;
    for (const _0x24e6d7 in _0x3a0146) {
      if (_0x24e6d7[_0x4fdd45(0x512)](/(.*):(.*)/i)) {
        const _0xe1b109 = String(RegExp['$1']),
          _0xeb01c8 = String(RegExp['$2'])['toUpperCase']()[_0x4fdd45(0x5ed)]();
        let _0x281700, _0x482c8d, _0x5c90e9;
        switch (_0xeb01c8) {
          case _0x4fdd45(0x1e7):
            _0x281700 = _0x3a0146[_0x24e6d7] !== '' ? Number(_0x3a0146[_0x24e6d7]) : 0x0;
            break;
          case _0x4fdd45(0x452):
            (_0x482c8d = _0x3a0146[_0x24e6d7] !== '' ? JSON[_0x4fdd45(0x1c4)](_0x3a0146[_0x24e6d7]) : []), (_0x281700 = _0x482c8d[_0x4fdd45(0x54a)](_0x1a8ca3 => Number(_0x1a8ca3)));
            break;
          case 'EVAL':
            _0x281700 = _0x3a0146[_0x24e6d7] !== '' ? eval(_0x3a0146[_0x24e6d7]) : null;
            break;
          case _0x4fdd45(0x27d):
            (_0x482c8d = _0x3a0146[_0x24e6d7] !== '' ? JSON[_0x4fdd45(0x1c4)](_0x3a0146[_0x24e6d7]) : []), (_0x281700 = _0x482c8d['map'](_0xd5eba => eval(_0xd5eba)));
            break;
          case _0x4fdd45(0x495):
            _0x281700 = _0x3a0146[_0x24e6d7] !== '' ? JSON['parse'](_0x3a0146[_0x24e6d7]) : '';
            break;
          case _0x4fdd45(0x2ec):
            (_0x482c8d = _0x3a0146[_0x24e6d7] !== '' ? JSON['parse'](_0x3a0146[_0x24e6d7]) : []), (_0x281700 = _0x482c8d[_0x4fdd45(0x54a)](_0x243162 => JSON[_0x4fdd45(0x1c4)](_0x243162)));
            break;
          case _0x4fdd45(0x49c):
            _0x281700 = _0x3a0146[_0x24e6d7] !== '' ? new Function(JSON[_0x4fdd45(0x1c4)](_0x3a0146[_0x24e6d7])) : new Function('return\x200');
            break;
          case _0x4fdd45(0x22e):
            (_0x482c8d = _0x3a0146[_0x24e6d7] !== '' ? JSON[_0x4fdd45(0x1c4)](_0x3a0146[_0x24e6d7]) : []),
              (_0x281700 = _0x482c8d[_0x4fdd45(0x54a)](_0x42ff87 => new Function(JSON[_0x4fdd45(0x1c4)](_0x42ff87))));
            break;
          case _0x4fdd45(0x260):
            _0x281700 = _0x3a0146[_0x24e6d7] !== '' ? String(_0x3a0146[_0x24e6d7]) : '';
            break;
          case _0x4fdd45(0x2f6):
            (_0x482c8d = _0x3a0146[_0x24e6d7] !== '' ? JSON[_0x4fdd45(0x1c4)](_0x3a0146[_0x24e6d7]) : []), (_0x281700 = _0x482c8d[_0x4fdd45(0x54a)](_0x1e5da8 => String(_0x1e5da8)));
            break;
          case _0x4fdd45(0x26b):
            (_0x5c90e9 = _0x3a0146[_0x24e6d7] !== '' ? JSON['parse'](_0x3a0146[_0x24e6d7]) : {}), (_0x271524[_0xe1b109] = {}), VisuMZ[_0x4fdd45(0x302)](_0x271524[_0xe1b109], _0x5c90e9);
            continue;
          case _0x4fdd45(0x589):
            (_0x482c8d = _0x3a0146[_0x24e6d7] !== '' ? JSON[_0x4fdd45(0x1c4)](_0x3a0146[_0x24e6d7]) : []),
              (_0x281700 = _0x482c8d[_0x4fdd45(0x54a)](_0x519546 => VisuMZ[_0x4fdd45(0x302)]({}, JSON[_0x4fdd45(0x1c4)](_0x519546))));
            break;
          default:
            continue;
        }
        _0x271524[_0xe1b109] = _0x281700;
      }
    }
    return _0x271524;
  }),
  (_0x65528a => {
    const _0x59429f = _0x412469,
      _0x43f51e = _0x65528a[_0x59429f(0x412)];
    for (const _0x30eda7 of dependencies) {
      if (!Imported[_0x30eda7]) {
        alert(_0x59429f(0x3be)[_0x59429f(0x32c)](_0x43f51e, _0x30eda7)), SceneManager[_0x59429f(0x1cd)]();
        break;
      }
    }
    const _0x5d18c1 = _0x65528a[_0x59429f(0x435)];
    if (_0x5d18c1['match'](/\[Version[ ](.*?)\]/i)) {
      const _0x2bc660 = Number(RegExp['$1']);
      _0x2bc660 !== VisuMZ[label]['version'] && (alert(_0x59429f(0x577)['format'](_0x43f51e, _0x2bc660)), SceneManager[_0x59429f(0x1cd)]());
    }
    if (_0x5d18c1['match'](/\[Tier[ ](\d+)\]/i)) {
      const _0x20f150 = Number(RegExp['$1']);
      _0x20f150 < tier
        ? (alert(
            '%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.'[
              _0x59429f(0x32c)
            ](_0x43f51e, _0x20f150, tier),
          ),
          SceneManager['exit']())
        : (tier = Math['max'](_0x20f150, tier));
    }
    VisuMZ[_0x59429f(0x302)](VisuMZ[label][_0x59429f(0x55e)], _0x65528a['parameters']);
  })(pluginData),
  PluginManager['registerCommand'](pluginData['name'], _0x412469(0x350), _0x4c59f6 => {
    const _0x25121e = _0x412469;
    VisuMZ[_0x25121e(0x302)](_0x4c59f6, _0x4c59f6);
    const _0x389d3f = _0x4c59f6[_0x25121e(0x4df)]['map'](_0x4f4012 => $gameActors['actor'](_0x4f4012)),
      _0xebc018 = _0x4c59f6[_0x25121e(0x56e)][_0x25121e(0x54a)](_0x123fba => $dataSystem['equipTypes'][_0x25121e(0x2e3)](_0x123fba[_0x25121e(0x5ed)]()));
    for (const _0x584a5b of _0x389d3f) {
      if (!_0x584a5b) continue;
      _0x584a5b['forceChangeEquipSlots'](_0xebc018);
    }
  }),
  PluginManager[_0x412469(0x583)](pluginData[_0x412469(0x412)], 'ActorResetEquipSlots', _0x7c534f => {
    const _0x563386 = _0x412469;
    VisuMZ[_0x563386(0x302)](_0x7c534f, _0x7c534f);
    const _0x20ef25 = _0x7c534f['Actors'][_0x563386(0x54a)](_0x496162 => $gameActors[_0x563386(0x4b6)](_0x496162));
    for (const _0x50a1df of _0x20ef25) {
      if (!_0x50a1df) continue;
      _0x50a1df[_0x563386(0x51a)]();
    }
  }),
  PluginManager[_0x412469(0x583)](pluginData[_0x412469(0x412)], _0x412469(0x592), _0x33a50d => {
    const _0x53c8dc = _0x412469;
    if ($gameParty[_0x53c8dc(0x489)]()) return;
    VisuMZ['ConvertParams'](_0x33a50d, _0x33a50d);
    const _0x2eac54 = _0x33a50d[_0x53c8dc(0x4df)]['map'](_0x43ba8c => $gameActors['actor'](_0x43ba8c));
    for (const _0x174169 of _0x2eac54) {
      if (!_0x174169) continue;
      _0x174169[_0x53c8dc(0x55c)]();
    }
  }),
  PluginManager[_0x412469(0x583)](pluginData[_0x412469(0x412)], 'PurifyParty', _0x51e377 => {
    const _0x508182 = _0x412469;
    if ($gameParty[_0x508182(0x489)]()) return;
    $gameParty[_0x508182(0x55c)]();
  }),
  PluginManager[_0x412469(0x583)](pluginData[_0x412469(0x412)], 'BatchShop', _0x41a6d4 => {
    const _0x2e2368 = _0x412469;
    VisuMZ[_0x2e2368(0x302)](_0x41a6d4, _0x41a6d4);
    const _0x5729fc = [],
      _0x2f1f9e = _0x41a6d4[_0x2e2368(0x4c9)][_0x2e2368(0x54a)](_0x439c47 => _0x439c47[_0x2e2368(0x5bc)]()['trim']()),
      _0x108084 = _0x41a6d4[_0x2e2368(0x3f4)]['map'](_0x2640f1 => _0x2640f1[_0x2e2368(0x5bc)]()['trim']()),
      _0x130555 = _0x41a6d4[_0x2e2368(0x5ef)] >= _0x41a6d4['Step1Start'] ? _0x41a6d4[_0x2e2368(0x240)] : _0x41a6d4['Step1End'],
      _0x24cbcc = _0x41a6d4['Step1End'] >= _0x41a6d4[_0x2e2368(0x240)] ? _0x41a6d4[_0x2e2368(0x5ef)] : _0x41a6d4[_0x2e2368(0x240)],
      _0x2aa832 = Array(_0x24cbcc - _0x130555 + 0x1)
        [_0x2e2368(0x533)]()
        [_0x2e2368(0x54a)]((_0x3364ca, _0x2d29bb) => _0x130555 + _0x2d29bb);
    for (const _0x451b22 of _0x2aa832) {
      const _0x20be94 = $dataItems[_0x451b22];
      if (!_0x20be94) continue;
      if (!VisuMZ['ItemsEquipsCore'][_0x2e2368(0x423)](_0x20be94, _0x2f1f9e, _0x108084)) continue;
      _0x5729fc[_0x2e2368(0x437)]([0x0, _0x451b22, 0x0, _0x20be94[_0x2e2368(0x59b)]]);
    }
    const _0x14bdab = _0x41a6d4[_0x2e2368(0x4f4)] >= _0x41a6d4[_0x2e2368(0x2a2)] ? _0x41a6d4['Step2Start'] : _0x41a6d4[_0x2e2368(0x4f4)],
      _0x218d87 = _0x41a6d4[_0x2e2368(0x4f4)] >= _0x41a6d4[_0x2e2368(0x2a2)] ? _0x41a6d4[_0x2e2368(0x4f4)] : _0x41a6d4['Step2Start'],
      _0x59ead4 = Array(_0x218d87 - _0x14bdab + 0x1)
        ['fill']()
        ['map']((_0x49bfd4, _0x2dc9ef) => _0x14bdab + _0x2dc9ef);
    for (const _0x3c667f of _0x59ead4) {
      const _0x27a6c5 = $dataWeapons[_0x3c667f];
      if (!_0x27a6c5) continue;
      if (!VisuMZ[_0x2e2368(0x215)]['IncludeShopItem'](_0x27a6c5, _0x2f1f9e, _0x108084)) continue;
      _0x5729fc[_0x2e2368(0x437)]([0x1, _0x3c667f, 0x0, _0x27a6c5[_0x2e2368(0x59b)]]);
    }
    const _0x5e2fe4 = _0x41a6d4[_0x2e2368(0x397)] >= _0x41a6d4[_0x2e2368(0x5db)] ? _0x41a6d4['Step3Start'] : _0x41a6d4['Step3End'],
      _0x5c2b83 = _0x41a6d4[_0x2e2368(0x397)] >= _0x41a6d4['Step3Start'] ? _0x41a6d4['Step3End'] : _0x41a6d4[_0x2e2368(0x5db)],
      _0x1d4eea = Array(_0x5c2b83 - _0x5e2fe4 + 0x1)
        [_0x2e2368(0x533)]()
        ['map']((_0x119cd5, _0x429738) => _0x5e2fe4 + _0x429738);
    for (const _0x51fbbd of _0x1d4eea) {
      const _0x54cb3a = $dataArmors[_0x51fbbd];
      if (!_0x54cb3a) continue;
      if (!VisuMZ[_0x2e2368(0x215)][_0x2e2368(0x423)](_0x54cb3a, _0x2f1f9e, _0x108084)) continue;
      _0x5729fc[_0x2e2368(0x437)]([0x2, _0x51fbbd, 0x0, _0x54cb3a[_0x2e2368(0x59b)]]);
    }
    SceneManager[_0x2e2368(0x437)](Scene_Shop), SceneManager[_0x2e2368(0x595)](_0x5729fc, _0x41a6d4[_0x2e2368(0x4e2)]);
  }),
  (VisuMZ[_0x412469(0x215)][_0x412469(0x423)] = function (_0x39551c, _0xfd11a9, _0xadfb3f) {
    const _0x23be08 = _0x412469;
    if (_0x39551c[_0x23be08(0x412)][_0x23be08(0x5ed)]() === '') return ![];
    if (_0x39551c[_0x23be08(0x412)][_0x23be08(0x512)](/-----/i)) return ![];
    const _0x4e8b67 = _0x39551c[_0x23be08(0x3e5)];
    if (_0xfd11a9[_0x23be08(0x1ec)] > 0x0)
      for (const _0x3b4841 of _0xfd11a9) {
        if (!_0x3b4841) continue;
        if (_0x4e8b67[_0x23be08(0x5a9)](_0x3b4841)) return ![];
      }
    if (_0xadfb3f[_0x23be08(0x1ec)] > 0x0) {
      for (const _0x1d8d8a of _0xadfb3f) {
        if (!_0x1d8d8a) continue;
        if (_0x4e8b67[_0x23be08(0x5a9)](_0x1d8d8a)) return !![];
      }
      return ![];
    }
    return !![];
  }),
  (VisuMZ[_0x412469(0x215)][_0x412469(0x246)] = Scene_Boot[_0x412469(0x331)][_0x412469(0x21f)]),
  (Scene_Boot['prototype'][_0x412469(0x21f)] = function () {
    const _0x127653 = _0x412469;
    this[_0x127653(0x1af)](),
      VisuMZ[_0x127653(0x215)][_0x127653(0x246)][_0x127653(0x575)](this),
      this[_0x127653(0x36f)](),
      VisuMZ[_0x127653(0x215)][_0x127653(0x252)](),
      VisuMZ[_0x127653(0x215)]['SetupArtifactItemIDs']();
  }),
  (Scene_Boot[_0x412469(0x331)][_0x412469(0x1af)] = function () {
    const _0x537758 = _0x412469;
    (VisuMZ[_0x537758(0x215)]['RegExp'] = {}), (VisuMZ[_0x537758(0x215)]['RegExp'][_0x537758(0x531)] = []), (VisuMZ['ItemsEquipsCore'][_0x537758(0x389)][_0x537758(0x34f)] = []);
    const _0x233832 = [_0x537758(0x53c), _0x537758(0x1e2), _0x537758(0x1bd), _0x537758(0x21b), 'MAT', _0x537758(0x5f2), _0x537758(0x590), _0x537758(0x223)];
    for (const _0x2455b8 of _0x233832) {
      const _0x340caa = _0x537758(0x3c3)[_0x537758(0x32c)](_0x2455b8);
      VisuMZ['ItemsEquipsCore'][_0x537758(0x389)][_0x537758(0x531)]['push'](new RegExp(_0x340caa, 'i'));
      const _0x2908b0 = _0x537758(0x41e)[_0x537758(0x32c)](_0x2455b8);
      VisuMZ['ItemsEquipsCore'][_0x537758(0x389)][_0x537758(0x34f)][_0x537758(0x437)](new RegExp(_0x2908b0, 'g'));
    }
  }),
  (Scene_Boot[_0x412469(0x331)]['process_VisuMZ_ItemsEquipsCore_Notetags'] = function () {
    const _0x2ab053 = _0x412469;
    if (VisuMZ['ParseAllNotetags']) return;
    this[_0x2ab053(0x1f6)]();
    const _0x23710d = [$dataItems, $dataWeapons, $dataArmors];
    for (const _0x464551 of _0x23710d) {
      for (const _0x506534 of _0x464551) {
        if (!_0x506534) continue;
        VisuMZ[_0x2ab053(0x215)]['Parse_Notetags_Category'](_0x506534, _0x464551),
          VisuMZ[_0x2ab053(0x215)][_0x2ab053(0x535)](_0x506534, _0x464551),
          VisuMZ[_0x2ab053(0x215)][_0x2ab053(0x55d)](_0x506534, _0x464551),
          VisuMZ[_0x2ab053(0x215)]['Parse_Notetags_ParamJS'](_0x506534, _0x464551),
          VisuMZ['ItemsEquipsCore']['Parse_Notetags_EnableJS'](_0x506534, _0x464551);
      }
    }
  }),
  (Scene_Boot[_0x412469(0x331)][_0x412469(0x1f6)] = function () {
    const _0x47b471 = _0x412469;
    for (const _0x4fd000 of $dataClasses) {
      if (!_0x4fd000) continue;
      VisuMZ[_0x47b471(0x215)][_0x47b471(0x225)](_0x4fd000);
    }
  }),
  (VisuMZ[_0x412469(0x215)][_0x412469(0x233)] = VisuMZ[_0x412469(0x233)]),
  (VisuMZ['ParseClassNotetags'] = function (_0x5042a1) {
    const _0x29df61 = _0x412469;
    VisuMZ['ItemsEquipsCore']['ParseClassNotetags'][_0x29df61(0x575)](this, _0x5042a1), VisuMZ['ItemsEquipsCore'][_0x29df61(0x225)](_0x5042a1);
  }),
  (VisuMZ[_0x412469(0x215)][_0x412469(0x48c)] = VisuMZ[_0x412469(0x48c)]),
  (VisuMZ['ParseItemNotetags'] = function (_0x5a8ba6) {
    const _0x12175e = _0x412469;
    VisuMZ[_0x12175e(0x215)][_0x12175e(0x48c)][_0x12175e(0x575)](this, _0x5a8ba6), VisuMZ[_0x12175e(0x215)][_0x12175e(0x337)](_0x5a8ba6, $dataItems);
  }),
  (VisuMZ[_0x412469(0x215)]['ParseWeaponNotetags'] = VisuMZ[_0x412469(0x476)]),
  (VisuMZ['ParseWeaponNotetags'] = function (_0x5a0b63) {
    const _0x5f28fc = _0x412469;
    VisuMZ[_0x5f28fc(0x215)]['ParseWeaponNotetags'][_0x5f28fc(0x575)](this, _0x5a0b63), VisuMZ['ItemsEquipsCore'][_0x5f28fc(0x337)](_0x5a0b63, $dataWeapons);
  }),
  (VisuMZ[_0x412469(0x215)][_0x412469(0x4b1)] = VisuMZ[_0x412469(0x4b1)]),
  (VisuMZ[_0x412469(0x4b1)] = function (_0x2a143c) {
    const _0x441dfb = _0x412469;
    VisuMZ[_0x441dfb(0x215)][_0x441dfb(0x4b1)][_0x441dfb(0x575)](this, _0x2a143c), VisuMZ['ItemsEquipsCore'][_0x441dfb(0x337)](_0x2a143c, $dataArmors);
  }),
  (VisuMZ[_0x412469(0x215)][_0x412469(0x225)] = function (_0x2f4332) {
    const _0x4ed416 = _0x412469;
    _0x2f4332[_0x4ed416(0x37d)] = [];
    const _0x24f65f = $dataSystem[_0x4ed416(0x42d)]['map'](_0x1932ed => (_0x1932ed ? _0x1932ed[_0x4ed416(0x5ed)]() : ''));
    if (!BattleManager[_0x4ed416(0x388)]() && _0x2f4332[_0x4ed416(0x5a7)][_0x4ed416(0x512)](/<EQUIP SLOTS>\s*([\s\S]*)\s*<\/EQUIP SLOTS>/i)) {
      const _0xddf7ed = String(RegExp['$1'])[_0x4ed416(0x3de)](/[\r\n]+/);
      for (const _0x3eac2c of _0xddf7ed) {
        const _0x5cfce8 = _0x24f65f[_0x4ed416(0x2e3)](_0x3eac2c['trim']());
        if (_0x5cfce8 > 0x0) _0x2f4332[_0x4ed416(0x37d)]['push'](_0x5cfce8);
      }
    } else
      for (const _0x35171c of _0x24f65f) {
        const _0x2f1d83 = _0x24f65f['indexOf'](_0x35171c[_0x4ed416(0x5ed)]());
        if (_0x2f1d83 > 0x0) _0x2f4332[_0x4ed416(0x37d)][_0x4ed416(0x437)](_0x2f1d83);
      }
  }),
  (VisuMZ[_0x412469(0x215)][_0x412469(0x337)] = function (_0x1462e2, _0x4eb134) {
    const _0x10d1b = _0x412469;
    VisuMZ['ItemsEquipsCore']['Parse_Notetags_Category'](_0x1462e2, _0x4eb134),
      VisuMZ[_0x10d1b(0x215)][_0x10d1b(0x535)](_0x1462e2, _0x4eb134),
      VisuMZ[_0x10d1b(0x215)][_0x10d1b(0x55d)](_0x1462e2, _0x4eb134),
      VisuMZ[_0x10d1b(0x215)][_0x10d1b(0x290)](_0x1462e2, _0x4eb134),
      VisuMZ['ItemsEquipsCore'][_0x10d1b(0x2f7)](_0x1462e2, _0x4eb134);
  }),
  (VisuMZ[_0x412469(0x215)][_0x412469(0x42a)] = function (_0x150cb5, _0xf05312) {
    const _0x5a99df = _0x412469;
    _0x150cb5[_0x5a99df(0x3e5)] = [];
    const _0xfde420 = _0x150cb5['note'] || '',
      _0x266e9b = _0xfde420['match'](/<(?:CATEGORY|CATEGORIES):[ ](.*)>/gi);
    if (_0x266e9b)
      for (const _0x744247 of _0x266e9b) {
        _0x744247['match'](/<(?:CATEGORY|CATEGORIES):[ ](.*)>/gi);
        const _0x2ddfff = String(RegExp['$1'])[_0x5a99df(0x5bc)]()[_0x5a99df(0x5ed)]()[_0x5a99df(0x3de)](',');
        for (const _0x5cad11 of _0x2ddfff) {
          _0x150cb5[_0x5a99df(0x3e5)][_0x5a99df(0x437)](_0x5cad11[_0x5a99df(0x5ed)]());
        }
      }
    if (_0xfde420[_0x5a99df(0x512)](/<(?:CATEGORY|CATEGORIES)>\s*([\s\S]*)\s*<\/(?:CATEGORY|CATEGORIES)>/i)) {
      const _0xcb2e95 = RegExp['$1'][_0x5a99df(0x3de)](/[\r\n]+/);
      for (const _0xe4ec0c of _0xcb2e95) {
        _0x150cb5['categories'][_0x5a99df(0x437)](_0xe4ec0c[_0x5a99df(0x5bc)]()[_0x5a99df(0x5ed)]());
      }
    }
  }),
  (VisuMZ[_0x412469(0x215)][_0x412469(0x26d)] = function (_0x5eb9be, _0x5d25fd) {
    const _0x121302 = _0x412469;
    if (!_0x5eb9be) return;
    _0x5eb9be[_0x121302(0x212)] = 0x32;
    const _0x5a1971 = _0x5eb9be[_0x121302(0x5a7)] || '';
    _0x5a1971[_0x121302(0x512)](/<(?:|ID )SORT(?:|ING)[ ]PRIORITY:[ ](\d+)>/i) && (_0x5eb9be['sortPriority'] = Number(RegExp['$1']));
  }),
  (VisuMZ[_0x412469(0x215)][_0x412469(0x535)] = function (_0x4fce23, _0x1d207f) {
    const _0x509def = _0x412469;
    _0x4fce23['note'][_0x509def(0x512)](/<PRICE:[ ](\d+)>/i) && (_0x4fce23[_0x509def(0x59b)] = Number(RegExp['$1']));
  }),
  (VisuMZ[_0x412469(0x215)][_0x412469(0x55d)] = function (_0xcdbfaa, _0x1bb2ed) {
    const _0x478610 = _0x412469;
    if (_0x1bb2ed === $dataItems) return;
    for (let _0x24141a = 0x0; _0x24141a < 0x8; _0x24141a++) {
      const _0x4ab3e3 = VisuMZ[_0x478610(0x215)][_0x478610(0x389)]['EquipParams'][_0x24141a];
      _0xcdbfaa['note'][_0x478610(0x512)](_0x4ab3e3) && (_0xcdbfaa[_0x478610(0x33d)][_0x24141a] = parseInt(RegExp['$1']));
    }
  }),
  (VisuMZ[_0x412469(0x215)][_0x412469(0x5d2)] = {}),
  (VisuMZ[_0x412469(0x215)][_0x412469(0x290)] = function (_0x4fb9c7, _0x981db0) {
    const _0x403420 = _0x412469;
    if (_0x981db0 === $dataItems) return;
    if (_0x4fb9c7[_0x403420(0x5a7)][_0x403420(0x512)](/<JS PARAMETERS>\s*([\s\S]*)\s*<\/JS PARAMETERS>/i)) {
      const _0x32d501 = String(RegExp['$1']),
        _0x52c3b5 = (_0x981db0 === $dataWeapons ? 'W%1' : _0x403420(0x3a0))[_0x403420(0x32c)](_0x4fb9c7['id']),
        _0x5c1512 = _0x403420(0x494)[_0x403420(0x32c)](_0x32d501);
      for (let _0x2cfd4f = 0x0; _0x2cfd4f < 0x8; _0x2cfd4f++) {
        if (_0x32d501[_0x403420(0x512)](VisuMZ[_0x403420(0x215)][_0x403420(0x389)][_0x403420(0x34f)][_0x2cfd4f])) {
          const _0x3aca55 = _0x403420(0x3d9)[_0x403420(0x32c)](_0x52c3b5, _0x2cfd4f);
          VisuMZ[_0x403420(0x215)]['paramJS'][_0x3aca55] = new Function(_0x403420(0x3e7), _0x403420(0x217), _0x5c1512);
        }
      }
    }
  }),
  (VisuMZ[_0x412469(0x215)][_0x412469(0x21e)] = {}),
  (VisuMZ['ItemsEquipsCore'][_0x412469(0x2f7)] = function (_0x452121, _0x3fdafe) {
    const _0xac5a29 = _0x412469;
    if (_0x3fdafe !== $dataItems) return;
    if (_0x452121[_0xac5a29(0x5a7)][_0xac5a29(0x512)](/<JS ITEM ENABLE>\s*([\s\S]*)\s*<\/JS ITEM ENABLE>/i)) {
      const _0x4a4628 = String(RegExp['$1']),
        _0x299da4 = _0xac5a29(0x205)['format'](_0x4a4628);
      VisuMZ['ItemsEquipsCore'][_0xac5a29(0x21e)][_0x452121['id']] = new Function(_0xac5a29(0x3e7), _0x299da4);
    }
  }),
  (DataManager[_0x412469(0x321)] = function (_0x383334) {
    const _0x305dce = _0x412469;
    return this[_0x305dce(0x28d)](_0x383334) && _0x383334[_0x305dce(0x200)] === 0x2;
  }),
  (DataManager[_0x412469(0x29b)] = function (_0x1c2ce1) {
    const _0x1ac94d = _0x412469;
    if (!_0x1c2ce1) return 0x63;
    else return _0x1c2ce1[_0x1ac94d(0x5a7)][_0x1ac94d(0x512)](/<MAX:[ ](\d+)>/i) ? parseInt(RegExp['$1']) : this[_0x1ac94d(0x5bf)](_0x1c2ce1);
  }),
  (DataManager[_0x412469(0x5bf)] = function (_0x43a7f4) {
    const _0x412bde = _0x412469;
    if (this['isItem'](_0x43a7f4)) return VisuMZ[_0x412bde(0x215)]['Settings'][_0x412bde(0x582)][_0x412bde(0x39c)];
    else {
      if (this[_0x412bde(0x32f)](_0x43a7f4)) return VisuMZ['ItemsEquipsCore'][_0x412bde(0x55e)]['ItemScene'][_0x412bde(0x404)];
      else {
        if (this[_0x412bde(0x429)](_0x43a7f4)) return VisuMZ[_0x412bde(0x215)][_0x412bde(0x55e)][_0x412bde(0x582)][_0x412bde(0x565)];
      }
    }
  }),
  (DataManager[_0x412469(0x42e)] = function (_0x39d229) {
    const _0x92072b = _0x412469;
    (_0x39d229 = _0x39d229[_0x92072b(0x5bc)]()['trim']()), (this[_0x92072b(0x299)] = this[_0x92072b(0x299)] || {});
    if (this[_0x92072b(0x299)][_0x39d229]) return this[_0x92072b(0x299)][_0x39d229];
    for (const _0x32ccc2 of $dataClasses) {
      if (!_0x32ccc2) continue;
      let _0x32e028 = _0x32ccc2[_0x92072b(0x412)];
      (_0x32e028 = _0x32e028[_0x92072b(0x3c5)](/\x1I\[(\d+)\]/gi, '')),
        (_0x32e028 = _0x32e028[_0x92072b(0x3c5)](/\\I\[(\d+)\]/gi, '')),
        (this[_0x92072b(0x299)][_0x32e028[_0x92072b(0x5bc)]()[_0x92072b(0x5ed)]()] = _0x32ccc2['id']);
    }
    return this[_0x92072b(0x299)][_0x39d229] || 0x0;
  }),
  (DataManager[_0x412469(0x1ae)] = function (_0x2b573a) {
    const _0x1a210a = _0x412469;
    (_0x2b573a = _0x2b573a[_0x1a210a(0x5bc)]()['trim']()), (this[_0x1a210a(0x28b)] = this[_0x1a210a(0x28b)] || {});
    if (this[_0x1a210a(0x28b)][_0x2b573a]) return this['_skillIDs'][_0x2b573a];
    for (const _0x5f152f of $dataSkills) {
      if (!_0x5f152f) continue;
      this[_0x1a210a(0x28b)][_0x5f152f[_0x1a210a(0x412)][_0x1a210a(0x5bc)]()[_0x1a210a(0x5ed)]()] = _0x5f152f['id'];
    }
    return this[_0x1a210a(0x28b)][_0x2b573a] || 0x0;
  }),
  (DataManager[_0x412469(0x354)] = function (_0x5cb6cf) {
    const _0x10bca4 = _0x412469;
    (_0x5cb6cf = _0x5cb6cf[_0x10bca4(0x5bc)]()[_0x10bca4(0x5ed)]()), (this[_0x10bca4(0x551)] = this['_itemIDs'] || {});
    if (this[_0x10bca4(0x551)][_0x5cb6cf]) return this[_0x10bca4(0x551)][_0x5cb6cf];
    for (const _0x44238f of $dataItems) {
      if (!_0x44238f) continue;
      this[_0x10bca4(0x551)][_0x44238f[_0x10bca4(0x412)][_0x10bca4(0x5bc)]()[_0x10bca4(0x5ed)]()] = _0x44238f['id'];
    }
    return this['_itemIDs'][_0x5cb6cf] || 0x0;
  }),
  (DataManager[_0x412469(0x45b)] = function (_0x36eb53) {
    const _0x4478d5 = _0x412469;
    (_0x36eb53 = _0x36eb53[_0x4478d5(0x5bc)]()[_0x4478d5(0x5ed)]()), (this['_weaponIDs'] = this[_0x4478d5(0x385)] || {});
    if (this[_0x4478d5(0x385)][_0x36eb53]) return this[_0x4478d5(0x385)][_0x36eb53];
    for (const _0x1e96d9 of $dataWeapons) {
      if (!_0x1e96d9) continue;
      this['_weaponIDs'][_0x1e96d9['name']['toUpperCase']()[_0x4478d5(0x5ed)]()] = _0x1e96d9['id'];
    }
    return this[_0x4478d5(0x385)][_0x36eb53] || 0x0;
  }),
  (DataManager[_0x412469(0x318)] = function (_0x250964) {
    const _0xf8c502 = _0x412469;
    (_0x250964 = _0x250964[_0xf8c502(0x5bc)]()[_0xf8c502(0x5ed)]()), (this[_0xf8c502(0x422)] = this[_0xf8c502(0x422)] || {});
    if (this['_armorIDs'][_0x250964]) return this[_0xf8c502(0x422)][_0x250964];
    for (const _0x495eda of $dataArmors) {
      if (!_0x495eda) continue;
      this[_0xf8c502(0x422)][_0x495eda[_0xf8c502(0x412)]['toUpperCase']()[_0xf8c502(0x5ed)]()] = _0x495eda['id'];
    }
    return this[_0xf8c502(0x422)][_0x250964] || 0x0;
  }),
  (DataManager[_0x412469(0x2a5)] = function (_0x5c597e) {
    const _0x2a6eae = _0x412469;
    (_0x5c597e = _0x5c597e['toUpperCase']()[_0x2a6eae(0x5ed)]()), (this[_0x2a6eae(0x3db)] = this[_0x2a6eae(0x3db)] || {});
    if (this[_0x2a6eae(0x3db)][_0x5c597e]) return this['_etypeIDs'][_0x5c597e];
    for (const _0x2c81d3 of $dataSystem['equipTypes']) {
      this[_0x2a6eae(0x3db)][_0x2c81d3['toUpperCase']()[_0x2a6eae(0x5ed)]()] = $dataSystem['equipTypes']['indexOf'](_0x2c81d3);
    }
    return this[_0x2a6eae(0x3db)][_0x5c597e] || 0x0;
  }),
  (VisuMZ[_0x412469(0x215)][_0x412469(0x252)] = function () {
    const _0x3c9af6 = _0x412469;
    VisuMZ[_0x3c9af6(0x215)]['SetupProxyItemGroup']($dataItems), VisuMZ[_0x3c9af6(0x215)][_0x3c9af6(0x5c5)]($dataWeapons), VisuMZ[_0x3c9af6(0x215)][_0x3c9af6(0x5c5)]($dataArmors);
  }),
  (VisuMZ[_0x412469(0x215)][_0x412469(0x5c5)] = function (_0x10d49e) {
    const _0x21dae2 = _0x412469;
    for (const _0x1368bd of _0x10d49e) {
      if (!_0x1368bd) continue;
      if (!DataManager[_0x21dae2(0x479)](_0x1368bd)) continue;
      const _0x5f0e8b = DataManager[_0x21dae2(0x54f)](_0x1368bd),
        _0x32ce4a = [_0x21dae2(0x412), _0x21dae2(0x314), _0x21dae2(0x435)];
      for (const _0x357af9 of _0x32ce4a) {
        _0x1368bd[_0x357af9] = _0x5f0e8b[_0x357af9];
      }
    }
  }),
  (DataManager['isProxyItem'] = function (_0x51faaf) {
    const _0x5b06ba = _0x412469;
    if (!_0x51faaf) return ![];
    if (!_0x51faaf[_0x5b06ba(0x5a7)]) return ![];
    return _0x51faaf && _0x51faaf[_0x5b06ba(0x5a7)][_0x5b06ba(0x512)](/<PROXY:[ ](.*)>/i);
  }),
  (DataManager[_0x412469(0x54f)] = function (_0x2473b4) {
    const _0x196b3b = _0x412469;
    return this[_0x196b3b(0x479)](_0x2473b4) ? this['switchProxyItem'](_0x2473b4) || _0x2473b4 : _0x2473b4;
  }),
  (DataManager[_0x412469(0x320)] = function (_0x5344a8) {
    const _0x97c88d = _0x412469;
    _0x5344a8[_0x97c88d(0x5a7)][_0x97c88d(0x512)](/<PROXY:[ ](.*)>/i);
    const _0x3e84d9 = RegExp['$1'][_0x97c88d(0x5ed)](),
      _0x416fa0 = /^\d+$/['test'](_0x3e84d9);
    if (this[_0x97c88d(0x28d)](_0x5344a8)) {
      const _0x2645c3 = _0x416fa0 ? Number(_0x3e84d9) : DataManager[_0x97c88d(0x354)](_0x3e84d9);
      return $dataItems[_0x2645c3] || _0x5344a8;
    } else {
      if (this[_0x97c88d(0x32f)](_0x5344a8)) {
        const _0x3ad334 = _0x416fa0 ? Number(_0x3e84d9) : DataManager['getWeaponIdWithName'](_0x3e84d9);
        return $dataWeapons[_0x3ad334] || _0x5344a8;
      } else {
        if (this[_0x97c88d(0x429)](_0x5344a8)) {
          const _0x17cd0a = _0x416fa0 ? Number(_0x3e84d9) : DataManager[_0x97c88d(0x318)](_0x3e84d9);
          return $dataArmors[_0x17cd0a] || _0x5344a8;
        }
      }
    }
    return _0x5344a8;
  }),
  (VisuMZ['ItemsEquipsCore'][_0x412469(0x420)] = Window_ItemList[_0x412469(0x331)]['item']),
  (Window_ItemList[_0x412469(0x331)]['item'] = function () {
    const _0x3ecb76 = _0x412469;
    if ($gameTemp[_0x3ecb76(0x39f)]) return VisuMZ[_0x3ecb76(0x215)][_0x3ecb76(0x420)]['call'](this);
    return DataManager[_0x3ecb76(0x54f)](VisuMZ[_0x3ecb76(0x215)][_0x3ecb76(0x420)][_0x3ecb76(0x575)](this));
  }),
  (Window_ItemList[_0x412469(0x331)]['proxyItem'] = function () {
    const _0x1ed0ff = _0x412469;
    return VisuMZ['ItemsEquipsCore'][_0x1ed0ff(0x420)]['call'](this);
  }),
  (VisuMZ[_0x412469(0x215)][_0x412469(0x4fc)] = Window_ShopBuy[_0x412469(0x331)][_0x412469(0x3e7)]),
  (Window_ShopBuy[_0x412469(0x331)]['item'] = function () {
    const _0x445e43 = _0x412469;
    if ($gameTemp[_0x445e43(0x39f)]) return VisuMZ['ItemsEquipsCore'][_0x445e43(0x4fc)][_0x445e43(0x575)](this);
    return DataManager['getProxyItem'](VisuMZ[_0x445e43(0x215)][_0x445e43(0x4fc)][_0x445e43(0x575)](this));
  }),
  (Window_ShopBuy[_0x412469(0x331)][_0x412469(0x44f)] = function () {
    const _0x594558 = _0x412469;
    return VisuMZ[_0x594558(0x215)][_0x594558(0x4fc)][_0x594558(0x575)](this);
  }),
  (VisuMZ[_0x412469(0x215)][_0x412469(0x1db)] = Game_Item[_0x412469(0x331)]['setObject']),
  (Game_Item[_0x412469(0x331)]['setObject'] = function (_0x3f7cd2) {
    const _0x47affc = _0x412469;
    if (DataManager[_0x47affc(0x479)](_0x3f7cd2)) return;
    VisuMZ['ItemsEquipsCore'][_0x47affc(0x1db)]['call'](this, _0x3f7cd2);
  }),
  (VisuMZ[_0x412469(0x215)][_0x412469(0x4e5)] = function () {
    const _0x4c8b1f = _0x412469;
    this[_0x4c8b1f(0x1ee)] = { partyArtifactIDs: [], troopArtifactIDs: [] };
    for (const _0x14489d of $dataArmors) {
      if (!_0x14489d) continue;
      if (!DataManager[_0x4c8b1f(0x4fb)](_0x14489d)) continue;
      DataManager['isPartyArtifact'](_0x14489d) && this[_0x4c8b1f(0x1ee)]['partyArtifactIDs'][_0x4c8b1f(0x437)](_0x14489d['id']),
        DataManager[_0x4c8b1f(0x3eb)](_0x14489d) && this[_0x4c8b1f(0x1ee)][_0x4c8b1f(0x2f5)][_0x4c8b1f(0x437)](_0x14489d['id']);
    }
  }),
  (DataManager[_0x412469(0x4fb)] = function (_0x329b6f) {
    const _0x2a479f = _0x412469;
    if (!this[_0x2a479f(0x429)](_0x329b6f)) return ![];
    const _0x4c5489 = _0x329b6f['note'];
    if (!_0x4c5489) return ![];
    if (_0x4c5489['match'](/<(?:PARTY|ALLY) (?:ARTIFACT|RELIC)>/i)) return !![];
    if (_0x4c5489[_0x2a479f(0x512)](/<(?:STACKABLE|STACK) (?:PARTY|ALLY) (?:ARTIFACT|RELIC)>/i)) return !![];
    if (_0x4c5489[_0x2a479f(0x512)](/<(?:TROOP|FOE) (?:ARTIFACT|RELIC)>/i)) return !![];
    if (_0x4c5489[_0x2a479f(0x512)](/<(?:STACKABLE|STACK) (?:TROOP|FOE) (?:ARTIFACT|RELIC)>/i)) return !![];
    return ![];
  }),
  (DataManager[_0x412469(0x257)] = function (_0x4fda37) {
    const _0x31204b = _0x412469;
    if (!this[_0x31204b(0x4fb)](_0x4fda37)) return ![];
    const _0x2fd4e = _0x4fda37[_0x31204b(0x5a7)];
    if (!_0x2fd4e) return ![];
    if (_0x2fd4e[_0x31204b(0x512)](/<(?:STACKABLE|STACK) (?:PARTY|ALLY) (?:ARTIFACT|RELIC)>/i)) return !![];
    if (_0x2fd4e[_0x31204b(0x512)](/<(?:STACKABLE|STACK) (?:TROOP|FOE) (?:ARTIFACT|RELIC)>/i)) return !![];
    return ![];
  }),
  (DataManager[_0x412469(0x351)] = function (_0x5a97c2) {
    const _0x1af16a = _0x412469;
    if (!this['isArtifact'](_0x5a97c2)) return ![];
    const _0x5c01c3 = _0x5a97c2[_0x1af16a(0x5a7)];
    if (!_0x5c01c3) return ![];
    if (_0x5c01c3[_0x1af16a(0x512)](/<(?:PARTY|ALLY) (?:ARTIFACT|RELIC)>/i)) return !![];
    if (_0x5c01c3[_0x1af16a(0x512)](/<(?:STACKABLE|STACK) (?:PARTY|ALLY) (?:ARTIFACT|RELIC)>/i)) return !![];
    return ![];
  }),
  (DataManager[_0x412469(0x3eb)] = function (_0x5b499c) {
    const _0x4a684f = _0x412469;
    if (!this['isArtifact'](_0x5b499c)) return ![];
    const _0x37b7df = _0x5b499c[_0x4a684f(0x5a7)];
    if (!_0x37b7df) return ![];
    if (_0x37b7df[_0x4a684f(0x512)](/<(?:TROOP|FOE) (?:ARTIFACT|RELIC)>/i)) return !![];
    if (_0x37b7df[_0x4a684f(0x512)](/<(?:STACKABLE|STACK) (?:TROOP|FOE) (?:ARTIFACT|RELIC)>/i)) return !![];
    return ![];
  }),
  (VisuMZ[_0x412469(0x215)][_0x412469(0x22a)] = Game_BattlerBase[_0x412469(0x331)][_0x412469(0x2a8)]),
  (Game_BattlerBase[_0x412469(0x331)][_0x412469(0x2a8)] = function (_0x511d63) {
    const _0x126795 = _0x412469;
    if (DataManager['isArtifact'](_0x511d63)) return ![];
    if (!DataManager['meetsClassRequirements'](this, _0x511d63)) return ![];
    if (!DataManager[_0x126795(0x529)](this, _0x511d63)) return ![];
    return VisuMZ[_0x126795(0x215)][_0x126795(0x22a)][_0x126795(0x575)](this, _0x511d63);
  }),
  (VisuMZ[_0x412469(0x215)][_0x412469(0x282)] = Game_BattlerBase[_0x412469(0x331)][_0x412469(0x2b4)]),
  (Game_BattlerBase[_0x412469(0x331)][_0x412469(0x2b4)] = function (_0x13f765) {
    const _0x5ef5b3 = _0x412469;
    this[_0x5ef5b3(0x52f)] = !![];
    const _0x385a93 = VisuMZ['ItemsEquipsCore'][_0x5ef5b3(0x282)][_0x5ef5b3(0x575)](this, _0x13f765);
    return (this[_0x5ef5b3(0x52f)] = undefined), _0x385a93;
  }),
  (VisuMZ['ItemsEquipsCore'][_0x412469(0x370)] = Game_Actor[_0x412469(0x331)][_0x412469(0x5b8)]),
  (Game_Actor[_0x412469(0x331)]['traitObjects'] = function () {
    const _0x13a525 = _0x412469;
    this[_0x13a525(0x4d9)] = !![];
    const _0x451c82 = VisuMZ[_0x13a525(0x215)][_0x13a525(0x370)][_0x13a525(0x575)](this);
    return (this[_0x13a525(0x4d9)] = undefined), _0x451c82;
  }),
  (VisuMZ['ItemsEquipsCore'][_0x412469(0x1c2)] = Game_Actor['prototype'][_0x412469(0x547)]),
  (Game_Actor[_0x412469(0x331)][_0x412469(0x547)] = function () {
    const _0x3c555c = _0x412469,
      _0x20ff90 = VisuMZ[_0x3c555c(0x215)][_0x3c555c(0x1c2)]['call'](this);
    if (this[_0x3c555c(0x4d9)] || this[_0x3c555c(0x52f)]) {
      const _0x1e38b2 = _0x20ff90['concat']($gameParty['partyArtifacts']());
      return _0x1e38b2;
    } else return _0x20ff90;
  }),
  (VisuMZ['ItemsEquipsCore'][_0x412469(0x49b)] = Game_BattlerBase[_0x412469(0x331)][_0x412469(0x2b5)]),
  (Game_BattlerBase[_0x412469(0x331)]['paramPlus'] = function (_0x23365a) {
    const _0x3b2629 = _0x412469;
    let _0x497bd8 = VisuMZ[_0x3b2629(0x215)][_0x3b2629(0x49b)][_0x3b2629(0x575)](this, _0x23365a);
    if (this['constructor'] === Game_Enemy)
      for (const _0x2d3052 of $gameParty[_0x3b2629(0x470)]()) {
        if (_0x2d3052) _0x497bd8 += _0x2d3052[_0x3b2629(0x33d)][_0x23365a];
      }
    return _0x497bd8;
  }),
  (VisuMZ['ItemsEquipsCore'][_0x412469(0x37c)] = Game_Enemy[_0x412469(0x331)][_0x412469(0x5b8)]),
  (Game_Enemy[_0x412469(0x331)][_0x412469(0x5b8)] = function () {
    const _0x4a84d3 = _0x412469;
    let _0x5c2403 = VisuMZ[_0x4a84d3(0x215)]['Game_Enemy_traitObjects_artifact'][_0x4a84d3(0x575)](this);
    return _0x5c2403[_0x4a84d3(0x3b9)]($gameParty[_0x4a84d3(0x470)]());
  }),
  (VisuMZ[_0x412469(0x215)][_0x412469(0x32e)] = Game_Party[_0x412469(0x331)]['gainItem']),
  (Game_Party['prototype']['gainItem'] = function (_0x2cd041, _0x42ec31, _0xb56119) {
    const _0x28275c = _0x412469;
    VisuMZ['ItemsEquipsCore'][_0x28275c(0x32e)][_0x28275c(0x575)](this, _0x2cd041, _0x42ec31, _0xb56119);
    if (DataManager['isArtifact'](_0x2cd041)) {
      let _0x2711c4 = $gameParty[_0x28275c(0x39e)]();
      if ($gameParty[_0x28275c(0x489)]()) _0x2711c4 = _0x2711c4[_0x28275c(0x3b9)]($gameTroop[_0x28275c(0x31d)]());
      for (const _0x193795 of _0x2711c4) {
        if (!_0x193795) continue;
        _0x193795[_0x28275c(0x3b1)] = {};
      }
    }
  }),
  (Game_Party[_0x412469(0x331)][_0x412469(0x398)] = function () {
    const _0x51bdd3 = _0x412469;
    let _0x15eedb = [];
    const _0xbb6c66 = VisuMZ[_0x51bdd3(0x215)][_0x51bdd3(0x1ee)]['partyArtifactIDs'];
    if (_0xbb6c66)
      for (const _0x3d03fb of _0xbb6c66) {
        const _0x1e40c5 = $dataArmors[_0x3d03fb];
        if (!_0x1e40c5) continue;
        if (!this[_0x51bdd3(0x41c)](_0x1e40c5)) continue;
        let _0x53440d = 0x1;
        if (DataManager[_0x51bdd3(0x257)](_0x1e40c5)) _0x53440d = this[_0x51bdd3(0x4aa)](_0x1e40c5);
        while (_0x53440d--) _0x15eedb[_0x51bdd3(0x437)](_0x1e40c5);
      }
    return _0x15eedb;
  }),
  (Game_Party['prototype']['troopArtifacts'] = function () {
    const _0x15d612 = _0x412469;
    let _0x3f368b = [];
    const _0x5700bd = VisuMZ[_0x15d612(0x215)][_0x15d612(0x1ee)][_0x15d612(0x2f5)];
    if (_0x5700bd)
      for (const _0x394e6b of _0x5700bd) {
        const _0x39d9c7 = $dataArmors[_0x394e6b];
        if (!_0x39d9c7) continue;
        if (!this[_0x15d612(0x41c)](_0x39d9c7)) continue;
        let _0x7e5daf = 0x1;
        if (DataManager['isStackableArtifact'](_0x39d9c7)) _0x7e5daf = this['numItems'](_0x39d9c7);
        while (_0x7e5daf--) _0x3f368b[_0x15d612(0x437)](_0x39d9c7);
      }
    return _0x3f368b;
  }),
  (Game_Party['prototype'][_0x412469(0x545)] = function () {
    const _0x339557 = _0x412469;
    return this[_0x339557(0x398)]()['concat'](this[_0x339557(0x470)]());
  }),
  (VisuMZ['ItemsEquipsCore'][_0x412469(0x3b3)] = Game_Party[_0x412469(0x331)][_0x412469(0x338)]),
  (Game_Party[_0x412469(0x331)][_0x412469(0x338)] = function () {
    const _0x3f1318 = _0x412469;
    VisuMZ[_0x3f1318(0x215)][_0x3f1318(0x3b3)][_0x3f1318(0x575)](this), this[_0x3f1318(0x31b)]();
  }),
  (Game_Party[_0x412469(0x331)][_0x412469(0x31b)] = function () {
    const _0xea340d = _0x412469,
      _0x469b96 = $gameParty[_0xea340d(0x56b)]()[_0xea340d(0x5e4)](_0x121879 => DataManager['isArtifact'](_0x121879));
    for (const _0x3822a7 of _0x469b96) {
      const _0x5e22a4 = this[_0xea340d(0x4aa)](_0x3822a7);
      if (_0x5e22a4) this[_0xea340d(0x578)](_0x3822a7, _0x5e22a4);
    }
  }),
  (DataManager['meetsClassRequirements'] = function (_0x56c18b, _0x3ba85f) {
    const _0x16763e = _0x412469;
    if (this['isItem'](_0x3ba85f)) return ![];
    if (!_0x56c18b) return ![];
    if ($gameTemp[_0x16763e(0x21c)]) return !![];
    if (BattleManager[_0x16763e(0x388)]()) return !![];
    const _0x416964 = this[_0x16763e(0x295)](_0x3ba85f);
    if (_0x416964[_0x16763e(0x1ec)] <= 0x0) return !![];
    return _0x416964['includes'](_0x56c18b[_0x16763e(0x31e)]()['id']);
  }),
  (DataManager[_0x412469(0x295)] = function (_0x49a261) {
    const _0x578e86 = _0x412469;
    if (!_0x49a261) return [];
    this[_0x578e86(0x1b5)] = this[_0x578e86(0x1b5)] || {};
    const _0x527b26 = _0x578e86(0x3d9)[_0x578e86(0x32c)](this[_0x578e86(0x32f)](_0x49a261) ? _0x578e86(0x3c6) : _0x578e86(0x522), _0x49a261['id']);
    if (this[_0x578e86(0x1b5)][_0x527b26] !== undefined) return this[_0x578e86(0x1b5)][_0x527b26];
    let _0x263fde = [];
    const _0x4e026f = _0x49a261[_0x578e86(0x5a7)] || '';
    if (_0x4e026f['match'](/<EQUIP FOR CLASS(?:|ES) ONLY:[ ](.*)>/i)) {
      const _0x1ecf80 = String(RegExp['$1'])
        ['split'](',')
        [_0x578e86(0x54a)](_0x186afc => _0x186afc[_0x578e86(0x5ed)]());
      for (const _0x20a22f of _0x1ecf80) {
        const _0x28ee24 = /^\d+$/[_0x578e86(0x2f9)](_0x20a22f);
        _0x28ee24 ? _0x263fde[_0x578e86(0x437)](Number(_0x20a22f)) : _0x263fde[_0x578e86(0x437)](DataManager[_0x578e86(0x42e)](_0x20a22f));
      }
    }
    return (this[_0x578e86(0x1b5)][_0x527b26] = _0x263fde), this[_0x578e86(0x1b5)][_0x527b26];
  }),
  (DataManager['meetsEquipRequirements'] = function (_0x398e25, _0xf23bb) {
    const _0x5d060b = _0x412469;
    if (this[_0x5d060b(0x28d)](_0xf23bb)) return ![];
    if (!_0x398e25) return ![];
    if ($gameTemp[_0x5d060b(0x21c)]) return !![];
    if (BattleManager[_0x5d060b(0x388)]()) return !![];
    const _0xd2f9ac = this[_0x5d060b(0x483)](_0xf23bb);
    for (const _0x218696 of _0xd2f9ac) {
      if (!this[_0x5d060b(0x4a5)](_0x398e25, _0x218696)) return ![];
    }
    return !![];
  }),
  (DataManager[_0x412469(0x483)] = function (_0xf1aa29) {
    const _0x1ff871 = _0x412469;
    if (!_0xf1aa29) return [];
    this[_0x1ff871(0x55a)] = this[_0x1ff871(0x55a)] || {};
    const _0x209db4 = '%1-%2'['format'](this[_0x1ff871(0x32f)](_0xf1aa29) ? _0x1ff871(0x3c6) : _0x1ff871(0x522), _0xf1aa29['id']);
    if (this['_getEquipRequirements'][_0x209db4] !== undefined) return this[_0x1ff871(0x55a)][_0x209db4];
    let _0x3f68ca = [];
    const _0x35ba74 = _0xf1aa29[_0x1ff871(0x5a7)] || '';
    return (
      _0x35ba74[_0x1ff871(0x512)](/<EQUIP(?:|MENT)[ ]REQUIREMENT(?:|S)>\s*([\s\S]*)\s*<\/EQUIP(?:|MENT)[ ]REQUIREMENT(?:|S)>/i) && (_0x3f68ca = String(RegExp['$1'])[_0x1ff871(0x3de)](/[\r\n]+/)),
      (this['_getEquipRequirements'][_0x209db4] = _0x3f68ca),
      this['_getEquipRequirements'][_0x209db4]
    );
  }),
  (DataManager['meetsEquipRequirement'] = function (_0x59a338, _0x2dafb5) {
    const _0x4be8b7 = _0x412469;
    if (_0x2dafb5['match'](/(?:LEVEL|LV|LVL)[ ](>|>=|===|<=|<)[ ](\d+)/i)) {
      const _0x24d021 = String(RegExp['$1'])[_0x4be8b7(0x5ed)](),
        _0x495cf2 = Number(RegExp['$2']);
      switch (_0x24d021) {
        case '>':
          return _0x59a338[_0x4be8b7(0x1fb)] > _0x495cf2;
        case '>=':
          return _0x59a338[_0x4be8b7(0x1fb)] >= _0x495cf2;
        case _0x4be8b7(0x499):
          return _0x59a338[_0x4be8b7(0x1fb)] === _0x495cf2;
        case '<=':
          return _0x59a338['level'] <= _0x495cf2;
        case '<':
          return _0x59a338['level'] < _0x495cf2;
      }
      return ![];
    }
    if (_0x2dafb5[_0x4be8b7(0x512)](/(MAXHP|MAXMP|MHP|MMP)[ ](>|>=|===|<=|<)[ ](\d+)/i)) {
      const _0x29069c = String(RegExp['$1'])['toLowerCase']()[_0x4be8b7(0x5ed)](),
        _0x39580f = String(RegExp['$2'])['trim'](),
        _0x1263f4 = Number(RegExp['$3']);
      let _0x92a7a8 = 0x0;
      if ([_0x4be8b7(0x523), _0x4be8b7(0x1d6)][_0x4be8b7(0x5a9)](_0x29069c)) _0x92a7a8 = 0x1;
      const _0xa3f053 = _0x59a338[_0x4be8b7(0x364)][_0x92a7a8] || 0x0;
      switch (_0x39580f) {
        case '>':
          return _0x59a338[_0x4be8b7(0x2c8)](_0x92a7a8) + _0xa3f053 > _0x1263f4;
        case '>=':
          return _0x59a338['paramBase'](_0x92a7a8) + _0xa3f053 >= _0x1263f4;
        case _0x4be8b7(0x499):
          return _0x59a338[_0x4be8b7(0x2c8)](_0x92a7a8) + _0xa3f053 === _0x1263f4;
        case '<=':
          return _0x59a338[_0x4be8b7(0x2c8)](_0x92a7a8) + _0xa3f053 <= _0x1263f4;
        case '<':
          return _0x59a338[_0x4be8b7(0x2c8)](_0x92a7a8) + _0xa3f053 < _0x1263f4;
      }
      return ![];
    }
    if (_0x2dafb5[_0x4be8b7(0x512)](/(ATK|DEF|MAT|MDF|AGI|LUK)[ ](>|>=|===|<=|<)[ ](\d+)/i)) {
      const _0x461148 = String(RegExp['$1'])[_0x4be8b7(0x3ea)]()[_0x4be8b7(0x5ed)](),
        _0x56ef68 = String(RegExp['$2'])['trim'](),
        _0x394975 = Number(RegExp['$3']),
        _0x10522d = [_0x4be8b7(0x5f3), 'def', _0x4be8b7(0x297), _0x4be8b7(0x39d), _0x4be8b7(0x24a), _0x4be8b7(0x369)];
      let _0xe2ba09 = _0x10522d[_0x4be8b7(0x2e3)](_0x461148) + 0x2;
      if (_0xe2ba09 < 0x2) return ![];
      const _0x15c7b3 = _0x59a338[_0x4be8b7(0x364)][_0xe2ba09] || 0x0;
      switch (_0x56ef68) {
        case '>':
          return _0x59a338[_0x4be8b7(0x2c8)](_0xe2ba09) + _0x15c7b3 > _0x394975;
        case '>=':
          return _0x59a338[_0x4be8b7(0x2c8)](_0xe2ba09) + _0x15c7b3 >= _0x394975;
        case _0x4be8b7(0x499):
          return _0x59a338[_0x4be8b7(0x2c8)](_0xe2ba09) + _0x15c7b3 === _0x394975;
        case '<=':
          return _0x59a338['paramBase'](_0xe2ba09) + _0x15c7b3 <= _0x394975;
        case '<':
          return _0x59a338[_0x4be8b7(0x2c8)](_0xe2ba09) + _0x15c7b3 < _0x394975;
      }
      return ![];
    }
    if (_0x2dafb5[_0x4be8b7(0x512)](/LEARNED SKILL:[ ](\d+)/i)) {
      const _0x483f4c = Number(RegExp['$1']);
      return _0x59a338[_0x4be8b7(0x426)](_0x483f4c);
    } else {
      if (_0x2dafb5[_0x4be8b7(0x512)](/LEARNED SKILL:[ ](.*)/i)) {
        const _0x4dbc01 = String(RegExp['$1']),
          _0x24425d = this[_0x4be8b7(0x1ae)](_0x4dbc01);
        return _0x59a338['isLearnedSkill'](_0x24425d);
      }
    }
    if (_0x2dafb5[_0x4be8b7(0x512)](/SWITCH:[ ](\d+)/i)) {
      const _0xf15b9b = Number(RegExp['$1']);
      return $gameSwitches[_0x4be8b7(0x5de)](_0xf15b9b);
    }
    return !![];
  }),
  (DataManager[_0x412469(0x23f)] = function (_0x5e28c0) {
    const _0x5bf4f8 = _0x412469;
    return this[_0x5bf4f8(0x429)](_0x5e28c0) ? this[_0x5bf4f8(0x2ff)](_0x5e28c0) : [_0x5e28c0[_0x5bf4f8(0x49f)] || 0x0];
  }),
  (DataManager[_0x412469(0x2ff)] = function (_0xfc46e0) {
    const _0x5f33fa = _0x412469;
    this['_cache_etypeIDs'] = this[_0x5f33fa(0x558)] || {};
    if (this[_0x5f33fa(0x558)][_0xfc46e0['id']] !== undefined) return this[_0x5f33fa(0x558)][_0xfc46e0['id']];
    this['_cache_etypeIDs'][_0xfc46e0['id']] = [_0xfc46e0['etypeId'] || 0x0];
    const _0x37de02 = _0xfc46e0[_0x5f33fa(0x5a7)] || '';
    if (_0x37de02[_0x5f33fa(0x512)](/<ADDED ETYPE(?:|S):[ ](.*)>/i)) {
      const _0x3c2ce3 = String(RegExp['$1'])
        [_0x5f33fa(0x3de)](',')
        [_0x5f33fa(0x54a)](_0x38d95a => _0x38d95a[_0x5f33fa(0x5ed)]());
      for (const _0x2ac309 of _0x3c2ce3) {
        const _0x5442b2 = /^\d+$/[_0x5f33fa(0x2f9)](_0x2ac309);
        let _0x5bf923 = 0x0;
        _0x5442b2 ? (_0x5bf923 = Number(_0x2ac309)) : (_0x5bf923 = this['getEtypeIdWithName'](_0x2ac309)), _0x5bf923 > 0x1 && this[_0x5f33fa(0x558)][_0xfc46e0['id']][_0x5f33fa(0x437)](_0x5bf923);
      }
    }
    return this[_0x5f33fa(0x558)][_0xfc46e0['id']];
  }),
  (Game_BattlerBase[_0x412469(0x331)]['canEquipArmor'] = function (_0x582386) {
    const _0x5ec8eb = _0x412469;
    return (
      this[_0x5ec8eb(0x228)](_0x582386[_0x5ec8eb(0x1d9)]) &&
      !this[_0x5ec8eb(0x553)](_0x582386[_0x5ec8eb(0x49f)]) &&
      DataManager[_0x5ec8eb(0x23f)](_0x582386)[_0x5ec8eb(0x49a)](_0x24957b => !this[_0x5ec8eb(0x553)](_0x24957b))
    );
  }),
  (DataManager[_0x412469(0x51b)] = function (_0x2f973e) {
    const _0x1449e4 = _0x412469;
    if (!this[_0x1449e4(0x32f)](_0x2f973e) && !this[_0x1449e4(0x429)](_0x2f973e)) return ![];
    if (Imported[_0x1449e4(0x48a)] && this[_0x1449e4(0x32f)](_0x2f973e)) return ![];
    if (!_0x2f973e[_0x1449e4(0x5a7)]) return ![];
    return _0x2f973e[_0x1449e4(0x5a7)][_0x1449e4(0x512)](/<CURSED>/i);
  }),
  (DataManager['getPurifyTransformation'] = function (_0x4aee1f) {
    const _0x36a4ec = _0x412469;
    if (!_0x4aee1f) return _0x4aee1f;
    if (!this[_0x36a4ec(0x32f)](_0x4aee1f) && !this[_0x36a4ec(0x429)](_0x4aee1f)) return _0x4aee1f;
    if (_0x4aee1f[_0x36a4ec(0x5a7)][_0x36a4ec(0x512)](/<PURIFY TRANSFORM:[ ](.*)>/i)) {
      const _0x37d030 = String(RegExp['$1'])[_0x36a4ec(0x5ed)](),
        _0x507ae1 = /^\d+$/['test'](_0x37d030);
      if (_0x507ae1) {
        if (this[_0x36a4ec(0x32f)](_0x4aee1f)) return $dataWeapons[Number(_0x37d030)];
        if (this['isArmor'](_0x4aee1f)) return $dataArmors[Number(_0x37d030)];
      } else {
        if (this[_0x36a4ec(0x32f)](_0x4aee1f)) return $dataWeapons[this[_0x36a4ec(0x45b)](_0x37d030)];
        if (this[_0x36a4ec(0x429)](_0x4aee1f)) return $dataArmors[this[_0x36a4ec(0x318)](_0x37d030)];
      }
    }
    return _0x4aee1f;
  }),
  (Game_Party[_0x412469(0x331)][_0x412469(0x55c)] = function () {
    const _0x22340c = _0x412469,
      _0x54735e = this[_0x22340c(0x39e)]();
    for (const _0x109769 of _0x54735e) {
      if (!_0x109769) continue;
      _0x109769[_0x22340c(0x55c)]();
    }
  }),
  (Game_Actor[_0x412469(0x331)][_0x412469(0x55c)] = function () {
    const _0x265079 = _0x412469,
      _0xc7e02f = this[_0x265079(0x37d)]()['length'];
    for (let _0x3da6e2 = 0x0; _0x3da6e2 < _0xc7e02f; _0x3da6e2++) {
      const _0x3017e4 = this[_0x265079(0x292)][_0x3da6e2];
      if (!_0x3017e4) continue;
      const _0x47b09d = _0x3017e4['object']();
      if (!DataManager['isCursedItem'](_0x47b09d)) continue;
      let _0x26945c = DataManager[_0x265079(0x1f1)](_0x47b09d);
      this['isPurifyItemSwapOk'](_0x47b09d, _0x26945c)
        ? (!this[_0x265079(0x292)][_0x3da6e2] && (this['_equips'][_0x3da6e2] = new Game_Item()), this[_0x265079(0x292)][_0x3da6e2][_0x265079(0x304)](_0x26945c), this[_0x265079(0x1f2)]())
        : this['changeEquip'](_0x3da6e2, null);
    }
  }),
  (Game_Actor[_0x412469(0x331)][_0x412469(0x5c8)] = function (_0x48617a, _0x110871) {
    const _0x80887e = _0x412469;
    if (_0x48617a === _0x110871) return ![];
    const _0x5b6b50 = DataManager[_0x80887e(0x23f)](_0x110871);
    if (!_0x5b6b50['includes'](_0x48617a[_0x80887e(0x49f)])) return ![];
    if (DataManager[_0x80887e(0x32f)](_0x110871)) return this[_0x80887e(0x47f)](_0x110871[_0x80887e(0x288)]);
    else {
      if (DataManager['isArmor'](_0x110871)) return this[_0x80887e(0x228)](_0x110871[_0x80887e(0x1d9)]);
    }
    return ![];
  }),
  (TextManager['ITEMS_EQUIPS_CORE'] = {
    helpDesc: {
      equip: VisuMZ[_0x412469(0x215)]['Settings'][_0x412469(0x2d7)]['equipCmdDesc'] ?? _0x412469(0x44b),
      optimize: VisuMZ[_0x412469(0x215)]['Settings'][_0x412469(0x2d7)]['optimizeCmdDesc'] ?? _0x412469(0x3a7),
      clear: VisuMZ[_0x412469(0x215)]['Settings'][_0x412469(0x2d7)][_0x412469(0x4cb)] ?? _0x412469(0x40b),
    },
  }),
  (ColorManager[_0x412469(0x457)] = function (_0x55008c) {
    const _0x4bf811 = _0x412469;
    if (!_0x55008c) return this['normalColor']();
    else {
      if (_0x55008c[_0x4bf811(0x5a7)][_0x4bf811(0x512)](/<COLOR:[ ](\d+)>/i)) return this[_0x4bf811(0x4e9)](Number(RegExp['$1'])[_0x4bf811(0x46c)](0x0, 0x1f));
      else return _0x55008c[_0x4bf811(0x5a7)][_0x4bf811(0x512)](/<COLOR:[ ]#(.*)>/i) ? '#' + String(RegExp['$1']) : this[_0x4bf811(0x207)]();
    }
  }),
  (ColorManager[_0x412469(0x36c)] = function (_0x34b967) {
    const _0x134d5d = _0x412469;
    return (_0x34b967 = String(_0x34b967)), _0x34b967[_0x134d5d(0x512)](/#(.*)/i) ? _0x134d5d(0x555)[_0x134d5d(0x32c)](String(RegExp['$1'])) : this[_0x134d5d(0x4e9)](Number(_0x34b967));
  }),
  (SceneManager['isSceneShop'] = function () {
    const _0x31361f = _0x412469;
    return this[_0x31361f(0x464)] && this[_0x31361f(0x464)][_0x31361f(0x336)] === Scene_Shop;
  }),
  (Game_Temp['prototype'][_0x412469(0x347)] = function () {
    const _0x3f45eb = _0x412469;
    if (this['_bypassNewLabel']) return ![];
    return VisuMZ[_0x3f45eb(0x215)][_0x3f45eb(0x55e)]['New'][_0x3f45eb(0x5dd)];
  }),
  (VisuMZ[_0x412469(0x28f)] = VisuMZ[_0x412469(0x215)][_0x412469(0x55e)]['StatusWindow'][_0x412469(0x227)]),
  (VisuMZ['ItemsEquipsCore'][_0x412469(0x59a)] = Game_BattlerBase['prototype'][_0x412469(0x2b4)]),
  (Game_BattlerBase['prototype'][_0x412469(0x2b4)] = function (_0x4c00a0) {
    const _0x39df4a = _0x412469;
    return this[_0x39df4a(0x564)] ? (this[_0x39df4a(0x4dc)] ? VisuMZ['ShopMenuStatusStandard'] : 0x1) : VisuMZ[_0x39df4a(0x215)]['Game_BattlerBase_param'][_0x39df4a(0x575)](this, _0x4c00a0);
  }),
  (VisuMZ['ItemsEquipsCore'][_0x412469(0x30d)] = Game_BattlerBase[_0x412469(0x331)][_0x412469(0x518)]),
  (Game_BattlerBase[_0x412469(0x331)][_0x412469(0x518)] = function (_0xd63eeb) {
    const _0x45ea9b = _0x412469;
    if (!_0xd63eeb) return ![];
    if (!VisuMZ[_0x45ea9b(0x215)]['Game_BattlerBase_meetsItemConditions'][_0x45ea9b(0x575)](this, _0xd63eeb)) return ![];
    if (!this[_0x45ea9b(0x42f)](_0xd63eeb)) return ![];
    if (!this['meetsItemConditionsJS'](_0xd63eeb)) return ![];
    return !![];
  }),
  (Game_BattlerBase['prototype'][_0x412469(0x42f)] = function (_0x30b09b) {
    const _0x44f009 = _0x412469;
    if (!this[_0x44f009(0x1d3)](_0x30b09b)) return ![];
    return !![];
  }),
  (Game_BattlerBase[_0x412469(0x331)][_0x412469(0x1d3)] = function (_0x1903ff) {
    const _0x4a23eb = _0x412469,
      _0x17f2f7 = _0x1903ff['note'];
    if (_0x17f2f7[_0x4a23eb(0x512)](/<ENABLE[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)) {
      const _0x2eff24 = JSON['parse']('[' + RegExp['$1'][_0x4a23eb(0x512)](/\d+/g) + ']');
      for (const _0x152f17 of _0x2eff24) {
        if (!$gameSwitches['value'](_0x152f17)) return ![];
      }
      return !![];
    }
    if (_0x17f2f7[_0x4a23eb(0x512)](/<ENABLE ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)) {
      const _0x57581e = JSON[_0x4a23eb(0x1c4)]('[' + RegExp['$1'][_0x4a23eb(0x512)](/\d+/g) + ']');
      for (const _0x151f95 of _0x57581e) {
        if (!$gameSwitches['value'](_0x151f95)) return ![];
      }
      return !![];
    }
    if (_0x17f2f7[_0x4a23eb(0x512)](/<ENABLE ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)) {
      const _0x22d9a9 = JSON[_0x4a23eb(0x1c4)]('[' + RegExp['$1'][_0x4a23eb(0x512)](/\d+/g) + ']');
      for (const _0x474ed2 of _0x22d9a9) {
        if ($gameSwitches[_0x4a23eb(0x5de)](_0x474ed2)) return !![];
      }
      return ![];
    }
    if (_0x17f2f7[_0x4a23eb(0x512)](/<DISABLE[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)) {
      const _0x1e4b9a = JSON[_0x4a23eb(0x1c4)]('[' + RegExp['$1'][_0x4a23eb(0x512)](/\d+/g) + ']');
      for (const _0x20a413 of _0x1e4b9a) {
        if (!$gameSwitches[_0x4a23eb(0x5de)](_0x20a413)) return !![];
      }
      return ![];
    }
    if (_0x17f2f7['match'](/<DISABLE ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)) {
      const _0x4b6b3f = JSON[_0x4a23eb(0x1c4)]('[' + RegExp['$1']['match'](/\d+/g) + ']');
      for (const _0x454652 of _0x4b6b3f) {
        if (!$gameSwitches[_0x4a23eb(0x5de)](_0x454652)) return !![];
      }
      return ![];
    }
    if (_0x17f2f7[_0x4a23eb(0x512)](/<DISABLE ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)) {
      const _0x1f9bef = JSON[_0x4a23eb(0x1c4)]('[' + RegExp['$1'][_0x4a23eb(0x512)](/\d+/g) + ']');
      for (const _0x38bcd6 of _0x1f9bef) {
        if ($gameSwitches[_0x4a23eb(0x5de)](_0x38bcd6)) return ![];
      }
      return !![];
    }
    return !![];
  }),
  (Game_BattlerBase[_0x412469(0x331)][_0x412469(0x358)] = function (_0x1e3749) {
    const _0x47ad2c = _0x412469,
      _0x1b53da = _0x1e3749['note'],
      _0x1b6e24 = VisuMZ['ItemsEquipsCore'][_0x47ad2c(0x21e)];
    return _0x1b6e24[_0x1e3749['id']] ? _0x1b6e24[_0x1e3749['id']][_0x47ad2c(0x575)](this, _0x1e3749) : !![];
  }),
  (Game_Actor[_0x412469(0x331)]['clearEquipments'] = function () {
    const _0x3f0045 = _0x412469,
      _0x4c8523 = this['equipSlots']()[_0x3f0045(0x1ec)];
    for (let _0x30545e = 0x0; _0x30545e < _0x4c8523; _0x30545e++) {
      if (this[_0x3f0045(0x4b9)](_0x30545e)) this[_0x3f0045(0x1d7)](_0x30545e, null);
    }
  }),
  (Game_Actor[_0x412469(0x331)]['isClearEquipOk'] = function (_0x120edf) {
    const _0x412f33 = _0x412469;
    return this[_0x412f33(0x3dc)]()[_0x412f33(0x5a9)](this[_0x412f33(0x37d)]()[_0x120edf]) ? ![] : this[_0x412f33(0x421)](_0x120edf);
  }),
  (Game_Actor['prototype']['nonRemovableEtypes'] = function () {
    const _0x35e903 = _0x412469;
    return VisuMZ[_0x35e903(0x215)]['Settings'][_0x35e903(0x2d7)][_0x35e903(0x3f7)];
  }),
  (Game_Actor[_0x412469(0x331)][_0x412469(0x4e1)] = function () {
    const _0x4b01a2 = _0x412469,
      _0x56e9e1 = this[_0x4b01a2(0x37d)]()['length'];
    for (let _0xa151ee = 0x0; _0xa151ee < _0x56e9e1; _0xa151ee++) {
      if (this[_0x4b01a2(0x585)](_0xa151ee)) this[_0x4b01a2(0x1d7)](_0xa151ee, null);
    }
    for (let _0x49d444 = 0x0; _0x49d444 < _0x56e9e1; _0x49d444++) {
      if (this['isOptimizeEquipOk'](_0x49d444)) this['changeEquip'](_0x49d444, this[_0x4b01a2(0x1d5)](_0x49d444));
    }
  }),
  (Game_Actor[_0x412469(0x331)][_0x412469(0x585)] = function (_0x4b9bdf) {
    const _0x613b7d = _0x412469;
    return this[_0x613b7d(0x47e)]()['includes'](this[_0x613b7d(0x37d)]()[_0x4b9bdf]) ? ![] : this[_0x613b7d(0x421)](_0x4b9bdf);
  }),
  (VisuMZ['ItemsEquipsCore'][_0x412469(0x3c2)] = Game_Actor[_0x412469(0x331)][_0x412469(0x421)]),
  (Game_Actor[_0x412469(0x331)][_0x412469(0x421)] = function (_0x163cd8) {
    const _0x21a57e = _0x412469;
    !this['_equips'][_0x163cd8] && (this[_0x21a57e(0x292)][_0x163cd8] = new Game_Item());
    const _0x80c3d2 = this['_equips'][_0x163cd8];
    if (_0x80c3d2) {
      const _0x2dc715 = _0x80c3d2[_0x21a57e(0x38f)]();
      if (DataManager['isCursedItem'](_0x2dc715)) return ![];
    }
    return VisuMZ['ItemsEquipsCore'][_0x21a57e(0x3c2)][_0x21a57e(0x575)](this, _0x163cd8);
  }),
  (Game_Actor[_0x412469(0x331)][_0x412469(0x47e)] = function () {
    const _0x53fcbc = _0x412469;
    return VisuMZ['ItemsEquipsCore'][_0x53fcbc(0x55e)][_0x53fcbc(0x2d7)][_0x53fcbc(0x34a)];
  }),
  (VisuMZ[_0x412469(0x215)]['Game_Actor_tradeItemWithParty'] = Game_Actor[_0x412469(0x331)][_0x412469(0x5f5)]),
  (Game_Actor['prototype'][_0x412469(0x5f5)] = function (_0xe06a7, _0x30e008) {
    const _0x1a7ef9 = _0x412469;
    if (this[_0x1a7ef9(0x239)]) return ![];
    $gameTemp[_0x1a7ef9(0x450)] = !![];
    const _0x1e79bd = VisuMZ[_0x1a7ef9(0x215)]['Game_Actor_tradeItemWithParty'][_0x1a7ef9(0x575)](this, _0xe06a7, _0x30e008);
    return ($gameTemp['_bypassNewLabel'] = ![]), _0x1e79bd;
  }),
  (Game_Actor[_0x412469(0x331)]['changeEquipById'] = function (_0x26e94b, _0x52cb94) {
    const _0x49ba26 = _0x412469,
      _0x41ae38 = this[_0x49ba26(0x209)](_0x26e94b);
    if (_0x41ae38 < 0x0) return;
    const _0x51cbb2 = _0x26e94b === 0x1 ? $dataWeapons[_0x52cb94] : $dataArmors[_0x52cb94];
    this[_0x49ba26(0x1d7)](_0x41ae38, _0x51cbb2);
  }),
  (Game_Actor[_0x412469(0x331)][_0x412469(0x209)] = function (_0x5d9700) {
    const _0x44cd5e = _0x412469;
    let _0x595b7f = 0x0;
    const _0x5ab31b = this[_0x44cd5e(0x37d)](),
      _0x43f517 = this['equips']();
    for (let _0x657f39 = 0x0; _0x657f39 < _0x5ab31b[_0x44cd5e(0x1ec)]; _0x657f39++) {
      if (_0x5ab31b[_0x657f39] === _0x5d9700) {
        _0x595b7f = _0x657f39;
        if (!_0x43f517[_0x657f39]) return _0x595b7f;
      }
    }
    return _0x595b7f;
  }),
  (VisuMZ[_0x412469(0x215)]['Game_Actor_paramPlus'] = Game_Actor['prototype'][_0x412469(0x2b5)]),
  (Game_Actor[_0x412469(0x331)][_0x412469(0x2b5)] = function (_0xb6da81) {
    const _0x2e0242 = _0x412469;
    let _0x15494c = VisuMZ[_0x2e0242(0x215)][_0x2e0242(0x322)][_0x2e0242(0x575)](this, _0xb6da81);
    for (const _0x40c2dc of this[_0x2e0242(0x547)]()) {
      if (_0x40c2dc) _0x15494c += this['paramPlusItemsEquipsCoreCustomJS'](_0x40c2dc, _0xb6da81);
    }
    return _0x15494c;
  }),
  (Game_Actor[_0x412469(0x331)][_0x412469(0x353)] = function (_0x307bfd, _0x411cca) {
    const _0x3c17ed = _0x412469;
    if (this[_0x3c17ed(0x2c4)]) return 0x0;
    const _0x19e339 = (DataManager['isWeapon'](_0x307bfd) ? 'W%1' : 'A%1')[_0x3c17ed(0x32c)](_0x307bfd['id']),
      _0x381a28 = '%1-%2'[_0x3c17ed(0x32c)](_0x19e339, _0x411cca);
    if (VisuMZ['ItemsEquipsCore'][_0x3c17ed(0x5d2)][_0x381a28]) {
      this[_0x3c17ed(0x2c4)] = !![];
      const _0x23383d = VisuMZ['ItemsEquipsCore']['paramJS'][_0x381a28][_0x3c17ed(0x575)](this, _0x307bfd, _0x411cca);
      return (this[_0x3c17ed(0x2c4)] = ![]), _0x23383d;
    } else return 0x0;
  }),
  (Game_Actor[_0x412469(0x331)][_0x412469(0x3a6)] = function (_0xb6d99a) {
    const _0x60cb20 = _0x412469;
    (this[_0x60cb20(0x564)] = !![]), (this['_shopStatusMenuAlly'] = _0xb6d99a);
  }),
  (Game_Actor[_0x412469(0x331)][_0x412469(0x5ab)] = function (_0x1e9318) {
    const _0xff1201 = _0x412469;
    _0x1e9318 = this[_0xff1201(0x407)](_0x1e9318);
    const _0x1b8e9f = this[_0xff1201(0x37d)]();
    this[_0xff1201(0x292)] = [];
    for (let _0x342367 = 0x0; _0x342367 < _0x1b8e9f['length']; _0x342367++) {
      this[_0xff1201(0x292)][_0x342367] = new Game_Item();
    }
    for (let _0x3d34ef = 0x0; _0x3d34ef < _0x1b8e9f[_0xff1201(0x1ec)]; _0x3d34ef++) {
      const _0x507691 = _0x1b8e9f[_0x3d34ef],
        _0x5e5cac = this['getMatchingInitEquip'](_0x1e9318, _0x507691);
      if (this[_0xff1201(0x2a8)](_0x5e5cac)) this['_equips'][_0x3d34ef][_0xff1201(0x304)](_0x5e5cac);
    }
    this[_0xff1201(0x418)](!![]), this[_0xff1201(0x1f2)]();
  }),
  (Game_Actor[_0x412469(0x331)][_0x412469(0x407)] = function (_0x4b3869) {
    const _0x221e21 = _0x412469,
      _0x5b2619 = [];
    for (let _0xd2a41f = 0x0; _0xd2a41f < _0x4b3869[_0x221e21(0x1ec)]; _0xd2a41f++) {
      const _0x27be1e = _0x4b3869[_0xd2a41f];
      if (_0x27be1e <= 0x0) continue;
      const _0xa3053b = $dataSystem['equipTypes'][_0xd2a41f + 0x1];
      if (_0xa3053b === $dataSystem[_0x221e21(0x42d)][0x1] || (_0xd2a41f === 0x1 && this[_0x221e21(0x274)]())) _0x5b2619[_0x221e21(0x437)]($dataWeapons[_0x27be1e]);
      else {
        if (BattleManager[_0x221e21(0x388)]()) {
          const _0x80014 = $dataArmors[_0x27be1e];
          _0x80014 && _0x80014[_0x221e21(0x49f)] === _0xd2a41f + 0x1 && _0x5b2619[_0x221e21(0x437)](_0x80014);
        } else {
          const _0x10a679 = $dataArmors[_0x27be1e];
          _0x10a679 && _0x10a679[_0x221e21(0x49f)] === _0xd2a41f + 0x1 && _0x5b2619[_0x221e21(0x437)](_0x10a679);
        }
      }
    }
    return _0x5b2619;
  }),
  (Game_Actor[_0x412469(0x331)][_0x412469(0x395)] = function (_0x39d6d6, _0x309d6a) {
    const _0x2b1e9d = _0x412469;
    for (const _0x198b71 of _0x39d6d6) {
      if (!_0x198b71) continue;
      if (_0x198b71[_0x2b1e9d(0x49f)] === _0x309d6a) return _0x39d6d6[_0x2b1e9d(0x3f6)](_0x39d6d6[_0x2b1e9d(0x2e3)](_0x198b71), 0x1), _0x198b71;
    }
    return null;
  }),
  (Game_Actor[_0x412469(0x331)][_0x412469(0x37d)] = function () {
    const _0x456a1e = _0x412469,
      _0x515b52 = VisuMZ[_0x456a1e(0x215)][_0x456a1e(0x556)](this[_0x456a1e(0x486)] || this[_0x456a1e(0x31e)]()[_0x456a1e(0x37d)]);
    if (_0x515b52[_0x456a1e(0x1ec)] >= 0x2 && this[_0x456a1e(0x274)]()) _0x515b52[0x1] = 0x1;
    return _0x515b52;
  }),
  (Game_Actor[_0x412469(0x331)][_0x412469(0x1ce)] = function (_0x4fabed) {
    const _0x509d50 = _0x412469;
    _0x4fabed[_0x509d50(0x3ac)](0x0), _0x4fabed[_0x509d50(0x3ac)](-0x1), (this[_0x509d50(0x486)] = _0x4fabed), this['refresh'](), this[_0x509d50(0x4c8)]();
  }),
  (Game_Actor['prototype'][_0x412469(0x51a)] = function () {
    const _0x300c6f = _0x412469;
    (this['_forcedSlots'] = undefined), this['refresh'](), this[_0x300c6f(0x4c8)]();
  }),
  (Game_Actor['prototype']['updateChangedSlots'] = function () {
    const _0x303b5d = _0x412469;
    let _0x3807e4 = this[_0x303b5d(0x37d)]()['length'];
    while (this['_equips'][_0x303b5d(0x1ec)] > _0x3807e4) {
      const _0xdae0c9 = this[_0x303b5d(0x292)][this[_0x303b5d(0x292)][_0x303b5d(0x1ec)] - 0x1];
      _0xdae0c9 && _0xdae0c9[_0x303b5d(0x38f)]() && $gameParty[_0x303b5d(0x45f)](_0xdae0c9['object'](), 0x1), this[_0x303b5d(0x292)][_0x303b5d(0x506)]();
    }
    while (_0x3807e4 > this[_0x303b5d(0x292)][_0x303b5d(0x1ec)]) {
      this['_equips'][_0x303b5d(0x437)](new Game_Item());
    }
  }),
  (VisuMZ['ItemsEquipsCore']['Game_Actor_changeClass'] = Game_Actor[_0x412469(0x331)]['changeClass']),
  (Game_Actor[_0x412469(0x331)]['changeClass'] = function (_0x13f5f6, _0x245b93) {
    const _0x3b054e = _0x412469;
    VisuMZ[_0x3b054e(0x215)][_0x3b054e(0x29d)]['call'](this, _0x13f5f6, _0x245b93), this['updateChangedSlots']();
  }),
  (Game_Actor[_0x412469(0x331)][_0x412469(0x521)] = function () {
    const _0x53bc05 = _0x412469,
      _0x57b772 = this['equipSlots']();
    for (let _0x7eb766 = 0x0; _0x7eb766 < _0x57b772[_0x53bc05(0x1ec)]; _0x7eb766++) {
      if (!this[_0x53bc05(0x292)][_0x7eb766]) this[_0x53bc05(0x292)][_0x7eb766] = new Game_Item();
    }
    this[_0x53bc05(0x418)](![]), this['refresh']();
  }),
  (VisuMZ['ItemsEquipsCore']['Game_Actor_changeEquip'] = Game_Actor[_0x412469(0x331)][_0x412469(0x1d7)]),
  (Game_Actor[_0x412469(0x331)][_0x412469(0x1d7)] = function (_0x16e603, _0x4075fc) {
    const _0x3d9c99 = _0x412469;
    if (!this[_0x3d9c99(0x239)]) {
      const _0x5c6bcd = JsonEx[_0x3d9c99(0x42b)](this);
      (_0x5c6bcd[_0x3d9c99(0x239)] = !![]), this[_0x3d9c99(0x5cc)](_0x16e603, _0x4075fc), this['equipAdjustHpMp'](_0x5c6bcd);
    } else this[_0x3d9c99(0x5cc)](_0x16e603, _0x4075fc);
  }),
  (VisuMZ['ItemsEquipsCore'][_0x412469(0x4ba)] = Game_Actor[_0x412469(0x331)][_0x412469(0x58f)]),
  (Game_Actor[_0x412469(0x331)]['forceChangeEquip'] = function (_0x3633b4, _0x108fc2) {
    const _0x181bf3 = _0x412469;
    !this[_0x181bf3(0x292)][_0x3633b4] && (this[_0x181bf3(0x292)][_0x3633b4] = new Game_Item());
    if (!this[_0x181bf3(0x239)]) {
      const _0x137bcd = JsonEx[_0x181bf3(0x42b)](this);
      (_0x137bcd[_0x181bf3(0x239)] = !![]), VisuMZ['ItemsEquipsCore'][_0x181bf3(0x4ba)][_0x181bf3(0x575)](this, _0x3633b4, _0x108fc2), this[_0x181bf3(0x24f)](_0x137bcd);
    } else VisuMZ['ItemsEquipsCore'][_0x181bf3(0x4ba)][_0x181bf3(0x575)](this, _0x3633b4, _0x108fc2);
  }),
  (VisuMZ[_0x412469(0x215)]['Game_Actor_discardEquip'] = Game_Actor[_0x412469(0x331)][_0x412469(0x1eb)]),
  (Game_Actor[_0x412469(0x331)]['discardEquip'] = function (_0xb03ef1) {
    const _0x28c041 = _0x412469;
    if (!this['_tempActor']) {
      const _0xdc7533 = JsonEx['makeDeepCopy'](this);
      (_0xdc7533[_0x28c041(0x239)] = !![]), VisuMZ['ItemsEquipsCore'][_0x28c041(0x46a)][_0x28c041(0x575)](this, _0xb03ef1), this[_0x28c041(0x24f)](_0xdc7533);
    } else VisuMZ['ItemsEquipsCore'][_0x28c041(0x46a)][_0x28c041(0x575)](this, _0xb03ef1);
  }),
  (Game_Actor[_0x412469(0x331)][_0x412469(0x418)] = function (_0x23552e) {
    const _0x2586c3 = _0x412469;
    if (this[_0x2586c3(0x415)]) return;
    let _0xba3dfa = 0x0;
    for (;;) {
      _0xba3dfa++;
      if (_0xba3dfa > 0x3) break;
      const _0x25db24 = this[_0x2586c3(0x37d)](),
        _0x3314b9 = this[_0x2586c3(0x547)](),
        _0x36b7f0 = _0x3314b9['length'];
      let _0x42ce22 = ![];
      for (let _0x21fbfc = 0x0; _0x21fbfc < _0x36b7f0; _0x21fbfc++) {
        const _0x2cef1d = _0x3314b9[_0x21fbfc];
        if (!_0x2cef1d) continue;
        const _0xc9fe2d = DataManager['getEtypeIDs'](_0x2cef1d);
        if (!this[_0x2586c3(0x2a8)](_0x2cef1d) || !_0xc9fe2d[_0x2586c3(0x5a9)](_0x25db24[_0x21fbfc])) {
          !_0x23552e && this[_0x2586c3(0x5f5)](null, _0x2cef1d);
          if (!this[_0x2586c3(0x239)]) {
            const _0x1f3ce5 = JsonEx['makeDeepCopy'](this);
            (_0x1f3ce5[_0x2586c3(0x239)] = !![]),
              this['_equips'][_0x21fbfc][_0x2586c3(0x304)](null),
              (this[_0x2586c3(0x415)] = !![]),
              this[_0x2586c3(0x24f)](_0x1f3ce5),
              (this[_0x2586c3(0x415)] = undefined);
          } else {
            if (this[_0x2586c3(0x292)][_0x21fbfc]) this[_0x2586c3(0x292)][_0x21fbfc][_0x2586c3(0x304)](null);
            else continue;
          }
          _0x42ce22 = !![];
        }
      }
      if (!_0x42ce22) break;
    }
  }),
  (Game_Actor['prototype'][_0x412469(0x24f)] = function (_0x2f7953) {
    const _0x8941c5 = _0x412469;
    if (this[_0x8941c5(0x239)]) return;
    if (!VisuMZ[_0x8941c5(0x215)][_0x8941c5(0x55e)][_0x8941c5(0x2d7)][_0x8941c5(0x3a9)]) return;
    const _0x2c6fd9 = Math['round'](_0x2f7953['hpRate']() * this[_0x8941c5(0x49d)]),
      _0x119775 = Math[_0x8941c5(0x1c0)](_0x2f7953['mpRate']() * this['mmp']);
    if (this['hp'] > 0x0) this[_0x8941c5(0x44a)](_0x2c6fd9);
    if (this['mp'] > 0x0) this[_0x8941c5(0x259)](_0x119775);
  }),
  (Game_Actor['prototype'][_0x412469(0x5cc)] = function (_0x40bcf3, _0x1f7727) {
    const _0x584915 = _0x412469;
    if (!this[_0x584915(0x5f5)](_0x1f7727, this[_0x584915(0x547)]()[_0x40bcf3])) return;
    if (_0x1f7727) {
      const _0x85cf5a = DataManager['getEtypeIDs'](_0x1f7727);
      if (!_0x85cf5a['includes'](this[_0x584915(0x37d)]()[_0x40bcf3])) return;
    }
    !this[_0x584915(0x292)][_0x40bcf3] && (this[_0x584915(0x292)][_0x40bcf3] = new Game_Item());
    this['_equips'][_0x40bcf3][_0x584915(0x304)](_0x1f7727);
    if (VisuMZ[_0x584915(0x215)][_0x584915(0x5bb)](_0x1f7727)) {
      const _0x5b392f = VisuMZ[_0x584915(0x215)][_0x584915(0x55e)][_0x584915(0x2d7)][_0x584915(0x546)] || '',
        _0x292d20 = this[_0x584915(0x412)](),
        _0x4f0a8b = _0x584915(0x570)[_0x584915(0x32c)](_0x1f7727[_0x584915(0x314)]),
        _0x46e021 = _0x1f7727['name'] || '';
      let _0x1b75b6 = _0x5b392f[_0x584915(0x32c)](_0x292d20, _0x4f0a8b, _0x46e021);
      if (VisuMZ[_0x584915(0x5ea)][_0x584915(0x5ca)] >= 1.79 && _0x1b75b6[_0x584915(0x1ec)] > 0x0) $textPopup(_0x1b75b6);
    }
    this['refresh']();
  }),
  (VisuMZ[_0x412469(0x215)][_0x412469(0x5bb)] = function (_0x315cca) {
    const _0x499a0d = _0x412469;
    if (!_0x315cca) return ![];
    if (!Imported[_0x499a0d(0x308)]) return ![];
    if (VisuMZ[_0x499a0d(0x5ea)][_0x499a0d(0x5ca)] < 1.79) return ![];
    return DataManager[_0x499a0d(0x51b)](_0x315cca);
  }),
  (Game_Actor[_0x412469(0x331)][_0x412469(0x1d5)] = function (_0x19f387) {
    const _0x692999 = _0x412469,
      _0x342fb3 = this[_0x692999(0x37d)]()[_0x19f387],
      _0x410a05 = $gameParty[_0x692999(0x525)]()[_0x692999(0x5e4)](
        _0x40cd0f => DataManager[_0x692999(0x23f)](_0x40cd0f)[_0x692999(0x5a9)](_0x342fb3) && this[_0x692999(0x2a8)](_0x40cd0f) && !DataManager[_0x692999(0x51b)](_0x40cd0f),
      );
    let _0x2604c4 = null,
      _0x22e9de = -0x3e8;
    for (let _0x2372eb = 0x0; _0x2372eb < _0x410a05[_0x692999(0x1ec)]; _0x2372eb++) {
      const _0x5b1358 = this[_0x692999(0x23a)](_0x410a05[_0x2372eb]);
      _0x5b1358 > _0x22e9de && ((_0x22e9de = _0x5b1358), (_0x2604c4 = _0x410a05[_0x2372eb]));
    }
    return _0x2604c4;
  }),
  (VisuMZ[_0x412469(0x215)][_0x412469(0x315)] = Game_Party[_0x412469(0x331)][_0x412469(0x268)]),
  (Game_Party['prototype'][_0x412469(0x268)] = function () {
    const _0x2b0a85 = _0x412469;
    VisuMZ[_0x2b0a85(0x215)][_0x2b0a85(0x315)][_0x2b0a85(0x575)](this), this['initNewItemsList'](), this[_0x2b0a85(0x1e0)]();
  }),
  (Game_Party[_0x412469(0x331)]['initNewItemsList'] = function () {
    const _0x23d278 = _0x412469;
    this[_0x23d278(0x5af)] = [];
  }),
  (Game_Party['prototype'][_0x412469(0x460)] = function (_0x342c1d) {
    const _0x2ff6ef = _0x412469;
    if (!$gameTemp[_0x2ff6ef(0x347)]()) return ![];
    if (this[_0x2ff6ef(0x5af)] === undefined) this[_0x2ff6ef(0x45c)]();
    let _0x3f7126 = '';
    if (DataManager[_0x2ff6ef(0x28d)](_0x342c1d)) _0x3f7126 = _0x2ff6ef(0x477)['format'](_0x342c1d['id']);
    else {
      if (DataManager[_0x2ff6ef(0x32f)](_0x342c1d)) _0x3f7126 = _0x2ff6ef(0x20d)[_0x2ff6ef(0x32c)](_0x342c1d['id']);
      else {
        if (DataManager[_0x2ff6ef(0x429)](_0x342c1d)) _0x3f7126 = _0x2ff6ef(0x474)[_0x2ff6ef(0x32c)](_0x342c1d['id']);
        else return;
      }
    }
    return this[_0x2ff6ef(0x5af)]['includes'](_0x3f7126);
  }),
  (Game_Party[_0x412469(0x331)][_0x412469(0x5aa)] = function (_0x3820bf) {
    const _0x556451 = _0x412469;
    if (!$gameTemp['newLabelEnabled']()) return;
    if (this[_0x556451(0x5af)] === undefined) this[_0x556451(0x45c)]();
    let _0x394ebd = '';
    if (DataManager[_0x556451(0x28d)](_0x3820bf)) _0x394ebd = _0x556451(0x477)['format'](_0x3820bf['id']);
    else {
      if (DataManager['isWeapon'](_0x3820bf)) _0x394ebd = _0x556451(0x20d)[_0x556451(0x32c)](_0x3820bf['id']);
      else {
        if (DataManager[_0x556451(0x429)](_0x3820bf)) _0x394ebd = _0x556451(0x474)[_0x556451(0x32c)](_0x3820bf['id']);
        else return;
      }
    }
    if (!this[_0x556451(0x5af)][_0x556451(0x5a9)](_0x394ebd)) this[_0x556451(0x5af)][_0x556451(0x437)](_0x394ebd);
  }),
  (Game_Party[_0x412469(0x331)][_0x412469(0x243)] = function (_0x376f9e) {
    const _0x441e34 = _0x412469;
    if (!$gameTemp[_0x441e34(0x347)]()) return;
    if (this[_0x441e34(0x5af)] === undefined) this[_0x441e34(0x45c)]();
    let _0x201b29 = '';
    if (DataManager[_0x441e34(0x28d)](_0x376f9e)) _0x201b29 = _0x441e34(0x477)[_0x441e34(0x32c)](_0x376f9e['id']);
    else {
      if (DataManager[_0x441e34(0x32f)](_0x376f9e)) _0x201b29 = _0x441e34(0x20d)['format'](_0x376f9e['id']);
      else {
        if (DataManager[_0x441e34(0x429)](_0x376f9e)) _0x201b29 = 'armor-%1'[_0x441e34(0x32c)](_0x376f9e['id']);
        else return;
      }
    }
    this[_0x441e34(0x5af)]['includes'](_0x201b29) && this[_0x441e34(0x5af)][_0x441e34(0x3f6)](this[_0x441e34(0x5af)][_0x441e34(0x2e3)](_0x201b29), 0x1);
  }),
  (VisuMZ['ItemsEquipsCore'][_0x412469(0x332)] = Game_Party[_0x412469(0x331)][_0x412469(0x4aa)]),
  (Game_Party[_0x412469(0x331)][_0x412469(0x4aa)] = function (_0x4cd1ef) {
    const _0x530003 = _0x412469;
    if (DataManager['isProxyItem'](_0x4cd1ef)) _0x4cd1ef = DataManager[_0x530003(0x54f)](_0x4cd1ef);
    return VisuMZ['ItemsEquipsCore'][_0x530003(0x332)][_0x530003(0x575)](this, _0x4cd1ef);
  }),
  (VisuMZ['ItemsEquipsCore'][_0x412469(0x573)] = Game_Party[_0x412469(0x331)][_0x412469(0x45f)]),
  (Game_Party['prototype'][_0x412469(0x45f)] = function (_0x4a6c4d, _0x4883b9, _0x3864e0) {
    const _0x1c8176 = _0x412469;
    if (DataManager['isProxyItem'](_0x4a6c4d)) _0x4a6c4d = null;
    const _0x52c928 = this[_0x1c8176(0x4aa)](_0x4a6c4d);
    VisuMZ['ItemsEquipsCore'][_0x1c8176(0x573)][_0x1c8176(0x575)](this, _0x4a6c4d, _0x4883b9, _0x3864e0);
    if (this[_0x1c8176(0x4aa)](_0x4a6c4d) > _0x52c928) this['setNewItem'](_0x4a6c4d);
  }),
  (Game_Party['prototype'][_0x412469(0x515)] = function (_0x29618a) {
    const _0x78a5d9 = _0x412469;
    if (DataManager['isProxyItem'](_0x29618a)) _0x29618a = DataManager[_0x78a5d9(0x54f)](_0x29618a);
    return DataManager[_0x78a5d9(0x29b)](_0x29618a);
  }),
  (VisuMZ['ItemsEquipsCore'][_0x412469(0x35c)] = Game_Party['prototype'][_0x412469(0x4c6)]),
  (Game_Party[_0x412469(0x331)]['consumeItem'] = function (_0x1c15b4) {
    const _0x27b9f8 = _0x412469;
    if (_0x1c15b4) {
      const _0x328ac1 = _0x1c15b4['note'] || '';
      if (_0x328ac1[_0x27b9f8(0x512)](/<(?:CONSERVE|PRESERVE):[ ](\d+)([%％])>/i)) {
        const _0x58a491 = Number(RegExp['$1']) * 0.01;
        if (Math['random']() < _0x58a491) return;
      }
    }
    VisuMZ[_0x27b9f8(0x215)][_0x27b9f8(0x35c)]['call'](this, _0x1c15b4);
  }),
  (Game_Party['prototype'][_0x412469(0x1e0)] = function () {
    const _0x3373f7 = _0x412469;
    this[_0x3373f7(0x377)] = { buy: { gold: 0x0, items: {} }, sell: { gold: 0x0, items: {} } };
  }),
  (Game_Party[_0x412469(0x331)][_0x412469(0x541)] = function () {
    const _0xd466d6 = _0x412469;
    return this[_0xd466d6(0x377)] === undefined && this[_0xd466d6(0x1e0)](), this[_0xd466d6(0x377)];
  }),
  (Game_Party['prototype'][_0x412469(0x4ab)] = function (_0xc4bdf5, _0x3aeb88) {
    const _0x30ac8f = _0x412469;
    if (!_0x3aeb88) return 0x0;
    this[_0x30ac8f(0x377)] === undefined && this['initShopTrackingData']();
    const _0x2b2cab = this['getShopTrackingData']();
    if (!_0x2b2cab[_0xc4bdf5]) return 0x0;
    if (_0x3aeb88 === _0x30ac8f(0x40c)) return (_0x2b2cab[_0xc4bdf5][_0x30ac8f(0x40c)] = _0x2b2cab[_0xc4bdf5][_0x30ac8f(0x40c)] || 0x0), _0x2b2cab[_0xc4bdf5]['gold'];
    else {
      if (DataManager[_0x30ac8f(0x28d)](_0x3aeb88)) key = _0x30ac8f(0x477)[_0x30ac8f(0x32c)](_0x3aeb88['id']);
      else {
        if (DataManager['isWeapon'](_0x3aeb88)) key = _0x30ac8f(0x20d)['format'](_0x3aeb88['id']);
        else {
          if (DataManager[_0x30ac8f(0x429)](_0x3aeb88)) key = 'armor-%1'[_0x30ac8f(0x32c)](_0x3aeb88['id']);
          else return 0x0;
        }
      }
    }
    return (_0x2b2cab[_0xc4bdf5][_0x30ac8f(0x572)][key] = _0x2b2cab[_0xc4bdf5][_0x30ac8f(0x572)][key] || 0x0), _0x2b2cab[_0xc4bdf5]['items'][key];
  }),
  (Game_Party[_0x412469(0x331)]['getShopTrackingItemBuy'] = function (_0x1a3779) {
    const _0x24f440 = _0x412469;
    return this[_0x24f440(0x4ab)](_0x24f440(0x3f5), _0x1a3779);
  }),
  (Game_Party[_0x412469(0x331)]['getShopTrackingItemSell'] = function (_0x3b30e2) {
    const _0x5839e8 = _0x412469;
    return this[_0x5839e8(0x4ab)](_0x5839e8(0x27c), _0x3b30e2);
  }),
  (Game_Party[_0x412469(0x331)][_0x412469(0x2d6)] = function () {
    const _0x1af6af = _0x412469;
    return this[_0x1af6af(0x4ab)](_0x1af6af(0x3f5), _0x1af6af(0x40c));
  }),
  (Game_Party[_0x412469(0x331)][_0x412469(0x222)] = function () {
    const _0x4893fc = _0x412469;
    return this[_0x4893fc(0x4ab)](_0x4893fc(0x27c), _0x4893fc(0x40c));
  }),
  (Game_Party[_0x412469(0x331)][_0x412469(0x511)] = function (_0x5bd477, _0x4cfb79, _0x57ff67) {
    const _0x13644b = _0x412469;
    if (!_0x4cfb79) return;
    if (_0x57ff67 <= 0x0) return;
    this['_shopTrackingData'] === undefined && this[_0x13644b(0x1e0)]();
    const _0x362661 = this[_0x13644b(0x541)]();
    if (!_0x362661[_0x5bd477]) return;
    if (_0x4cfb79 === _0x13644b(0x40c)) {
      (_0x362661[_0x5bd477][_0x13644b(0x40c)] = _0x362661[_0x5bd477][_0x13644b(0x40c)] || 0x0), (_0x362661[_0x5bd477][_0x13644b(0x40c)] += _0x57ff67);
      return;
    } else {
      if (DataManager[_0x13644b(0x28d)](_0x4cfb79)) key = _0x13644b(0x477)[_0x13644b(0x32c)](_0x4cfb79['id']);
      else {
        if (DataManager[_0x13644b(0x32f)](_0x4cfb79)) key = 'weapon-%1'[_0x13644b(0x32c)](_0x4cfb79['id']);
        else {
          if (DataManager[_0x13644b(0x429)](_0x4cfb79)) key = 'armor-%1'['format'](_0x4cfb79['id']);
          else return;
        }
      }
    }
    (_0x362661[_0x5bd477][_0x13644b(0x572)][key] = _0x362661[_0x5bd477][_0x13644b(0x572)][key] || 0x0), (_0x362661[_0x5bd477][_0x13644b(0x572)][key] += _0x57ff67);
  }),
  (Game_Party['prototype'][_0x412469(0x3c8)] = function (_0x459c28, _0x560e6c) {
    const _0x1fec41 = _0x412469;
    this[_0x1fec41(0x511)](_0x1fec41(0x3f5), _0x459c28, _0x560e6c);
  }),
  (Game_Party[_0x412469(0x331)]['addShopTrackingItemSell'] = function (_0x377a0a, _0x560ce8) {
    const _0x19df7f = _0x412469;
    this['addShopTrackingItem'](_0x19df7f(0x27c), _0x377a0a, _0x560ce8);
  }),
  (Game_Party[_0x412469(0x331)][_0x412469(0x5d0)] = function (_0x410417) {
    const _0x2cee83 = _0x412469;
    this[_0x2cee83(0x511)](_0x2cee83(0x3f5), _0x2cee83(0x40c), _0x410417);
  }),
  (Game_Party[_0x412469(0x331)][_0x412469(0x2bb)] = function (_0x2f0ca1) {
    const _0x1d349d = _0x412469;
    this[_0x1d349d(0x511)](_0x1d349d(0x27c), _0x1d349d(0x40c), _0x2f0ca1);
  }),
  (VisuMZ['ItemsEquipsCore'][_0x412469(0x5b1)] = Scene_ItemBase[_0x412469(0x331)][_0x412469(0x562)]),
  (Scene_ItemBase['prototype']['activateItemWindow'] = function () {
    const _0x546dd2 = _0x412469;
    VisuMZ[_0x546dd2(0x215)][_0x546dd2(0x5b1)][_0x546dd2(0x575)](this), this['_itemWindow']['callUpdateHelp']();
  }),
  (Scene_Item[_0x412469(0x331)][_0x412469(0x356)] = function () {
    const _0x42c064 = _0x412469;
    if (ConfigManager[_0x42c064(0x540)] && ConfigManager[_0x42c064(0x2a9)] !== undefined) return ConfigManager[_0x42c064(0x2a9)];
    else return this[_0x42c064(0x20b)]() ? this[_0x42c064(0x270)]()[_0x42c064(0x512)](/LOWER/i) : Scene_ItemBase[_0x42c064(0x331)][_0x42c064(0x356)][_0x42c064(0x575)](this);
  }),
  (Scene_Item[_0x412469(0x331)][_0x412469(0x26e)] = function () {
    const _0x1e084d = _0x412469;
    if (ConfigManager[_0x1e084d(0x540)] && ConfigManager[_0x1e084d(0x57c)] !== undefined) return ConfigManager[_0x1e084d(0x57c)];
    else return this[_0x1e084d(0x20b)]() ? this[_0x1e084d(0x270)]()[_0x1e084d(0x512)](/RIGHT/i) : Scene_ItemBase[_0x1e084d(0x331)]['isRightInputMode']['call'](this);
  }),
  (Scene_Item['prototype'][_0x412469(0x270)] = function () {
    const _0x43404 = _0x412469;
    return VisuMZ[_0x43404(0x215)]['Settings'][_0x43404(0x582)]['LayoutStyle'];
  }),
  (Scene_Item[_0x412469(0x331)]['isUseModernControls'] = function () {
    const _0x1b42d2 = _0x412469;
    return this[_0x1b42d2(0x2cd)] && this['_categoryWindow'][_0x1b42d2(0x4fa)]();
  }),
  (Scene_Item[_0x412469(0x331)]['isUseItemsEquipsCoreUpdatedLayout'] = function () {
    const _0x4edabb = _0x412469;
    return VisuMZ['ItemsEquipsCore']['Settings'][_0x4edabb(0x582)][_0x4edabb(0x41a)];
  }),
  (VisuMZ[_0x412469(0x215)][_0x412469(0x26f)] = Scene_Item[_0x412469(0x331)][_0x412469(0x3ab)]),
  (Scene_Item[_0x412469(0x331)][_0x412469(0x3ab)] = function () {
    const _0x2ace1b = _0x412469;
    VisuMZ[_0x2ace1b(0x215)][_0x2ace1b(0x26f)][_0x2ace1b(0x575)](this), this[_0x2ace1b(0x4fa)]() && this[_0x2ace1b(0x380)]();
  }),
  (VisuMZ[_0x412469(0x215)][_0x412469(0x411)] = Scene_Item[_0x412469(0x331)][_0x412469(0x323)]),
  (Scene_Item[_0x412469(0x331)][_0x412469(0x323)] = function () {
    const _0x4de750 = _0x412469;
    return this[_0x4de750(0x20b)]() ? this['helpWindowRectItemsEquipsCore']() : VisuMZ[_0x4de750(0x215)][_0x4de750(0x411)][_0x4de750(0x575)](this);
  }),
  (Scene_Item[_0x412469(0x331)]['helpWindowRectItemsEquipsCore'] = function () {
    const _0x452cc1 = _0x412469,
      _0x53cd3f = 0x0,
      _0x15bf15 = this['helpAreaTop'](),
      _0x1a3ae9 = Graphics['boxWidth'],
      _0x5aa9c1 = this[_0x452cc1(0x341)]();
    return new Rectangle(_0x53cd3f, _0x15bf15, _0x1a3ae9, _0x5aa9c1);
  }),
  (VisuMZ[_0x412469(0x215)]['Scene_Item_createCategoryWindow'] = Scene_Item['prototype'][_0x412469(0x3ad)]),
  (Scene_Item['prototype'][_0x412469(0x3ad)] = function () {
    const _0x3b065b = _0x412469;
    VisuMZ[_0x3b065b(0x215)][_0x3b065b(0x3c0)]['call'](this), this['isUseModernControls']() && this[_0x3b065b(0x339)]();
  }),
  (Scene_Item['prototype'][_0x412469(0x339)] = function () {
    const _0x155b08 = _0x412469;
    delete this[_0x155b08(0x2cd)][_0x155b08(0x5a0)]['ok'], delete this[_0x155b08(0x2cd)][_0x155b08(0x5a0)][_0x155b08(0x519)];
  }),
  (VisuMZ[_0x412469(0x215)][_0x412469(0x516)] = Scene_Item['prototype'][_0x412469(0x5b9)]),
  (Scene_Item['prototype']['categoryWindowRect'] = function () {
    const _0x44d446 = _0x412469;
    return this[_0x44d446(0x20b)]() ? this[_0x44d446(0x37f)]() : VisuMZ[_0x44d446(0x215)][_0x44d446(0x516)]['call'](this);
  }),
  (Scene_Item[_0x412469(0x331)][_0x412469(0x37f)] = function () {
    const _0x1f8d78 = _0x412469,
      _0x5a15ce = 0x0,
      _0x46e0b4 = this['mainAreaTop'](),
      _0x9a1cc0 = Graphics['boxWidth'],
      _0x22ef51 = this[_0x1f8d78(0x3ef)](0x1, !![]);
    return new Rectangle(_0x5a15ce, _0x46e0b4, _0x9a1cc0, _0x22ef51);
  }),
  (VisuMZ['ItemsEquipsCore']['Scene_Item_createItemWindow'] = Scene_Item[_0x412469(0x331)][_0x412469(0x1d8)]),
  (Scene_Item['prototype'][_0x412469(0x1d8)] = function () {
    const _0x1a708 = _0x412469;
    VisuMZ[_0x1a708(0x215)][_0x1a708(0x569)][_0x1a708(0x575)](this), this['isUseModernControls']() && this[_0x1a708(0x48d)](), this[_0x1a708(0x1fc)]() && this[_0x1a708(0x258)]();
  }),
  (VisuMZ[_0x412469(0x215)][_0x412469(0x4fd)] = Scene_Item['prototype'][_0x412469(0x2ab)]),
  (Scene_Item[_0x412469(0x331)][_0x412469(0x2ab)] = function () {
    const _0xde78f5 = _0x412469;
    if (this[_0xde78f5(0x20b)]()) return this[_0xde78f5(0x58a)]();
    else {
      const _0x38ab59 = VisuMZ[_0xde78f5(0x215)][_0xde78f5(0x4fd)]['call'](this);
      return this[_0xde78f5(0x1fc)]() && this[_0xde78f5(0x279)]() && (_0x38ab59[_0xde78f5(0x2fa)] -= this[_0xde78f5(0x43d)]()), _0x38ab59;
    }
  }),
  (Scene_Item[_0x412469(0x331)][_0x412469(0x58a)] = function () {
    const _0x5f1453 = _0x412469,
      _0x570407 = this[_0x5f1453(0x26e)]() ? this['statusWidth']() : 0x0,
      _0x4d6c41 = this[_0x5f1453(0x2cd)]['y'] + this['_categoryWindow']['height'],
      _0x1b6681 = Graphics[_0x5f1453(0x283)] - this[_0x5f1453(0x43d)](),
      _0x4037a7 = this[_0x5f1453(0x3a2)]() - _0x4d6c41;
    return new Rectangle(_0x570407, _0x4d6c41, _0x1b6681, _0x4037a7);
  }),
  (Scene_Item[_0x412469(0x331)][_0x412469(0x48d)] = function () {
    const _0x3f0e3f = _0x412469;
    this[_0x3f0e3f(0x3d1)][_0x3f0e3f(0x482)]('cancel', this[_0x3f0e3f(0x379)]['bind'](this));
  }),
  (Scene_Item[_0x412469(0x331)][_0x412469(0x1fc)] = function () {
    const _0x293732 = _0x412469;
    return this[_0x293732(0x20b)]() ? !![] : VisuMZ['ItemsEquipsCore'][_0x293732(0x55e)]['ItemScene']['ShowShopStatus'];
  }),
  (Scene_Item[_0x412469(0x331)][_0x412469(0x279)] = function () {
    const _0x1d0fb5 = _0x412469;
    return VisuMZ[_0x1d0fb5(0x215)][_0x1d0fb5(0x55e)][_0x1d0fb5(0x582)][_0x1d0fb5(0x3cf)];
  }),
  (Scene_Item[_0x412469(0x331)][_0x412469(0x258)] = function () {
    const _0xd74b0f = _0x412469,
      _0x3add33 = this[_0xd74b0f(0x30f)]();
    (this[_0xd74b0f(0x36d)] = new Window_ShopStatus(_0x3add33)), this[_0xd74b0f(0x20f)](this[_0xd74b0f(0x36d)]), this[_0xd74b0f(0x3d1)][_0xd74b0f(0x44c)](this[_0xd74b0f(0x36d)]);
    const _0x4640da = VisuMZ['ItemsEquipsCore'][_0xd74b0f(0x55e)][_0xd74b0f(0x582)][_0xd74b0f(0x5e5)];
    this['_statusWindow'][_0xd74b0f(0x43f)](_0x4640da || 0x0);
  }),
  (Scene_Item['prototype']['statusWindowRect'] = function () {
    const _0x53458f = _0x412469;
    return this[_0x53458f(0x20b)]() ? this[_0x53458f(0x31f)]() : VisuMZ[_0x53458f(0x215)][_0x53458f(0x55e)][_0x53458f(0x582)][_0x53458f(0x549)][_0x53458f(0x575)](this);
  }),
  (Scene_Item[_0x412469(0x331)][_0x412469(0x31f)] = function () {
    const _0x33b0b3 = _0x412469,
      _0x2ac68d = this[_0x33b0b3(0x43d)](),
      _0x581216 = this['_itemWindow']['height'],
      _0x59b594 = this['isRightInputMode']() ? 0x0 : Graphics[_0x33b0b3(0x283)] - this[_0x33b0b3(0x43d)](),
      _0x4fe20b = this[_0x33b0b3(0x3d1)]['y'];
    return new Rectangle(_0x59b594, _0x4fe20b, _0x2ac68d, _0x581216);
  }),
  (Scene_Item[_0x412469(0x331)][_0x412469(0x43d)] = function () {
    return Scene_Shop['prototype']['statusWidth']();
  }),
  (Scene_Item[_0x412469(0x331)][_0x412469(0x365)] = function () {
    const _0x46cdcc = _0x412469;
    if (!this[_0x46cdcc(0x270)]()) return ![];
    if (!this['isUseModernControls']()) return ![];
    if (!this[_0x46cdcc(0x3d1)]) return ![];
    if (!this[_0x46cdcc(0x3d1)][_0x46cdcc(0x580)]) return ![];
    return this[_0x46cdcc(0x270)]() && this['isUseModernControls']();
  }),
  (Scene_Item[_0x412469(0x331)]['buttonAssistKey1'] = function () {
    const _0x345249 = _0x412469;
    if (this[_0x345249(0x365)]())
      return this[_0x345249(0x3d1)][_0x345249(0x47d)]() === 0x1
        ? TextManager['getInputMultiButtonStrings'](_0x345249(0x1c9), 'right')
        : TextManager['getInputMultiButtonStrings']('pageup', 'pagedown');
    return Scene_ItemBase[_0x345249(0x331)][_0x345249(0x286)][_0x345249(0x575)](this);
  }),
  (Scene_Item[_0x412469(0x331)][_0x412469(0x2dd)] = function () {
    const _0x4db0a9 = _0x412469;
    if (this['buttonAssistItemListRequirement']()) return VisuMZ[_0x4db0a9(0x215)][_0x4db0a9(0x55e)][_0x4db0a9(0x582)]['buttonAssistCategory'];
    return Scene_ItemBase[_0x4db0a9(0x331)][_0x4db0a9(0x2dd)][_0x4db0a9(0x575)](this);
  }),
  (Scene_Equip[_0x412469(0x331)][_0x412469(0x51c)] = function () {
    const _0x5ee876 = _0x412469;
    Scene_ItemBase[_0x5ee876(0x331)][_0x5ee876(0x51c)]['call'](this), this[_0x5ee876(0x4f6)]();
  }),
  (Scene_Equip[_0x412469(0x331)][_0x412469(0x356)] = function () {
    const _0xa264f9 = _0x412469;
    if (ConfigManager[_0xa264f9(0x540)] && ConfigManager['uiHelpPosition'] !== undefined) return ConfigManager[_0xa264f9(0x2a9)];
    else {
      if (this[_0xa264f9(0x20b)]()) return this[_0xa264f9(0x270)]()['match'](/LOWER/i);
      else Scene_MenuBase[_0xa264f9(0x331)][_0xa264f9(0x26e)][_0xa264f9(0x575)](this);
    }
  }),
  (Scene_Equip['prototype'][_0x412469(0x26e)] = function () {
    const _0x3d9cca = _0x412469;
    if (ConfigManager[_0x3d9cca(0x540)] && ConfigManager[_0x3d9cca(0x57c)] !== undefined) return ConfigManager['uiInputPosition'];
    else {
      if (this[_0x3d9cca(0x20b)]()) return this[_0x3d9cca(0x270)]()[_0x3d9cca(0x512)](/RIGHT/i);
      else Scene_MenuBase[_0x3d9cca(0x331)][_0x3d9cca(0x26e)]['call'](this);
    }
  }),
  (Scene_Equip[_0x412469(0x331)][_0x412469(0x270)] = function () {
    const _0x4f42f6 = _0x412469;
    return VisuMZ[_0x4f42f6(0x215)]['Settings']['EquipScene'][_0x4f42f6(0x4a3)];
  }),
  (Scene_Equip[_0x412469(0x331)][_0x412469(0x4fa)] = function () {
    const _0x301424 = _0x412469;
    return this[_0x301424(0x4ed)] && this['_commandWindow'][_0x301424(0x4fa)]();
  }),
  (Scene_Equip[_0x412469(0x331)]['isUseItemsEquipsCoreUpdatedLayout'] = function () {
    const _0x12aa07 = _0x412469;
    return VisuMZ[_0x12aa07(0x215)][_0x12aa07(0x55e)]['EquipScene'][_0x12aa07(0x41a)];
  }),
  (VisuMZ['ItemsEquipsCore'][_0x412469(0x340)] = Scene_Equip[_0x412469(0x331)][_0x412469(0x3ab)]),
  (Scene_Equip[_0x412469(0x331)]['create'] = function () {
    const _0x30f3fc = _0x412469;
    VisuMZ['ItemsEquipsCore'][_0x30f3fc(0x340)][_0x30f3fc(0x575)](this), this[_0x30f3fc(0x4fa)]() && this[_0x30f3fc(0x58b)]();
  }),
  (VisuMZ[_0x412469(0x215)][_0x412469(0x39b)] = Scene_Equip[_0x412469(0x331)][_0x412469(0x323)]),
  (Scene_Equip['prototype'][_0x412469(0x323)] = function () {
    const _0x566311 = _0x412469;
    return this[_0x566311(0x20b)]() ? this[_0x566311(0x2b3)]() : VisuMZ[_0x566311(0x215)][_0x566311(0x39b)][_0x566311(0x575)](this);
  }),
  (Scene_Equip['prototype'][_0x412469(0x2b3)] = function () {
    const _0x3e7fd1 = _0x412469,
      _0x4e4e7a = 0x0,
      _0x465008 = this[_0x3e7fd1(0x1ad)](),
      _0x39edeb = Graphics['boxWidth'],
      _0x3de889 = this[_0x3e7fd1(0x341)]();
    return new Rectangle(_0x4e4e7a, _0x465008, _0x39edeb, _0x3de889);
  }),
  (VisuMZ[_0x412469(0x215)][_0x412469(0x22b)] = Scene_Equip[_0x412469(0x331)][_0x412469(0x30f)]),
  (Scene_Equip['prototype'][_0x412469(0x30f)] = function () {
    const _0x384d2a = _0x412469;
    return this[_0x384d2a(0x20b)]() ? this['statusWindowRectItemsEquipsCore']() : VisuMZ[_0x384d2a(0x215)][_0x384d2a(0x22b)]['call'](this);
  }),
  (Scene_Equip[_0x412469(0x331)][_0x412469(0x31f)] = function () {
    const _0x5c5273 = _0x412469,
      _0x444a42 = this[_0x5c5273(0x26e)]() ? 0x0 : Graphics[_0x5c5273(0x283)] - this[_0x5c5273(0x43d)](),
      _0x1f9baf = this[_0x5c5273(0x23d)](),
      _0x163066 = this[_0x5c5273(0x43d)](),
      _0x57ff30 = this[_0x5c5273(0x4f9)]();
    return new Rectangle(_0x444a42, _0x1f9baf, _0x163066, _0x57ff30);
  }),
  (VisuMZ[_0x412469(0x215)][_0x412469(0x5c7)] = Scene_Equip[_0x412469(0x331)]['createCommandWindow']),
  (Scene_Equip['prototype'][_0x412469(0x1cc)] = function () {
    const _0x4732a5 = _0x412469;
    VisuMZ[_0x4732a5(0x215)][_0x4732a5(0x5c7)][_0x4732a5(0x575)](this);
    if (this['_helpWindow']) this[_0x4732a5(0x4ed)][_0x4732a5(0x524)](this[_0x4732a5(0x4f3)]);
  }),
  (VisuMZ['ItemsEquipsCore']['Scene_Equip_commandWindowRect'] = Scene_Equip['prototype'][_0x412469(0x387)]),
  (Scene_Equip['prototype']['commandWindowRect'] = function () {
    const _0x519c23 = _0x412469;
    return this[_0x519c23(0x20b)]() ? this['commandWindowRectItemsEquipsCore']() : VisuMZ[_0x519c23(0x215)][_0x519c23(0x41b)][_0x519c23(0x575)](this);
  }),
  (Scene_Equip['prototype'][_0x412469(0x1e8)] = function () {
    const _0x41c333 = _0x412469,
      _0x1b3462 = VisuMZ['ItemsEquipsCore'][_0x41c333(0x55e)][_0x41c333(0x2d7)];
    return _0x1b3462[_0x41c333(0x37e)] || _0x1b3462[_0x41c333(0x1ff)];
  }),
  (Scene_Equip[_0x412469(0x331)]['commandWindowRectItemsEquipsCore'] = function () {
    const _0x123b2c = _0x412469,
      _0x3ef657 = this[_0x123b2c(0x1e8)](),
      _0x59e9e0 = this[_0x123b2c(0x26e)]() ? this[_0x123b2c(0x43d)]() : 0x0,
      _0x558730 = this['mainAreaTop'](),
      _0x23a6cf = Graphics['boxWidth'] - this[_0x123b2c(0x43d)](),
      _0x22107c = _0x3ef657 ? this[_0x123b2c(0x3ef)](0x1, !![]) : 0x0;
    return new Rectangle(_0x59e9e0, _0x558730, _0x23a6cf, _0x22107c);
  }),
  (VisuMZ[_0x412469(0x215)]['Scene_Equip_createSlotWindow'] = Scene_Equip[_0x412469(0x331)][_0x412469(0x560)]),
  (Scene_Equip['prototype'][_0x412469(0x560)] = function () {
    const _0x2a23eb = _0x412469;
    VisuMZ['ItemsEquipsCore'][_0x2a23eb(0x25b)]['call'](this), this[_0x2a23eb(0x4fa)]() && this['postCreateSlotWindowItemsEquipsCore']();
  }),
  (VisuMZ[_0x412469(0x215)][_0x412469(0x5b5)] = Scene_Equip['prototype'][_0x412469(0x586)]),
  (Scene_Equip[_0x412469(0x331)][_0x412469(0x586)] = function () {
    const _0x38249d = _0x412469;
    return this[_0x38249d(0x20b)]() ? this['slotWindowRectItemsEquipsCore']() : VisuMZ[_0x38249d(0x215)][_0x38249d(0x5b5)][_0x38249d(0x575)](this);
  }),
  (Scene_Equip[_0x412469(0x331)][_0x412469(0x324)] = function () {
    const _0x2745e9 = _0x412469,
      _0x329944 = this[_0x2745e9(0x387)](),
      _0x186eda = this[_0x2745e9(0x26e)]() ? this[_0x2745e9(0x43d)]() : 0x0,
      _0x404892 = _0x329944['y'] + _0x329944[_0x2745e9(0x563)],
      _0x4c447d = Graphics[_0x2745e9(0x283)] - this[_0x2745e9(0x43d)](),
      _0x23ca0f = this[_0x2745e9(0x4f9)]() - _0x329944[_0x2745e9(0x563)];
    return new Rectangle(_0x186eda, _0x404892, _0x4c447d, _0x23ca0f);
  }),
  (VisuMZ[_0x412469(0x215)]['Scene_Equip_itemWindowRect'] = Scene_Equip[_0x412469(0x331)][_0x412469(0x2ab)]),
  (Scene_Equip[_0x412469(0x331)][_0x412469(0x2ab)] = function () {
    const _0x2b1185 = _0x412469;
    return this['isUseItemsEquipsCoreUpdatedLayout']() ? this['slotWindowRect']() : VisuMZ[_0x2b1185(0x215)]['Scene_Equip_itemWindowRect'][_0x2b1185(0x575)](this);
  }),
  (Scene_Equip[_0x412469(0x331)][_0x412469(0x43d)] = function () {
    const _0x5d8bc7 = _0x412469;
    return this[_0x5d8bc7(0x20b)]() ? this[_0x5d8bc7(0x57f)]() : VisuMZ[_0x5d8bc7(0x215)][_0x5d8bc7(0x55e)][_0x5d8bc7(0x2d7)][_0x5d8bc7(0x1e6)];
  }),
  (Scene_Equip[_0x412469(0x331)][_0x412469(0x57f)] = function () {
    const _0x2b8144 = _0x412469;
    return Math['floor'](Graphics[_0x2b8144(0x283)] / 0x2);
  }),
  (Scene_Equip[_0x412469(0x331)][_0x412469(0x3fb)] = function () {
    const _0x3bfc4a = _0x412469;
    this[_0x3bfc4a(0x50e)][_0x3bfc4a(0x482)](_0x3bfc4a(0x519), this[_0x3bfc4a(0x379)][_0x3bfc4a(0x3ec)](this)),
      this['_slotWindow']['setHandler'](_0x3bfc4a(0x296), this[_0x3bfc4a(0x3b4)][_0x3bfc4a(0x3ec)](this)),
      this[_0x3bfc4a(0x50e)][_0x3bfc4a(0x482)](_0x3bfc4a(0x2b1), this['previousActor']['bind'](this));
  }),
  (VisuMZ['ItemsEquipsCore']['Scene_Equip_commandEquip'] = Scene_Equip[_0x412469(0x331)]['commandEquip']),
  (Scene_Equip[_0x412469(0x331)][_0x412469(0x58b)] = function () {
    const _0x308f42 = _0x412469;
    this[_0x308f42(0x4fa)]() && (this[_0x308f42(0x4ed)][_0x308f42(0x3e6)](), this['_commandWindow'][_0x308f42(0x43b)]()), VisuMZ['ItemsEquipsCore'][_0x308f42(0x43c)][_0x308f42(0x575)](this);
  }),
  (VisuMZ['ItemsEquipsCore'][_0x412469(0x46d)] = Scene_Equip[_0x412469(0x331)]['onSlotOk']),
  (Scene_Equip['prototype'][_0x412469(0x1ac)] = function () {
    const _0x5a1f09 = _0x412469;
    this[_0x5a1f09(0x50e)][_0x5a1f09(0x548)]() >= 0x0
      ? (VisuMZ[_0x5a1f09(0x215)][_0x5a1f09(0x46d)][_0x5a1f09(0x575)](this), this['onSlotOkAutoSelect']())
      : (this['_slotWindow'][_0x5a1f09(0x33b)](0x0), this[_0x5a1f09(0x50e)]['activate']());
  }),
  (Scene_Equip['prototype'][_0x412469(0x513)] = function () {
    const _0xd243c8 = _0x412469;
    this['_itemWindow']['refresh']();
    const _0x2ff888 = this[_0xd243c8(0x50e)][_0xd243c8(0x3e7)](),
      _0x225d19 = this[_0xd243c8(0x3d1)][_0xd243c8(0x2c5)][_0xd243c8(0x2e3)](_0x2ff888),
      _0x1f0413 = Math[_0xd243c8(0x44d)](this[_0xd243c8(0x3d1)]['maxVisibleItems']() / 0x2) - 0x1;
    this[_0xd243c8(0x3d1)][_0xd243c8(0x33b)](_0x225d19 >= 0x0 ? _0x225d19 : 0x0),
      this[_0xd243c8(0x3d1)][_0xd243c8(0x325)] > 0x1 && ((this[_0xd243c8(0x3d1)][_0xd243c8(0x325)] = 0x1), this[_0xd243c8(0x3d1)][_0xd243c8(0x4db)]()),
      this[_0xd243c8(0x3d1)][_0xd243c8(0x220)](this[_0xd243c8(0x3d1)][_0xd243c8(0x548)]() - _0x1f0413);
  }),
  (VisuMZ['ItemsEquipsCore'][_0x412469(0x32a)] = Scene_Equip[_0x412469(0x331)][_0x412469(0x45e)]),
  (Scene_Equip[_0x412469(0x331)]['onSlotCancel'] = function () {
    const _0x4e7978 = _0x412469;
    VisuMZ[_0x4e7978(0x215)]['Scene_Equip_onSlotCancel'][_0x4e7978(0x575)](this), this[_0x4e7978(0x4fa)]() && (this[_0x4e7978(0x4ed)][_0x4e7978(0x33b)](0x0), this['_slotWindow'][_0x4e7978(0x43b)]());
  }),
  (VisuMZ['ItemsEquipsCore'][_0x412469(0x363)] = Scene_Equip['prototype'][_0x412469(0x33f)]),
  (Scene_Equip[_0x412469(0x331)][_0x412469(0x33f)] = function () {
    const _0x3f0133 = _0x412469;
    VisuMZ[_0x3f0133(0x215)][_0x3f0133(0x363)]['call'](this),
      this[_0x3f0133(0x4fa)]() &&
        (this[_0x3f0133(0x4ed)][_0x3f0133(0x43b)](), this[_0x3f0133(0x4ed)][_0x3f0133(0x3e6)](), this[_0x3f0133(0x50e)][_0x3f0133(0x33b)](0x0), this[_0x3f0133(0x50e)]['activate']());
  }),
  (Scene_Equip['prototype'][_0x412469(0x530)] = function () {
    const _0x4968d2 = _0x412469;
    if (!this[_0x4968d2(0x50e)]) return ![];
    if (!this[_0x4968d2(0x50e)][_0x4968d2(0x580)]) return ![];
    return this[_0x4968d2(0x50e)]['isShiftRemoveShortcutEnabled']();
  }),
  (Scene_Equip[_0x412469(0x331)]['buttonAssistKey3'] = function () {
    const _0x468ab8 = _0x412469;
    if (this[_0x468ab8(0x530)]()) return TextManager[_0x468ab8(0x5a1)](_0x468ab8(0x40e));
    return Scene_MenuBase[_0x468ab8(0x331)][_0x468ab8(0x52c)][_0x468ab8(0x575)](this);
  }),
  (Scene_Equip[_0x412469(0x331)][_0x412469(0x4c4)] = function () {
    const _0xffb06a = _0x412469;
    if (this['buttonAssistSlotWindowShift']()) return VisuMZ[_0xffb06a(0x215)][_0xffb06a(0x55e)]['EquipScene']['buttonAssistRemove'];
    return Scene_MenuBase[_0xffb06a(0x331)][_0xffb06a(0x4c4)]['call'](this);
  }),
  (Scene_Equip[_0x412469(0x331)]['buttonAssistOffset3'] = function () {
    const _0x572191 = _0x412469;
    if (this[_0x572191(0x530)]()) return this[_0x572191(0x48f)]['width'] / 0x5 / -0x3;
    return Scene_MenuBase[_0x572191(0x331)][_0x572191(0x4f0)][_0x572191(0x575)](this);
  }),
  (Scene_Equip[_0x412469(0x331)][_0x412469(0x379)] = function () {
    SceneManager['pop']();
  }),
  (VisuMZ[_0x412469(0x215)]['Scene_Load_reloadMapIfUpdated'] = Scene_Load['prototype']['reloadMapIfUpdated']),
  (Scene_Load[_0x412469(0x331)][_0x412469(0x441)] = function () {
    const _0x769426 = _0x412469;
    VisuMZ[_0x769426(0x215)]['Scene_Load_reloadMapIfUpdated'][_0x769426(0x575)](this), this[_0x769426(0x4ee)]();
  }),
  (Scene_Load[_0x412469(0x331)][_0x412469(0x4ee)] = function () {
    const _0x25cafa = _0x412469;
    if ($gameSystem['versionId']() !== $dataSystem[_0x25cafa(0x1c7)])
      for (const _0x588ced of $gameActors['_data']) {
        if (_0x588ced) _0x588ced['prepareNewEquipSlotsOnLoad']();
      }
  }),
  (Scene_Shop[_0x412469(0x331)][_0x412469(0x356)] = function () {
    const _0xa2f29e = _0x412469;
    if (ConfigManager[_0xa2f29e(0x540)] && ConfigManager[_0xa2f29e(0x2a9)] !== undefined) return ConfigManager[_0xa2f29e(0x2a9)];
    else {
      if (this[_0xa2f29e(0x20b)]()) return this[_0xa2f29e(0x270)]()['match'](/LOWER/i);
      else Scene_MenuBase[_0xa2f29e(0x331)]['isRightInputMode']['call'](this);
    }
  }),
  (Scene_Shop[_0x412469(0x331)]['isRightInputMode'] = function () {
    const _0x16adc6 = _0x412469;
    if (ConfigManager['uiMenuStyle'] && ConfigManager[_0x16adc6(0x57c)] !== undefined) return ConfigManager['uiInputPosition'];
    else {
      if (this['isUseItemsEquipsCoreUpdatedLayout']()) return this[_0x16adc6(0x270)]()['match'](/RIGHT/i);
      else Scene_MenuBase[_0x16adc6(0x331)][_0x16adc6(0x26e)][_0x16adc6(0x575)](this);
    }
  }),
  (Scene_Shop[_0x412469(0x331)][_0x412469(0x270)] = function () {
    const _0x40c09f = _0x412469;
    return VisuMZ['ItemsEquipsCore'][_0x40c09f(0x55e)][_0x40c09f(0x4e7)]['LayoutStyle'];
  }),
  (Scene_Shop[_0x412469(0x331)][_0x412469(0x4fa)] = function () {
    const _0x3e95ae = _0x412469;
    return this['_categoryWindow'] && this[_0x3e95ae(0x2cd)]['isUseModernControls']();
  }),
  (Scene_Shop['prototype']['isUseItemsEquipsCoreUpdatedLayout'] = function () {
    const _0x14185a = _0x412469;
    return VisuMZ['ItemsEquipsCore'][_0x14185a(0x55e)][_0x14185a(0x4e7)][_0x14185a(0x41a)];
  }),
  (VisuMZ['ItemsEquipsCore'][_0x412469(0x30b)] = Scene_Shop['prototype']['prepare']),
  (Scene_Shop['prototype']['prepare'] = function (_0x4d4a29, _0x1f2904) {
    const _0x38ba11 = _0x412469;
    (_0x4d4a29 = VisuMZ[_0x38ba11(0x215)][_0x38ba11(0x556)](_0x4d4a29)), VisuMZ['ItemsEquipsCore'][_0x38ba11(0x30b)][_0x38ba11(0x575)](this, _0x4d4a29, _0x1f2904), this[_0x38ba11(0x213)]();
  }),
  (Scene_Shop['prototype'][_0x412469(0x213)] = function () {
    const _0x59c11a = _0x412469;
    this[_0x59c11a(0x202)] = 0x0;
    const _0x4a14cb = [];
    for (const _0x47ec49 of this[_0x59c11a(0x2cc)]) {
      this[_0x59c11a(0x1be)](_0x47ec49) ? this[_0x59c11a(0x202)]++ : _0x4a14cb[_0x59c11a(0x437)](_0x47ec49);
    }
    for (const _0x547002 of _0x4a14cb) {
      this[_0x59c11a(0x2cc)][_0x59c11a(0x3ac)](_0x547002);
    }
  }),
  (Scene_Shop[_0x412469(0x331)][_0x412469(0x1be)] = function (_0x5de356) {
    if (_0x5de356[0x0] > 0x2 || _0x5de356[0x0] < 0x0) return ![];
    const _0x56b0ee = [$dataItems, $dataWeapons, $dataArmors][_0x5de356[0x0]][_0x5de356[0x1]];
    if (!_0x56b0ee) return ![];
    return !![];
  }),
  (VisuMZ['ItemsEquipsCore'][_0x412469(0x1f0)] = Scene_Shop[_0x412469(0x331)][_0x412469(0x3ab)]),
  (Scene_Shop[_0x412469(0x331)][_0x412469(0x3ab)] = function () {
    const _0x3c72c1 = _0x412469;
    VisuMZ[_0x3c72c1(0x215)]['Scene_Shop_create'][_0x3c72c1(0x575)](this), this['isUseItemsEquipsCoreUpdatedLayout']() && this['postCreateItemsEquipsCore'](), this[_0x3c72c1(0x393)]();
  }),
  (Scene_Shop['prototype'][_0x412469(0x289)] = function () {
    const _0x40703c = _0x412469;
    this[_0x40703c(0x5d3)]['hide'](), this[_0x40703c(0x3bc)][_0x40703c(0x2b8)](), this[_0x40703c(0x3bc)][_0x40703c(0x3e6)](), this['_statusWindow']['show']();
  }),
  (VisuMZ['ItemsEquipsCore'][_0x412469(0x33a)] = Scene_Shop[_0x412469(0x331)][_0x412469(0x323)]),
  (Scene_Shop[_0x412469(0x331)][_0x412469(0x323)] = function () {
    const _0xb3a264 = _0x412469;
    return this[_0xb3a264(0x20b)]() ? this[_0xb3a264(0x2b3)]() : VisuMZ[_0xb3a264(0x215)][_0xb3a264(0x33a)]['call'](this);
  }),
  (Scene_Shop[_0x412469(0x331)][_0x412469(0x2b3)] = function () {
    const _0x26385c = _0x412469,
      _0x5d306b = 0x0,
      _0x29d9d2 = this[_0x26385c(0x1ad)](),
      _0x51e3ec = Graphics['boxWidth'],
      _0xbb7b51 = this[_0x26385c(0x341)]();
    return new Rectangle(_0x5d306b, _0x29d9d2, _0x51e3ec, _0xbb7b51);
  }),
  (VisuMZ[_0x412469(0x215)][_0x412469(0x306)] = Scene_Shop['prototype']['goldWindowRect']),
  (Scene_Shop[_0x412469(0x331)][_0x412469(0x2a4)] = function () {
    const _0x1fd706 = _0x412469;
    return this['isUseItemsEquipsCoreUpdatedLayout']() ? this['goldWindowRectItemsEquipsCore']() : VisuMZ[_0x1fd706(0x215)][_0x1fd706(0x306)]['call'](this);
  }),
  (Scene_Shop[_0x412469(0x331)]['goldWindowRectItemsEquipsCore'] = function () {
    const _0x27e7ff = _0x412469,
      _0x4182cc = this[_0x27e7ff(0x48b)](),
      _0x5ec837 = this[_0x27e7ff(0x3ef)](0x1, !![]),
      _0x43d11f = this[_0x27e7ff(0x26e)]() ? 0x0 : Graphics[_0x27e7ff(0x283)] - _0x4182cc,
      _0x194f71 = this['mainAreaTop']();
    return new Rectangle(_0x43d11f, _0x194f71, _0x4182cc, _0x5ec837);
  }),
  (VisuMZ[_0x412469(0x215)][_0x412469(0x416)] = Scene_Shop[_0x412469(0x331)][_0x412469(0x387)]),
  (Scene_Shop[_0x412469(0x331)]['commandWindowRect'] = function () {
    const _0x4954af = _0x412469;
    return this['isUseItemsEquipsCoreUpdatedLayout']() ? this[_0x4954af(0x2d9)]() : VisuMZ[_0x4954af(0x215)][_0x4954af(0x416)]['call'](this);
  }),
  (Scene_Shop[_0x412469(0x331)][_0x412469(0x2d9)] = function () {
    const _0x56e943 = _0x412469,
      _0x1b5f2d = this[_0x56e943(0x26e)]() ? this['mainCommandWidth']() : 0x0,
      _0x1cdf44 = this['mainAreaTop'](),
      _0x4c0a7c = Graphics[_0x56e943(0x283)] - this[_0x56e943(0x48b)](),
      _0x15c44f = this[_0x56e943(0x3ef)](0x1, !![]);
    return new Rectangle(_0x1b5f2d, _0x1cdf44, _0x4c0a7c, _0x15c44f);
  }),
  (VisuMZ[_0x412469(0x215)][_0x412469(0x427)] = Scene_Shop[_0x412469(0x331)][_0x412469(0x250)]),
  (Scene_Shop[_0x412469(0x331)][_0x412469(0x250)] = function () {
    const _0x4b026b = _0x412469;
    return this[_0x4b026b(0x20b)]() ? this[_0x4b026b(0x26a)]() : VisuMZ[_0x4b026b(0x215)][_0x4b026b(0x427)]['call'](this);
  }),
  (Scene_Shop['prototype'][_0x412469(0x26a)] = function () {
    const _0x1ea884 = _0x412469,
      _0x1df011 = this[_0x1ea884(0x4ed)]['y'] + this[_0x1ea884(0x4ed)][_0x1ea884(0x563)],
      _0x3631d2 = Graphics[_0x1ea884(0x283)] - this['statusWidth'](),
      _0x2c05c4 = this[_0x1ea884(0x26e)]() ? Graphics[_0x1ea884(0x283)] - _0x3631d2 : 0x0,
      _0x1322d8 = this[_0x1ea884(0x4f9)]() - this[_0x1ea884(0x4ed)][_0x1ea884(0x563)];
    return new Rectangle(_0x2c05c4, _0x1df011, _0x3631d2, _0x1322d8);
  }),
  (VisuMZ[_0x412469(0x215)][_0x412469(0x1b4)] = Scene_Shop[_0x412469(0x331)][_0x412469(0x30f)]),
  (Scene_Shop[_0x412469(0x331)][_0x412469(0x30f)] = function () {
    const _0x2846ac = _0x412469;
    return this[_0x2846ac(0x20b)]() ? this[_0x2846ac(0x31f)]() : VisuMZ['ItemsEquipsCore'][_0x2846ac(0x1b4)][_0x2846ac(0x575)](this);
  }),
  (Scene_Shop[_0x412469(0x331)][_0x412469(0x31f)] = function () {
    const _0x25ffc3 = _0x412469,
      _0xa32280 = this[_0x25ffc3(0x43d)](),
      _0xbee0c2 = this[_0x25ffc3(0x4f9)]() - this[_0x25ffc3(0x4ed)][_0x25ffc3(0x563)],
      _0x4de316 = this[_0x25ffc3(0x26e)]() ? 0x0 : Graphics[_0x25ffc3(0x283)] - _0xa32280,
      _0x34fd1f = this[_0x25ffc3(0x4ed)]['y'] + this[_0x25ffc3(0x4ed)]['height'];
    return new Rectangle(_0x4de316, _0x34fd1f, _0xa32280, _0xbee0c2);
  }),
  (VisuMZ[_0x412469(0x215)][_0x412469(0x2ae)] = Scene_Shop[_0x412469(0x331)][_0x412469(0x20a)]),
  (Scene_Shop[_0x412469(0x331)][_0x412469(0x20a)] = function () {
    const _0x3eed1a = _0x412469;
    return this[_0x3eed1a(0x20b)]() ? this[_0x3eed1a(0x45a)]() : VisuMZ[_0x3eed1a(0x215)]['Scene_Shop_buyWindowRect']['call'](this);
  }),
  (Scene_Shop[_0x412469(0x331)]['buyWindowRectItemsEquipsCore'] = function () {
    const _0x2a0b75 = _0x412469,
      _0x426459 = this['_commandWindow']['y'] + this[_0x2a0b75(0x4ed)][_0x2a0b75(0x563)],
      _0x50f8be = Graphics['boxWidth'] - this[_0x2a0b75(0x43d)](),
      _0x521fb8 = this[_0x2a0b75(0x4f9)]() - this[_0x2a0b75(0x4ed)]['height'],
      _0x1cd145 = this['isRightInputMode']() ? Graphics['boxWidth'] - _0x50f8be : 0x0;
    return new Rectangle(_0x1cd145, _0x426459, _0x50f8be, _0x521fb8);
  }),
  (VisuMZ['ItemsEquipsCore']['Scene_Shop_createCategoryWindow'] = Scene_Shop['prototype'][_0x412469(0x3ad)]),
  (Scene_Shop[_0x412469(0x331)][_0x412469(0x3ad)] = function () {
    const _0x1c1e36 = _0x412469;
    VisuMZ[_0x1c1e36(0x215)][_0x1c1e36(0x4b3)][_0x1c1e36(0x575)](this), this['isUseModernControls']() && this[_0x1c1e36(0x339)]();
  }),
  (VisuMZ[_0x412469(0x215)][_0x412469(0x5e1)] = Scene_Shop[_0x412469(0x331)]['categoryWindowRect']),
  (Scene_Shop['prototype'][_0x412469(0x5b9)] = function () {
    const _0x4f7cfe = _0x412469;
    return this[_0x4f7cfe(0x20b)]() ? this[_0x4f7cfe(0x37f)]() : VisuMZ[_0x4f7cfe(0x215)][_0x4f7cfe(0x5e1)][_0x4f7cfe(0x575)](this);
  }),
  (Scene_Shop[_0x412469(0x331)][_0x412469(0x37f)] = function () {
    const _0x1a03d8 = _0x412469,
      _0x3a4c21 = this['_commandWindow']['y'],
      _0x24a57f = this[_0x1a03d8(0x4ed)]['width'],
      _0x10e3a5 = this[_0x1a03d8(0x3ef)](0x1, !![]),
      _0x389936 = this[_0x1a03d8(0x26e)]() ? Graphics[_0x1a03d8(0x283)] - _0x24a57f : 0x0;
    return new Rectangle(_0x389936, _0x3a4c21, _0x24a57f, _0x10e3a5);
  }),
  (Scene_Shop[_0x412469(0x331)]['postCreateCategoryWindowItemsEquipsCore'] = function () {
    const _0x220265 = _0x412469;
    delete this[_0x220265(0x2cd)][_0x220265(0x5a0)]['ok'], delete this['_categoryWindow'][_0x220265(0x5a0)]['cancel'];
  }),
  (VisuMZ[_0x412469(0x215)][_0x412469(0x34c)] = Scene_Shop[_0x412469(0x331)][_0x412469(0x54b)]),
  (Scene_Shop[_0x412469(0x331)][_0x412469(0x54b)] = function () {
    const _0x9b6050 = _0x412469;
    VisuMZ[_0x9b6050(0x215)][_0x9b6050(0x34c)][_0x9b6050(0x575)](this), this[_0x9b6050(0x20b)]() && this['postCreateSellWindowItemsEquipsCore']();
  }),
  (VisuMZ[_0x412469(0x215)][_0x412469(0x56a)] = Scene_Shop[_0x412469(0x331)][_0x412469(0x448)]),
  (Scene_Shop[_0x412469(0x331)][_0x412469(0x448)] = function () {
    const _0x20d0f6 = _0x412469;
    return this[_0x20d0f6(0x20b)]() ? this['sellWindowRectItemsEquipsCore']() : VisuMZ['ItemsEquipsCore'][_0x20d0f6(0x56a)][_0x20d0f6(0x575)](this);
  }),
  (Scene_Shop[_0x412469(0x331)]['sellWindowRectItemsEquipsCore'] = function () {
    const _0x5901d7 = _0x412469,
      _0x137470 = this[_0x5901d7(0x2cd)]['y'] + this['_categoryWindow'][_0x5901d7(0x563)],
      _0x11efbf = Graphics[_0x5901d7(0x283)] - this[_0x5901d7(0x43d)](),
      _0x3542b1 = this[_0x5901d7(0x4f9)]() - this[_0x5901d7(0x2cd)][_0x5901d7(0x563)],
      _0x1ab9d3 = this[_0x5901d7(0x26e)]() ? Graphics[_0x5901d7(0x283)] - _0x11efbf : 0x0;
    return new Rectangle(_0x1ab9d3, _0x137470, _0x11efbf, _0x3542b1);
  }),
  (Scene_Shop['prototype'][_0x412469(0x34b)] = function () {
    const _0x8d9d3e = _0x412469;
    this['_sellWindow'][_0x8d9d3e(0x44c)](this[_0x8d9d3e(0x36d)]);
  }),
  (Scene_Shop['prototype'][_0x412469(0x43d)] = function () {
    const _0x2780d9 = _0x412469;
    return VisuMZ['ItemsEquipsCore'][_0x2780d9(0x55e)][_0x2780d9(0x29f)][_0x2780d9(0x2d8)];
  }),
  (VisuMZ['ItemsEquipsCore'][_0x412469(0x2b2)] = Scene_Shop['prototype']['activateSellWindow']),
  (Scene_Shop[_0x412469(0x331)][_0x412469(0x4a1)] = function () {
    const _0x59f0fe = _0x412469;
    VisuMZ[_0x59f0fe(0x215)][_0x59f0fe(0x2b2)][_0x59f0fe(0x575)](this), this['isUseItemsEquipsCoreUpdatedLayout']() && this[_0x59f0fe(0x36d)]['show'](), this['_sellWindow'][_0x59f0fe(0x267)]();
  }),
  (VisuMZ[_0x412469(0x215)]['Scene_Shop_commandBuy'] = Scene_Shop[_0x412469(0x331)][_0x412469(0x1a9)]),
  (Scene_Shop[_0x412469(0x331)][_0x412469(0x1a9)] = function () {
    const _0x2677c9 = _0x412469;
    VisuMZ[_0x2677c9(0x215)]['Scene_Shop_commandBuy']['call'](this), this[_0x2677c9(0x20b)]() && this[_0x2677c9(0x269)]();
  }),
  (Scene_Shop[_0x412469(0x331)][_0x412469(0x269)] = function () {
    const _0x47dd70 = _0x412469;
    (this[_0x47dd70(0x3e2)] = this['_buyWindowLastIndex'] || 0x0), this[_0x47dd70(0x3bc)][_0x47dd70(0x33b)](this[_0x47dd70(0x3e2)]);
  }),
  (VisuMZ[_0x412469(0x215)][_0x412469(0x3b7)] = Scene_Shop['prototype'][_0x412469(0x2b0)]),
  (Scene_Shop[_0x412469(0x331)]['commandSell'] = function () {
    const _0x51d83b = _0x412469;
    VisuMZ[_0x51d83b(0x215)][_0x51d83b(0x3b7)][_0x51d83b(0x575)](this),
      this[_0x51d83b(0x20b)]() && this[_0x51d83b(0x1ea)](),
      this[_0x51d83b(0x4fa)]() && (this[_0x51d83b(0x2cd)][_0x51d83b(0x33b)](0x0), this['onCategoryOk']());
  }),
  (Scene_Shop['prototype']['commandSellItemsEquipsCore'] = function () {
    const _0x2f2b3b = _0x412469;
    this['_buyWindow'][_0x2f2b3b(0x56d)](), this[_0x2f2b3b(0x4ed)][_0x2f2b3b(0x56d)]();
  }),
  (VisuMZ[_0x412469(0x215)][_0x412469(0x4b2)] = Scene_Shop[_0x412469(0x331)]['onBuyCancel']),
  (Scene_Shop['prototype'][_0x412469(0x2b9)] = function () {
    const _0x11c29e = _0x412469;
    VisuMZ[_0x11c29e(0x215)]['Scene_Shop_onBuyCancel'][_0x11c29e(0x575)](this), this[_0x11c29e(0x20b)]() && this[_0x11c29e(0x4d6)]();
  }),
  (Scene_Shop[_0x412469(0x331)][_0x412469(0x4d6)] = function () {
    const _0x3f1e51 = _0x412469;
    (this[_0x3f1e51(0x3e2)] = this['_buyWindow'][_0x3f1e51(0x548)]()),
      this[_0x3f1e51(0x3bc)]['show'](),
      this[_0x3f1e51(0x3bc)]['deselect'](),
      this[_0x3f1e51(0x3bc)]['smoothScrollTo'](0x0, 0x0),
      this[_0x3f1e51(0x36d)][_0x3f1e51(0x2b8)](),
      this[_0x3f1e51(0x5d3)]['hide']();
  }),
  (VisuMZ[_0x412469(0x215)]['Scene_Shop_onCategoryCancel'] = Scene_Shop['prototype'][_0x412469(0x4d8)]),
  (Scene_Shop['prototype'][_0x412469(0x4d8)] = function () {
    const _0xa01e2f = _0x412469;
    VisuMZ[_0xa01e2f(0x215)]['Scene_Shop_onCategoryCancel'][_0xa01e2f(0x575)](this), this[_0xa01e2f(0x20b)]() && this[_0xa01e2f(0x1bf)]();
  }),
  (Scene_Shop['prototype'][_0x412469(0x1bf)] = function () {
    const _0x595293 = _0x412469;
    this[_0x595293(0x3bc)][_0x595293(0x2b8)](), this[_0x595293(0x4ed)][_0x595293(0x2b8)]();
  }),
  (VisuMZ['ItemsEquipsCore'][_0x412469(0x3aa)] = Scene_Shop[_0x412469(0x331)]['onBuyOk']),
  (Scene_Shop[_0x412469(0x331)][_0x412469(0x1d2)] = function () {
    const _0x51823b = _0x412469;
    ($gameTemp[_0x51823b(0x39f)] = !![]),
      VisuMZ[_0x51823b(0x215)][_0x51823b(0x3aa)][_0x51823b(0x575)](this),
      ($gameTemp['_bypassProxy'] = ![]),
      (this[_0x51823b(0x4d5)] = this['_buyWindow'][_0x51823b(0x3e7)]());
  }),
  (VisuMZ[_0x412469(0x215)][_0x412469(0x28a)] = Scene_Shop[_0x412469(0x331)][_0x412469(0x56c)]),
  (Scene_Shop[_0x412469(0x331)][_0x412469(0x56c)] = function () {
    const _0x3c70d8 = _0x412469;
    ($gameTemp['_bypassProxy'] = !![]), (this[_0x3c70d8(0x4d5)] = this[_0x3c70d8(0x3bc)]['item']());
    const _0x56e89b = VisuMZ[_0x3c70d8(0x215)][_0x3c70d8(0x28a)][_0x3c70d8(0x575)](this);
    return ($gameTemp[_0x3c70d8(0x39f)] = ![]), (this[_0x3c70d8(0x4d5)] = this['_buyWindow'][_0x3c70d8(0x3e7)]()), _0x56e89b;
  }),
  (VisuMZ[_0x412469(0x215)]['Scene_Shop_onSellOk'] = Scene_Shop[_0x412469(0x331)][_0x412469(0x2cf)]),
  (Scene_Shop[_0x412469(0x331)][_0x412469(0x2cf)] = function () {
    const _0x3f0143 = _0x412469;
    VisuMZ[_0x3f0143(0x215)][_0x3f0143(0x273)][_0x3f0143(0x575)](this), this['isUseItemsEquipsCoreUpdatedLayout']() && this[_0x3f0143(0x4f8)]();
  }),
  (Scene_Shop[_0x412469(0x331)]['onSellOkItemsEquipsCore'] = function () {
    const _0x1f14ec = _0x412469;
    this[_0x1f14ec(0x2cd)][_0x1f14ec(0x2b8)]();
  }),
  (VisuMZ[_0x412469(0x215)][_0x412469(0x229)] = Scene_Shop['prototype'][_0x412469(0x34e)]),
  (Scene_Shop[_0x412469(0x331)][_0x412469(0x34e)] = function () {
    const _0x1fd6c6 = _0x412469;
    VisuMZ[_0x1fd6c6(0x215)][_0x1fd6c6(0x229)]['call'](this), this[_0x1fd6c6(0x4fa)]() && this[_0x1fd6c6(0x4d8)](), this[_0x1fd6c6(0x20b)]() && this[_0x1fd6c6(0x5d3)][_0x1fd6c6(0x56d)]();
  }),
  (Scene_Shop[_0x412469(0x331)][_0x412469(0x5cf)] = function (_0x4abd3b) {
    const _0x52a4a7 = _0x412469,
      _0x1d3200 = this[_0x52a4a7(0x4d5)];
    this[_0x52a4a7(0x4d5)] = _0x4abd3b;
    const _0x158e38 = this[_0x52a4a7(0x29e)]();
    return (this['_item'] = _0x1d3200), _0x158e38;
  }),
  (VisuMZ[_0x412469(0x215)][_0x412469(0x3b8)] = Scene_Shop['prototype']['sellingPrice']),
  (Scene_Shop[_0x412469(0x331)]['sellingPrice'] = function () {
    const _0xe6cf49 = _0x412469;
    let _0x54fc6f = this[_0xe6cf49(0x1a7)]();
    const _0x59d5c4 = this['_item'];
    return (_0x54fc6f = VisuMZ[_0xe6cf49(0x215)][_0xe6cf49(0x55e)][_0xe6cf49(0x4e7)][_0xe6cf49(0x46b)][_0xe6cf49(0x575)](this, _0x59d5c4, _0x54fc6f)), _0x54fc6f;
  }),
  (Scene_Shop[_0x412469(0x331)][_0x412469(0x1a7)] = function () {
    const _0x4c56ca = _0x412469;
    let _0x4ae950 = this[_0x4c56ca(0x4d5)]['price'];
    if (!this[_0x4c56ca(0x4d5)]) return 0x0;
    else {
      if (this['_item'][_0x4c56ca(0x5a7)][_0x4c56ca(0x512)](/<JS SELL PRICE>\s*([\s\S]*)\s*<\/JS SELL PRICE>/i)) {
        const _0x119ee1 = String(RegExp['$1']);
        (window['item'] = this[_0x4c56ca(0x4d5)]), (window[_0x4c56ca(0x59b)] = _0x4ae950 * this[_0x4c56ca(0x431)]());
        try {
          eval(_0x119ee1);
        } catch (_0x34a90c) {
          if ($gameTemp['isPlaytest']()) console[_0x4c56ca(0x36e)](_0x34a90c);
        }
        let _0x519215 = window[_0x4c56ca(0x59b)];
        (window[_0x4c56ca(0x3e7)] = undefined), (window[_0x4c56ca(0x59b)] = undefined);
        if (isNaN(_0x519215)) _0x519215 = 0x0;
        return Math[_0x4c56ca(0x44d)](_0x519215);
      } else return this[_0x4c56ca(0x4d5)][_0x4c56ca(0x5a7)][_0x4c56ca(0x512)](/<SELL PRICE:[ ](\d+)>/i) ? parseInt(RegExp['$1']) : Math[_0x4c56ca(0x44d)](this[_0x4c56ca(0x3af)]());
    }
  }),
  (Scene_Shop['prototype'][_0x412469(0x3af)] = function () {
    const _0x561508 = _0x412469;
    return this[_0x561508(0x4d5)][_0x561508(0x59b)] * this[_0x561508(0x431)]();
  }),
  (Scene_Shop['prototype'][_0x412469(0x431)] = function () {
    const _0x1dfee5 = _0x412469;
    return VisuMZ[_0x1dfee5(0x215)][_0x1dfee5(0x55e)][_0x1dfee5(0x4e7)][_0x1dfee5(0x5cb)];
  }),
  (Scene_Shop[_0x412469(0x331)][_0x412469(0x365)] = function () {
    const _0x5774d2 = _0x412469;
    if (!this[_0x5774d2(0x270)]()) return ![];
    if (!this[_0x5774d2(0x4fa)]()) return ![];
    if (!this[_0x5774d2(0x568)]) return ![];
    if (!this[_0x5774d2(0x568)][_0x5774d2(0x580)]) return ![];
    return this[_0x5774d2(0x270)]() && this[_0x5774d2(0x4fa)]();
  }),
  (Scene_Shop['prototype'][_0x412469(0x286)] = function () {
    const _0x46febc = _0x412469;
    if (this['buttonAssistItemListRequirement']())
      return this[_0x46febc(0x568)]['maxCols']() === 0x1 ? TextManager[_0x46febc(0x396)](_0x46febc(0x1c9), 'right') : TextManager[_0x46febc(0x396)](_0x46febc(0x2b1), _0x46febc(0x296));
    else {
      if (this[_0x46febc(0x401)] && this[_0x46febc(0x401)][_0x46febc(0x580)]) return TextManager[_0x46febc(0x396)]('left', _0x46febc(0x264));
    }
    return Scene_MenuBase[_0x46febc(0x331)][_0x46febc(0x286)][_0x46febc(0x575)](this);
  }),
  (Scene_Shop[_0x412469(0x331)][_0x412469(0x413)] = function () {
    const _0x40f554 = _0x412469;
    if (this[_0x40f554(0x401)] && this[_0x40f554(0x401)][_0x40f554(0x580)]) return TextManager[_0x40f554(0x396)]('up', 'down');
    return Scene_MenuBase[_0x40f554(0x331)]['buttonAssistKey2'][_0x40f554(0x575)](this);
  }),
  (Scene_Shop[_0x412469(0x331)]['buttonAssistText1'] = function () {
    const _0x4a2d62 = _0x412469;
    if (this[_0x4a2d62(0x365)]()) return VisuMZ[_0x4a2d62(0x215)]['Settings']['ItemScene'][_0x4a2d62(0x487)];
    else {
      if (this[_0x4a2d62(0x401)] && this['_numberWindow'][_0x4a2d62(0x580)]) return VisuMZ['ItemsEquipsCore'][_0x4a2d62(0x55e)][_0x4a2d62(0x4e7)][_0x4a2d62(0x2bf)];
    }
    return Scene_MenuBase[_0x4a2d62(0x331)][_0x4a2d62(0x2dd)][_0x4a2d62(0x575)](this);
  }),
  (Scene_Shop[_0x412469(0x331)][_0x412469(0x1bb)] = function () {
    const _0x481825 = _0x412469;
    if (this[_0x481825(0x401)] && this[_0x481825(0x401)][_0x481825(0x580)]) return VisuMZ['ItemsEquipsCore'][_0x481825(0x55e)][_0x481825(0x4e7)][_0x481825(0x24b)];
    return Scene_MenuBase[_0x481825(0x331)][_0x481825(0x1bb)][_0x481825(0x575)](this);
  }),
  (Scene_Shop['prototype'][_0x412469(0x393)] = function () {
    const _0x1867d3 = _0x412469;
    if (!SceneManager[_0x1867d3(0x4d7)]()) return;
    const _0x38a810 = VisuMZ[_0x1867d3(0x215)][_0x1867d3(0x55e)]['ShopScene'];
    _0x38a810[_0x1867d3(0x3a1)] && $gameSwitches[_0x1867d3(0x59f)](_0x38a810[_0x1867d3(0x3a1)], ![]), _0x38a810[_0x1867d3(0x4ef)] && $gameSwitches['setValue'](_0x38a810['SwitchSell'], ![]);
  }),
  (VisuMZ[_0x412469(0x215)]['Scene_Shop_doBuy'] = Scene_Shop[_0x412469(0x331)][_0x412469(0x307)]),
  (Scene_Shop['prototype'][_0x412469(0x307)] = function (_0x1b3335) {
    const _0x2899d5 = _0x412469;
    VisuMZ[_0x2899d5(0x215)]['Scene_Shop_doBuy'][_0x2899d5(0x575)](this, _0x1b3335), this[_0x2899d5(0x55b)](this[_0x2899d5(0x4d5)], _0x1b3335);
    if (_0x1b3335 <= 0x0) return;
    const _0x4387b7 = VisuMZ[_0x2899d5(0x215)][_0x2899d5(0x55e)][_0x2899d5(0x4e7)];
    _0x4387b7['SwitchBuy'] && $gameSwitches[_0x2899d5(0x59f)](_0x4387b7[_0x2899d5(0x3a1)], !![]), this[_0x2899d5(0x3bc)]['refresh'](), this[_0x2899d5(0x568)][_0x2899d5(0x1f2)]();
  }),
  (Scene_Shop[_0x412469(0x331)][_0x412469(0x55b)] = function (_0x19cff5, _0x4a2610) {
    const _0x431612 = _0x412469;
    this[_0x431612(0x2f1)](_0x19cff5, _0x4a2610), $gameParty[_0x431612(0x3c8)](_0x19cff5, _0x4a2610), $gameParty[_0x431612(0x5d0)](_0x4a2610 * this[_0x431612(0x56c)]());
  }),
  (Scene_Shop['prototype']['processShopCondListingOnBuyItem'] = function (_0x510cdb, _0x591535) {
    const _0x3389ec = _0x412469;
    if (!_0x510cdb) return;
    if (!_0x591535) return;
    const _0x1353fb = VisuMZ[_0x3389ec(0x215)][_0x3389ec(0x5d9)],
      _0x5663f7 = _0x510cdb['note'] || '';
    if (_0x5663f7[_0x3389ec(0x512)](_0x1353fb[_0x3389ec(0x33c)])) {
      const _0x53e933 = String(RegExp['$1'])
        [_0x3389ec(0x3de)](',')
        [_0x3389ec(0x54a)](_0x5a2731 => Number(_0x5a2731));
      for (const _0x24c2a3 of _0x53e933) {
        $gameSwitches['setValue'](_0x24c2a3, !![]);
      }
    }
    if (_0x5663f7[_0x3389ec(0x512)](_0x1353fb['BuyTurnSwitchOff'])) {
      const _0x37a785 = String(RegExp['$1'])
        [_0x3389ec(0x3de)](',')
        [_0x3389ec(0x54a)](_0x5e7f83 => Number(_0x5e7f83));
      for (const _0x5d6167 of _0x37a785) {
        $gameSwitches[_0x3389ec(0x59f)](_0x5d6167, ![]);
      }
    }
  }),
  (VisuMZ[_0x412469(0x215)][_0x412469(0x488)] = Scene_Shop[_0x412469(0x331)]['doSell']),
  (Scene_Shop['prototype']['doSell'] = function (_0x1dd5d7) {
    const _0x1ae5b9 = _0x412469;
    VisuMZ[_0x1ae5b9(0x215)][_0x1ae5b9(0x488)][_0x1ae5b9(0x575)](this, _0x1dd5d7), this[_0x1ae5b9(0x3ce)](this[_0x1ae5b9(0x4d5)], _0x1dd5d7);
    if (_0x1dd5d7 <= 0x0) return;
    const _0x40153c = VisuMZ[_0x1ae5b9(0x215)]['Settings'][_0x1ae5b9(0x4e7)];
    _0x40153c[_0x1ae5b9(0x3a1)] && $gameSwitches['setValue'](_0x40153c[_0x1ae5b9(0x4ef)], !![]), this[_0x1ae5b9(0x3bc)][_0x1ae5b9(0x1f2)](), this['_sellWindow'][_0x1ae5b9(0x1f2)]();
  }),
  (Scene_Shop['prototype'][_0x412469(0x3ce)] = function (_0x1292b0, _0x138297) {
    const _0x482646 = _0x412469;
    this['processShopCondListingOnSellItem'](_0x1292b0, _0x138297), $gameParty[_0x482646(0x2fd)](_0x1292b0, _0x138297), $gameParty['addShopTrackingGoldSell'](_0x138297 * this['sellingPrice']());
  }),
  (Scene_Shop[_0x412469(0x331)]['processShopCondListingOnSellItem'] = function (_0x3d810f, _0x4817f0) {
    const _0x342c39 = _0x412469;
    if (!_0x3d810f) return;
    if (!_0x4817f0) return;
    const _0x25da97 = VisuMZ[_0x342c39(0x215)][_0x342c39(0x5d9)],
      _0x5c0b85 = _0x3d810f[_0x342c39(0x5a7)] || '';
    if (_0x5c0b85[_0x342c39(0x512)](_0x25da97[_0x342c39(0x466)])) {
      const _0x405261 = String(RegExp['$1'])
        ['split'](',')
        [_0x342c39(0x54a)](_0x1c0cf3 => Number(_0x1c0cf3));
      for (const _0x2e3d19 of _0x405261) {
        $gameSwitches[_0x342c39(0x59f)](_0x2e3d19, !![]);
      }
    }
    if (_0x5c0b85['match'](_0x25da97[_0x342c39(0x26c)])) {
      const _0x1f8a08 = String(RegExp['$1'])
        ['split'](',')
        [_0x342c39(0x54a)](_0xb21af4 => Number(_0xb21af4));
      for (const _0x3dce1a of _0x1f8a08) {
        $gameSwitches[_0x342c39(0x59f)](_0x3dce1a, ![]);
      }
    }
  });
function Sprite_NewLabel() {
  this['initialize'](...arguments);
}
(Sprite_NewLabel[_0x412469(0x331)] = Object[_0x412469(0x3ab)](Sprite['prototype'])),
  (Sprite_NewLabel['prototype'][_0x412469(0x336)] = Sprite_NewLabel),
  (Sprite_NewLabel[_0x412469(0x331)][_0x412469(0x268)] = function () {
    const _0x41c4e6 = _0x412469;
    Sprite[_0x41c4e6(0x331)][_0x41c4e6(0x268)][_0x41c4e6(0x575)](this), this[_0x41c4e6(0x4c1)]();
  }),
  (Sprite_NewLabel[_0x412469(0x331)][_0x412469(0x4c1)] = function () {
    const _0x294136 = _0x412469,
      _0x317899 = ImageManager['iconWidth'],
      _0x2369b6 = ImageManager[_0x294136(0x2ee)];
    (this['bitmap'] = new Bitmap(_0x317899, _0x2369b6)), this[_0x294136(0x29a)](), this[_0x294136(0x3ae)]();
  }),
  (Sprite_NewLabel[_0x412469(0x331)]['drawNewLabelIcon'] = function () {
    const _0x3454a3 = _0x412469,
      _0x2b658e = VisuMZ[_0x3454a3(0x215)]['Settings'][_0x3454a3(0x539)][_0x3454a3(0x5ae)];
    if (_0x2b658e <= 0x0) return;
    const _0x1b44d5 = ImageManager['loadSystem'](_0x3454a3(0x201)),
      _0x24d426 = ImageManager[_0x3454a3(0x52b)],
      _0xa2087e = ImageManager['iconHeight'],
      _0x283c23 = (_0x2b658e % 0x10) * _0x24d426,
      _0x388e01 = Math['floor'](_0x2b658e / 0x10) * _0xa2087e;
    this['bitmap']['blt'](_0x1b44d5, _0x283c23, _0x388e01, _0x24d426, _0xa2087e, 0x0, 0x0);
  }),
  (Sprite_NewLabel[_0x412469(0x331)]['drawNewLabelText'] = function () {
    const _0xf061e9 = _0x412469,
      _0xf5bf0c = VisuMZ[_0xf061e9(0x215)][_0xf061e9(0x55e)][_0xf061e9(0x539)],
      _0x15b661 = _0xf5bf0c[_0xf061e9(0x50a)];
    if (_0x15b661 === '') return;
    const _0x5e0ac3 = ImageManager['iconWidth'],
      _0x3730fa = ImageManager[_0xf061e9(0x2ee)];
    (this[_0xf061e9(0x5f0)][_0xf061e9(0x37b)] = _0xf5bf0c['FontFace'] || $gameSystem[_0xf061e9(0x2e9)]()),
      (this[_0xf061e9(0x5f0)]['textColor'] = this[_0xf061e9(0x2ca)]()),
      (this['bitmap'][_0xf061e9(0x5bd)] = _0xf5bf0c[_0xf061e9(0x59c)]),
      this['bitmap']['drawText'](_0x15b661, 0x0, _0x3730fa / 0x2, _0x5e0ac3, _0x3730fa / 0x2, _0xf061e9(0x4ce));
  }),
  (Sprite_NewLabel[_0x412469(0x331)][_0x412469(0x2ca)] = function () {
    const _0x828825 = _0x412469,
      _0x2f169f = VisuMZ['ItemsEquipsCore'][_0x828825(0x55e)][_0x828825(0x539)][_0x828825(0x1c8)];
    return _0x2f169f['match'](/#(.*)/i) ? '#' + String(RegExp['$1']) : ColorManager['textColor'](_0x2f169f);
  }),
  (Window_Base[_0x412469(0x331)][_0x412469(0x440)] = function (_0x160161, _0x9b1f66, _0x413c2c, _0x1b7de9) {
    const _0x12ae87 = _0x412469;
    if (_0x160161) {
      const _0x3e47eb = _0x413c2c + (this['lineHeight']() - ImageManager['iconHeight']) / 0x2,
        _0x3ff30e = ImageManager[_0x12ae87(0x52b)] + 0x4,
        _0x155892 = Math[_0x12ae87(0x261)](0x0, _0x1b7de9 - _0x3ff30e);
      this[_0x12ae87(0x45d)](ColorManager[_0x12ae87(0x457)](_0x160161)),
        this[_0x12ae87(0x2fc)](_0x160161[_0x12ae87(0x314)], _0x9b1f66, _0x3e47eb),
        this['drawText'](_0x160161[_0x12ae87(0x412)], _0x9b1f66 + _0x3ff30e, _0x413c2c, _0x155892),
        this[_0x12ae87(0x1ca)]();
    }
  }),
  (Window_Base[_0x412469(0x331)][_0x412469(0x4ff)] = function (_0x1e009d, _0x3bd7fc, _0x18b807, _0x1b0612) {
    const _0x348efd = _0x412469;
    if (this[_0x348efd(0x4d2)](_0x1e009d)) {
      this[_0x348efd(0x2d0)]();
      const _0x2be7c9 = VisuMZ[_0x348efd(0x215)][_0x348efd(0x55e)][_0x348efd(0x582)],
        _0x191189 = _0x2be7c9[_0x348efd(0x4e8)],
        _0x240b77 = _0x191189[_0x348efd(0x32c)]($gameParty['numItems'](_0x1e009d));
      (this[_0x348efd(0x468)][_0x348efd(0x5bd)] = _0x2be7c9[_0x348efd(0x449)]), this[_0x348efd(0x5f1)](_0x240b77, _0x3bd7fc, _0x18b807, _0x1b0612, _0x348efd(0x264)), this[_0x348efd(0x2d0)]();
    }
  }),
  (Window_Base[_0x412469(0x331)][_0x412469(0x4d2)] = function (_0x1e3b5a) {
    const _0x4bebf2 = _0x412469;
    if (DataManager[_0x4bebf2(0x321)](_0x1e3b5a)) return $dataSystem[_0x4bebf2(0x284)];
    return !![];
  }),
  (Window_Base[_0x412469(0x331)]['drawItemDarkRect'] = function (_0x5ae0d0, _0x599186, _0x19b0ac, _0x24760d, _0x51d0de) {
    const _0x487f5a = _0x412469;
    _0x51d0de = Math['max'](_0x51d0de || 0x1, 0x1);
    while (_0x51d0de--) {
      (_0x24760d = _0x24760d || this[_0x487f5a(0x232)]()), (this[_0x487f5a(0x35a)][_0x487f5a(0x465)] = 0xa0);
      const _0x40d520 = ColorManager[_0x487f5a(0x4dd)]();
      this[_0x487f5a(0x35a)]['fillRect'](_0x5ae0d0 + 0x1, _0x599186 + 0x1, _0x19b0ac - 0x2, _0x24760d - 0x2, _0x40d520), (this[_0x487f5a(0x35a)][_0x487f5a(0x465)] = 0xff);
    }
  }),
  (VisuMZ['ItemsEquipsCore']['Window_Selectable_initialize'] = Window_Selectable['prototype'][_0x412469(0x268)]),
  (Window_Selectable[_0x412469(0x331)][_0x412469(0x268)] = function (_0x39242c) {
    const _0x1a8dfc = _0x412469;
    this[_0x1a8dfc(0x277)](), VisuMZ[_0x1a8dfc(0x215)]['Window_Selectable_initialize'][_0x1a8dfc(0x575)](this, _0x39242c);
  }),
  (Window_Selectable[_0x412469(0x331)]['initNewLabelSprites'] = function () {
    const _0x382453 = _0x412469;
    (this[_0x382453(0x58e)] = {}),
      (this['_newLabelOpacity'] = 0xff),
      (this['_newLabelOpacityChange'] = VisuMZ[_0x382453(0x215)]['Settings'][_0x382453(0x539)]['FadeSpeed']),
      (this['_newLabelOpacityUpperLimit'] = VisuMZ[_0x382453(0x215)][_0x382453(0x55e)][_0x382453(0x539)]['FadeLimit']);
  }),
  (Window_Selectable[_0x412469(0x331)][_0x412469(0x38c)] = function () {
    return ![];
  }),
  (VisuMZ['ItemsEquipsCore'][_0x412469(0x508)] = Window_Selectable[_0x412469(0x331)][_0x412469(0x461)]),
  (Window_Selectable[_0x412469(0x331)][_0x412469(0x461)] = function (_0x5e4cdb) {
    const _0x40a329 = _0x412469;
    VisuMZ[_0x40a329(0x215)]['Window_Selectable_setHelpWindowItem'][_0x40a329(0x575)](this, _0x5e4cdb);
    if (this[_0x40a329(0x38c)]()) this[_0x40a329(0x3ca)](_0x5e4cdb);
  }),
  (Window_Selectable[_0x412469(0x331)][_0x412469(0x3ca)] = function (_0x5617d1) {
    const _0x3710cf = _0x412469;
    if (!_0x5617d1) return;
    $gameParty['clearNewItem'](_0x5617d1);
    let _0x584a4f = '';
    if (DataManager[_0x3710cf(0x28d)](_0x5617d1)) _0x584a4f = _0x3710cf(0x477)['format'](_0x5617d1['id']);
    else {
      if (DataManager[_0x3710cf(0x32f)](_0x5617d1)) _0x584a4f = 'weapon-%1'[_0x3710cf(0x32c)](_0x5617d1['id']);
      else {
        if (DataManager[_0x3710cf(0x429)](_0x5617d1)) _0x584a4f = _0x3710cf(0x474)[_0x3710cf(0x32c)](_0x5617d1['id']);
        else return;
      }
    }
    const _0x4fe32f = this['_newLabelSprites'][_0x584a4f];
    if (_0x4fe32f) _0x4fe32f['hide']();
  }),
  (VisuMZ[_0x412469(0x215)]['Window_Selectable_refresh'] = Window_Selectable['prototype'][_0x412469(0x1f2)]),
  (Window_Selectable[_0x412469(0x331)][_0x412469(0x1f2)] = function () {
    const _0x531387 = _0x412469;
    this[_0x531387(0x211)](), VisuMZ[_0x531387(0x215)][_0x531387(0x544)][_0x531387(0x575)](this);
  }),
  (Window_Selectable[_0x412469(0x331)][_0x412469(0x211)] = function () {
    const _0x476f14 = _0x412469;
    for (const _0x4561d4 of Object[_0x476f14(0x497)](this[_0x476f14(0x58e)])) {
      _0x4561d4[_0x476f14(0x56d)]();
    }
  }),
  (VisuMZ['ItemsEquipsCore']['Window_Selectable_update'] = Window_Selectable[_0x412469(0x331)][_0x412469(0x472)]),
  (Window_Selectable['prototype']['update'] = function () {
    const _0x550705 = _0x412469;
    this[_0x550705(0x2ea)](), VisuMZ[_0x550705(0x215)]['Window_Selectable_update'][_0x550705(0x575)](this);
  }),
  (Window_Selectable[_0x412469(0x331)]['updateNewLabelOpacity'] = function () {
    const _0x28d2ed = _0x412469;
    if (!this[_0x28d2ed(0x38c)]()) return;
    const _0x46a41c = this['_newLabelOpacityUpperLimit'];
    this[_0x28d2ed(0x2d4)] += this['_newLabelOpacityChange'];
    (this[_0x28d2ed(0x2d4)] >= _0x46a41c || this[_0x28d2ed(0x2d4)] <= 0x0) && (this[_0x28d2ed(0x59d)] *= -0x1);
    this[_0x28d2ed(0x2d4)] = this[_0x28d2ed(0x2d4)][_0x28d2ed(0x46c)](0x0, _0x46a41c);
    for (const _0x246347 of Object['values'](this[_0x28d2ed(0x58e)])) {
      _0x246347[_0x28d2ed(0x3a4)] = this[_0x28d2ed(0x2d4)];
    }
  }),
  (Window_Selectable[_0x412469(0x331)][_0x412469(0x5c0)] = function (_0x11250b) {
    const _0x9bd519 = _0x412469,
      _0x5af93c = this['_newLabelSprites'];
    if (_0x5af93c[_0x11250b]) return _0x5af93c[_0x11250b];
    else {
      const _0x322924 = new Sprite_NewLabel();
      return (_0x5af93c[_0x11250b] = _0x322924), this[_0x9bd519(0x4cd)](_0x322924), _0x322924;
    }
  }),
  (Window_Selectable[_0x412469(0x331)][_0x412469(0x31c)] = function (_0x57cb89, _0xca050e, _0x2e86a3) {
    const _0x3f3993 = _0x412469;
    let _0x412b05 = '';
    if (DataManager[_0x3f3993(0x28d)](_0x57cb89)) _0x412b05 = 'item-%1'[_0x3f3993(0x32c)](_0x57cb89['id']);
    else {
      if (DataManager[_0x3f3993(0x32f)](_0x57cb89)) _0x412b05 = _0x3f3993(0x20d)[_0x3f3993(0x32c)](_0x57cb89['id']);
      else {
        if (DataManager[_0x3f3993(0x429)](_0x57cb89)) _0x412b05 = _0x3f3993(0x474)[_0x3f3993(0x32c)](_0x57cb89['id']);
        else return;
      }
    }
    const _0x114e8f = this[_0x3f3993(0x5c0)](_0x412b05);
    _0x114e8f['move'](_0xca050e, _0x2e86a3), _0x114e8f[_0x3f3993(0x2b8)](), (_0x114e8f[_0x3f3993(0x3a4)] = this[_0x3f3993(0x2d4)]);
  }),
  (Window_ItemCategory['categoryList'] = VisuMZ[_0x412469(0x215)][_0x412469(0x55e)]['Categories'][_0x412469(0x2bd)]),
  (Window_ItemCategory['categoryItemTypes'] = [_0x412469(0x384), 'HiddenItemB', _0x412469(0x262), _0x412469(0x473), _0x412469(0x3d8), _0x412469(0x2d5), _0x412469(0x53d), _0x412469(0x5b4)]),
  (VisuMZ[_0x412469(0x215)][_0x412469(0x3cc)] = Window_ItemCategory['prototype']['initialize']),
  (Window_ItemCategory[_0x412469(0x331)][_0x412469(0x268)] = function (_0x3a67e6) {
    const _0x12ed8b = _0x412469;
    VisuMZ[_0x12ed8b(0x215)][_0x12ed8b(0x3cc)]['call'](this, _0x3a67e6), this[_0x12ed8b(0x1b1)](_0x3a67e6);
  }),
  (Window_ItemCategory['prototype'][_0x412469(0x1b1)] = function (_0xa3ddc2) {
    const _0xbb6e7 = _0x412469,
      _0x5c462a = new Rectangle(0x0, 0x0, _0xa3ddc2[_0xbb6e7(0x2fa)], _0xa3ddc2['height']);
    (this[_0xbb6e7(0x249)] = new Window_Base(_0x5c462a)), (this[_0xbb6e7(0x249)][_0xbb6e7(0x3a4)] = 0x0), this[_0xbb6e7(0x4a8)](this[_0xbb6e7(0x249)]), this['updateCategoryNameWindow']();
  }),
  (Window_ItemCategory[_0x412469(0x331)][_0x412469(0x4fa)] = function () {
    const _0xccf7d1 = _0x412469;
    return Imported[_0xccf7d1(0x308)] && Window_HorzCommand[_0xccf7d1(0x331)]['isUseModernControls']['call'](this);
  }),
  (Window_ItemCategory[_0x412469(0x331)]['processCursorHomeEndTrigger'] = function () {}),
  (Window_ItemCategory['prototype'][_0x412469(0x46f)] = function () {
    const _0x7e38f = _0x412469;
    if (!this[_0x7e38f(0x4fa)]()) Window_HorzCommand[_0x7e38f(0x331)][_0x7e38f(0x46f)][_0x7e38f(0x575)](this);
  }),
  (Window_ItemCategory[_0x412469(0x331)][_0x412469(0x47d)] = function () {
    const _0xfcd1ae = _0x412469;
    return this[_0xfcd1ae(0x48e)] ? this[_0xfcd1ae(0x515)]() : 0x4;
  }),
  (Window_ItemCategory[_0x412469(0x331)][_0x412469(0x472)] = function () {
    const _0x4d16ca = _0x412469;
    Window_HorzCommand[_0x4d16ca(0x331)][_0x4d16ca(0x472)][_0x4d16ca(0x575)](this), this[_0x4d16ca(0x3d1)] && this['_itemWindow'][_0x4d16ca(0x1bc)](this['currentExt']());
  }),
  (Window_ItemCategory[_0x412469(0x331)][_0x412469(0x566)] = function () {
    const _0x11dcaf = _0x412469;
    if (this['isCursorMovable']()) {
      const _0x545586 = this[_0x11dcaf(0x548)]();
      if (this[_0x11dcaf(0x3d1)] && this[_0x11dcaf(0x3d1)][_0x11dcaf(0x47d)]() <= 0x1)
        Input[_0x11dcaf(0x425)](_0x11dcaf(0x264)) && this[_0x11dcaf(0x1fe)](Input[_0x11dcaf(0x27e)](_0x11dcaf(0x264))),
          Input['isRepeated']('left') && this[_0x11dcaf(0x492)](Input[_0x11dcaf(0x27e)](_0x11dcaf(0x1c9)));
      else
        this[_0x11dcaf(0x3d1)] &&
          this[_0x11dcaf(0x3d1)][_0x11dcaf(0x47d)]() > 0x1 &&
          (Input['isRepeated'](_0x11dcaf(0x296)) && !Input[_0x11dcaf(0x4b8)](_0x11dcaf(0x40e)) && this[_0x11dcaf(0x1fe)](Input[_0x11dcaf(0x27e)]('pagedown')),
          Input[_0x11dcaf(0x425)](_0x11dcaf(0x2b1)) && !Input[_0x11dcaf(0x4b8)](_0x11dcaf(0x40e)) && this[_0x11dcaf(0x492)](Input[_0x11dcaf(0x27e)](_0x11dcaf(0x2b1))));
      this[_0x11dcaf(0x548)]() !== _0x545586 && this[_0x11dcaf(0x1a8)]();
    }
  }),
  (Window_ItemCategory[_0x412469(0x331)][_0x412469(0x58d)] = function () {
    const _0x5c69a1 = _0x412469;
    if (this['isUseModernControls']()) return;
    Window_HorzCommand[_0x5c69a1(0x331)][_0x5c69a1(0x58d)][_0x5c69a1(0x575)](this);
  }),
  (Window_ItemCategory['prototype'][_0x412469(0x4af)] = function () {
    const _0x4d38c3 = _0x412469;
    return this['isUseModernControls']() ? ![] : Window_HorzCommand['prototype'][_0x4d38c3(0x4af)][_0x4d38c3(0x575)](this);
  }),
  (Window_ItemCategory[_0x412469(0x331)]['processTouchModernControls'] = function () {
    const _0x22cb3a = _0x412469;
    if (this[_0x22cb3a(0x1e3)]()) {
      TouchInput[_0x22cb3a(0x27e)]() && this[_0x22cb3a(0x5ac)](!![]);
      if (TouchInput[_0x22cb3a(0x434)]()) this[_0x22cb3a(0x28e)]();
      else TouchInput[_0x22cb3a(0x543)]() && this['onTouchCancel']();
    }
  }),
  (Window_ItemCategory[_0x412469(0x331)][_0x412469(0x5ac)] = function (_0x57f944) {
    const _0x317066 = _0x412469;
    this[_0x317066(0x4fa)]() ? this[_0x317066(0x597)](!![]) : Window_HorzCommand['prototype'][_0x317066(0x5ac)]['call'](this, _0x57f944);
  }),
  (Window_ItemCategory[_0x412469(0x331)]['onTouchSelectModern'] = function (_0x44fac1) {
    const _0x203c4a = _0x412469;
    this[_0x203c4a(0x4bb)] = ![];
    if (this[_0x203c4a(0x593)]()) {
      const _0x36512e = this[_0x203c4a(0x548)](),
        _0x48f913 = this[_0x203c4a(0x5e7)]();
      _0x48f913 >= 0x0 && _0x48f913 !== this['index']() && this[_0x203c4a(0x30e)](_0x48f913), _0x44fac1 && this[_0x203c4a(0x548)]() !== _0x36512e && this['playCursorSound']();
    }
  }),
  (Window_ItemCategory[_0x412469(0x331)][_0x412469(0x214)] = function () {
    const _0x3f5258 = _0x412469;
    this[_0x3f5258(0x327)](), this['select'](this[_0x3f5258(0x548)]());
  }),
  (Window_ItemCategory['prototype'][_0x412469(0x327)] = function () {
    const _0x14304f = _0x412469;
    for (const _0x1b531f of Window_ItemCategory[_0x14304f(0x4cf)]) {
      this[_0x14304f(0x373)](_0x1b531f);
    }
  }),
  (Window_ItemCategory['prototype']['addItemCategory'] = function (_0x159398) {
    const _0x596d1d = _0x412469,
      _0x1dccdd = _0x159398[_0x596d1d(0x561)],
      _0x3c3613 = _0x159398[_0x596d1d(0x5ae)],
      _0x59afbc = _0x159398[_0x596d1d(0x27b)] || 0x0;
    if (_0x59afbc > 0x0 && !$gameSwitches[_0x596d1d(0x5de)](_0x59afbc)) return;
    let _0x53db2b = '',
      _0x159f7d = _0x596d1d(0x221),
      _0x3239c1 = _0x1dccdd;
    if (_0x1dccdd[_0x596d1d(0x512)](/Category:(.*)/i)) _0x53db2b = String(RegExp['$1'])[_0x596d1d(0x5ed)]();
    else {
      if (Window_ItemCategory[_0x596d1d(0x591)][_0x596d1d(0x5a9)](_0x1dccdd)) _0x53db2b = VisuMZ[_0x596d1d(0x215)]['Settings'][_0x596d1d(0x57a)][_0x1dccdd];
      else {
        if ([_0x596d1d(0x2dc), _0x596d1d(0x2a7)][_0x596d1d(0x5a9)](_0x1dccdd)) _0x53db2b = TextManager[_0x596d1d(0x3e7)];
        else {
          if (_0x1dccdd === _0x596d1d(0x3ed)) _0x53db2b = TextManager[_0x596d1d(0x2b6)];
          else {
            if (_0x1dccdd === _0x596d1d(0x4a4)) _0x53db2b = TextManager[_0x596d1d(0x245)];
            else {
              if (_0x1dccdd === _0x596d1d(0x3f8)) _0x53db2b = TextManager[_0x596d1d(0x52d)];
              else {
                if (_0x1dccdd['match'](/WTYPE:(\d+)/i)) _0x53db2b = $dataSystem[_0x596d1d(0x485)][Number(RegExp['$1'])] || '';
                else {
                  if (_0x1dccdd[_0x596d1d(0x512)](/ATYPE:(\d+)/i)) _0x53db2b = $dataSystem[_0x596d1d(0x386)][Number(RegExp['$1'])] || '';
                  else _0x1dccdd[_0x596d1d(0x512)](/ETYPE:(\d+)/i) && (_0x53db2b = $dataSystem['equipTypes'][Number(RegExp['$1'])] || '');
                }
              }
            }
          }
        }
      }
    }
    if (TextManager['parseLocalizedText'] && TextManager['isVisuMzLocalizationEnabled']()) {
      const _0x2d648f = _0x53db2b[_0x596d1d(0x3ea)]()[_0x596d1d(0x5ed)]();
      if ($dataLocalization[_0x2d648f] && _0x2d648f[_0x596d1d(0x1ec)] > 0x0) {
        const _0x148b3f = ConfigManager[_0x596d1d(0x507)] || _0x596d1d(0x3e0);
        _0x53db2b = $dataLocalization[_0x2d648f][_0x148b3f] || _0x596d1d(0x57b);
      }
    }
    _0x3c3613 > 0x0 && this['categoryStyle']() !== _0x596d1d(0x1c6) && (_0x53db2b = _0x596d1d(0x5cd)[_0x596d1d(0x32c)](_0x3c3613, _0x53db2b)),
      this['addCommand'](_0x53db2b, _0x159f7d, !![], _0x3239c1);
  }),
  (Window_ItemCategory[_0x412469(0x331)][_0x412469(0x5c2)] = function () {
    const _0x46c119 = _0x412469;
    return VisuMZ[_0x46c119(0x215)][_0x46c119(0x55e)]['Categories'][_0x46c119(0x330)];
  }),
  (Window_ItemCategory[_0x412469(0x331)]['drawItem'] = function (_0x4e3b8e) {
    const _0x567e3b = _0x412469,
      _0x5317e0 = this[_0x567e3b(0x272)](_0x4e3b8e);
    if (_0x5317e0 === _0x567e3b(0x35e)) this[_0x567e3b(0x355)](_0x4e3b8e);
    else _0x5317e0 === 'icon' ? this['drawItemStyleIcon'](_0x4e3b8e) : Window_HorzCommand[_0x567e3b(0x331)][_0x567e3b(0x484)][_0x567e3b(0x575)](this, _0x4e3b8e);
  }),
  (Window_ItemCategory['prototype'][_0x412469(0x3d4)] = function () {
    const _0x2ce6a6 = _0x412469;
    return VisuMZ[_0x2ce6a6(0x215)][_0x2ce6a6(0x55e)][_0x2ce6a6(0x57a)][_0x2ce6a6(0x236)];
  }),
  (Window_ItemCategory[_0x412469(0x331)]['categoryStyleCheck'] = function (_0x41b9bc) {
    const _0x1dcb71 = _0x412469;
    if (_0x41b9bc < 0x0) return _0x1dcb71(0x1c6);
    const _0x3bde0f = this['categoryStyle']();
    if (_0x3bde0f !== _0x1dcb71(0x504)) return _0x3bde0f;
    else {
      const _0x260a67 = this['commandName'](_0x41b9bc);
      if (_0x260a67[_0x1dcb71(0x512)](/\\I\[(\d+)\]/i)) {
        const _0x5993ca = this['itemLineRect'](_0x41b9bc),
          _0x660074 = this['textSizeEx'](_0x260a67)[_0x1dcb71(0x2fa)];
        return _0x660074 <= _0x5993ca[_0x1dcb71(0x2fa)] ? _0x1dcb71(0x35e) : _0x1dcb71(0x1f9);
      } else return _0x1dcb71(0x1c6);
    }
  }),
  (Window_ItemCategory['prototype']['drawItemStyleIconText'] = function (_0x208b11) {
    const _0x268706 = _0x412469,
      _0x5c5ec1 = this['itemLineRect'](_0x208b11),
      _0x43c992 = this['commandName'](_0x208b11),
      _0x14009c = this[_0x268706(0x235)](_0x43c992)[_0x268706(0x2fa)];
    this['changePaintOpacity'](this[_0x268706(0x4fe)](_0x208b11));
    const _0x17928a = this[_0x268706(0x5c2)]();
    if (_0x17928a === 'right') this['drawTextEx'](_0x43c992, _0x5c5ec1['x'] + _0x5c5ec1[_0x268706(0x2fa)] - _0x14009c, _0x5c5ec1['y'], _0x14009c);
    else {
      if (_0x17928a === 'center') {
        const _0x335d94 = _0x5c5ec1['x'] + Math[_0x268706(0x44d)]((_0x5c5ec1[_0x268706(0x2fa)] - _0x14009c) / 0x2);
        this['drawTextEx'](_0x43c992, _0x335d94, _0x5c5ec1['y'], _0x14009c);
      } else this[_0x268706(0x2a3)](_0x43c992, _0x5c5ec1['x'], _0x5c5ec1['y'], _0x14009c);
    }
  }),
  (Window_ItemCategory['prototype']['drawItemStyleIcon'] = function (_0x13ad61) {
    const _0x164e02 = _0x412469,
      _0x7c0aee = this[_0x164e02(0x53e)](_0x13ad61);
    if (_0x7c0aee['match'](/\\I\[(\d+)\]/i)) {
      const _0xf7cbc2 = Number(RegExp['$1']) || 0x0,
        _0x3644c8 = this[_0x164e02(0x2a6)](_0x13ad61),
        _0x47f5f1 = _0x3644c8['x'] + Math['floor']((_0x3644c8['width'] - ImageManager[_0x164e02(0x52b)]) / 0x2),
        _0x6891ef = _0x3644c8['y'] + (_0x3644c8['height'] - ImageManager[_0x164e02(0x2ee)]) / 0x2;
      this[_0x164e02(0x2fc)](_0xf7cbc2, _0x47f5f1, _0x6891ef);
    }
  }),
  (VisuMZ[_0x412469(0x215)][_0x412469(0x50f)] = Window_ItemCategory[_0x412469(0x331)][_0x412469(0x383)]),
  (Window_ItemCategory[_0x412469(0x331)][_0x412469(0x383)] = function (_0x67caca) {
    const _0x67c28d = _0x412469;
    VisuMZ[_0x67c28d(0x215)]['Window_ItemCategory_setItemWindow']['call'](this, _0x67caca), (_0x67caca['_categoryWindow'] = this);
  }),
  (Window_ItemCategory[_0x412469(0x331)][_0x412469(0x334)] = function () {
    const _0x4abe25 = _0x412469;
    Window_HorzCommand[_0x4abe25(0x331)][_0x4abe25(0x334)]['call'](this);
    if (this[_0x4abe25(0x249)]) this[_0x4abe25(0x247)]();
  }),
  (Window_ItemCategory['prototype'][_0x412469(0x247)] = function () {
    const _0x19896a = _0x412469,
      _0xf58534 = this[_0x19896a(0x249)];
    _0xf58534[_0x19896a(0x468)][_0x19896a(0x2e4)]();
    const _0x5c16db = this['categoryStyleCheck'](this[_0x19896a(0x548)]());
    if (_0x5c16db === 'icon') {
      const _0x385466 = this[_0x19896a(0x2a6)](this[_0x19896a(0x548)]());
      let _0x503b37 = this['commandName'](this[_0x19896a(0x548)]());
      (_0x503b37 = _0x503b37[_0x19896a(0x3c5)](/\\I\[(\d+)\]/gi, '')),
        _0xf58534[_0x19896a(0x2d0)](),
        this['categoryNameWindowDrawBackground'](_0x503b37, _0x385466),
        this[_0x19896a(0x1f7)](_0x503b37, _0x385466),
        this['categoryNameWindowCenter'](_0x503b37, _0x385466);
    }
  }),
  (Window_ItemCategory[_0x412469(0x331)][_0x412469(0x4ca)] = function (_0xf64554, _0x39cacd) {}),
  (Window_ItemCategory[_0x412469(0x331)][_0x412469(0x1f7)] = function (_0x1adb55, _0x221102) {
    const _0x4d0e30 = _0x412469,
      _0x3cb531 = this[_0x4d0e30(0x249)];
    _0x3cb531[_0x4d0e30(0x5f1)](_0x1adb55, 0x0, _0x221102['y'], _0x3cb531[_0x4d0e30(0x25c)], 'center');
  }),
  (Window_ItemCategory[_0x412469(0x331)][_0x412469(0x59e)] = function (_0x37d9a6, _0x15a8e) {
    const _0x1993a7 = _0x412469,
      _0x3b86cb = this[_0x1993a7(0x249)],
      _0x52109f = $gameSystem[_0x1993a7(0x41d)](),
      _0xa7d076 = _0x15a8e['x'] + Math['floor'](_0x15a8e[_0x1993a7(0x2fa)] / 0x2) + _0x52109f;
    (_0x3b86cb['x'] = _0x3b86cb[_0x1993a7(0x2fa)] / -0x2 + _0xa7d076), (_0x3b86cb['y'] = Math[_0x1993a7(0x44d)](_0x15a8e['height'] / 0x2));
  }),
  (Window_ItemList[_0x412469(0x331)]['processCursorMoveModernControls'] = function () {
    const _0x1b615e = _0x412469;
    if (this[_0x1b615e(0x593)]()) {
      const _0x1ba4f2 = this[_0x1b615e(0x548)]();
      if (this['maxCols']() <= 0x1)
        !this[_0x1b615e(0x587)](_0x1b615e(0x296)) && Input[_0x1b615e(0x27e)](_0x1b615e(0x296)) && this['cursorPagedown'](),
          !this['isHandled']('pageup') && Input[_0x1b615e(0x27e)](_0x1b615e(0x2b1)) && this['cursorPageup']();
      else
        this[_0x1b615e(0x47d)]() > 0x1 &&
          (Input['isRepeated']('right') && this[_0x1b615e(0x1fe)](Input['isTriggered'](_0x1b615e(0x264))),
          Input['isRepeated'](_0x1b615e(0x1c9)) && this[_0x1b615e(0x492)](Input[_0x1b615e(0x27e)]('left')),
          this['limitedPageUpDownSceneCheck']()
            ? (Input[_0x1b615e(0x27e)]('pagedown') && Input['isPressed'](_0x1b615e(0x40e)) && this[_0x1b615e(0x2a0)](),
              Input[_0x1b615e(0x27e)]('pageup') && Input['isPressed'](_0x1b615e(0x40e)) && this[_0x1b615e(0x309)]())
            : (Input[_0x1b615e(0x27e)]('pagedown') && this[_0x1b615e(0x2a0)](), Input['isTriggered']('pageup') && this[_0x1b615e(0x309)]()));
      Input[_0x1b615e(0x425)](_0x1b615e(0x409)) &&
        (Input[_0x1b615e(0x4b8)]('shift') && this[_0x1b615e(0x329)]() ? this[_0x1b615e(0x2a0)]() : this['cursorDown'](Input[_0x1b615e(0x27e)](_0x1b615e(0x409)))),
        Input[_0x1b615e(0x425)]('up') && (Input[_0x1b615e(0x4b8)](_0x1b615e(0x40e)) && this[_0x1b615e(0x329)]() ? this[_0x1b615e(0x309)]() : this[_0x1b615e(0x3ba)](Input['isTriggered']('up'))),
        Imported['VisuMZ_0_CoreEngine'] && this['processCursorHomeEndTrigger'](),
        this[_0x1b615e(0x548)]() !== _0x1ba4f2 && this[_0x1b615e(0x1a8)]();
    }
  }),
  (Window_ItemList['prototype'][_0x412469(0x4be)] = function () {
    const _0x3cd466 = _0x412469,
      _0x2b3a17 = SceneManager[_0x3cd466(0x464)],
      _0x26ba13 = [Scene_Item, Scene_Shop];
    return _0x26ba13[_0x3cd466(0x5a9)](_0x2b3a17[_0x3cd466(0x336)]);
  }),
  (Window_ItemList[_0x412469(0x331)][_0x412469(0x442)] = function () {
    const _0x4facf5 = _0x412469;
    Window_Selectable['prototype']['activate']['call'](this), this['_categoryWindow'] && this['_categoryWindow']['isUseModernControls']() && this[_0x4facf5(0x2cd)][_0x4facf5(0x442)]();
  }),
  (Window_ItemList['prototype'][_0x412469(0x43b)] = function () {
    const _0x19b86a = _0x412469;
    Window_Selectable[_0x19b86a(0x331)][_0x19b86a(0x43b)][_0x19b86a(0x575)](this),
      this[_0x19b86a(0x2cd)] && this[_0x19b86a(0x2cd)]['isUseModernControls']() && this[_0x19b86a(0x2cd)][_0x19b86a(0x43b)]();
  }),
  (Window_ItemList['prototype'][_0x412469(0x1bc)] = function (_0x3d5686) {
    const _0x49a424 = _0x412469;
    this[_0x49a424(0x1dd)] !== _0x3d5686 &&
      ((this['_category'] = _0x3d5686),
      this[_0x49a424(0x1f2)](),
      this['_categoryWindow'] && this[_0x49a424(0x2cd)][_0x49a424(0x4fa)]() ? this[_0x49a424(0x33b)](0x0) : this[_0x49a424(0x2d2)](0x0, 0x0));
  }),
  (VisuMZ[_0x412469(0x215)]['Window_ItemList_maxCols'] = Window_ItemList[_0x412469(0x331)][_0x412469(0x47d)]),
  (Window_ItemList['prototype']['maxCols'] = function () {
    const _0x65f44e = _0x412469;
    if (SceneManager[_0x65f44e(0x464)][_0x65f44e(0x336)] === Scene_Battle) return VisuMZ[_0x65f44e(0x215)][_0x65f44e(0x47a)][_0x65f44e(0x575)](this);
    else
      return SceneManager[_0x65f44e(0x464)][_0x65f44e(0x336)] === Scene_Map
        ? VisuMZ[_0x65f44e(0x215)][_0x65f44e(0x47a)][_0x65f44e(0x575)](this)
        : VisuMZ[_0x65f44e(0x215)][_0x65f44e(0x55e)]['ItemScene'][_0x65f44e(0x25e)];
  }),
  (VisuMZ[_0x412469(0x215)][_0x412469(0x2c1)] = Window_ItemList[_0x412469(0x331)][_0x412469(0x30c)]),
  (Window_ItemList[_0x412469(0x331)]['colSpacing'] = function () {
    const _0x266f6a = _0x412469;
    return this[_0x266f6a(0x47d)]() <= 0x1 ? Window_Selectable[_0x266f6a(0x331)][_0x266f6a(0x30c)]['call'](this) : VisuMZ[_0x266f6a(0x215)]['Window_ItemList_colSpacing'][_0x266f6a(0x575)](this);
  }),
  (Window_ItemList[_0x412469(0x331)][_0x412469(0x5a9)] = function (_0x404f11) {
    const _0xe950d8 = _0x412469;
    switch (this['_category']) {
      case _0xe950d8(0x2dc):
        return DataManager['isItem'](_0x404f11);
      case _0xe950d8(0x2a7):
        return DataManager[_0xe950d8(0x28d)](_0x404f11) && _0x404f11[_0xe950d8(0x200)] === 0x1;
      case _0xe950d8(0x3ed):
        return DataManager['isItem'](_0x404f11) && _0x404f11[_0xe950d8(0x200)] === 0x2;
      case 'HiddenItemA':
        return DataManager[_0xe950d8(0x28d)](_0x404f11) && _0x404f11['itypeId'] === 0x3;
      case _0xe950d8(0x552):
        return DataManager[_0xe950d8(0x28d)](_0x404f11) && _0x404f11['itypeId'] === 0x4;
      case _0xe950d8(0x473):
        return DataManager[_0xe950d8(0x28d)](_0x404f11) && _0x404f11[_0xe950d8(0x428)];
      case 'Nonconsumable':
        return DataManager[_0xe950d8(0x28d)](_0x404f11) && !_0x404f11['consumable'];
      case _0xe950d8(0x3d8):
        return DataManager[_0xe950d8(0x28d)](_0x404f11) && [0x0][_0xe950d8(0x5a9)](_0x404f11[_0xe950d8(0x4bf)]);
      case _0xe950d8(0x2d5):
        return DataManager[_0xe950d8(0x28d)](_0x404f11) && [0x0, 0x1][_0xe950d8(0x5a9)](_0x404f11[_0xe950d8(0x4bf)]);
      case _0xe950d8(0x53d):
        return DataManager[_0xe950d8(0x28d)](_0x404f11) && [0x0, 0x2][_0xe950d8(0x5a9)](_0x404f11[_0xe950d8(0x4bf)]);
      case 'NeverUsable':
        return DataManager[_0xe950d8(0x28d)](_0x404f11) && [0x3][_0xe950d8(0x5a9)](_0x404f11[_0xe950d8(0x4bf)]);
      case 'AllWeapons':
        return DataManager[_0xe950d8(0x32f)](_0x404f11);
      case _0xe950d8(0x3f8):
        return DataManager['isArmor'](_0x404f11);
      default:
        if (this['_category'][_0xe950d8(0x512)](/WTYPE:(\d+)/i)) return DataManager[_0xe950d8(0x32f)](_0x404f11) && _0x404f11[_0xe950d8(0x288)] === Number(RegExp['$1']);
        else {
          if (this[_0xe950d8(0x1dd)][_0xe950d8(0x512)](/WTYPE:(.*)/i)) {
            const _0xcc37f1 = $dataSystem['weaponTypes'][_0xe950d8(0x2e3)](String(RegExp['$1'])[_0xe950d8(0x5ed)]());
            return DataManager[_0xe950d8(0x32f)](_0x404f11) && _0x404f11[_0xe950d8(0x288)] === _0xcc37f1;
          } else {
            if (this[_0xe950d8(0x1dd)]['match'](/ATYPE:(\d+)/i)) return DataManager[_0xe950d8(0x429)](_0x404f11) && _0x404f11['atypeId'] === Number(RegExp['$1']);
            else {
              if (this[_0xe950d8(0x1dd)][_0xe950d8(0x512)](/ATYPE:(.*)/i)) {
                const _0x4b7fba = $dataSystem['armorTypes'][_0xe950d8(0x2e3)](String(RegExp['$1'])[_0xe950d8(0x5ed)]());
                return DataManager[_0xe950d8(0x429)](_0x404f11) && _0x404f11[_0xe950d8(0x1d9)] === _0x4b7fba;
              } else {
                if (this[_0xe950d8(0x1dd)][_0xe950d8(0x512)](/ETYPE:(\d+)/i)) return !!_0x404f11 && _0x404f11['etypeId'] === Number(RegExp['$1']);
                else {
                  if (this[_0xe950d8(0x1dd)]['match'](/ETYPE:(.*)/i)) {
                    const _0x13804e = $dataSystem[_0xe950d8(0x42d)][_0xe950d8(0x2e3)](String(RegExp['$1'])[_0xe950d8(0x5ed)]());
                    return DataManager[_0xe950d8(0x429)](_0x404f11) && _0x404f11[_0xe950d8(0x49f)] === _0x13804e;
                  } else {
                    if (this[_0xe950d8(0x1dd)][_0xe950d8(0x512)](/Category:(.*)/i))
                      return !!_0x404f11 && _0x404f11[_0xe950d8(0x3e5)][_0xe950d8(0x5a9)](String(RegExp['$1'])[_0xe950d8(0x5bc)]()[_0xe950d8(0x5ed)]());
                  }
                }
              }
            }
          }
        }
    }
    return ![];
  }),
  (VisuMZ[_0x412469(0x215)]['Window_ItemList_makeItemList'] = Window_ItemList[_0x412469(0x331)]['makeItemList']),
  (Window_ItemList['prototype']['makeItemList'] = function () {
    const _0x118963 = _0x412469;
    VisuMZ[_0x118963(0x215)]['Window_ItemList_makeItemList']['call'](this);
    if (this['canSortListItemScene']()) this[_0x118963(0x1f5)]();
  }),
  (Window_ItemList[_0x412469(0x331)][_0x412469(0x5ec)] = function () {
    const _0x57e50a = _0x412469,
      _0xd7cc08 = [_0x57e50a(0x2d3), _0x57e50a(0x4e0), 'Scene_Equip', _0x57e50a(0x5e2)],
      _0xf5240d = SceneManager['_scene'];
    return _0xd7cc08['includes'](_0xf5240d[_0x57e50a(0x336)][_0x57e50a(0x412)]);
  }),
  (Window_ItemList['prototype'][_0x412469(0x1f5)] = function () {
    const _0xbcd706 = _0x412469,
      _0x99b745 = Window_ItemCategory[_0xbcd706(0x4cf)],
      _0x37c3e5 = _0x99b745[_0xbcd706(0x3cd)](_0x4110a3 => _0x4110a3['Type'] === this[_0xbcd706(0x1dd)]);
    if (!_0x37c3e5) {
      VisuMZ['ItemsEquipsCore'][_0xbcd706(0x4b0)](this['_data']);
      return;
    }
    const _0x507d71 = ((_0x37c3e5[_0xbcd706(0x5a6)] ?? 'ID') || 'ID')['toUpperCase']()[_0xbcd706(0x5ed)]();
    _0x507d71 === _0xbcd706(0x38b)
      ? this[_0xbcd706(0x2c5)][_0xbcd706(0x598)]((_0x5eb31e, _0x29492c) => {
          const _0x94914d = _0xbcd706;
          if (!!_0x5eb31e && !!_0x29492c) return _0x5eb31e['name'][_0x94914d(0x462)](_0x29492c['name']);
          return 0x0;
        })
      : VisuMZ[_0xbcd706(0x215)][_0xbcd706(0x4b0)](this[_0xbcd706(0x2c5)]);
  }),
  (VisuMZ[_0x412469(0x215)][_0x412469(0x4b0)] = function (_0x389943) {
    return (
      _0x389943['sort']((_0x3f5ea2, _0x302b8d) => {
        const _0x7018ed = _0x2447;
        if (!!_0x3f5ea2 && !!_0x302b8d) {
          if (_0x3f5ea2[_0x7018ed(0x212)] === undefined) VisuMZ[_0x7018ed(0x215)]['Parse_Notetags_Sorting'](_0x3f5ea2);
          if (_0x302b8d['sortPriority'] === undefined) VisuMZ[_0x7018ed(0x215)][_0x7018ed(0x26d)](_0x302b8d);
          const _0x4456d3 = _0x3f5ea2['sortPriority'],
            _0x3e909d = _0x302b8d[_0x7018ed(0x212)];
          if (_0x4456d3 !== _0x3e909d) return _0x3e909d - _0x4456d3;
          return _0x3f5ea2['id'] - _0x302b8d['id'];
        }
        return 0x0;
      }),
      _0x389943
    );
  }),
  (Window_ItemList[_0x412469(0x331)][_0x412469(0x38c)] = function () {
    return !![];
  }),
  (VisuMZ[_0x412469(0x215)][_0x412469(0x36b)] = Window_ItemList[_0x412469(0x331)]['drawItem']),
  (Window_ItemList['prototype'][_0x412469(0x484)] = function (_0x11db8f) {
    const _0x35d821 = _0x412469;
    VisuMZ['ItemsEquipsCore']['Window_ItemList_drawItem'][_0x35d821(0x575)](this, _0x11db8f), this[_0x35d821(0x4e6)](_0x11db8f);
  }),
  (Window_ItemList['prototype'][_0x412469(0x4ff)] = function (_0x30d8d2, _0x496d8d, _0x2a9bac, _0x2d7cb7) {
    const _0xa0c9b0 = _0x412469;
    Window_Selectable[_0xa0c9b0(0x331)][_0xa0c9b0(0x4ff)]['call'](this, _0x30d8d2, _0x496d8d, _0x2a9bac, _0x2d7cb7);
  }),
  (Window_ItemList[_0x412469(0x331)][_0x412469(0x4e6)] = function (_0x1dd7e5) {
    const _0x1512c4 = _0x412469,
      _0xce93ef = this[_0x1512c4(0x238)](_0x1dd7e5);
    if (!_0xce93ef || !this[_0x1512c4(0x38c)]()) return;
    if (!$gameParty[_0x1512c4(0x460)](_0xce93ef)) return;
    const _0x2fcc7d = this[_0x1512c4(0x2a6)](_0x1dd7e5),
      _0x1eaa67 = _0x2fcc7d['x'],
      _0x449dc9 = _0x2fcc7d['y'] + (this['lineHeight']() - ImageManager[_0x1512c4(0x2ee)]) / 0x2,
      _0x32cd79 = VisuMZ['ItemsEquipsCore'][_0x1512c4(0x55e)][_0x1512c4(0x539)][_0x1512c4(0x536)],
      _0x2ccfb0 = VisuMZ[_0x1512c4(0x215)][_0x1512c4(0x55e)][_0x1512c4(0x539)]['OffsetY'];
    this[_0x1512c4(0x31c)](_0xce93ef, _0x1eaa67 + _0x32cd79, _0x449dc9 + _0x2ccfb0);
  }),
  (Window_ItemList['prototype'][_0x412469(0x44c)] = function (_0x50fcd5) {
    const _0xcd772f = _0x412469;
    (this[_0xcd772f(0x36d)] = _0x50fcd5), this[_0xcd772f(0x334)]();
  }),
  (VisuMZ[_0x412469(0x215)][_0x412469(0x5a5)] = Window_ItemList[_0x412469(0x331)][_0x412469(0x267)]),
  (Window_ItemList[_0x412469(0x331)][_0x412469(0x267)] = function () {
    const _0x16741 = _0x412469;
    VisuMZ[_0x16741(0x215)][_0x16741(0x5a5)][_0x16741(0x575)](this),
      this[_0x16741(0x36d)] && this[_0x16741(0x36d)][_0x16741(0x336)] === Window_ShopStatus && this['_statusWindow'][_0x16741(0x1a6)](this['item']());
  }),
  (Window_BattleItem[_0x412469(0x331)][_0x412469(0x50d)] = function (_0x1218aa) {
    const _0x2a4fd1 = _0x412469;
    return BattleManager['actor']() ? BattleManager[_0x2a4fd1(0x4b6)]()[_0x2a4fd1(0x584)](_0x1218aa) : Window_ItemList['prototype'][_0x2a4fd1(0x50d)][_0x2a4fd1(0x575)](this, _0x1218aa);
  }),
  (Window_EventItem['prototype'][_0x412469(0x38c)] = function () {
    return ![];
  }),
  (Window_EquipStatus[_0x412469(0x331)][_0x412469(0x20b)] = function () {
    const _0x445dd8 = _0x412469;
    return VisuMZ[_0x445dd8(0x215)][_0x445dd8(0x55e)][_0x445dd8(0x2d7)][_0x445dd8(0x41a)];
  }),
  (VisuMZ[_0x412469(0x215)][_0x412469(0x2ad)] = Window_EquipStatus[_0x412469(0x331)][_0x412469(0x1f2)]),
  (Window_EquipStatus['prototype']['refresh'] = function () {
    const _0x494ade = _0x412469;
    this[_0x494ade(0x237)](), this[_0x494ade(0x2d0)]();
    if (this[_0x494ade(0x3f3)]) this[_0x494ade(0x3f3)][_0x494ade(0x1f2)]();
    this['isUseItemsEquipsCoreUpdatedLayout']() ? this[_0x494ade(0x51f)]() : VisuMZ[_0x494ade(0x215)]['Window_EquipStatus_refresh'][_0x494ade(0x575)](this);
  }),
  (Window_EquipStatus[_0x412469(0x331)][_0x412469(0x51f)] = function () {
    const _0x5e0306 = _0x412469;
    this[_0x5e0306(0x468)][_0x5e0306(0x2e4)]();
    if (!this[_0x5e0306(0x3f3)]) return;
    if (this[_0x5e0306(0x275)]()) {
      const _0x36891f = ImageManager[_0x5e0306(0x538)](this[_0x5e0306(0x3f3)][_0x5e0306(0x226)]());
      _0x36891f[_0x5e0306(0x46e)](this[_0x5e0306(0x40a)][_0x5e0306(0x3ec)](this));
    } else this[_0x5e0306(0x35f)]();
  }),
  (Window_EquipStatus[_0x412469(0x331)][_0x412469(0x275)] = function () {
    const _0xf41d33 = _0x412469;
    return Imported[_0xf41d33(0x40f)] && this[_0xf41d33(0x3f3)]['getMenuImage']() !== '' && VisuMZ[_0xf41d33(0x215)]['Settings'][_0xf41d33(0x2d7)][_0xf41d33(0x505)];
  }),
  (Window_EquipStatus[_0x412469(0x331)][_0x412469(0x40a)] = function () {
    const _0x1cdfae = _0x412469;
    VisuMZ[_0x1cdfae(0x215)][_0x1cdfae(0x55e)]['EquipScene'][_0x1cdfae(0x4de)][_0x1cdfae(0x575)](this), this[_0x1cdfae(0x4d3)]();
  }),
  (Window_EquipStatus[_0x412469(0x331)][_0x412469(0x35f)] = function () {
    const _0xf35c25 = _0x412469;
    VisuMZ[_0xf35c25(0x215)]['Settings'][_0xf35c25(0x2d7)][_0xf35c25(0x571)][_0xf35c25(0x575)](this), this['drawParamsItemsEquipsCore']();
  }),
  (Window_EquipStatus[_0x412469(0x331)][_0x412469(0x4d3)] = function () {
    const _0x24883b = _0x412469;
    this[_0x24883b(0x2d0)](), VisuMZ['ItemsEquipsCore'][_0x24883b(0x55e)][_0x24883b(0x2d7)][_0x24883b(0x2d1)]['call'](this);
  }),
  (Window_EquipStatus[_0x412469(0x331)][_0x412469(0x368)] = function (_0x3ae424, _0x361fed, _0x5e1b3f, _0x3594ac, _0x37cd5f) {
    const _0x4bc7e3 = _0x412469,
      _0x279f4d = ImageManager[_0x4bc7e3(0x538)](_0x3ae424['getMenuImage']()),
      _0x3ca141 = this[_0x4bc7e3(0x25c)] - _0x279f4d[_0x4bc7e3(0x2fa)];
    _0x361fed += _0x3ca141 / 0x2;
    if (_0x3ca141 < 0x0) _0x3594ac -= _0x3ca141;
    Window_StatusBase[_0x4bc7e3(0x331)][_0x4bc7e3(0x368)][_0x4bc7e3(0x575)](this, _0x3ae424, _0x361fed, _0x5e1b3f, _0x3594ac, _0x37cd5f);
  }),
  (Window_EquipStatus['prototype'][_0x412469(0x3d3)] = function () {
    const _0x20d539 = _0x412469;
    return Imported['VisuMZ_0_CoreEngine'] ? VisuMZ[_0x20d539(0x5ea)][_0x20d539(0x55e)][_0x20d539(0x438)][_0x20d539(0x4c0)] : [0x0, 0x1, 0x2, 0x3, 0x4, 0x5, 0x6, 0x7];
  }),
  (Window_EquipStatus[_0x412469(0x331)]['paramValueFontSize'] = function () {
    const _0x2108f2 = _0x412469;
    return VisuMZ['ItemsEquipsCore']['Settings']['EquipScene'][_0x2108f2(0x2fb)];
  }),
  (Window_EquipStatus[_0x412469(0x331)][_0x412469(0x22f)] = function () {
    const _0x3e26a0 = _0x412469;
    return Imported[_0x3e26a0(0x308)] && VisuMZ['CoreEngine']['Settings'][_0x3e26a0(0x438)][_0x3e26a0(0x4b5)];
  }),
  (Window_EquipStatus[_0x412469(0x331)][_0x412469(0x2e1)] = function (_0x5b2c57, _0x24ec46, _0xff1799, _0x59dd04) {
    const _0x5ad151 = _0x412469,
      _0x4ab313 = this['itemPadding']();
    Imported[_0x5ad151(0x308)]
      ? this['drawParamText'](_0x24ec46 + _0x4ab313, _0xff1799, _0x59dd04, _0x5b2c57, ![])
      : this['drawText'](TextManager['param'](_0x5b2c57), _0x24ec46 + _0x4ab313, _0xff1799, _0x59dd04);
  }),
  (Window_EquipStatus[_0x412469(0x331)][_0x412469(0x3bd)] = function (_0x45e8f3, _0x27f50d, _0x4fde85, _0x44fffd) {
    const _0x400187 = _0x412469,
      _0x35009c = this[_0x400187(0x1b6)]();
    let _0x2ddf92 = 0x0;
    Imported['VisuMZ_0_CoreEngine'] ? (_0x2ddf92 = this[_0x400187(0x3f3)][_0x400187(0x291)](_0x45e8f3, !![])) : (_0x2ddf92 = this['_actor']['param'](_0x45e8f3));
    const _0x330923 = _0x2ddf92;
    this[_0x400187(0x5f1)](_0x2ddf92, _0x27f50d, _0x4fde85, _0x44fffd - _0x35009c, _0x400187(0x264));
  }),
  (Window_EquipStatus['prototype'][_0x412469(0x357)] = function (_0x228499, _0x278812, _0x33fb88, _0x369762) {
    const _0xfc3a79 = _0x412469,
      _0xc0e4d7 = this[_0xfc3a79(0x1b6)]();
    let _0x84d42a = 0x0,
      _0x5bace2 = 0x0,
      _0x3a523a = '';
    if (this[_0xfc3a79(0x239)]) {
      Imported['VisuMZ_0_CoreEngine']
        ? ((_0x84d42a = this[_0xfc3a79(0x3f3)][_0xfc3a79(0x291)](_0x228499, ![])),
          (_0x5bace2 = this[_0xfc3a79(0x239)]['paramValueByName'](_0x228499, ![])),
          (_0x3a523a = this[_0xfc3a79(0x239)][_0xfc3a79(0x291)](_0x228499, !![])))
        : ((_0x84d42a = this['_actor'][_0xfc3a79(0x2b4)](_0x228499)), (_0x5bace2 = this['_tempActor'][_0xfc3a79(0x2b4)](_0x228499)), (_0x3a523a = this[_0xfc3a79(0x239)][_0xfc3a79(0x2b4)](_0x228499)));
      const _0x67858a = _0x84d42a,
        _0x240366 = _0x5bace2;
      (diffValue = _0x240366 - _0x67858a),
        this[_0xfc3a79(0x45d)](ColorManager[_0xfc3a79(0x51e)](diffValue)),
        this[_0xfc3a79(0x5f1)](_0x3a523a, _0x278812, _0x33fb88, _0x369762 - _0xc0e4d7, _0xfc3a79(0x264));
    }
  }),
  (Window_EquipStatus[_0x412469(0x331)]['drawUpdatedParamValueDiff'] = function (_0xba2432, _0x5880e0, _0x16d7d4, _0x30655e) {
    const _0xab3faa = _0x412469,
      _0x1475fe = this['itemPadding']();
    let _0x4a94ef = 0x0,
      _0x16c623 = 0x0,
      _0x1d0fa2 = ![];
    if (this[_0xab3faa(0x239)]) {
      Imported['VisuMZ_0_CoreEngine']
        ? ((_0x4a94ef = this['_actor'][_0xab3faa(0x291)](_0xba2432, ![])),
          (_0x16c623 = this[_0xab3faa(0x239)][_0xab3faa(0x291)](_0xba2432, ![])),
          (_0x1d0fa2 = String(this['_actor'][_0xab3faa(0x291)](_0xba2432, !![]))[_0xab3faa(0x512)](/([%％])/i)))
        : ((_0x4a94ef = this[_0xab3faa(0x3f3)]['param'](_0xba2432)),
          (_0x16c623 = this[_0xab3faa(0x239)][_0xab3faa(0x2b4)](_0xba2432)),
          (_0x1d0fa2 = _0x4a94ef % 0x1 !== 0x0 || _0x16c623 % 0x1 !== 0x0));
      const _0xda3136 = _0x4a94ef,
        _0x3f0f9e = _0x16c623,
        _0x16c05b = _0x3f0f9e - _0xda3136;
      let _0x27274a = _0x16c05b;
      if (_0x1d0fa2) _0x27274a = Math[_0xab3faa(0x1c0)](_0x16c05b * 0x64) + '%';
      _0x16c05b !== 0x0 &&
        (this['changeTextColor'](ColorManager['paramchangeTextColor'](_0x16c05b)),
        (_0x27274a = (_0x16c05b > 0x0 ? _0xab3faa(0x255) : _0xab3faa(0x550))[_0xab3faa(0x32c)](_0x27274a)),
        this['drawText'](_0x27274a, _0x5880e0 + _0x1475fe, _0x16d7d4, _0x30655e, _0xab3faa(0x1c9)));
    }
  }),
  (Window_EquipStatus['prototype']['drawItemDarkRect'] = function (_0x42ee91, _0x43b169, _0x5671ee, _0x4e0c40, _0xba7f62) {
    const _0x25e248 = _0x412469;
    if (VisuMZ[_0x25e248(0x215)][_0x25e248(0x55e)]['EquipScene'][_0x25e248(0x34d)] === ![]) return;
    _0xba7f62 = Math[_0x25e248(0x261)](_0xba7f62 || 0x1, 0x1);
    while (_0xba7f62--) {
      (_0x4e0c40 = _0x4e0c40 || this[_0x25e248(0x232)]()), (this[_0x25e248(0x468)][_0x25e248(0x465)] = 0xa0);
      const _0x18cbce = ColorManager['getItemsEquipsCoreBackColor2']();
      this[_0x25e248(0x468)]['fillRect'](_0x42ee91 + 0x1, _0x43b169 + 0x1, _0x5671ee - 0x2, _0x4e0c40 - 0x2, _0x18cbce), (this[_0x25e248(0x468)][_0x25e248(0x465)] = 0xff);
    }
  }),
  (ColorManager[_0x412469(0x3b0)] = function () {
    const _0x182c6d = _0x412469,
      _0x27c070 = VisuMZ[_0x182c6d(0x215)]['Settings'][_0x182c6d(0x2d7)];
    let _0x3c8e32 = _0x27c070[_0x182c6d(0x50b)] !== undefined ? _0x27c070[_0x182c6d(0x50b)] : 0x13;
    return ColorManager[_0x182c6d(0x36c)](_0x3c8e32);
  }),
  (VisuMZ[_0x412469(0x215)][_0x412469(0x574)] = Window_EquipCommand[_0x412469(0x331)][_0x412469(0x268)]),
  (Window_EquipCommand[_0x412469(0x331)]['initialize'] = function (_0x5f3dcc) {
    const _0x5f7288 = _0x412469;
    VisuMZ[_0x5f7288(0x215)]['Window_EquipCommand_initialize'][_0x5f7288(0x575)](this, _0x5f3dcc), this['createCommandNameWindow'](_0x5f3dcc);
  }),
  (Window_EquipCommand[_0x412469(0x331)]['createCommandNameWindow'] = function (_0x22e80f) {
    const _0x4fb6bc = _0x412469,
      _0x252ab3 = new Rectangle(0x0, 0x0, _0x22e80f[_0x4fb6bc(0x2fa)], _0x22e80f['height']);
    (this[_0x4fb6bc(0x47b)] = new Window_Base(_0x252ab3)), (this['_commandNameWindow'][_0x4fb6bc(0x3a4)] = 0x0), this['addChild'](this[_0x4fb6bc(0x47b)]), this[_0x4fb6bc(0x208)]();
  }),
  (Window_EquipCommand[_0x412469(0x331)][_0x412469(0x334)] = function () {
    const _0x31d0d4 = _0x412469;
    Window_HorzCommand['prototype']['callUpdateHelp'][_0x31d0d4(0x575)](this);
    if (this[_0x31d0d4(0x47b)]) this[_0x31d0d4(0x208)]();
  }),
  (Window_EquipCommand[_0x412469(0x331)][_0x412469(0x208)] = function () {
    const _0x339c9c = _0x412469,
      _0x7ac170 = this['_commandNameWindow'];
    _0x7ac170[_0x339c9c(0x468)][_0x339c9c(0x2e4)]();
    const _0x5ebb5a = this['commandStyleCheck'](this[_0x339c9c(0x548)]());
    if (_0x5ebb5a === 'icon') {
      const _0x3c4f7c = this[_0x339c9c(0x2a6)](this[_0x339c9c(0x548)]());
      let _0x2f9df3 = this[_0x339c9c(0x53e)](this[_0x339c9c(0x548)]());
      (_0x2f9df3 = _0x2f9df3[_0x339c9c(0x3c5)](/\\I\[(\d+)\]/gi, '')),
        _0x7ac170[_0x339c9c(0x2d0)](),
        this['commandNameWindowDrawBackground'](_0x2f9df3, _0x3c4f7c),
        this[_0x339c9c(0x5ba)](_0x2f9df3, _0x3c4f7c),
        this['commandNameWindowCenter'](_0x2f9df3, _0x3c4f7c);
    }
  }),
  (Window_EquipCommand[_0x412469(0x331)][_0x412469(0x24d)] = function (_0xaaf24a, _0x4aac89) {}),
  (Window_EquipCommand[_0x412469(0x331)][_0x412469(0x5ba)] = function (_0x4bb26c, _0x48d6df) {
    const _0x4618c1 = _0x412469,
      _0x2b285b = this[_0x4618c1(0x47b)];
    _0x2b285b[_0x4618c1(0x5f1)](_0x4bb26c, 0x0, _0x48d6df['y'], _0x2b285b[_0x4618c1(0x25c)], _0x4618c1(0x4ce));
  }),
  (Window_EquipCommand[_0x412469(0x331)][_0x412469(0x5ce)] = function (_0x24f9c8, _0x3b3abd) {
    const _0x1a5d6e = _0x412469,
      _0x4a8cf8 = this[_0x1a5d6e(0x47b)],
      _0x346b82 = $gameSystem['windowPadding'](),
      _0x35d9b4 = _0x3b3abd['x'] + Math['floor'](_0x3b3abd['width'] / 0x2) + _0x346b82;
    (_0x4a8cf8['x'] = _0x4a8cf8[_0x1a5d6e(0x2fa)] / -0x2 + _0x35d9b4), (_0x4a8cf8['y'] = Math[_0x1a5d6e(0x44d)](_0x3b3abd[_0x1a5d6e(0x563)] / 0x2));
  }),
  (Window_EquipCommand[_0x412469(0x331)][_0x412469(0x4fa)] = function () {
    const _0x119da4 = _0x412469;
    return Imported['VisuMZ_0_CoreEngine'] && Window_HorzCommand[_0x119da4(0x331)]['isUseModernControls'][_0x119da4(0x575)](this);
  }),
  (Window_EquipCommand[_0x412469(0x331)][_0x412469(0x46f)] = function () {
    const _0x1ff106 = _0x412469;
    if (this[_0x1ff106(0x1e4)]() === 'equip') Window_HorzCommand[_0x1ff106(0x331)][_0x1ff106(0x46f)][_0x1ff106(0x575)](this);
  }),
  (Window_EquipCommand[_0x412469(0x331)][_0x412469(0x566)] = function () {
    const _0x5ccf7b = _0x412469;
    !this[_0x5ccf7b(0x3d0)]() && Window_HorzCommand['prototype'][_0x5ccf7b(0x566)]['call'](this);
  }),
  (Window_EquipCommand[_0x412469(0x331)][_0x412469(0x3d0)] = function () {
    const _0x528c0f = _0x412469;
    if (!this['isCursorMovable']()) return ![];
    if (SceneManager[_0x528c0f(0x464)][_0x528c0f(0x336)] !== Scene_Equip) return ![];
    return Input[_0x528c0f(0x27e)](_0x528c0f(0x409)) && this[_0x528c0f(0x403)](), ![];
  }),
  (Window_EquipCommand[_0x412469(0x331)]['processDownCursorSpecialCheckModernControls'] = function () {
    const _0x3a46f3 = _0x412469;
    this[_0x3a46f3(0x1a8)](), SceneManager[_0x3a46f3(0x464)][_0x3a46f3(0x58b)](), SceneManager[_0x3a46f3(0x464)]['_slotWindow'][_0x3a46f3(0x33b)](-0x1);
  }),
  (Window_EquipCommand[_0x412469(0x331)][_0x412469(0x47d)] = function () {
    const _0x180e73 = _0x412469;
    return this[_0x180e73(0x48e)] ? this[_0x180e73(0x48e)][_0x180e73(0x1ec)] : 0x3;
  }),
  (Window_EquipCommand[_0x412469(0x331)][_0x412469(0x430)] = function () {
    const _0x148a36 = _0x412469;
    if (this['isOpen']() && this[_0x148a36(0x1b9)] && SceneManager[_0x148a36(0x464)][_0x148a36(0x336)] === Scene_Equip) {
      if (this[_0x148a36(0x4af)]() && TouchInput[_0x148a36(0x352)]()) this[_0x148a36(0x1fa)](![]);
      else TouchInput[_0x148a36(0x27e)]() && this[_0x148a36(0x1fa)](!![]);
      TouchInput[_0x148a36(0x434)]() && this[_0x148a36(0x28e)]();
    }
  }),
  (Window_EquipCommand[_0x412469(0x331)][_0x412469(0x1fa)] = function (_0x431ced) {
    const _0x5003be = _0x412469;
    this['_doubleTouch'] = ![];
    const _0x173de4 = this[_0x5003be(0x548)](),
      _0x2191e2 = this[_0x5003be(0x5e7)](),
      _0x4a66a0 = SceneManager[_0x5003be(0x464)][_0x5003be(0x50e)];
    if (_0x4a66a0[_0x5003be(0x49e)]() && _0x4a66a0['visible']) {
      if (_0x2191e2 >= 0x0) _0x2191e2 === this[_0x5003be(0x548)]() && (this[_0x5003be(0x4bb)] = !![]), this[_0x5003be(0x442)](), this['select'](_0x2191e2);
      else _0x4a66a0[_0x5003be(0x5e7)]() >= 0x0 && (this[_0x5003be(0x43b)](), this['deselect']());
    }
    _0x431ced && this['index']() !== _0x173de4 && this['playCursorSound']();
  }),
  (Window_EquipCommand['prototype'][_0x412469(0x214)] = function () {
    const _0x201d5e = _0x412469;
    this[_0x201d5e(0x4c7)](), this[_0x201d5e(0x2eb)](), this['addClearCommand']();
  }),
  (Window_EquipCommand[_0x412469(0x331)][_0x412469(0x1f2)] = function () {
    const _0x590285 = _0x412469;
    Window_HorzCommand[_0x590285(0x331)][_0x590285(0x1f2)][_0x590285(0x575)](this), this[_0x590285(0x579)]();
  }),
  (Window_EquipCommand[_0x412469(0x331)][_0x412469(0x4c7)] = function () {
    const _0x1b1203 = _0x412469;
    if (!this[_0x1b1203(0x303)]()) return;
    const _0x70e0c3 = this[_0x1b1203(0x3b6)](),
      _0x3bd34e = VisuMZ[_0x1b1203(0x215)]['Settings'][_0x1b1203(0x2d7)][_0x1b1203(0x360)],
      _0x944e5e = _0x70e0c3 === 'text' ? TextManager['equip2'] : _0x1b1203(0x5cd)['format'](_0x3bd34e, TextManager[_0x1b1203(0x503)]),
      _0x21747b = this[_0x1b1203(0x234)]();
    this['addCommand'](_0x944e5e, _0x1b1203(0x21d), _0x21747b);
  }),
  (Window_EquipCommand[_0x412469(0x331)][_0x412469(0x303)] = function () {
    return !this['isUseModernControls']();
  }),
  (Window_EquipCommand['prototype'][_0x412469(0x234)] = function () {
    return !![];
  }),
  (Window_EquipCommand[_0x412469(0x331)][_0x412469(0x2eb)] = function () {
    const _0x3b03e3 = _0x412469;
    if (!this[_0x3b03e3(0x2b7)]()) return;
    const _0x43c695 = this['commandStyle'](),
      _0x57dc5f = VisuMZ[_0x3b03e3(0x215)][_0x3b03e3(0x55e)]['EquipScene'][_0x3b03e3(0x455)],
      _0x127d9d = _0x43c695 === _0x3b03e3(0x1c6) ? TextManager[_0x3b03e3(0x4a0)] : _0x3b03e3(0x5cd)['format'](_0x57dc5f, TextManager['optimize']),
      _0x4d65ac = this[_0x3b03e3(0x1e9)]();
    this[_0x3b03e3(0x5a2)](_0x127d9d, 'optimize', _0x4d65ac);
  }),
  (Window_EquipCommand[_0x412469(0x331)][_0x412469(0x2b7)] = function () {
    const _0x1cddf1 = _0x412469;
    return VisuMZ[_0x1cddf1(0x215)][_0x1cddf1(0x55e)][_0x1cddf1(0x2d7)][_0x1cddf1(0x37e)];
  }),
  (Window_EquipCommand['prototype'][_0x412469(0x1e9)] = function () {
    return !![];
  }),
  (Window_EquipCommand['prototype'][_0x412469(0x287)] = function () {
    const _0x1fa009 = _0x412469;
    if (!this[_0x1fa009(0x4f7)]()) return;
    const _0x4a6e76 = this[_0x1fa009(0x3b6)](),
      _0x8bbfa = VisuMZ[_0x1fa009(0x215)]['Settings']['EquipScene'][_0x1fa009(0x2c9)],
      _0x530f43 = _0x4a6e76 === _0x1fa009(0x1c6) ? TextManager[_0x1fa009(0x2e4)] : '\x5cI[%1]%2'[_0x1fa009(0x32c)](_0x8bbfa, TextManager[_0x1fa009(0x2e4)]),
      _0x16eaf4 = this[_0x1fa009(0x231)]();
    this['addCommand'](_0x530f43, _0x1fa009(0x2e4), _0x16eaf4);
  }),
  (Window_EquipCommand[_0x412469(0x331)][_0x412469(0x4f7)] = function () {
    const _0x31f39e = _0x412469;
    return VisuMZ['ItemsEquipsCore'][_0x31f39e(0x55e)][_0x31f39e(0x2d7)][_0x31f39e(0x1ff)];
  }),
  (Window_EquipCommand['prototype']['isClearCommandEnabled'] = function () {
    return !![];
  }),
  (Window_EquipCommand[_0x412469(0x331)][_0x412469(0x5c2)] = function () {
    const _0x3d74a8 = _0x412469;
    return VisuMZ[_0x3d74a8(0x215)][_0x3d74a8(0x55e)][_0x3d74a8(0x2d7)][_0x3d74a8(0x3e9)];
  }),
  (Window_EquipCommand[_0x412469(0x331)]['drawItem'] = function (_0x4e45ab) {
    const _0x1ab092 = _0x412469,
      _0x4b4a5a = this['commandStyleCheck'](_0x4e45ab);
    if (_0x4b4a5a === _0x1ab092(0x35e)) this[_0x1ab092(0x355)](_0x4e45ab);
    else _0x4b4a5a === _0x1ab092(0x1f9) ? this['drawItemStyleIcon'](_0x4e45ab) : Window_HorzCommand[_0x1ab092(0x331)][_0x1ab092(0x484)][_0x1ab092(0x575)](this, _0x4e45ab);
  }),
  (Window_EquipCommand[_0x412469(0x331)][_0x412469(0x3b6)] = function () {
    const _0x19640a = _0x412469;
    return VisuMZ[_0x19640a(0x215)][_0x19640a(0x55e)][_0x19640a(0x2d7)]['CmdStyle'];
  }),
  (Window_EquipCommand[_0x412469(0x331)][_0x412469(0x218)] = function (_0x20bf7e) {
    const _0x51cee3 = _0x412469;
    if (_0x20bf7e < 0x0) return 'text';
    const _0xb7c5f1 = this['commandStyle']();
    if (_0xb7c5f1 !== 'auto') return _0xb7c5f1;
    else {
      if (this['maxItems']() > 0x0) {
        const _0x35eb37 = this[_0x51cee3(0x53e)](_0x20bf7e);
        if (_0x35eb37['match'](/\\I\[(\d+)\]/i)) {
          const _0x5af058 = this[_0x51cee3(0x2a6)](_0x20bf7e),
            _0x101e87 = this[_0x51cee3(0x235)](_0x35eb37)[_0x51cee3(0x2fa)];
          return _0x101e87 <= _0x5af058['width'] ? 'iconText' : _0x51cee3(0x1f9);
        }
      }
    }
    return _0x51cee3(0x1c6);
  }),
  (Window_EquipCommand['prototype'][_0x412469(0x355)] = function (_0x3c26e8) {
    const _0x31036a = _0x412469,
      _0x21d2cc = this[_0x31036a(0x2a6)](_0x3c26e8),
      _0x44d884 = this[_0x31036a(0x53e)](_0x3c26e8),
      _0x21d94e = this[_0x31036a(0x235)](_0x44d884)['width'];
    this['changePaintOpacity'](this['isCommandEnabled'](_0x3c26e8));
    const _0x43be35 = this[_0x31036a(0x5c2)]();
    if (_0x43be35 === _0x31036a(0x264)) this['drawTextEx'](_0x44d884, _0x21d2cc['x'] + _0x21d2cc[_0x31036a(0x2fa)] - _0x21d94e, _0x21d2cc['y'], _0x21d94e);
    else {
      if (_0x43be35 === _0x31036a(0x4ce)) {
        const _0x174abc = _0x21d2cc['x'] + Math['floor']((_0x21d2cc[_0x31036a(0x2fa)] - _0x21d94e) / 0x2);
        this[_0x31036a(0x2a3)](_0x44d884, _0x174abc, _0x21d2cc['y'], _0x21d94e);
      } else this[_0x31036a(0x2a3)](_0x44d884, _0x21d2cc['x'], _0x21d2cc['y'], _0x21d94e);
    }
  }),
  (Window_EquipCommand[_0x412469(0x331)][_0x412469(0x2c6)] = function (_0x56ab37) {
    const _0x45384f = _0x412469;
    this['commandName'](_0x56ab37)[_0x45384f(0x512)](/\\I\[(\d+)\]/i);
    const _0x543837 = Number(RegExp['$1']) || 0x0,
      _0x245109 = this['itemLineRect'](_0x56ab37),
      _0x2a94c7 = _0x245109['x'] + Math[_0x45384f(0x44d)]((_0x245109['width'] - ImageManager[_0x45384f(0x52b)]) / 0x2),
      _0x14ad48 = _0x245109['y'] + (_0x245109[_0x45384f(0x563)] - ImageManager[_0x45384f(0x2ee)]) / 0x2;
    this[_0x45384f(0x2fc)](_0x543837, _0x2a94c7, _0x14ad48);
  }),
  (Window_EquipCommand['prototype'][_0x412469(0x4b6)] = function () {
    const _0x3df7b1 = _0x412469,
      _0x4e2d08 = SceneManager[_0x3df7b1(0x464)];
    if (_0x4e2d08 && _0x4e2d08[_0x3df7b1(0x25d)]) return _0x4e2d08[_0x3df7b1(0x25d)]();
    return null;
  }),
  (Window_EquipCommand['prototype'][_0x412469(0x267)] = function () {
    const _0x59619d = _0x412469;
    Window_Command[_0x59619d(0x331)][_0x59619d(0x267)][_0x59619d(0x575)](this), this[_0x59619d(0x4f3)][_0x59619d(0x39a)](this[_0x59619d(0x254)]());
  }),
  (Window_EquipCommand[_0x412469(0x331)]['helpDescriptionText'] = function () {
    const _0x1ef8f7 = _0x412469,
      _0x474827 = this[_0x1ef8f7(0x1e4)]();
    switch (_0x474827) {
      case _0x1ef8f7(0x21d):
        return TextManager[_0x1ef8f7(0x206)][_0x1ef8f7(0x4d0)][_0x1ef8f7(0x21d)];
      case _0x1ef8f7(0x4a0):
        return TextManager[_0x1ef8f7(0x206)][_0x1ef8f7(0x4d0)]['optimize'];
      case 'clear':
        return TextManager['ITEMS_EQUIPS_CORE'][_0x1ef8f7(0x4d0)]['clear'];
      default:
        return '';
    }
  }),
  (Window_EquipSlot['prototype']['isUseModernControls'] = function () {
    const _0x68ce8 = _0x412469;
    return Imported[_0x68ce8(0x308)] && Window_HorzCommand[_0x68ce8(0x331)][_0x68ce8(0x4fa)]['call'](this);
  }),
  (Window_EquipSlot[_0x412469(0x331)][_0x412469(0x442)] = function () {
    const _0x114fc5 = _0x412469;
    Window_StatusBase[_0x114fc5(0x331)][_0x114fc5(0x442)][_0x114fc5(0x575)](this), this[_0x114fc5(0x334)]();
  }),
  (Window_EquipSlot[_0x412469(0x331)][_0x412469(0x1f3)] = function () {
    const _0x4f9d8c = _0x412469;
    Window_StatusBase['prototype']['processCursorMove'][_0x4f9d8c(0x575)](this), this[_0x4f9d8c(0x402)]();
  }),
  (Window_EquipSlot[_0x412469(0x331)]['checkShiftRemoveShortcut'] = function () {
    const _0xfd5937 = _0x412469;
    if (!this['isShiftRemoveShortcutEnabled']()) return;
    if (Input[_0xfd5937(0x27e)](_0xfd5937(0x40e)) && this[_0xfd5937(0x3e7)]()) {
      const _0x2b4396 = SceneManager['_scene'][_0xfd5937(0x3f3)];
      _0x2b4396 && (this[_0xfd5937(0x3f1)](this['index']()) ? (this[_0xfd5937(0x4ea)](), this[_0xfd5937(0x267)]()) : this['playBuzzerSound']());
    }
  }),
  (Window_EquipSlot[_0x412469(0x331)][_0x412469(0x3f1)] = function (_0x10d8a1) {
    const _0x328e4c = _0x412469,
      _0x2c82c8 = SceneManager['_scene']['_actor'];
    if (!_0x2c82c8) return;
    if (!_0x2c82c8[_0x328e4c(0x421)](_0x10d8a1)) return ![];
    const _0x1f7bdb = _0x2c82c8['equipSlots']()[_0x10d8a1];
    if (_0x2c82c8[_0x328e4c(0x3dc)]()[_0x328e4c(0x5a9)](_0x1f7bdb)) return ![];
    return !![];
  }),
  (Window_EquipSlot['prototype'][_0x412469(0x4ea)] = function () {
    const _0x59c695 = _0x412469;
    SoundManager[_0x59c695(0x3c1)]();
    const _0x5728c5 = SceneManager['_scene']['_actor'];
    _0x5728c5[_0x59c695(0x1d7)](this[_0x59c695(0x548)](), null), this['refresh'](), this['_itemWindow'][_0x59c695(0x1f2)](), this[_0x59c695(0x334)]();
    const _0x55f45e = SceneManager[_0x59c695(0x464)]['_statusWindow'];
    if (_0x55f45e) _0x55f45e[_0x59c695(0x1f2)]();
  }),
  (Window_EquipSlot[_0x412469(0x331)][_0x412469(0x328)] = function () {
    const _0x3295cb = _0x412469;
    if (!this[_0x3295cb(0x580)]) return ![];
    if (!VisuMZ[_0x3295cb(0x215)][_0x3295cb(0x55e)]['EquipScene']['ShiftShortcutKey']) return ![];
    return !![];
  }),
  (Window_EquipSlot[_0x412469(0x331)]['processCursorMoveModernControls'] = function () {
    const _0x1baa55 = _0x412469;
    !this[_0x1baa55(0x3d0)]() && Window_StatusBase[_0x1baa55(0x331)][_0x1baa55(0x566)][_0x1baa55(0x575)](this);
  }),
  (Window_EquipSlot[_0x412469(0x331)][_0x412469(0x3d0)] = function () {
    const _0x2a5a08 = _0x412469;
    if (!this['isCursorMovable']()) return ![];
    if (SceneManager[_0x2a5a08(0x464)][_0x2a5a08(0x336)] !== Scene_Equip) return ![];
    if (this['allowCommandWindowCursorUp']()) return this[_0x2a5a08(0x1a8)](), Input['clear'](), SceneManager[_0x2a5a08(0x464)][_0x2a5a08(0x45e)](), ![];
    else {
      if (Input['isRepeated'](_0x2a5a08(0x409))) {
        const _0x4ce77c = this[_0x2a5a08(0x548)]();
        return (
          Input['isPressed']('shift') ? this[_0x2a5a08(0x2a0)]() : this[_0x2a5a08(0x2ac)](Input['isTriggered'](_0x2a5a08(0x409))),
          this[_0x2a5a08(0x548)]() !== _0x4ce77c && this['playCursorSound'](),
          !![]
        );
      } else {
        if (this[_0x2a5a08(0x1d0)]() && Input[_0x2a5a08(0x27e)](_0x2a5a08(0x40e))) return !![];
      }
    }
    return ![];
  }),
  (Window_EquipSlot[_0x412469(0x331)]['allowCommandWindowCursorUp'] = function () {
    const _0x399d57 = _0x412469;
    if (this[_0x399d57(0x548)]() !== 0x0) return ![];
    const _0x246215 = VisuMZ['ItemsEquipsCore'][_0x399d57(0x55e)]['EquipScene'];
    if (!_0x246215['CommandAddOptimize'] && !_0x246215[_0x399d57(0x1ff)]) return ![];
    return Input[_0x399d57(0x27e)]('up');
  }),
  (Window_EquipSlot['prototype'][_0x412469(0x1d0)] = function () {
    const _0x1e5aa1 = _0x412469;
    return VisuMZ[_0x1e5aa1(0x215)][_0x1e5aa1(0x55e)][_0x1e5aa1(0x2d7)][_0x1e5aa1(0x5a3)];
  }),
  (Window_EquipSlot[_0x412469(0x331)][_0x412469(0x430)] = function () {
    const _0x361d7a = _0x412469;
    if (this['isOpen']() && this[_0x361d7a(0x1b9)] && SceneManager[_0x361d7a(0x464)][_0x361d7a(0x336)] === Scene_Equip) {
      if (this[_0x361d7a(0x4af)]() && TouchInput[_0x361d7a(0x352)]()) this['onTouchSelectModernControls'](![]);
      else TouchInput[_0x361d7a(0x27e)]() && this[_0x361d7a(0x1fa)](!![]);
      if (TouchInput[_0x361d7a(0x434)]()) this[_0x361d7a(0x28e)]();
      else {
        if (TouchInput[_0x361d7a(0x543)]()) {
          const _0x3f73b1 = VisuMZ[_0x361d7a(0x215)]['Settings'][_0x361d7a(0x2d7)];
          this['isUseModernControls']() && this[_0x361d7a(0x580)] && !_0x3f73b1[_0x361d7a(0x37e)] && !_0x3f73b1[_0x361d7a(0x1ff)]
            ? (SoundManager[_0x361d7a(0x3a8)](), SceneManager[_0x361d7a(0x506)]())
            : this[_0x361d7a(0x265)]();
        }
      }
    }
  }),
  (Window_EquipSlot[_0x412469(0x331)][_0x412469(0x1fa)] = function (_0xf5ec79) {
    const _0x3a9601 = _0x412469;
    this['_doubleTouch'] = ![];
    const _0x5d59b1 = this[_0x3a9601(0x548)](),
      _0x4e730c = this['hitIndex'](),
      _0x4e1d83 = SceneManager['_scene'][_0x3a9601(0x4ed)];
    if (_0x4e1d83[_0x3a9601(0x49e)]() && _0x4e1d83[_0x3a9601(0x1b9)]) {
      if (_0x4e730c >= 0x0) _0x4e730c === this[_0x3a9601(0x548)]() && (this[_0x3a9601(0x4bb)] = !![]), this[_0x3a9601(0x442)](), this[_0x3a9601(0x30e)](_0x4e730c), _0x4e1d83[_0x3a9601(0x43b)]();
      else _0x4e1d83[_0x3a9601(0x5e7)]() >= 0x0 && (this['deactivate'](), this['deselect'](), _0x4e1d83[_0x3a9601(0x442)]());
    }
    _0xf5ec79 && this[_0x3a9601(0x548)]() !== _0x5d59b1 && this[_0x3a9601(0x1a8)]();
  }),
  (Window_EquipSlot[_0x412469(0x331)][_0x412469(0x280)] = function () {
    return this['index']();
  }),
  (VisuMZ[_0x412469(0x215)][_0x412469(0x4a6)] = Window_EquipSlot[_0x412469(0x331)][_0x412469(0x50d)]),
  (Window_EquipSlot[_0x412469(0x331)][_0x412469(0x50d)] = function (_0x587e47) {
    const _0x27e8c3 = _0x412469;
    if (this['maxItems']() <= 0x0) return ![];
    return VisuMZ[_0x27e8c3(0x215)][_0x27e8c3(0x4a6)][_0x27e8c3(0x575)](this, _0x587e47);
  }),
  (VisuMZ['ItemsEquipsCore'][_0x412469(0x248)] = Window_EquipItem[_0x412469(0x331)]['includes']),
  (Window_EquipItem[_0x412469(0x331)][_0x412469(0x5a9)] = function (_0x5d598e) {
    const _0x13e749 = _0x412469;
    if (_0x5d598e === null && this[_0x13e749(0x3dc)]()[_0x13e749(0x5a9)](this[_0x13e749(0x49f)]())) return ![];
    else {
      $gameTemp['_checkEquipRequirements'] = !![];
      let _0x6f7389 = VisuMZ[_0x13e749(0x215)][_0x13e749(0x248)][_0x13e749(0x575)](this, _0x5d598e);
      if (!_0x6f7389 && _0x5d598e && DataManager[_0x13e749(0x429)](_0x5d598e)) {
        const _0x36c17a = _0x5d598e[_0x13e749(0x1d9)] || 0x0;
        if (this['_actor'] && this[_0x13e749(0x3f3)][_0x13e749(0x228)](_0x36c17a)) {
          const _0x3b3d01 = DataManager[_0x13e749(0x23f)](_0x5d598e);
          _0x3b3d01[_0x13e749(0x5a9)](this[_0x13e749(0x49f)]()) && (_0x6f7389 = !![]);
        }
      }
      return ($gameTemp['_checkEquipRequirements'] = undefined), _0x6f7389;
    }
  }),
  (VisuMZ[_0x412469(0x215)][_0x412469(0x3cb)] = Window_EquipItem[_0x412469(0x331)][_0x412469(0x50d)]),
  (Window_EquipItem[_0x412469(0x331)][_0x412469(0x50d)] = function (_0x26f740) {
    const _0xdbb685 = _0x412469;
    if (_0x26f740 && this['_actor']) {
      if (this[_0xdbb685(0x4eb)](_0x26f740)) return ![];
      if (this['isSoleWeaponType'](_0x26f740)) return ![];
      if (this[_0xdbb685(0x35b)](_0x26f740)) return ![];
      if (!this['_actor']['canEquip'](_0x26f740)) return ![];
    }
    if (!_0x26f740) return !this[_0xdbb685(0x3dc)]()[_0xdbb685(0x5a9)](this[_0xdbb685(0x49f)]());
    return VisuMZ[_0xdbb685(0x215)][_0xdbb685(0x3cb)][_0xdbb685(0x575)](this, _0x26f740);
  }),
  (Window_EquipItem[_0x412469(0x331)][_0x412469(0x4eb)] = function (_0x16a1c7) {
    const _0x4a73f8 = _0x412469,
      _0x22feea = _0x16a1c7[_0x4a73f8(0x5a7)];
    if (_0x22feea[_0x4a73f8(0x512)](/<EQUIP COPY LIMIT:[ ](\d+)>/i)) {
      const _0x51ce63 = Number(RegExp['$1']) || 0x1;
      let _0x515a48 = 0x0;
      const _0x5a5494 = this[_0x4a73f8(0x3f3)][_0x4a73f8(0x547)](),
        _0x2e39e2 = SceneManager['_scene'][_0x4a73f8(0x50e)][_0x4a73f8(0x280)]();
      _0x5a5494[_0x2e39e2] = null;
      for (const _0x41bbb7 of _0x5a5494) {
        if (!_0x41bbb7) continue;
        if (DataManager[_0x4a73f8(0x32f)](_0x16a1c7) === DataManager[_0x4a73f8(0x32f)](_0x41bbb7)) {
          if (_0x16a1c7['id'] === _0x41bbb7['id']) _0x515a48 += 0x1;
        }
      }
      return _0x515a48 >= _0x51ce63;
    } else return ![];
  }),
  (Window_EquipItem['prototype'][_0x412469(0x256)] = function (_0xf7fd3d) {
    const _0x70bf53 = _0x412469;
    if (!DataManager[_0x70bf53(0x32f)](_0xf7fd3d)) return ![];
    const _0x48629c = /<EQUIP WEAPON TYPE LIMIT:[ ](\d+)>/i;
    let _0x5daa56 = 0x0;
    const _0x329e2b = this[_0x70bf53(0x3f3)][_0x70bf53(0x547)](),
      _0x20c4c2 = SceneManager[_0x70bf53(0x464)]['_slotWindow'][_0x70bf53(0x280)]();
    _0x329e2b[_0x20c4c2] = null;
    for (const _0x17b792 of _0x329e2b) {
      if (!_0x17b792) continue;
      if (!DataManager[_0x70bf53(0x32f)](_0x17b792)) continue;
      if (_0xf7fd3d[_0x70bf53(0x288)] === _0x17b792[_0x70bf53(0x288)]) {
        _0x5daa56 += 0x1;
        if (_0xf7fd3d['note'][_0x70bf53(0x512)](_0x48629c)) {
          const _0x10eb76 = Number(RegExp['$1']) || 0x1;
          if (_0x5daa56 >= _0x10eb76) return !![];
        }
        if (_0x17b792[_0x70bf53(0x5a7)]['match'](_0x48629c)) {
          const _0xe71598 = Number(RegExp['$1']) || 0x1;
          if (_0x5daa56 >= _0xe71598) return !![];
        }
      }
    }
    return ![];
  }),
  (Window_EquipItem[_0x412469(0x331)][_0x412469(0x35b)] = function (_0xd88d88) {
    const _0x5981b9 = _0x412469;
    if (!DataManager[_0x5981b9(0x429)](_0xd88d88)) return ![];
    const _0x519863 = /<EQUIP ARMOR TYPE LIMIT:[ ](\d+)>/i;
    let _0x403860 = 0x0;
    const _0x16183c = this['_actor']['equips'](),
      _0x32b602 = SceneManager[_0x5981b9(0x464)]['_slotWindow'][_0x5981b9(0x280)]();
    _0x16183c[_0x32b602] = null;
    for (const _0x14f1c1 of _0x16183c) {
      if (!_0x14f1c1) continue;
      if (!DataManager[_0x5981b9(0x429)](_0x14f1c1)) continue;
      if (_0xd88d88['atypeId'] === _0x14f1c1[_0x5981b9(0x1d9)]) {
        _0x403860 += 0x1;
        if (_0xd88d88['note'][_0x5981b9(0x512)](_0x519863)) {
          const _0x2d0da8 = Number(RegExp['$1']) || 0x1;
          if (_0x403860 >= _0x2d0da8) return !![];
        }
        if (_0x14f1c1[_0x5981b9(0x5a7)][_0x5981b9(0x512)](_0x519863)) {
          const _0x277f69 = Number(RegExp['$1']) || 0x1;
          if (_0x403860 >= _0x277f69) return !![];
        }
      }
    }
    return ![];
  }),
  (Window_EquipItem['prototype']['nonRemovableEtypes'] = function () {
    const _0x364d2f = _0x412469;
    return VisuMZ[_0x364d2f(0x215)]['Settings'][_0x364d2f(0x2d7)][_0x364d2f(0x3f7)];
  }),
  (Window_EquipItem[_0x412469(0x331)]['drawItem'] = function (_0x1f7933) {
    const _0x2ec2b3 = _0x412469,
      _0x3c6b27 = this[_0x2ec2b3(0x238)](_0x1f7933);
    _0x3c6b27 ? Window_ItemList[_0x2ec2b3(0x331)][_0x2ec2b3(0x484)]['call'](this, _0x1f7933) : this[_0x2ec2b3(0x2f4)](_0x1f7933);
  }),
  (Window_EquipItem[_0x412469(0x331)][_0x412469(0x2f4)] = function (_0xa4ff2d) {
    const _0x113d8c = _0x412469;
    this['changePaintOpacity'](this[_0x113d8c(0x50d)](null));
    const _0x32c223 = VisuMZ[_0x113d8c(0x215)][_0x113d8c(0x55e)][_0x113d8c(0x2d7)],
      _0xe99e89 = this[_0x113d8c(0x2a6)](_0xa4ff2d),
      _0x46cf5a = _0xe99e89['y'] + (this['lineHeight']() - ImageManager[_0x113d8c(0x2ee)]) / 0x2,
      _0x5c0747 = ImageManager[_0x113d8c(0x52b)] + 0x4,
      _0x179f67 = Math[_0x113d8c(0x261)](0x0, _0xe99e89[_0x113d8c(0x2fa)] - _0x5c0747);
    this[_0x113d8c(0x1ca)](),
      this[_0x113d8c(0x2fc)](_0x32c223[_0x113d8c(0x509)], _0xe99e89['x'], _0x46cf5a),
      this[_0x113d8c(0x5f1)](_0x32c223['RemoveEquipText'], _0xe99e89['x'] + _0x5c0747, _0xe99e89['y'], _0x179f67),
      this[_0x113d8c(0x2e7)](!![]);
  }),
  (Window_EquipItem[_0x412469(0x331)][_0x412469(0x267)] = function () {
    const _0x3df5fd = _0x412469;
    Window_ItemList[_0x3df5fd(0x331)]['updateHelp'][_0x3df5fd(0x575)](this);
    if (this[_0x3df5fd(0x3f3)] && this[_0x3df5fd(0x36d)] && this[_0x3df5fd(0x399)] >= 0x0) {
      const _0xf74df1 = JsonEx[_0x3df5fd(0x42b)](this['_actor']);
      (_0xf74df1[_0x3df5fd(0x239)] = !![]), _0xf74df1[_0x3df5fd(0x58f)](this[_0x3df5fd(0x399)], this[_0x3df5fd(0x3e7)]()), this[_0x3df5fd(0x36d)]['setTempActor'](_0xf74df1);
    }
  }),
  (VisuMZ[_0x412469(0x215)][_0x412469(0x5b6)] = Window_ShopCommand[_0x412469(0x331)][_0x412469(0x268)]),
  (Window_ShopCommand[_0x412469(0x331)]['initialize'] = function (_0xc40d21) {
    const _0x2c49c6 = _0x412469;
    VisuMZ['ItemsEquipsCore'][_0x2c49c6(0x5b6)][_0x2c49c6(0x575)](this, _0xc40d21), this[_0x2c49c6(0x4c5)](_0xc40d21);
  }),
  (Window_ShopCommand['prototype'][_0x412469(0x4c5)] = function (_0x5601d5) {
    const _0x4ae9c7 = _0x412469,
      _0x43eec2 = new Rectangle(0x0, 0x0, _0x5601d5['width'], _0x5601d5[_0x4ae9c7(0x563)]);
    (this[_0x4ae9c7(0x47b)] = new Window_Base(_0x43eec2)), (this[_0x4ae9c7(0x47b)][_0x4ae9c7(0x3a4)] = 0x0), this[_0x4ae9c7(0x4a8)](this[_0x4ae9c7(0x47b)]), this[_0x4ae9c7(0x208)]();
  }),
  (Window_ShopCommand[_0x412469(0x331)][_0x412469(0x334)] = function () {
    const _0x523462 = _0x412469;
    Window_HorzCommand['prototype'][_0x523462(0x334)]['call'](this);
    if (this[_0x523462(0x47b)]) this['updateCommandNameWindow']();
  }),
  (Window_ShopCommand[_0x412469(0x331)]['updateCommandNameWindow'] = function () {
    const _0x1d4e0c = _0x412469,
      _0x2dc170 = this[_0x1d4e0c(0x47b)];
    _0x2dc170[_0x1d4e0c(0x468)][_0x1d4e0c(0x2e4)]();
    const _0x6f10cc = this[_0x1d4e0c(0x218)](this['index']());
    if (_0x6f10cc === _0x1d4e0c(0x1f9)) {
      const _0x3946b9 = this[_0x1d4e0c(0x2a6)](this[_0x1d4e0c(0x548)]());
      let _0x2294a6 = this[_0x1d4e0c(0x53e)](this['index']());
      (_0x2294a6 = _0x2294a6[_0x1d4e0c(0x3c5)](/\\I\[(\d+)\]/gi, '')),
        _0x2dc170[_0x1d4e0c(0x2d0)](),
        this[_0x1d4e0c(0x24d)](_0x2294a6, _0x3946b9),
        this[_0x1d4e0c(0x5ba)](_0x2294a6, _0x3946b9),
        this[_0x1d4e0c(0x5ce)](_0x2294a6, _0x3946b9);
    }
  }),
  (Window_ShopCommand['prototype'][_0x412469(0x24d)] = function (_0x4e8faf, _0x30251e) {}),
  (Window_ShopCommand[_0x412469(0x331)][_0x412469(0x5ba)] = function (_0x35e47c, _0x36b2b8) {
    const _0x38de0d = _0x412469,
      _0x45dc3d = this['_commandNameWindow'];
    _0x45dc3d[_0x38de0d(0x5f1)](_0x35e47c, 0x0, _0x36b2b8['y'], _0x45dc3d[_0x38de0d(0x25c)], _0x38de0d(0x4ce));
  }),
  (Window_ShopCommand[_0x412469(0x331)][_0x412469(0x5ce)] = function (_0x139385, _0x511a52) {
    const _0x30f40c = _0x412469,
      _0x2bdd43 = this[_0x30f40c(0x47b)],
      _0x397cf0 = $gameSystem[_0x30f40c(0x41d)](),
      _0x3c8561 = _0x511a52['x'] + Math['floor'](_0x511a52[_0x30f40c(0x2fa)] / 0x2) + _0x397cf0;
    (_0x2bdd43['x'] = _0x2bdd43[_0x30f40c(0x2fa)] / -0x2 + _0x3c8561), (_0x2bdd43['y'] = Math['floor'](_0x511a52[_0x30f40c(0x563)] / 0x2));
  }),
  (Window_ShopCommand[_0x412469(0x331)]['maxCols'] = function () {
    const _0x24b267 = _0x412469;
    return this[_0x24b267(0x48e)] ? this[_0x24b267(0x48e)][_0x24b267(0x1ec)] : 0x3;
  }),
  (Window_ShopCommand[_0x412469(0x331)][_0x412469(0x537)] = function () {
    const _0x351039 = _0x412469;
    return VisuMZ['ItemsEquipsCore']['Settings']['ShopScene'][_0x351039(0x266)];
  }),
  (Window_ShopCommand[_0x412469(0x331)][_0x412469(0x214)] = function () {
    const _0x4171a7 = _0x412469;
    this['addBuyCommand'](), this[_0x4171a7(0x424)](), this[_0x4171a7(0x335)]();
  }),
  (Window_ShopCommand[_0x412469(0x331)][_0x412469(0x1f2)] = function () {
    const _0x15f97c = _0x412469;
    Window_HorzCommand[_0x15f97c(0x331)]['refresh'][_0x15f97c(0x575)](this), this[_0x15f97c(0x579)]();
  }),
  (Window_ShopCommand[_0x412469(0x331)][_0x412469(0x4c3)] = function () {
    const _0x56d3db = _0x412469,
      _0x43ee6d = this[_0x56d3db(0x3b6)](),
      _0x453eb8 = VisuMZ[_0x56d3db(0x215)][_0x56d3db(0x55e)][_0x56d3db(0x4e7)][_0x56d3db(0x28c)],
      _0x41c08d = _0x43ee6d === _0x56d3db(0x1c6) ? TextManager[_0x56d3db(0x3f5)] : _0x56d3db(0x5cd)['format'](_0x453eb8, TextManager[_0x56d3db(0x3f5)]),
      _0x458092 = this['isBuyCommandEnabled']();
    if (this[_0x56d3db(0x537)]() && !_0x458092) return;
    this[_0x56d3db(0x5a2)](_0x41c08d, 'buy', _0x458092);
  }),
  (Window_ShopCommand[_0x412469(0x331)][_0x412469(0x534)] = function () {
    const _0x287416 = _0x412469;
    return SceneManager[_0x287416(0x464)][_0x287416(0x336)] === Scene_Shop ? SceneManager['_scene'][_0x287416(0x202)] > 0x0 : !![];
  }),
  (Window_ShopCommand[_0x412469(0x331)]['addSellCommand'] = function () {
    const _0x44a2b2 = _0x412469,
      _0xe61825 = this[_0x44a2b2(0x3b6)](),
      _0x2edf65 = VisuMZ['ItemsEquipsCore'][_0x44a2b2(0x55e)][_0x44a2b2(0x4e7)][_0x44a2b2(0x52a)],
      _0x1b5a13 = _0xe61825 === 'text' ? TextManager[_0x44a2b2(0x27c)] : _0x44a2b2(0x5cd)[_0x44a2b2(0x32c)](_0x2edf65, TextManager[_0x44a2b2(0x27c)]),
      _0x1201e4 = this[_0x44a2b2(0x446)]();
    if (this[_0x44a2b2(0x537)]() && !_0x1201e4) return;
    this[_0x44a2b2(0x5a2)](_0x1b5a13, _0x44a2b2(0x27c), _0x1201e4);
  }),
  (Window_ShopCommand['prototype'][_0x412469(0x446)] = function () {
    return !this['_purchaseOnly'];
  }),
  (Window_ShopCommand[_0x412469(0x331)][_0x412469(0x335)] = function () {
    const _0x477ae3 = _0x412469,
      _0x469dd4 = this[_0x477ae3(0x3b6)](),
      _0x10484a = VisuMZ[_0x477ae3(0x215)][_0x477ae3(0x55e)][_0x477ae3(0x4e7)][_0x477ae3(0x445)],
      _0x26b2dc = VisuMZ[_0x477ae3(0x215)][_0x477ae3(0x55e)][_0x477ae3(0x4e7)][_0x477ae3(0x453)],
      _0x3f0993 = _0x469dd4 === 'text' ? _0x26b2dc : _0x477ae3(0x5cd)['format'](_0x10484a, _0x26b2dc);
    this['addCommand'](_0x3f0993, _0x477ae3(0x519));
  }),
  (Window_ShopCommand[_0x412469(0x331)]['itemTextAlign'] = function () {
    const _0x13daaf = _0x412469;
    return VisuMZ[_0x13daaf(0x215)][_0x13daaf(0x55e)][_0x13daaf(0x4e7)][_0x13daaf(0x3e9)];
  }),
  (Window_ShopCommand[_0x412469(0x331)][_0x412469(0x484)] = function (_0x5195b2) {
    const _0x58feec = _0x412469,
      _0x50cdfa = this['commandStyleCheck'](_0x5195b2);
    if (_0x50cdfa === _0x58feec(0x35e)) this[_0x58feec(0x355)](_0x5195b2);
    else _0x50cdfa === _0x58feec(0x1f9) ? this[_0x58feec(0x2c6)](_0x5195b2) : Window_HorzCommand[_0x58feec(0x331)]['drawItem'][_0x58feec(0x575)](this, _0x5195b2);
  }),
  (Window_ShopCommand[_0x412469(0x331)][_0x412469(0x3b6)] = function () {
    const _0x2a7470 = _0x412469;
    return VisuMZ[_0x2a7470(0x215)]['Settings'][_0x2a7470(0x4e7)][_0x2a7470(0x43e)];
  }),
  (Window_ShopCommand['prototype']['commandStyleCheck'] = function (_0x22f36e) {
    const _0x4d7082 = _0x412469;
    if (_0x22f36e < 0x0) return 'text';
    const _0x2e2805 = this['commandStyle']();
    if (_0x2e2805 !== 'auto') return _0x2e2805;
    else {
      if (this[_0x4d7082(0x515)]() > 0x0) {
        const _0x47d9e4 = this[_0x4d7082(0x53e)](_0x22f36e);
        if (_0x47d9e4[_0x4d7082(0x512)](/\\I\[(\d+)\]/i)) {
          const _0x20051f = this[_0x4d7082(0x2a6)](_0x22f36e),
            _0x4619a8 = this[_0x4d7082(0x235)](_0x47d9e4)[_0x4d7082(0x2fa)];
          return _0x4619a8 <= _0x20051f[_0x4d7082(0x2fa)] ? _0x4d7082(0x35e) : _0x4d7082(0x1f9);
        }
      }
    }
    return _0x4d7082(0x1c6);
  }),
  (Window_ShopCommand[_0x412469(0x331)][_0x412469(0x355)] = function (_0x3a8964) {
    const _0x507ff8 = _0x412469,
      _0xfe86a6 = this['itemLineRect'](_0x3a8964),
      _0x360e35 = this[_0x507ff8(0x53e)](_0x3a8964),
      _0x5ecfe1 = this[_0x507ff8(0x235)](_0x360e35)['width'];
    this[_0x507ff8(0x2e7)](this[_0x507ff8(0x4fe)](_0x3a8964));
    const _0x3a5832 = this[_0x507ff8(0x5c2)]();
    if (_0x3a5832 === 'right') this['drawTextEx'](_0x360e35, _0xfe86a6['x'] + _0xfe86a6[_0x507ff8(0x2fa)] - _0x5ecfe1, _0xfe86a6['y'], _0x5ecfe1);
    else {
      if (_0x3a5832 === 'center') {
        const _0x2ebc47 = _0xfe86a6['x'] + Math[_0x507ff8(0x44d)]((_0xfe86a6['width'] - _0x5ecfe1) / 0x2);
        this[_0x507ff8(0x2a3)](_0x360e35, _0x2ebc47, _0xfe86a6['y'], _0x5ecfe1);
      } else this[_0x507ff8(0x2a3)](_0x360e35, _0xfe86a6['x'], _0xfe86a6['y'], _0x5ecfe1);
    }
  }),
  (Window_ShopCommand['prototype'][_0x412469(0x2c6)] = function (_0x2dcee6) {
    const _0x2e2b1a = _0x412469;
    this[_0x2e2b1a(0x53e)](_0x2dcee6)[_0x2e2b1a(0x512)](/\\I\[(\d+)\]/i);
    const _0x12df31 = Number(RegExp['$1']) || 0x0,
      _0x596df0 = this[_0x2e2b1a(0x2a6)](_0x2dcee6),
      _0x253809 = _0x596df0['x'] + Math[_0x2e2b1a(0x44d)]((_0x596df0[_0x2e2b1a(0x2fa)] - ImageManager['iconWidth']) / 0x2),
      _0x2fbe52 = _0x596df0['y'] + (_0x596df0['height'] - ImageManager['iconHeight']) / 0x2;
    this[_0x2e2b1a(0x2fc)](_0x12df31, _0x253809, _0x2fbe52);
  }),
  (VisuMZ[_0x412469(0x215)][_0x412469(0x2bc)] = Window_ShopBuy[_0x412469(0x331)][_0x412469(0x1f2)]),
  (Window_ShopBuy['prototype'][_0x412469(0x1f2)] = function () {
    const _0xf4aebc = _0x412469;
    this[_0xf4aebc(0x599)](), VisuMZ[_0xf4aebc(0x215)][_0xf4aebc(0x2bc)][_0xf4aebc(0x575)](this);
  }),
  (Window_ShopBuy[_0x412469(0x331)][_0x412469(0x599)] = function () {
    const _0x46e4b1 = _0x412469;
    SceneManager[_0x46e4b1(0x464)][_0x46e4b1(0x336)] === Scene_Shop && (this['_money'] = SceneManager[_0x46e4b1(0x464)]['money']());
  }),
  (VisuMZ[_0x412469(0x215)]['Window_ShopBuy_price'] = Window_ShopBuy[_0x412469(0x331)][_0x412469(0x59b)]),
  (Window_ShopBuy['prototype'][_0x412469(0x59b)] = function (_0x14953b) {
    const _0x318f95 = _0x412469;
    if (!_0x14953b) return 0x0;
    let _0x18fe9f = VisuMZ[_0x318f95(0x215)][_0x318f95(0x5b3)][_0x318f95(0x575)](this, _0x14953b);
    return Math[_0x318f95(0x261)](0x0, this[_0x318f95(0x4e3)](_0x14953b, _0x18fe9f));
  }),
  (Window_ShopBuy[_0x412469(0x331)][_0x412469(0x4e3)] = function (_0x134dc2, _0x4f8999) {
    const _0x5c826e = _0x412469,
      _0x5a0960 = _0x134dc2[_0x5c826e(0x5a7)] || '';
    if (_0x5a0960[_0x5c826e(0x512)](/<JS BUY PRICE>\s*([\s\S]*)\s*<\/JS BUY PRICE>/i)) {
      const _0x4d06b1 = String(RegExp['$1']);
      (window[_0x5c826e(0x59b)] = _0x4f8999), (window[_0x5c826e(0x3e7)] = _0x134dc2);
      try {
        eval(_0x4d06b1);
      } catch (_0x3d2a23) {
        if ($gameTemp[_0x5c826e(0x362)]()) console['log'](_0x3d2a23);
      }
      (_0x4f8999 = window[_0x5c826e(0x59b)]), (window[_0x5c826e(0x59b)] = undefined), (window[_0x5c826e(0x3e7)] = undefined);
    }
    _0x4f8999 = VisuMZ['ItemsEquipsCore']['Settings']['ShopScene']['BuyPriceJS'][_0x5c826e(0x575)](this, _0x134dc2, _0x4f8999);
    if (isNaN(_0x4f8999)) _0x4f8999 = 0x0;
    return Math['floor'](_0x4f8999);
  }),
  (VisuMZ[_0x412469(0x215)][_0x412469(0x510)] = Window_ShopBuy['prototype'][_0x412469(0x20c)]),
  (Window_ShopBuy[_0x412469(0x331)][_0x412469(0x20c)] = function (_0x19dac2) {
    const _0x49a9d8 = _0x412469,
      _0x26b97d = VisuMZ[_0x49a9d8(0x215)][_0x49a9d8(0x510)][_0x49a9d8(0x575)](this, _0x19dac2);
    return _0x26b97d && !this[_0x49a9d8(0x51d)](_0x26b97d) ? null : _0x26b97d;
  }),
  (VisuMZ['ItemsEquipsCore'][_0x412469(0x5d9)] = {
    ShowAllSwitches: /<SHOW SHOP (?:ALL |)SWITCH(?:|ES):[ ](.*)>/i,
    ShowAnySwitches: /<SHOW SHOP ANY SWITCH(?:|ES):[ ](.*)>/i,
    HideAllSwitches: /<HIDE SHOP (?:ALL |)SWITCH(?:|ES):[ ](.*)>/i,
    HideAnySwitches: /<HIDE SHOP ANY SWITCH(?:|ES):[ ](.*)>/i,
    BuyTurnSwitchOn: /<BUY TURN ON SWITCH(?:|ES):[ ](.*)>/i,
    BuyTurnSwitchOff: /<BUY TURN OFF SWITCH(?:|ES):[ ](.*)>/i,
    SellTurnSwitchOn: /<SELL TURN ON SWITCH(?:|ES):[ ](.*)>/i,
    SellTurnSwitchOff: /<SELL TURN OFF SWITCH(?:|ES):[ ](.*)>/i,
  }),
  (Window_ShopBuy['prototype'][_0x412469(0x51d)] = function (_0xad4d1a) {
    const _0x2b5e4e = _0x412469;
    if (!_0xad4d1a) return ![];
    const _0xc946dd = VisuMZ[_0x2b5e4e(0x215)][_0x2b5e4e(0x5d9)],
      _0xbff47e = _0xad4d1a ? _0xad4d1a[_0x2b5e4e(0x5a7)] || '' : '';
    if (_0xbff47e[_0x2b5e4e(0x512)](_0xc946dd['ShowAllSwitches'])) {
      const _0x356cf0 = String(RegExp['$1'])
        ['split'](',')
        [_0x2b5e4e(0x54a)](_0x40a1ce => Number(_0x40a1ce));
      if (_0x356cf0[_0x2b5e4e(0x4c2)](_0xe3b11a => !$gameSwitches[_0x2b5e4e(0x5de)](_0xe3b11a))) return ![];
    }
    if (_0xbff47e[_0x2b5e4e(0x512)](_0xc946dd[_0x2b5e4e(0x2f0)])) {
      const _0x7bc525 = String(RegExp['$1'])
        [_0x2b5e4e(0x3de)](',')
        [_0x2b5e4e(0x54a)](_0x1d8783 => Number(_0x1d8783));
      if (_0x7bc525[_0x2b5e4e(0x49a)](_0x2501cc => !$gameSwitches[_0x2b5e4e(0x5de)](_0x2501cc))) return ![];
    }
    if (_0xbff47e['match'](_0xc946dd[_0x2b5e4e(0x498)])) {
      const _0x4322ca = String(RegExp['$1'])
        [_0x2b5e4e(0x3de)](',')
        [_0x2b5e4e(0x54a)](_0x4c0856 => Number(_0x4c0856));
      if (_0x4322ca['every'](_0x120334 => $gameSwitches['value'](_0x120334))) return ![];
    }
    if (_0xbff47e[_0x2b5e4e(0x512)](_0xc946dd[_0x2b5e4e(0x372)])) {
      const _0x3ae6d7 = String(RegExp['$1'])
        [_0x2b5e4e(0x3de)](',')
        [_0x2b5e4e(0x54a)](_0x9f39d9 => Number(_0x9f39d9));
      if (_0x3ae6d7[_0x2b5e4e(0x4c2)](_0x5bff3f => $gameSwitches['value'](_0x5bff3f))) return ![];
    }
    return !![];
  }),
  (Window_ShopBuy[_0x412469(0x331)][_0x412469(0x484)] = function (_0x5a1e94) {
    const _0x569f1e = _0x412469;
    this['resetFontSettings']();
    const _0x5112b9 = this['itemAt'](_0x5a1e94),
      _0x1e3a9a = this[_0x569f1e(0x2a6)](_0x5a1e94),
      _0x556223 = _0x1e3a9a['width'];
    this[_0x569f1e(0x2e7)](this[_0x569f1e(0x50d)](_0x5112b9)),
      this['drawItemName'](_0x5112b9, _0x1e3a9a['x'], _0x1e3a9a['y'], _0x556223),
      this[_0x569f1e(0x2ef)](_0x5112b9, _0x1e3a9a),
      this['changePaintOpacity'](!![]);
  }),
  (Window_ShopBuy[_0x412469(0x331)][_0x412469(0x2ef)] = function (_0x1ded08, _0x4c51a9) {
    const _0x519931 = _0x412469,
      _0x2db1f4 = this['price'](_0x1ded08);
    this['drawCurrencyValue'](_0x2db1f4, TextManager[_0x519931(0x219)], _0x4c51a9['x'], _0x4c51a9['y'], _0x4c51a9[_0x519931(0x2fa)]);
  }),
  (Window_ShopSell[_0x412469(0x331)][_0x412469(0x47d)] = function () {
    const _0x49f828 = _0x412469;
    return SceneManager[_0x49f828(0x464)]['isUseItemsEquipsCoreUpdatedLayout']() ? 0x1 : 0x2;
  }),
  (VisuMZ[_0x412469(0x215)][_0x412469(0x3da)] = Window_ShopSell['prototype'][_0x412469(0x50d)]),
  (Window_ShopSell[_0x412469(0x331)]['isEnabled'] = function (_0x5a155f) {
    const _0xbb8fce = _0x412469;
    if (!_0x5a155f) return ![];
    const _0xe94163 = _0x5a155f[_0xbb8fce(0x5a7)];
    if (_0xe94163['match'](/<CANNOT SELL>/i)) return ![];
    if (_0xe94163[_0xbb8fce(0x512)](/<CAN SELL>/i)) return !![];
    if (_0xe94163[_0xbb8fce(0x512)](/<CANNOT SELL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)) {
      const _0x20af22 = JSON[_0xbb8fce(0x1c4)]('[' + RegExp['$1']['match'](/\d+/g) + ']');
      for (const _0x38f232 of _0x20af22) {
        if (!$gameSwitches[_0xbb8fce(0x5de)](_0x38f232)) return ![];
      }
    }
    if (_0xe94163[_0xbb8fce(0x512)](/<CANNOT SELL ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)) {
      const _0x34c631 = JSON['parse']('[' + RegExp['$1']['match'](/\d+/g) + ']');
      for (const _0x31a3bb of _0x34c631) {
        if (!$gameSwitches['value'](_0x31a3bb)) return ![];
      }
    }
    if (_0xe94163[_0xbb8fce(0x512)](/<CANNOT SELL ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)) {
      const _0x407d00 = JSON[_0xbb8fce(0x1c4)]('[' + RegExp['$1']['match'](/\d+/g) + ']');
      for (const _0x241f51 of _0x407d00) {
        if ($gameSwitches[_0xbb8fce(0x5de)](_0x241f51)) return ![];
      }
    }
    return VisuMZ['ItemsEquipsCore'][_0xbb8fce(0x3da)][_0xbb8fce(0x575)](this, _0x5a155f);
  }),
  (Window_ShopStatus['EQUIP_DELAY_MS'] = VisuMZ[_0x412469(0x215)][_0x412469(0x55e)]['StatusWindow']['EquipDelayMS'] ?? 0xf0),
  (VisuMZ[_0x412469(0x215)][_0x412469(0x32d)] = Window_ShopStatus[_0x412469(0x331)][_0x412469(0x1a6)]),
  (Window_ShopStatus[_0x412469(0x331)]['setItem'] = function (_0x714ae7) {
    const _0x53fb1f = _0x412469;
    (_0x714ae7 = DataManager[_0x53fb1f(0x54f)](_0x714ae7)),
      DataManager['isWeapon'](_0x714ae7) || DataManager[_0x53fb1f(0x429)](_0x714ae7)
        ? this[_0x53fb1f(0x3bb)](_0x714ae7)
        : VisuMZ['ItemsEquipsCore'][_0x53fb1f(0x32d)][_0x53fb1f(0x575)](this, _0x714ae7);
  }),
  (Window_ShopStatus[_0x412469(0x331)][_0x412469(0x3bb)] = function (_0x3e951b) {
    const _0x427e45 = _0x412469;
    this['_item'] = _0x3e951b;
    const _0xa019ca = Window_ShopStatus[_0x427e45(0x1c1)];
    setTimeout(this['refreshDelay'][_0x427e45(0x3ec)](this, _0x3e951b), _0xa019ca);
  }),
  (Window_ShopStatus[_0x412469(0x331)]['refreshDelay'] = function (_0x27d28f) {
    const _0x373922 = _0x412469;
    this[_0x373922(0x4d5)] === _0x27d28f && this[_0x373922(0x1f2)]();
  }),
  (Window_ShopStatus[_0x412469(0x331)][_0x412469(0x1b3)] = function () {
    return ![];
  }),
  (Window_ShopStatus[_0x412469(0x331)][_0x412469(0x333)] = function () {
    const _0x39cc7c = _0x412469;
    Window_StatusBase[_0x39cc7c(0x331)][_0x39cc7c(0x333)][_0x39cc7c(0x575)](this);
    for (const _0x580e90 of $gameParty[_0x39cc7c(0x31d)]()) {
      ImageManager[_0x39cc7c(0x316)](_0x580e90['characterName']());
    }
  }),
  (Window_ShopStatus[_0x412469(0x331)][_0x412469(0x405)] = function () {
    const _0x2a59d2 = _0x412469;
    return VisuMZ['ItemsEquipsCore'][_0x2a59d2(0x55e)][_0x2a59d2(0x29f)][_0x2a59d2(0x382)];
  }),
  (Window_ShopStatus[_0x412469(0x331)][_0x412469(0x1f2)] = function () {
    const _0xf961df = _0x412469;
    this[_0xf961df(0x468)][_0xf961df(0x2e4)](),
      this[_0xf961df(0x35a)][_0xf961df(0x2e4)](),
      this['_item'] &&
        (this[_0xf961df(0x2d0)](), this[_0xf961df(0x2e7)](!![]), this[_0xf961df(0x2e2)](), this[_0xf961df(0x491)]() ? this['drawEquipData']() : this[_0xf961df(0x1b0)](), this[_0xf961df(0x5be)]());
  }),
  (Window_ShopStatus[_0x412469(0x331)][_0x412469(0x391)] = function (_0x37fe60, _0x3dadb5) {
    const _0x3c719f = _0x412469;
    if (!this[_0x3c719f(0x491)]() && !DataManager[_0x3c719f(0x28d)](this[_0x3c719f(0x4d5)])) return;
    const _0x30bc34 = this['innerWidth'] - this[_0x3c719f(0x1b6)]() - _0x37fe60,
      _0x52d5b3 = this[_0x3c719f(0x5ad)](_0x3c719f(0x567));
    this[_0x3c719f(0x45d)](ColorManager['systemColor']()),
      this[_0x3c719f(0x5f1)](TextManager[_0x3c719f(0x57e)], _0x37fe60 + this['itemPadding'](), _0x3dadb5, _0x30bc34 - _0x52d5b3),
      this[_0x3c719f(0x1ca)](),
      this[_0x3c719f(0x4ff)](this[_0x3c719f(0x4d5)], _0x37fe60, _0x3dadb5, _0x30bc34);
  }),
  (Window_ShopStatus[_0x412469(0x331)][_0x412469(0x50c)] = function (_0xd669b7, _0x3abf1e, _0x5e9028, _0x14a1d1, _0x2c88ca) {
    const _0x227abc = _0x412469;
    if (VisuMZ['ItemsEquipsCore']['Settings']['StatusWindow']['DrawBackRect'] === ![]) return;
    _0x2c88ca = Math[_0x227abc(0x261)](_0x2c88ca || 0x1, 0x1);
    while (_0x2c88ca--) {
      (_0x14a1d1 = _0x14a1d1 || this[_0x227abc(0x232)]()), (this['contentsBack'][_0x227abc(0x465)] = 0xa0);
      const _0x501067 = ColorManager['getItemsEquipsCoreBackColor1']();
      this['contentsBack'][_0x227abc(0x38e)](_0xd669b7 + 0x1, _0x3abf1e + 0x1, _0x5e9028 - 0x2, _0x14a1d1 - 0x2, _0x501067), (this[_0x227abc(0x35a)]['paintOpacity'] = 0xff);
    }
  }),
  (ColorManager['getItemsEquipsCoreBackColor1'] = function () {
    const _0x1a2e46 = _0x412469,
      _0x28cb68 = VisuMZ['ItemsEquipsCore'][_0x1a2e46(0x55e)][_0x1a2e46(0x29f)];
    let _0x4e0d2e = _0x28cb68[_0x1a2e46(0x50b)] !== undefined ? _0x28cb68[_0x1a2e46(0x50b)] : 0x13;
    return ColorManager['getColor'](_0x4e0d2e);
  }),
  (Window_ShopStatus['prototype'][_0x412469(0x4ac)] = function () {
    const _0x5d86d0 = _0x412469,
      _0x28b7db = this[_0x5d86d0(0x2e0)]();
    if (_0x28b7db === 'compare') this[_0x5d86d0(0x241)]();
    else _0x28b7db === _0x5d86d0(0x54d) ? this[_0x5d86d0(0x216)]() : this['drawEquipDataClassic']();
  }),
  (Window_ShopStatus[_0x412469(0x331)]['getEquipDataStyle'] = function () {
    const _0x3c385e = _0x412469;
    return VisuMZ['ItemsEquipsCore'][_0x3c385e(0x55e)][_0x3c385e(0x29f)][_0x3c385e(0x378)] ?? 'compare';
  }),
  (Window_ShopStatus[_0x412469(0x331)][_0x412469(0x241)] = function () {
    const _0x2c5509 = _0x412469;
    this[_0x2c5509(0x239)] = null;
    if (VisuMZ['ItemsEquipsCore'][_0x2c5509(0x55e)]['StatusWindow'][_0x2c5509(0x374)]) {
      VisuMZ[_0x2c5509(0x215)][_0x2c5509(0x55e)][_0x2c5509(0x29f)][_0x2c5509(0x374)]['call'](this);
      return;
    }
    const _0x23f0f8 = this[_0x2c5509(0x232)](),
      _0x55df08 = this[_0x2c5509(0x5e6)]() + 0x8;
    let _0x42da88 = 0x0,
      _0xcb5dd7 = 0x0,
      _0x558dd7 = this['innerWidth'],
      _0x391b5f = this[_0x2c5509(0x3fc)],
      _0x38c47a = Math[_0x2c5509(0x44d)](_0x558dd7 / 0x2),
      _0x42cef8 = _0x42da88 + _0x558dd7 - _0x38c47a;
    this['drawItemName'](this[_0x2c5509(0x4d5)], _0x42da88 + this[_0x2c5509(0x1b6)](), _0xcb5dd7, _0x558dd7 - this[_0x2c5509(0x1b6)]() * 0x2),
      this[_0x2c5509(0x50c)](_0x42da88, _0xcb5dd7, _0x558dd7),
      (_0xcb5dd7 += _0x23f0f8);
    if (this['drawItemEquipType'](_0x42da88, _0xcb5dd7, _0x38c47a)) _0xcb5dd7 += 0x0;
    if (this[_0x2c5509(0x2ba)](_0x42cef8, _0xcb5dd7, _0x38c47a)) _0xcb5dd7 += _0x23f0f8;
    const _0x400d51 = this[_0x2c5509(0x3d3)](),
      _0x4eb0d9 = _0xcb5dd7;
    _0xcb5dd7 = _0x391b5f - _0x400d51['length'] * _0x55df08 - 0x4;
    let _0x1be2ac = _0x42da88,
      _0x360b08 = 0x0,
      _0x5e29a7 = _0xcb5dd7;
    for (const _0x3ed1ca of _0x400d51) {
      (_0x360b08 = Math[_0x2c5509(0x261)](this['drawParamName'](_0x3ed1ca, _0x42da88 + 0x4, _0xcb5dd7 + 0x4, _0x558dd7), _0x360b08)), (_0xcb5dd7 += _0x55df08);
    }
    const _0x52fde6 = $gameParty[_0x2c5509(0x24c)](),
      _0x2d219b = Math[_0x2c5509(0x44d)]((_0x558dd7 - _0x360b08) / _0x52fde6);
    _0x360b08 = _0x558dd7 - _0x2d219b * _0x52fde6;
    for (const _0x35a00e of $gameParty[_0x2c5509(0x285)]()) {
      const _0x5b6b2e = $gameParty[_0x2c5509(0x285)]()[_0x2c5509(0x2e3)](_0x35a00e),
        _0x1c998f = _0x1be2ac + _0x360b08 + _0x5b6b2e * _0x2d219b;
      this[_0x2c5509(0x2e7)](_0x35a00e[_0x2c5509(0x2a8)](this['_item'])), this['drawActorCharacter'](_0x35a00e, _0x1c998f + _0x2d219b / 0x2, _0x5e29a7);
      let _0x59b1f3 = _0x5e29a7;
      for (const _0x13384b of _0x400d51) {
        const _0x32e725 = _0x59b1f3 - (_0x23f0f8 - _0x55df08) / 0x2;
        this[_0x2c5509(0x2e6)](_0x35a00e, _0x13384b, _0x1c998f, _0x32e725, _0x2d219b), (_0x59b1f3 += _0x55df08);
      }
    }
    this[_0x2c5509(0x50c)](_0x1be2ac, _0x4eb0d9, _0x360b08, _0x5e29a7 - _0x4eb0d9);
    for (let _0x334c34 = 0x0; _0x334c34 < _0x52fde6; _0x334c34++) {
      const _0x501940 = _0x1be2ac + _0x360b08 + _0x334c34 * _0x2d219b;
      this['drawItemDarkRect'](_0x501940, _0x4eb0d9, _0x2d219b, _0x5e29a7 - _0x4eb0d9);
    }
    for (const _0x3ced80 of _0x400d51) {
      this[_0x2c5509(0x50c)](_0x1be2ac, _0x5e29a7, _0x360b08, _0x55df08);
      for (let _0x31f6a2 = 0x0; _0x31f6a2 < _0x52fde6; _0x31f6a2++) {
        const _0x1b1d6c = _0x1be2ac + _0x360b08 + _0x31f6a2 * _0x2d219b;
        this[_0x2c5509(0x50c)](_0x1b1d6c, _0x5e29a7, _0x2d219b, _0x55df08);
      }
      _0x5e29a7 += _0x55df08;
    }
  }),
  (Window_ShopStatus['prototype'][_0x412469(0x5d5)] = function () {
    const _0x18f9dc = _0x412469;
    this[_0x18f9dc(0x239)] = null;
    if (VisuMZ['ItemsEquipsCore']['Settings'][_0x18f9dc(0x29f)]['DrawEquipClassicData']) {
      VisuMZ['ItemsEquipsCore'][_0x18f9dc(0x55e)]['StatusWindow'][_0x18f9dc(0x576)]['call'](this);
      return;
    }
    const _0x4d1f71 = this[_0x18f9dc(0x232)]();
    let _0x97a4fe = 0x0,
      _0x269d9e = 0x0,
      _0x103ffc = this[_0x18f9dc(0x25c)],
      _0x3cc091 = this['innerHeight'],
      _0x2255b8 = Math[_0x18f9dc(0x44d)](_0x103ffc / 0x2),
      _0xaf14d5 = _0x97a4fe + _0x103ffc - _0x2255b8;
    this[_0x18f9dc(0x440)](this['_item'], _0x97a4fe + this[_0x18f9dc(0x1b6)](), _0x269d9e, _0x103ffc - this[_0x18f9dc(0x1b6)]() * 0x2),
      this[_0x18f9dc(0x50c)](_0x97a4fe, _0x269d9e, _0x103ffc),
      (_0x269d9e += _0x4d1f71);
    if (this[_0x18f9dc(0x281)](_0x97a4fe, _0x269d9e, _0x2255b8)) _0x269d9e += 0x0;
    if (this[_0x18f9dc(0x2ba)](_0xaf14d5, _0x269d9e, _0x2255b8)) _0x269d9e += _0x4d1f71;
    if (this[_0x18f9dc(0x2e5)](_0x97a4fe, _0x269d9e, _0x103ffc)) _0x269d9e += _0x4d1f71;
    const _0x373c55 = this[_0x18f9dc(0x3d3)]();
    for (const _0x5ec32d of _0x373c55) {
      if (this[_0x18f9dc(0x2aa)](_0x5ec32d)) continue;
      this[_0x18f9dc(0x471)](_0x5ec32d, _0x97a4fe, _0x269d9e, _0x103ffc), (_0x269d9e += _0x4d1f71);
    }
    (_0x269d9e = this[_0x18f9dc(0x2fe)](_0x97a4fe, _0x269d9e, _0x103ffc)), this[_0x18f9dc(0x50c)](_0x97a4fe, _0x269d9e, _0x103ffc, _0x3cc091 - _0x269d9e);
  }),
  (Window_ShopStatus[_0x412469(0x331)][_0x412469(0x216)] = function () {
    const _0x388c73 = _0x412469;
    this[_0x388c73(0x239)] = null;
    if (VisuMZ[_0x388c73(0x215)][_0x388c73(0x55e)][_0x388c73(0x29f)]['DrawEquipDoubleData']) {
      VisuMZ[_0x388c73(0x215)]['Settings'][_0x388c73(0x29f)][_0x388c73(0x467)]['call'](this);
      return;
    }
    const _0x5715b9 = this['lineHeight']();
    let _0x130c8a = 0x0,
      _0x3dc0d3 = 0x0,
      _0x251eb8 = this['innerWidth'],
      _0x55fa61 = this[_0x388c73(0x3fc)],
      _0x5c4232 = Math[_0x388c73(0x44d)](_0x251eb8 / 0x2),
      _0x568bcb = _0x130c8a + _0x251eb8 - _0x5c4232;
    this[_0x388c73(0x440)](this['_item'], _0x130c8a + this[_0x388c73(0x1b6)](), _0x3dc0d3, _0x251eb8 - this['itemPadding']() * 0x2),
      this[_0x388c73(0x50c)](_0x130c8a, _0x3dc0d3, _0x251eb8),
      (_0x3dc0d3 += _0x5715b9);
    if (this['drawItemEquipType'](_0x130c8a, _0x3dc0d3, _0x5c4232)) _0x3dc0d3 += 0x0;
    if (this['drawItemQuantity'](_0x568bcb, _0x3dc0d3, _0x5c4232)) _0x3dc0d3 += _0x5715b9;
    if (this[_0x388c73(0x2e5)](_0x130c8a, _0x3dc0d3, _0x251eb8)) _0x3dc0d3 += _0x5715b9;
    const _0x259bed = this['actorParams']();
    for (const _0x5eacb0 of _0x259bed) {
      if (this['isCustomParameter'](_0x5eacb0)) continue;
      this[_0x388c73(0x471)](_0x5eacb0, _0x130c8a, _0x3dc0d3, _0x5c4232), _0x130c8a === _0x5c4232 ? ((_0x3dc0d3 += _0x5715b9), (_0x130c8a = 0x0)) : (_0x130c8a = _0x5c4232);
    }
    _0x130c8a === _0x5c4232 && (this[_0x388c73(0x50c)](_0x5c4232, _0x3dc0d3, _0x5c4232, _0x5715b9), (_0x3dc0d3 += _0x5715b9), (_0x130c8a = 0x0)),
      (_0x3dc0d3 = this[_0x388c73(0x2fe)](_0x130c8a, _0x3dc0d3, _0x251eb8)),
      this[_0x388c73(0x50c)](_0x130c8a, _0x3dc0d3, _0x251eb8, _0x55fa61 - _0x3dc0d3);
  }),
  (Window_ShopStatus[_0x412469(0x331)][_0x412469(0x281)] = function (_0x3a5fd2, _0x1ccba1, _0x5a6d77) {
    const _0x11f8d3 = _0x412469;
    if (!this['isEquipItem']()) return ![];
    const _0x43394f = $dataSystem[_0x11f8d3(0x42d)][this[_0x11f8d3(0x4d5)][_0x11f8d3(0x49f)]];
    return this[_0x11f8d3(0x366)](_0x43394f, _0x3a5fd2, _0x1ccba1, _0x5a6d77, !![]), this[_0x11f8d3(0x50c)](_0x3a5fd2, _0x1ccba1, _0x5a6d77), this[_0x11f8d3(0x2d0)](), !![];
  }),
  (Window_ShopStatus['prototype'][_0x412469(0x2e5)] = function (_0x57189b, _0x1de18f, _0xbaa86f) {
    const _0x3c178f = _0x412469;
    if (!this['isEquipItem']()) return ![];
    let _0x3dcb9b = '',
      _0xa8bf9a = '';
    const _0x55e07d = VisuMZ['ItemsEquipsCore']['Settings'][_0x3c178f(0x29f)];
    return (
      DataManager[_0x3c178f(0x32f)](this['_item'])
        ? ((_0x3dcb9b = _0x55e07d[_0x3c178f(0x2f3)] ?? _0x3c178f(0x5d1)), (_0xa8bf9a = $dataSystem[_0x3c178f(0x485)][this['_item'][_0x3c178f(0x288)]] || _0x55e07d[_0x3c178f(0x4ad)] || '-'))
        : ((_0x3dcb9b = _0x55e07d[_0x3c178f(0x451)] ?? _0x3c178f(0x1cb)), (_0xa8bf9a = $dataSystem[_0x3c178f(0x386)][this[_0x3c178f(0x4d5)][_0x3c178f(0x1d9)]] || _0x55e07d[_0x3c178f(0x4ad)] || '-')),
      this['drawItemKeyData'](_0x3dcb9b, _0x57189b, _0x1de18f, _0xbaa86f, !![]),
      this['drawItemKeyData'](_0xa8bf9a, _0x57189b, _0x1de18f, _0xbaa86f, ![], _0x3c178f(0x264)),
      this[_0x3c178f(0x50c)](_0x57189b, _0x1de18f, _0xbaa86f),
      this[_0x3c178f(0x2d0)](),
      !![]
    );
  }),
  (Window_ShopStatus['prototype'][_0x412469(0x527)] = function () {
    const _0x3545d4 = _0x412469,
      _0x4cc84c = VisuMZ['ItemsEquipsCore'][_0x3545d4(0x55e)][_0x3545d4(0x582)][_0x3545d4(0x4e8)];
    return _0x4cc84c[_0x3545d4(0x32c)]($gameParty[_0x3545d4(0x4aa)](this['_item']));
  }),
  (Window_ShopStatus[_0x412469(0x331)][_0x412469(0x3d3)] = function () {
    const _0x1aab00 = _0x412469;
    let _0x1a4af9 = [0x0, 0x1, 0x2, 0x3, 0x4, 0x5, 0x6, 0x7];
    if (Imported[_0x1aab00(0x308)]) {
      _0x1a4af9 = VisuMZ[_0x1aab00(0x5ea)][_0x1aab00(0x55e)][_0x1aab00(0x438)][_0x1aab00(0x4c0)];
      const _0x1967c8 = VisuMZ['ItemsEquipsCore'][_0x1aab00(0x55e)]['StatusWindow'];
      if (this[_0x1aab00(0x2e0)]() === _0x1aab00(0x5df)) {
        if (DataManager['isWeapon'](this[_0x1aab00(0x4d5)])) _0x1a4af9 = _0x1a4af9[_0x1aab00(0x3b9)](_0x1967c8[_0x1aab00(0x4bd)] || []);
        if (DataManager[_0x1aab00(0x429)](this[_0x1aab00(0x4d5)])) _0x1a4af9 = _0x1a4af9[_0x1aab00(0x3b9)](_0x1967c8[_0x1aab00(0x5e9)] || []);
      } else {
        if (this[_0x1aab00(0x2e0)]() === _0x1aab00(0x54d)) {
          if (DataManager[_0x1aab00(0x32f)](this['_item'])) _0x1a4af9 = _0x1a4af9[_0x1aab00(0x3b9)](_0x1967c8[_0x1aab00(0x1b7)] || []);
          if (DataManager[_0x1aab00(0x429)](this[_0x1aab00(0x4d5)])) _0x1a4af9 = _0x1a4af9[_0x1aab00(0x3b9)](_0x1967c8['DoubleArmorParameters'] || []);
        }
      }
    }
    return (_0x1a4af9 = _0x1a4af9['map'](_0xc8f619 => (typeof _0xc8f619 === 'number' ? _0xc8f619 : _0xc8f619['toUpperCase']()[_0x1aab00(0x5ed)]()))), _0x1a4af9;
  }),
  (Window_ShopStatus[_0x412469(0x331)][_0x412469(0x520)] = function () {
    const _0x456bc7 = _0x412469;
    return VisuMZ[_0x456bc7(0x215)]['Settings'][_0x456bc7(0x29f)][_0x456bc7(0x263)];
  }),
  (Window_ShopStatus[_0x412469(0x331)][_0x412469(0x406)] = function (_0x122b48, _0x4ba00c, _0x20c259, _0x334c8e) {
    const _0x33a904 = _0x412469;
    this[_0x33a904(0x2d0)](), (this[_0x33a904(0x468)]['fontSize'] = this['smallParamFontSize']());
    let _0x10a40d = this[_0x33a904(0x5ad)](TextManager['param'](_0x122b48)) + 0x4 + _0x4ba00c;
    return (
      Imported[_0x33a904(0x308)]
        ? (this[_0x33a904(0x343)](_0x4ba00c, _0x20c259, _0x334c8e, _0x122b48, !![]), VisuMZ['CoreEngine']['Settings']['Param'][_0x33a904(0x4b5)] && (_0x10a40d += ImageManager[_0x33a904(0x52b)] + 0x4))
        : (this[_0x33a904(0x45d)](ColorManager[_0x33a904(0x253)]()), this['drawText'](TextManager[_0x33a904(0x2b4)](_0x122b48), _0x4ba00c, _0x20c259, _0x334c8e)),
      this['resetFontSettings'](),
      _0x10a40d
    );
  }),
  (Window_ShopStatus['prototype']['drawActorParamDifference'] = function (_0x1879bc, _0x2e7a95, _0x42d6dd, _0x5709c4, _0x5038ab) {
    const _0x27bf16 = _0x412469;
    (_0x42d6dd += this['itemPadding']()), (_0x5038ab -= this['itemPadding']() * 0x2);
    const _0xbe1d17 = VisuMZ[_0x27bf16(0x215)][_0x27bf16(0x55e)][_0x27bf16(0x29f)];
    (this['contents']['fontSize'] = _0xbe1d17[_0x27bf16(0x263)]), this['changePaintOpacity'](_0x1879bc[_0x27bf16(0x2a8)](this['_item']));
    if (_0x1879bc[_0x27bf16(0x5d8)](this['_item']) && !_0x1879bc[_0x27bf16(0x475)](this['_item'])) {
      const _0x288f75 = _0xbe1d17['AlreadyEquipMarker'];
      this[_0x27bf16(0x5f1)](_0x288f75, _0x42d6dd, _0x5709c4, _0x5038ab, _0x27bf16(0x4ce));
    } else {
      if (_0x1879bc[_0x27bf16(0x2a8)](this[_0x27bf16(0x4d5)])) {
        const _0xbc7fa6 = this['createTempActorEquips'](_0x1879bc);
        let _0x373bc5 = 0x0,
          _0x24e18d = 0x0,
          _0x3de292 = 0x0;
        Imported[_0x27bf16(0x308)]
          ? ((_0x373bc5 = _0xbc7fa6[_0x27bf16(0x291)](_0x2e7a95)),
            (_0x24e18d = _0x373bc5 - _0x1879bc[_0x27bf16(0x291)](_0x2e7a95)),
            this[_0x27bf16(0x45d)](ColorManager['paramchangeTextColor'](_0x24e18d)),
            (_0x3de292 = (_0x24e18d >= 0x0 ? '+' : '') + VisuMZ['ConvertNumberToString'](_0x24e18d, 0x0, _0x2e7a95)))
          : ((_0x373bc5 = _0xbc7fa6['param'](_0x2e7a95)),
            (_0x24e18d = _0x373bc5 - _0x1879bc[_0x27bf16(0x2b4)](_0x2e7a95)),
            this[_0x27bf16(0x45d)](ColorManager[_0x27bf16(0x51e)](_0x24e18d)),
            (_0x3de292 = (_0x24e18d >= 0x0 ? '+' : '') + _0x24e18d)),
          _0x3de292 === '+0' && (_0x3de292 = _0xbe1d17[_0x27bf16(0x5ee)]),
          this[_0x27bf16(0x5f1)](_0x3de292, _0x42d6dd, _0x5709c4, _0x5038ab, _0x27bf16(0x4ce));
      } else {
        const _0x1ea592 = _0xbe1d17['CannotEquipMarker'];
        this['drawText'](_0x1ea592, _0x42d6dd, _0x5709c4, _0x5038ab, _0x27bf16(0x4ce));
      }
    }
    this[_0x27bf16(0x2d0)](), this[_0x27bf16(0x2e7)](!![]);
  }),
  (Window_ShopStatus[_0x412469(0x331)][_0x412469(0x242)] = function (_0x204cf3) {
    const _0x1aa501 = _0x412469;
    if (this[_0x1aa501(0x1ed)](_0x204cf3)) {
      const _0x41d063 = JsonEx[_0x1aa501(0x42b)](_0x204cf3);
      _0x41d063[_0x1aa501(0x239)] = !![];
      const _0x23aeb1 = _0x41d063[_0x1aa501(0x400)](this['_item']);
      _0x23aeb1 >= 0x0 && _0x41d063[_0x1aa501(0x58f)](_0x23aeb1, this[_0x1aa501(0x4d5)]), (this[_0x1aa501(0x239)] = _0x41d063);
    }
    return this[_0x1aa501(0x239)];
  }),
  (Window_ShopStatus['prototype'][_0x412469(0x1ed)] = function (_0x117571) {
    const _0x1d586f = _0x412469;
    if (!this['_tempActor']) return !![];
    return this['_tempActor'][_0x1d586f(0x3d2)]() !== _0x117571['actorId']();
  }),
  (Game_Actor[_0x412469(0x331)]['anyEmptyEquipSlotsOfSameEtype'] = function (_0x4eb0de) {
    const _0x1a7bdc = _0x412469;
    if (!_0x4eb0de) return ![];
    const _0x31c15b = _0x4eb0de['etypeId'],
      _0x27f25e = this[_0x1a7bdc(0x37d)]();
    for (let _0x485630 = 0x0; _0x485630 < _0x27f25e[_0x1a7bdc(0x1ec)]; _0x485630++) {
      const _0x47d977 = _0x27f25e[_0x485630];
      if (_0x47d977 !== _0x31c15b) continue;
      if (!this[_0x1a7bdc(0x547)]()[_0x485630]) return !![];
    }
    return ![];
  }),
  (Game_Actor[_0x412469(0x331)]['getEmptyEquipSlotOfSameEtype'] = function (_0x2d3476) {
    const _0x13f9d8 = _0x412469;
    if (!_0x2d3476) return -0x1;
    const _0x31c839 = _0x2d3476['etypeId'],
      _0x1b8646 = this[_0x13f9d8(0x37d)]();
    let _0x24b554 = -0x1;
    for (let _0x36d2f5 = 0x0; _0x36d2f5 < _0x1b8646['length']; _0x36d2f5++) {
      const _0x15f681 = _0x1b8646[_0x36d2f5];
      if (_0x15f681 !== _0x31c839) continue;
      if (!this[_0x13f9d8(0x547)]()[_0x36d2f5]) return _0x36d2f5;
      if (_0x24b554 < 0x0) _0x24b554 = _0x36d2f5;
    }
    return _0x24b554;
  }),
  (Window_ShopStatus[_0x412469(0x331)]['drawActorParamClassic'] = function (_0x5af2e5, _0x3e6cc5, _0x494e8d, _0x5ac426) {
    const _0x4674e9 = _0x412469,
      _0x2c5baa = TextManager[_0x4674e9(0x2b4)](_0x5af2e5);
    this[_0x4674e9(0x366)](_0x2c5baa, _0x3e6cc5, _0x494e8d, _0x5ac426, !![]);
    let _0x34476f = '+0';
    Imported['VisuMZ_0_CoreEngine'] ? (_0x34476f = this[_0x4674e9(0x37a)](_0x5af2e5)) : (_0x34476f = this[_0x4674e9(0x204)](_0x5af2e5)),
      this[_0x4674e9(0x366)](_0x34476f, _0x3e6cc5, _0x494e8d, _0x5ac426, ![], _0x4674e9(0x264)),
      this[_0x4674e9(0x50c)](_0x3e6cc5, _0x494e8d, _0x5ac426);
  }),
  (Window_ShopStatus['prototype'][_0x412469(0x2aa)] = function (_0x49ff9f) {
    const _0x357b1f = _0x412469;
    return Imported[_0x357b1f(0x308)] ? !!VisuMZ[_0x357b1f(0x5ea)]['CustomParamNames'][_0x49ff9f] : ![];
  }),
  (Window_ShopStatus[_0x412469(0x331)][_0x412469(0x37a)] = function (_0x4f9067) {
    const _0x27ab4b = _0x412469;
    if (this[_0x27ab4b(0x1e5)][_0x4f9067]) return this[_0x27ab4b(0x1e5)][_0x4f9067];
    const _0x323d70 = ['MAXHP', 'MAXMP', _0x27ab4b(0x1bd), _0x27ab4b(0x21b), _0x27ab4b(0x5eb), 'MDF', _0x27ab4b(0x590), _0x27ab4b(0x223)],
      _0x58f000 = [_0x27ab4b(0x4b4), _0x27ab4b(0x3f2), 'CRI', _0x27ab4b(0x4f1), _0x27ab4b(0x375), _0x27ab4b(0x23e), _0x27ab4b(0x394), _0x27ab4b(0x501), _0x27ab4b(0x25a), _0x27ab4b(0x392)],
      _0x54ddaf = ['TGR', _0x27ab4b(0x35d), _0x27ab4b(0x5d7), _0x27ab4b(0x4ec), _0x27ab4b(0x56f), 'TCR', 'PDR', _0x27ab4b(0x3ee), _0x27ab4b(0x419), _0x27ab4b(0x2de)];
    if (_0x323d70['includes'](_0x4f9067)) {
      const _0x193cff = _0x323d70[_0x27ab4b(0x2e3)](_0x4f9067),
        _0x198897 = this[_0x27ab4b(0x4d5)][_0x27ab4b(0x33d)][_0x193cff] || 0x0;
      return this[_0x27ab4b(0x45d)](ColorManager['paramchangeTextColor'](_0x198897)), (_0x198897 >= 0x0 ? '+' : '') + String(_0x198897);
    } else {
      if (_0x58f000[_0x27ab4b(0x5a9)](_0x4f9067)) {
        const _0x27223f = _0x58f000[_0x27ab4b(0x2e3)](_0x4f9067);
        let _0x202e0b = 0x0;
        for (const _0x102210 of this['_item']['traits']) {
          if (_0x102210[_0x27ab4b(0x478)] !== 0x16) continue;
          _0x102210[_0x27ab4b(0x319)] === _0x27223f && (_0x202e0b += _0x102210[_0x27ab4b(0x5de)] || 0x0);
        }
        return this[_0x27ab4b(0x45d)](ColorManager[_0x27ab4b(0x51e)](_0x202e0b)), (_0x202e0b *= 0x64), (_0x202e0b >= 0x0 ? '+' : '') + String(_0x202e0b) + '%';
      } else {
        if (_0x54ddaf['includes'](_0x4f9067)) {
          const _0x546a61 = _0x54ddaf[_0x27ab4b(0x2e3)](_0x4f9067);
          let _0x5af501 = 0x1;
          for (const _0x4cfb11 of this['_item'][_0x27ab4b(0x2f8)]) {
            if (_0x4cfb11['code'] !== 0x17) continue;
            _0x4cfb11['dataId'] === _0x546a61 && (_0x5af501 *= _0x4cfb11[_0x27ab4b(0x5de)] || 0x0);
          }
          let _0x32e558 = 0x1;
          if ([_0x27ab4b(0x210), _0x27ab4b(0x56f), _0x27ab4b(0x408), _0x27ab4b(0x3ee), 'FDR']['includes'](_0x4f9067)) _0x32e558 = -0x1;
          return this['changeTextColor'](ColorManager[_0x27ab4b(0x51e)]((_0x5af501 - 0x1) * _0x32e558)), (_0x5af501 *= 0x64), String(_0x5af501) + '%';
        }
      }
    }
    return '';
  }),
  (Window_ShopStatus[_0x412469(0x331)][_0x412469(0x204)] = function (_0x6b96c1) {
    const _0x2aeb59 = _0x412469,
      _0x50e722 = ['MAXHP', _0x2aeb59(0x436), _0x2aeb59(0x1bd), 'DEF', _0x2aeb59(0x5eb), _0x2aeb59(0x5f2), _0x2aeb59(0x590), _0x2aeb59(0x223)],
      _0x1a627a = _0x50e722[_0x6b96c1] || _0x2aeb59(0x559);
    if (this[_0x2aeb59(0x1e5)][_0x1a627a]) return this[_0x2aeb59(0x1e5)][_0x1a627a];
    const _0x1aaebe = Number(this[_0x2aeb59(0x4d5)][_0x2aeb59(0x33d)][_0x6b96c1] || 0x0);
    return this['changeTextColor'](ColorManager['paramchangeTextColor'](_0x1aaebe)), (_0x1aaebe >= 0x0 ? '+' : '') + String(_0x1aaebe);
  }),
  (Window_ShopStatus[_0x412469(0x331)]['drawItemData'] = function () {
    const _0x17ffa9 = _0x412469;
    VisuMZ['ItemsEquipsCore']['Settings']['StatusWindow'][_0x17ffa9(0x4b7)]['call'](this);
  }),
  (Window_ShopStatus[_0x412469(0x331)][_0x412469(0x440)] = function (_0x57d5ca, _0x5229c6, _0x9aea90, _0xdaceb6) {
    const _0x314327 = _0x412469,
      _0x2655b5 = DataManager[_0x314327(0x346)](_0x57d5ca, _0x5229c6, _0x9aea90, _0xdaceb6) && Imported[_0x314327(0x2df)],
      _0x23b6e5 = _0x57d5ca ? _0x57d5ca['name'] : '';
    if (_0x2655b5) Window_SkillList['prototype'][_0x314327(0x4cc)]['call'](this, _0x57d5ca);
    Window_Base[_0x314327(0x331)][_0x314327(0x440)][_0x314327(0x575)](this, _0x57d5ca, _0x5229c6, _0x9aea90, _0xdaceb6);
    if (_0x2655b5) _0x57d5ca['name'] = _0x23b6e5;
  }),
  (Window_ShopStatus[_0x412469(0x331)][_0x412469(0x2e2)] = function () {
    const _0x4525d3 = _0x412469;
    this[_0x4525d3(0x1e5)] = {};
    if (!this[_0x4525d3(0x4d5)]) return;
    const _0x2e8860 = this[_0x4525d3(0x4d5)]['note'];
    if (_0x2e8860[_0x4525d3(0x512)](/<STATUS INFO>\s*([\s\S]*)\s*<\/STATUS INFO>/i)) {
      const _0x29451d = String(RegExp['$1'])[_0x4525d3(0x3de)](/[\r\n]+/);
      for (const _0x62951f of _0x29451d) {
        if (_0x62951f[_0x4525d3(0x512)](/(.*):[ ](.*)/i)) {
          const _0x17a194 = String(RegExp['$1'])['toUpperCase']()[_0x4525d3(0x5ed)](),
            _0x58d7c2 = String(RegExp['$2'])[_0x4525d3(0x5ed)]();
          this[_0x4525d3(0x1e5)][_0x17a194] = _0x58d7c2;
        }
      }
    }
  }),
  (Window_ShopStatus[_0x412469(0x331)]['itemDataFontSize'] = function () {
    const _0x254ac2 = _0x412469;
    return Math[_0x254ac2(0x261)](0x1, $gameSystem[_0x254ac2(0x447)]() - 0x4);
  }),
  (Window_ShopStatus[_0x412469(0x331)]['resetFontSettings'] = function () {
    const _0x4fca38 = _0x412469;
    Window_StatusBase[_0x4fca38(0x331)][_0x4fca38(0x2d0)]['call'](this),
      (this['contents']['fontSize'] = this[_0x4fca38(0x588)] || this['contents'][_0x4fca38(0x5bd)]),
      (this[_0x4fca38(0x468)][_0x4fca38(0x4e9)] = this[_0x4fca38(0x2ed)] || this[_0x4fca38(0x468)][_0x4fca38(0x4e9)]);
  }),
  (Window_ShopStatus[_0x412469(0x331)][_0x412469(0x444)] = function () {
    const _0x26e417 = _0x412469;
    return this[_0x26e417(0x468)][_0x26e417(0x5bd)] / $gameSystem[_0x26e417(0x447)]();
  }),
  (Window_ShopStatus[_0x412469(0x331)][_0x412469(0x2fc)] = function (_0xa0e926, _0x55d06c, _0x1dddcd) {
    const _0x1b269f = _0x412469,
      _0x49c5d9 = ImageManager[_0x1b269f(0x1e1)]('IconSet'),
      _0x56cce3 = ImageManager[_0x1b269f(0x52b)],
      _0x282556 = ImageManager[_0x1b269f(0x2ee)],
      _0x27c08a = (_0xa0e926 % 0x10) * _0x56cce3,
      _0x23c27e = Math[_0x1b269f(0x44d)](_0xa0e926 / 0x10) * _0x282556,
      _0x5ee687 = Math['ceil'](_0x56cce3 * this['fontSizeRatio']()),
      _0x418646 = Math['ceil'](_0x282556 * this[_0x1b269f(0x444)]());
    this[_0x1b269f(0x468)]['blt'](_0x49c5d9, _0x27c08a, _0x23c27e, _0x56cce3, _0x282556, _0x55d06c, _0x1dddcd, _0x5ee687, _0x418646);
  }),
  (Window_ShopStatus[_0x412469(0x331)][_0x412469(0x345)] = function (_0x196bee, _0x39ced4) {
    const _0x3da6af = _0x412469;
    _0x39ced4['drawing'] && this['drawIcon'](_0x196bee, _0x39ced4['x'], _0x39ced4['y'] + 0x2);
    _0x39ced4['x'] += Math[_0x3da6af(0x326)](ImageManager['iconWidth'] * this[_0x3da6af(0x444)]());
    if (this[_0x3da6af(0x444)]() === 0x1) _0x39ced4['x'] += 0x4;
  }),
  (Window_ShopStatus['prototype'][_0x412469(0x366)] = function (_0x23ce4c, _0x1beb50, _0x2e1275, _0x43751a, _0x41c112, _0x5e01b7) {
    const _0x3fb85a = _0x412469;
    (_0x23ce4c = _0x23ce4c || ''),
      (_0x5e01b7 = _0x5e01b7 || 'left'),
      (this['_resetFontSize'] = this['itemDataFontSize']()),
      (this[_0x3fb85a(0x2ed)] = _0x41c112 ? ColorManager[_0x3fb85a(0x253)]() : this[_0x3fb85a(0x468)][_0x3fb85a(0x4e9)]),
      (_0x1beb50 += this[_0x3fb85a(0x1b6)]()),
      (_0x43751a -= this[_0x3fb85a(0x1b6)]() * 0x2);
    const _0x110780 = this[_0x3fb85a(0x235)](_0x23ce4c);
    if (_0x5e01b7 === 'center') _0x1beb50 = _0x1beb50 + Math[_0x3fb85a(0x44d)]((_0x43751a - _0x110780[_0x3fb85a(0x2fa)]) / 0x2);
    else _0x5e01b7 === _0x3fb85a(0x264) && (_0x1beb50 = _0x1beb50 + _0x43751a - _0x110780[_0x3fb85a(0x2fa)]);
    (_0x2e1275 += (this[_0x3fb85a(0x232)]() - _0x110780['height']) / 0x2),
      this['drawTextEx'](_0x23ce4c, _0x1beb50, _0x2e1275, _0x43751a),
      (this[_0x3fb85a(0x588)] = undefined),
      (this[_0x3fb85a(0x2ed)] = undefined),
      this[_0x3fb85a(0x2d0)]();
  }),
  (Window_ShopStatus[_0x412469(0x331)][_0x412469(0x2c0)] = function (_0x227f27, _0x35fc76, _0x55fa6d) {
    const _0xfddd8 = _0x412469;
    if (!DataManager[_0xfddd8(0x28d)](this['_item'])) return ![];
    const _0x3da79b = this[_0xfddd8(0x251)]();
    this[_0xfddd8(0x366)](_0x3da79b, _0x227f27, _0x35fc76, _0x55fa6d, !![]);
    const _0x24552a = this[_0xfddd8(0x4a7)]();
    return this[_0xfddd8(0x366)](_0x24552a, _0x227f27, _0x35fc76, _0x55fa6d, ![], _0xfddd8(0x264)), this['drawItemDarkRect'](_0x227f27, _0x35fc76, _0x55fa6d), this[_0xfddd8(0x2d0)](), !![];
  }),
  (Window_ShopStatus[_0x412469(0x331)][_0x412469(0x251)] = function () {
    const _0xaba0f3 = _0x412469;
    return VisuMZ[_0xaba0f3(0x215)][_0xaba0f3(0x55e)][_0xaba0f3(0x29f)][_0xaba0f3(0x481)];
  }),
  (Window_ShopStatus['prototype'][_0x412469(0x4a7)] = function () {
    const _0x57cb8c = _0x412469,
      _0x54dbef = _0x57cb8c(0x1de);
    if (this['_customItemInfo'][_0x54dbef]) return this[_0x57cb8c(0x1e5)][_0x54dbef];
    return this[_0x57cb8c(0x53f)]() ? VisuMZ['ItemsEquipsCore'][_0x57cb8c(0x55e)][_0x57cb8c(0x29f)][_0x57cb8c(0x473)] : VisuMZ[_0x57cb8c(0x215)][_0x57cb8c(0x55e)][_0x57cb8c(0x29f)][_0x57cb8c(0x367)];
  }),
  (Window_ShopStatus[_0x412469(0x331)][_0x412469(0x53f)] = function () {
    const _0x102f2a = _0x412469;
    return VisuMZ[_0x102f2a(0x5ea)] && VisuMZ['CoreEngine'][_0x102f2a(0x55e)][_0x102f2a(0x1c3)][_0x102f2a(0x514)] && DataManager[_0x102f2a(0x321)](this[_0x102f2a(0x4d5)])
      ? ![]
      : this[_0x102f2a(0x4d5)]['consumable'];
  }),
  (Window_ShopStatus[_0x412469(0x331)][_0x412469(0x2ba)] = function (_0x4c4f6a, _0x40d03e, _0x295bb5) {
    const _0x468d0e = _0x412469;
    if (!this[_0x468d0e(0x491)]() && !DataManager[_0x468d0e(0x28d)](this[_0x468d0e(0x4d5)])) return ![];
    if (DataManager['isKeyItem'](this['_item']) && !$dataSystem[_0x468d0e(0x284)]) {
      const _0x4b9942 = TextManager['keyItem'];
      this[_0x468d0e(0x366)](_0x4b9942, _0x4c4f6a, _0x40d03e, _0x295bb5, !![], _0x468d0e(0x4ce));
    } else {
      const _0x4f7ece = TextManager[_0x468d0e(0x57e)];
      this['drawItemKeyData'](_0x4f7ece, _0x4c4f6a, _0x40d03e, _0x295bb5, !![]);
      const _0x5d319d = this[_0x468d0e(0x527)]();
      this[_0x468d0e(0x366)](_0x5d319d, _0x4c4f6a, _0x40d03e, _0x295bb5, ![], _0x468d0e(0x264));
    }
    return this[_0x468d0e(0x50c)](_0x4c4f6a, _0x40d03e, _0x295bb5), this[_0x468d0e(0x2d0)](), !![];
  }),
  (Window_ShopStatus[_0x412469(0x331)]['getItemQuantityText'] = function () {
    const _0x155059 = _0x412469,
      _0x1b4104 = 'QUANTITY';
    if (this[_0x155059(0x1e5)][_0x1b4104]) return this[_0x155059(0x1e5)][_0x1b4104];
    const _0x2ff967 = VisuMZ[_0x155059(0x215)][_0x155059(0x55e)][_0x155059(0x582)]['ItemQuantityFmt'];
    return _0x2ff967[_0x155059(0x32c)]($gameParty[_0x155059(0x4aa)](this['_item']));
  }),
  (Window_ShopStatus[_0x412469(0x331)][_0x412469(0x24e)] = function (_0x1f6c7c, _0x486db0, _0x3538da) {
    const _0x459172 = _0x412469,
      _0x1398fc = this['getItemOccasionText']();
    return this[_0x459172(0x366)](_0x1398fc, _0x1f6c7c, _0x486db0, _0x3538da, ![], _0x459172(0x4ce)), this[_0x459172(0x50c)](_0x1f6c7c, _0x486db0, _0x3538da), this[_0x459172(0x2d0)](), !![];
  }),
  (Window_ShopStatus['prototype'][_0x412469(0x3df)] = function () {
    const _0x2a1719 = _0x412469,
      _0xb02fb0 = _0x2a1719(0x42c);
    if (this[_0x2a1719(0x1e5)][_0xb02fb0]) return this['_customItemInfo'][_0xb02fb0];
    const _0xba4bb1 = VisuMZ[_0x2a1719(0x215)][_0x2a1719(0x55e)]['StatusWindow'],
      _0x5e0423 = _0x2a1719(0x1d4)[_0x2a1719(0x32c)](this[_0x2a1719(0x4d5)]['occasion']);
    return _0xba4bb1[_0x5e0423];
  }),
  (Window_ShopStatus['prototype'][_0x412469(0x381)] = function (_0x42e1fb, _0x5257e2, _0x54be4e) {
    const _0x9d8c44 = _0x412469,
      _0x4361f8 = this[_0x9d8c44(0x1d1)]();
    return this[_0x9d8c44(0x366)](_0x4361f8, _0x42e1fb, _0x5257e2, _0x54be4e, ![], _0x9d8c44(0x4ce)), this[_0x9d8c44(0x50c)](_0x42e1fb, _0x5257e2, _0x54be4e), this[_0x9d8c44(0x2d0)](), !![];
  }),
  (Window_ShopStatus['prototype'][_0x412469(0x1d1)] = function () {
    const _0x3c6e25 = _0x412469,
      _0x5cbe3e = _0x3c6e25(0x23b);
    if (this[_0x3c6e25(0x1e5)][_0x5cbe3e]) return this[_0x3c6e25(0x1e5)][_0x5cbe3e];
    const _0x2d4b5b = VisuMZ['ItemsEquipsCore'][_0x3c6e25(0x55e)]['StatusWindow'];
    if (Imported[_0x3c6e25(0x32b)]) {
      const _0x33de93 = this['_item']['note'];
      if (_0x33de93[_0x3c6e25(0x512)](/<TARGET:[ ](.*)>/i)) {
        const _0x298061 = String(RegExp['$1']);
        if (_0x298061[_0x3c6e25(0x512)](/(\d+) RANDOM ANY/i)) return _0x2d4b5b[_0x3c6e25(0x5c3)][_0x3c6e25(0x32c)](Number(RegExp['$1']));
        else {
          if (_0x298061['match'](/(\d+) RANDOM (?:ENEMY|ENEMIES|FOE|FOES)/i)) return _0x2d4b5b[_0x3c6e25(0x594)]['format'](Number(RegExp['$1']));
          else {
            if (_0x298061['match'](/(\d+) RANDOM (?:ALLY|ALLIES|FRIEND|FRIENDS)/i)) return _0x2d4b5b['ScopeRandomAllies'][_0x3c6e25(0x32c)](Number(RegExp['$1']));
            else {
              if (_0x298061['match'](/ALL (?:ALLY|ALLIES|FRIEND|FRIENDS) (?:BUT|EXCEPT) (?:USER|SELF)/i)) return _0x2d4b5b['ScopeAlliesButUser'];
              else {
                if (_0x298061[_0x3c6e25(0x512)](/ALLY OR ENEMY/i)) return _0x2d4b5b[_0x3c6e25(0x469)] || _0x2d4b5b[_0x3c6e25(0x29c)];
                else {
                  if (_0x298061['match'](/ENEMY OR ALLY/i)) return _0x2d4b5b[_0x3c6e25(0x5c4)] || _0x2d4b5b['Scope1'];
                }
              }
            }
          }
        }
      }
    }
    const _0x5e2d0f = _0x3c6e25(0x4da)[_0x3c6e25(0x32c)](this[_0x3c6e25(0x4d5)][_0x3c6e25(0x4a2)]);
    return _0x2d4b5b[_0x5e2d0f];
  }),
  (Window_ShopStatus[_0x412469(0x331)][_0x412469(0x3c9)] = function (_0x5abedf, _0x1bde68, _0x2ad77e) {
    const _0x2fbd06 = _0x412469,
      _0x5118cf = this['getItemSpeedLabel']();
    this[_0x2fbd06(0x366)](_0x5118cf, _0x5abedf, _0x1bde68, _0x2ad77e, !![]);
    const _0x3cbad0 = this['getItemSpeedText']();
    return this[_0x2fbd06(0x366)](_0x3cbad0, _0x5abedf, _0x1bde68, _0x2ad77e, ![], _0x2fbd06(0x264)), this[_0x2fbd06(0x50c)](_0x5abedf, _0x1bde68, _0x2ad77e), this['resetFontSettings'](), !![];
  }),
  (Window_ShopStatus[_0x412469(0x331)][_0x412469(0x43a)] = function () {
    const _0x194c89 = _0x412469;
    return VisuMZ[_0x194c89(0x215)][_0x194c89(0x55e)][_0x194c89(0x29f)][_0x194c89(0x36a)];
  }),
  (Window_ShopStatus[_0x412469(0x331)][_0x412469(0x2be)] = function () {
    const _0x286a8e = _0x412469,
      _0x84d367 = _0x286a8e(0x454);
    if (this[_0x286a8e(0x1e5)][_0x84d367]) return this['_customItemInfo'][_0x84d367];
    const _0x54ee92 = this['_item'][_0x286a8e(0x52e)];
    if (_0x54ee92 >= 0x7d0) return VisuMZ[_0x286a8e(0x215)][_0x286a8e(0x55e)]['StatusWindow'][_0x286a8e(0x500)];
    else {
      if (_0x54ee92 >= 0x3e8) return VisuMZ[_0x286a8e(0x215)][_0x286a8e(0x55e)][_0x286a8e(0x29f)][_0x286a8e(0x244)];
      else {
        if (_0x54ee92 > 0x0) return VisuMZ['ItemsEquipsCore'][_0x286a8e(0x55e)][_0x286a8e(0x29f)][_0x286a8e(0x3a5)];
        else {
          if (_0x54ee92 === 0x0) return VisuMZ[_0x286a8e(0x215)]['Settings']['StatusWindow'][_0x286a8e(0x4e4)];
          else {
            if (_0x54ee92 > -0x3e8) return VisuMZ[_0x286a8e(0x215)][_0x286a8e(0x55e)][_0x286a8e(0x29f)][_0x286a8e(0x4a9)];
            else {
              if (_0x54ee92 > -0x7d0) return VisuMZ['ItemsEquipsCore'][_0x286a8e(0x55e)]['StatusWindow'][_0x286a8e(0x20e)];
              else return _0x54ee92 <= -0x7d0 ? VisuMZ['ItemsEquipsCore'][_0x286a8e(0x55e)][_0x286a8e(0x29f)][_0x286a8e(0x344)] : _0x286a8e(0x1fd);
            }
          }
        }
      }
    }
  }),
  (Window_ShopStatus[_0x412469(0x331)]['drawItemSuccessRate'] = function (_0x5de068, _0x4494fe, _0xcc7886) {
    const _0x1d5858 = _0x412469,
      _0x2d4009 = this['getItemSuccessRateLabel']();
    this[_0x1d5858(0x366)](_0x2d4009, _0x5de068, _0x4494fe, _0xcc7886, !![]);
    const _0x2ef301 = this['getItemSuccessRateText']();
    return this[_0x1d5858(0x366)](_0x2ef301, _0x5de068, _0x4494fe, _0xcc7886, ![], _0x1d5858(0x264)), this[_0x1d5858(0x50c)](_0x5de068, _0x4494fe, _0xcc7886), this[_0x1d5858(0x2d0)](), !![];
  }),
  (Window_ShopStatus[_0x412469(0x331)][_0x412469(0x1da)] = function () {
    const _0x1f57a0 = _0x412469;
    return VisuMZ[_0x1f57a0(0x215)][_0x1f57a0(0x55e)]['StatusWindow']['LabelSuccessRate'];
  }),
  (Window_ShopStatus[_0x412469(0x331)][_0x412469(0x224)] = function () {
    const _0x162066 = _0x412469,
      _0x442643 = _0x162066(0x305);
    if (this[_0x162066(0x1e5)][_0x442643]) return this['_customItemInfo'][_0x442643];
    if (Imported[_0x162066(0x32b)]) {
      const _0x225208 = this[_0x162066(0x4d5)]['note'];
      if (_0x225208[_0x162066(0x512)](/<ALWAYS HIT>/i)) return '100%';
      else {
        if (_0x225208[_0x162066(0x512)](/<ALWAYS HIT RATE: (\d+)([%％])>/i)) return _0x162066(0x443)[_0x162066(0x32c)](Number(RegExp['$1']));
      }
    }
    return _0x162066(0x443)[_0x162066(0x32c)](this[_0x162066(0x4d5)][_0x162066(0x528)]);
  }),
  (Window_ShopStatus[_0x412469(0x331)][_0x412469(0x300)] = function (_0xa4c0dd, _0x1eb374, _0xf33fe1) {
    const _0x274f85 = _0x412469,
      _0xb57b9c = this['getItemRepeatsLabel']();
    this[_0x274f85(0x366)](_0xb57b9c, _0xa4c0dd, _0x1eb374, _0xf33fe1, !![]);
    const _0x4c5439 = this[_0x274f85(0x490)]();
    return this['drawItemKeyData'](_0x4c5439, _0xa4c0dd, _0x1eb374, _0xf33fe1, ![], _0x274f85(0x264)), this[_0x274f85(0x50c)](_0xa4c0dd, _0x1eb374, _0xf33fe1), this[_0x274f85(0x2d0)](), !![];
  }),
  (Window_ShopStatus['prototype'][_0x412469(0x5c9)] = function () {
    const _0x3f69a7 = _0x412469;
    return VisuMZ[_0x3f69a7(0x215)][_0x3f69a7(0x55e)]['StatusWindow'][_0x3f69a7(0x4d1)];
  }),
  (Window_ShopStatus['prototype']['getItemRepeatsText'] = function () {
    const _0x577b00 = _0x412469,
      _0x1723f0 = _0x577b00(0x3d5);
    if (this[_0x577b00(0x1e5)][_0x1723f0]) return this[_0x577b00(0x1e5)][_0x1723f0];
    const _0x58ba92 = _0x577b00(0x2c2);
    return _0x58ba92[_0x577b00(0x32c)](this[_0x577b00(0x4d5)][_0x577b00(0x1ba)]);
  }),
  (Window_ShopStatus[_0x412469(0x331)][_0x412469(0x2db)] = function (_0x5c168e, _0x4d4b66, _0x3a0a98) {
    const _0x41175b = _0x412469,
      _0x3941a5 = this['getItemHitTypeLabel']();
    this[_0x41175b(0x366)](_0x3941a5, _0x5c168e, _0x4d4b66, _0x3a0a98, !![]);
    const _0x3aa8bc = this['getItemHitTypeText']();
    return this[_0x41175b(0x366)](_0x3aa8bc, _0x5c168e, _0x4d4b66, _0x3a0a98, ![], _0x41175b(0x264)), this[_0x41175b(0x50c)](_0x5c168e, _0x4d4b66, _0x3a0a98), this['resetFontSettings'](), !![];
  }),
  (Window_ShopStatus['prototype']['getItemHitTypeLabel'] = function () {
    const _0xb571b3 = _0x412469;
    return VisuMZ[_0xb571b3(0x215)][_0xb571b3(0x55e)][_0xb571b3(0x29f)][_0xb571b3(0x2a1)];
  }),
  (Window_ShopStatus[_0x412469(0x331)]['getItemHitTypeText'] = function () {
    const _0xf84b13 = _0x412469,
      _0x8abcca = _0xf84b13(0x298);
    if (this[_0xf84b13(0x1e5)][_0x8abcca]) return this[_0xf84b13(0x1e5)][_0x8abcca];
    if (DataManager['isToggleSkill'] && DataManager['isToggleSkill'](this['_item'])) return TextManager['toggleType'];
    const _0x213b63 = VisuMZ[_0xf84b13(0x215)][_0xf84b13(0x55e)][_0xf84b13(0x29f)],
      _0x413b44 = _0xf84b13(0x5d4)[_0xf84b13(0x32c)](this[_0xf84b13(0x4d5)]['hitType']);
    return _0x213b63[_0x413b44];
  }),
  (Window_ShopStatus['prototype']['drawItemDamage'] = function (_0x3fbf3d, _0x20181c, _0x418221) {
    const _0x1e183d = _0x412469;
    if (this[_0x1e183d(0x4d5)]['damage'][_0x1e183d(0x3fa)] <= 0x0) return _0x20181c;
    if (this['drawItemDamageElement'](_0x3fbf3d, _0x20181c, _0x418221)) _0x20181c += this[_0x1e183d(0x232)]();
    if (this[_0x1e183d(0x5dc)](_0x3fbf3d, _0x20181c, _0x418221)) _0x20181c += this[_0x1e183d(0x232)]();
    return this[_0x1e183d(0x2d0)](), _0x20181c;
  }),
  (Window_ShopStatus[_0x412469(0x331)][_0x412469(0x31a)] = function (_0xedd4a7, _0x8441cb, _0x2764cf) {
    const _0x53122b = _0x412469,
      _0x1a1a59 = this[_0x53122b(0x22c)]();
    this[_0x53122b(0x366)](_0x1a1a59, _0xedd4a7, _0x8441cb, _0x2764cf, !![]);
    const _0x14bcbe = this[_0x53122b(0x230)]();
    return this['drawItemKeyData'](_0x14bcbe, _0xedd4a7, _0x8441cb, _0x2764cf, ![], _0x53122b(0x264)), this[_0x53122b(0x50c)](_0xedd4a7, _0x8441cb, _0x2764cf), this[_0x53122b(0x2d0)](), !![];
  }),
  (Window_ShopStatus[_0x412469(0x331)][_0x412469(0x22c)] = function () {
    const _0x165f79 = _0x412469;
    return VisuMZ['ItemsEquipsCore'][_0x165f79(0x55e)][_0x165f79(0x29f)][_0x165f79(0x596)];
  }),
  (Window_ShopStatus['prototype'][_0x412469(0x230)] = function () {
    const _0x139fe0 = _0x412469,
      _0x1c3990 = 'ELEMENT';
    if (this[_0x139fe0(0x1e5)][_0x1c3990]) return this[_0x139fe0(0x1e5)][_0x1c3990];
    if (this[_0x139fe0(0x4d5)][_0x139fe0(0x557)][_0x139fe0(0x27f)] <= -0x1) return VisuMZ['ItemsEquipsCore'][_0x139fe0(0x55e)][_0x139fe0(0x29f)][_0x139fe0(0x47c)];
    else
      return this[_0x139fe0(0x4d5)]['damage'][_0x139fe0(0x27f)] === 0x0
        ? VisuMZ[_0x139fe0(0x215)][_0x139fe0(0x55e)][_0x139fe0(0x29f)][_0x139fe0(0x3a3)]
        : $dataSystem[_0x139fe0(0x1b8)][this[_0x139fe0(0x4d5)]['damage']['elementId']];
  }),
  (Window_ShopStatus[_0x412469(0x331)]['drawItemDamageAmount'] = function (_0x307c03, _0x91f121, _0x3686e5) {
    const _0x111898 = _0x412469,
      _0x38383d = this['getItemDamageAmountLabel']();
    this[_0x111898(0x366)](_0x38383d, _0x307c03, _0x91f121, _0x3686e5, !![]), this[_0x111898(0x4f5)]();
    const _0x549ff6 = this[_0x111898(0x3c7)](),
      _0x10d1f0 = ColorManager[_0x111898(0x294)]([0x0, 0x0, 0x2, 0x1, 0x3, 0x1, 0x3][this[_0x111898(0x4d5)][_0x111898(0x557)][_0x111898(0x3fa)]]);
    return (
      this[_0x111898(0x45d)](_0x10d1f0),
      this[_0x111898(0x366)](_0x549ff6, _0x307c03, _0x91f121, _0x3686e5, ![], _0x111898(0x264)),
      this[_0x111898(0x50c)](_0x307c03, _0x91f121, _0x3686e5),
      this['resetFontSettings'](),
      !![]
    );
  }),
  (Window_ShopStatus[_0x412469(0x331)]['getItemDamageAmountLabel'] = function () {
    const _0xe8fe31 = _0x412469;
    return Imported[_0xe8fe31(0x32b)] && DataManager[_0xe8fe31(0x376)](this[_0xe8fe31(0x4d5)]) !== _0xe8fe31(0x4f2) ? this[_0xe8fe31(0x532)]() : this[_0xe8fe31(0x1dc)]();
  }),
  (Window_ShopStatus[_0x412469(0x331)]['getItemDamageAmountLabelOriginal'] = function () {
    const _0x380b23 = _0x412469,
      _0x13c0a7 = VisuMZ['ItemsEquipsCore']['Settings'][_0x380b23(0x29f)],
      _0x150f64 = _0x380b23(0x2da)[_0x380b23(0x32c)](this[_0x380b23(0x4d5)][_0x380b23(0x557)]['type']),
      _0x248b2c = [null, TextManager['hp'], TextManager['mp'], TextManager['hp'], TextManager['mp'], TextManager['hp'], TextManager['mp']][this[_0x380b23(0x4d5)]['damage'][_0x380b23(0x3fa)]];
    return _0x13c0a7[_0x150f64][_0x380b23(0x32c)](_0x248b2c);
  }),
  (Window_ShopStatus[_0x412469(0x331)]['setupItemDamageTempActors'] = function () {
    const _0x19a301 = _0x412469,
      _0x24b0e3 = $gameActors[_0x19a301(0x4b6)](0x1);
    (this[_0x19a301(0x2c7)] = JsonEx[_0x19a301(0x42b)](_0x24b0e3)), (this[_0x19a301(0x33e)] = JsonEx[_0x19a301(0x42b)](_0x24b0e3));
  }),
  (Window_ShopStatus['prototype']['getItemDamageAmountText'] = function () {
    const _0x4a7deb = _0x412469,
      _0x5c4c9c = _0x4a7deb(0x349);
    if (this[_0x4a7deb(0x1e5)][_0x5c4c9c]) return this[_0x4a7deb(0x1e5)][_0x5c4c9c];
    return Imported[_0x4a7deb(0x32b)] && DataManager[_0x4a7deb(0x376)](this[_0x4a7deb(0x4d5)]) !== _0x4a7deb(0x4f2) ? this[_0x4a7deb(0x554)]() : this[_0x4a7deb(0x410)]();
  }),
  (Window_ShopStatus['prototype']['getItemDamageAmountTextOriginal'] = function () {
    const _0x1b31ac = _0x412469;
    (window['a'] = this[_0x1b31ac(0x2c7)]),
      (window['b'] = this[_0x1b31ac(0x33e)]),
      this[_0x1b31ac(0x2c7)][_0x1b31ac(0x3a6)](!![]),
      this['_tempActorB'][_0x1b31ac(0x3a6)]([0x3, 0x4][_0x1b31ac(0x5a9)](this[_0x1b31ac(0x4d5)]['damage'][_0x1b31ac(0x3fa)]));
    let _0x3653e9 = this[_0x1b31ac(0x4d5)][_0x1b31ac(0x557)][_0x1b31ac(0x3e3)];
    try {
      const _0x3007fd = Math[_0x1b31ac(0x261)](eval(_0x3653e9), 0x0) / window['a']['atk'];
      return this['revertGlobalNamespaceVariables'](), isNaN(_0x3007fd) ? _0x1b31ac(0x1fd) : _0x1b31ac(0x443)[_0x1b31ac(0x32c)](Math[_0x1b31ac(0x1c0)](_0x3007fd * 0x64));
    } catch (_0x2fb349) {
      return (
        $gameTemp[_0x1b31ac(0x362)]() && (console[_0x1b31ac(0x36e)](_0x1b31ac(0x3e8)[_0x1b31ac(0x32c)](this[_0x1b31ac(0x4d5)][_0x1b31ac(0x412)])), console[_0x1b31ac(0x36e)](_0x2fb349)),
        this[_0x1b31ac(0x5e8)](),
        '?????'
      );
    }
  }),
  (Window_ShopStatus[_0x412469(0x331)][_0x412469(0x5e8)] = function () {
    (window['a'] = undefined), (window['b'] = undefined);
  }),
  (Window_ShopStatus[_0x412469(0x331)]['drawItemEffects'] = function (_0x319f8c, _0x30431b, _0xa0c145) {
    const _0x33d809 = _0x412469;
    if (!this[_0x33d809(0x2f2)]()) return _0x30431b;
    if (this[_0x33d809(0x1aa)](_0x319f8c, _0x30431b, _0xa0c145)) _0x30431b += this[_0x33d809(0x232)]();
    if (this[_0x33d809(0x293)](_0x319f8c, _0x30431b, _0xa0c145)) _0x30431b += this[_0x33d809(0x232)]();
    if (this[_0x33d809(0x3d6)](_0x319f8c, _0x30431b, _0xa0c145)) _0x30431b += this[_0x33d809(0x232)]();
    if (this['drawItemEffectsHpDamage'](_0x319f8c, _0x30431b, _0xa0c145)) _0x30431b += this['lineHeight']();
    if (this[_0x33d809(0x5f4)](_0x319f8c, _0x30431b, _0xa0c145)) _0x30431b += this['lineHeight']();
    if (this[_0x33d809(0x55f)](_0x319f8c, _0x30431b, _0xa0c145)) _0x30431b += this[_0x33d809(0x232)]();
    if (this['drawItemEffectsSelfTpGain'](_0x319f8c, _0x30431b, _0xa0c145)) _0x30431b += this[_0x33d809(0x232)]();
    if (this['drawItemEffectsAddedStatesBuffs'](_0x319f8c, _0x30431b, _0xa0c145)) _0x30431b += this[_0x33d809(0x232)]();
    if (this[_0x33d809(0x25f)](_0x319f8c, _0x30431b, _0xa0c145)) _0x30431b += this[_0x33d809(0x232)]();
    return this[_0x33d809(0x2d0)](), _0x30431b;
  }),
  (Window_ShopStatus[_0x412469(0x331)][_0x412469(0x2c3)] = function () {
    const _0x1b48bf = _0x412469;
    return this[_0x1b48bf(0x4d5)][_0x1b48bf(0x3fd)];
  }),
  (Window_ShopStatus['prototype']['makeItemData'] = function () {
    const _0x3d72f8 = _0x412469;
    let _0xd3560a = ![];
    this[_0x3d72f8(0x1c5)] = {
      rateHP: 0x0,
      flatHP: 0x0,
      rateMP: 0x0,
      flatMP: 0x0,
      gainTP: 0x0,
      selfTP: 0x0,
      addState: [],
      removeState: [],
      changeBuff: [0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0],
      removeBuff: [],
      removeDebuff: [],
      addStateBuffChanges: ![],
      removeStateBuffChanges: ![],
    };
    const _0x2e99cd = this[_0x3d72f8(0x2c3)]();
    for (const _0x58f624 of _0x2e99cd) {
      switch (_0x58f624[_0x3d72f8(0x478)]) {
        case Game_Action[_0x3d72f8(0x53b)]:
          (this[_0x3d72f8(0x1c5)][_0x3d72f8(0x4bc)] += _0x58f624[_0x3d72f8(0x361)]), (this[_0x3d72f8(0x1c5)][_0x3d72f8(0x5b7)] += _0x58f624[_0x3d72f8(0x1f4)]), (_0xd3560a = !![]);
          break;
        case Game_Action[_0x3d72f8(0x5c6)]:
          (this[_0x3d72f8(0x1c5)][_0x3d72f8(0x40d)] += _0x58f624['value1']), (this[_0x3d72f8(0x1c5)][_0x3d72f8(0x3e1)] += _0x58f624[_0x3d72f8(0x1f4)]), (_0xd3560a = !![]);
          break;
        case Game_Action[_0x3d72f8(0x311)]:
          (this[_0x3d72f8(0x1c5)][_0x3d72f8(0x480)] += _0x58f624['value1']), (_0xd3560a = !![]);
          break;
        case Game_Action[_0x3d72f8(0x5c1)]:
          this[_0x3d72f8(0x1c5)][_0x3d72f8(0x517)][_0x3d72f8(0x437)](_0x58f624[_0x3d72f8(0x319)]), (_0xd3560a = !![]);
          break;
        case Game_Action[_0x3d72f8(0x417)]:
          this[_0x3d72f8(0x1c5)]['removeState']['push'](_0x58f624[_0x3d72f8(0x319)]), (this[_0x3d72f8(0x1c5)][_0x3d72f8(0x30a)] = !![]), (_0xd3560a = !![]);
          break;
        case Game_Action[_0x3d72f8(0x3f0)]:
          (this[_0x3d72f8(0x1c5)][_0x3d72f8(0x3fe)][_0x58f624['dataId']] += 0x1), (_0xd3560a = !![]);
          break;
        case Game_Action[_0x3d72f8(0x54e)]:
          (this['_itemData'][_0x3d72f8(0x3fe)][_0x58f624[_0x3d72f8(0x319)]] -= 0x1), (_0xd3560a = !![]);
          break;
        case Game_Action[_0x3d72f8(0x5a4)]:
          this['_itemData'][_0x3d72f8(0x276)][_0x3d72f8(0x437)](_0x58f624[_0x3d72f8(0x319)]), (this[_0x3d72f8(0x1c5)][_0x3d72f8(0x30a)] = !![]), (_0xd3560a = !![]);
          break;
        case Game_Action[_0x3d72f8(0x310)]:
          this[_0x3d72f8(0x1c5)][_0x3d72f8(0x278)][_0x3d72f8(0x437)](_0x58f624[_0x3d72f8(0x319)]), (this[_0x3d72f8(0x1c5)][_0x3d72f8(0x30a)] = !![]), (_0xd3560a = !![]);
          break;
      }
    }
    if (this[_0x3d72f8(0x1c5)][_0x3d72f8(0x517)][_0x3d72f8(0x1ec)] > 0x0) this[_0x3d72f8(0x1c5)]['addStateBuffChanges'] = !![];
    for (let _0x346834 = 0x0; _0x346834 < this[_0x3d72f8(0x1c5)][_0x3d72f8(0x3fe)][_0x3d72f8(0x1ec)]; _0x346834++) {
      if (this['_itemData'][_0x3d72f8(0x3fe)][_0x346834] !== 0x0) this[_0x3d72f8(0x1c5)][_0x3d72f8(0x390)] = !![];
    }
    this[_0x3d72f8(0x4d5)][_0x3d72f8(0x5b0)] !== 0x0 && ((this[_0x3d72f8(0x1c5)][_0x3d72f8(0x1ab)] = this[_0x3d72f8(0x4d5)][_0x3d72f8(0x5b0)]), (_0xd3560a = !![]));
    const _0x39fd26 = [_0x3d72f8(0x5e3), _0x3d72f8(0x5da), _0x3d72f8(0x38d), _0x3d72f8(0x53a), _0x3d72f8(0x463), _0x3d72f8(0x342), _0x3d72f8(0x5a8), _0x3d72f8(0x459), _0x3d72f8(0x348)];
    for (const _0x1e5daa of _0x39fd26) {
      if (this[_0x3d72f8(0x1e5)][_0x1e5daa]) {
        _0xd3560a = !![];
        break;
      }
    }
    return _0xd3560a;
  }),
  (Window_ShopStatus[_0x412469(0x331)]['drawItemEffectsHpRecovery'] = function (_0x4da4b7, _0x2396b4, _0x4400bf) {
    const _0x5985a0 = _0x412469,
      _0xf13cd4 = 'HP\x20RECOVERY';
    if (this[_0x5985a0(0x1c5)][_0x5985a0(0x4bc)] <= 0x0 && this[_0x5985a0(0x1c5)]['flatHP'] <= 0x0 && !this[_0x5985a0(0x1e5)][_0xf13cd4]) return ![];
    const _0xe573b0 = this['getItemEffectsHpRecoveryLabel']();
    this[_0x5985a0(0x366)](_0xe573b0, _0x4da4b7, _0x2396b4, _0x4400bf, !![]);
    const _0x52047d = this[_0x5985a0(0x4ae)]();
    return (
      this['changeTextColor'](ColorManager['damageColor'](0x1)),
      this[_0x5985a0(0x366)](_0x52047d, _0x4da4b7, _0x2396b4, _0x4400bf, ![], _0x5985a0(0x264)),
      this[_0x5985a0(0x50c)](_0x4da4b7, _0x2396b4, _0x4400bf),
      this[_0x5985a0(0x2d0)](),
      !![]
    );
  }),
  (Window_ShopStatus[_0x412469(0x331)][_0x412469(0x301)] = function () {
    const _0x106b55 = _0x412469,
      _0xdf1ff = VisuMZ[_0x106b55(0x215)][_0x106b55(0x55e)][_0x106b55(0x29f)]['LabelRecoverHP'];
    return _0xdf1ff[_0x106b55(0x32c)](TextManager['hp']);
  }),
  (Window_ShopStatus[_0x412469(0x331)]['getItemEffectsHpRecoveryText'] = function () {
    const _0x161748 = _0x412469,
      _0x18129d = _0x161748(0x5e3);
    if (this[_0x161748(0x1e5)][_0x18129d]) return this[_0x161748(0x1e5)][_0x18129d];
    let _0x568172 = '';
    if (this['_itemData']['rateHP'] > 0x0) _0x568172 += _0x161748(0x57d)['format'](Math[_0x161748(0x44d)](this[_0x161748(0x1c5)]['rateHP'] * 0x64));
    if (this[_0x161748(0x1c5)]['rateHP'] > 0x0 && this['_itemData']['flatHP'] > 0x0) _0x568172 += '\x20';
    if (this[_0x161748(0x1c5)][_0x161748(0x5b7)] > 0x0) _0x568172 += _0x161748(0x3f9)['format'](this[_0x161748(0x1c5)]['flatHP']);
    return _0x568172;
  }),
  (Window_ShopStatus['prototype']['drawItemEffectsMpRecovery'] = function (_0x266bbb, _0x91b299, _0xeaf6e9) {
    const _0xff403b = _0x412469,
      _0x5b6169 = _0xff403b(0x5da);
    if (this['_itemData'][_0xff403b(0x40d)] <= 0x0 && this[_0xff403b(0x1c5)]['flatMP'] <= 0x0 && !this[_0xff403b(0x1e5)][_0x5b6169]) return ![];
    const _0x5a7d74 = this['getItemEffectsMpRecoveryLabel']();
    this[_0xff403b(0x366)](_0x5a7d74, _0x266bbb, _0x91b299, _0xeaf6e9, !![]);
    const _0x2dc5de = this['getItemEffectsMpRecoveryText']();
    return (
      this[_0xff403b(0x45d)](ColorManager[_0xff403b(0x294)](0x3)),
      this[_0xff403b(0x366)](_0x2dc5de, _0x266bbb, _0x91b299, _0xeaf6e9, ![], 'right'),
      this[_0xff403b(0x50c)](_0x266bbb, _0x91b299, _0xeaf6e9),
      this['resetFontSettings'](),
      !![]
    );
  }),
  (Window_ShopStatus[_0x412469(0x331)][_0x412469(0x3b2)] = function () {
    const _0xd6e1d6 = _0x412469,
      _0x379ddb = VisuMZ['ItemsEquipsCore'][_0xd6e1d6(0x55e)][_0xd6e1d6(0x29f)][_0xd6e1d6(0x21a)];
    return _0x379ddb['format'](TextManager['mp']);
  }),
  (Window_ShopStatus['prototype'][_0x412469(0x1f8)] = function () {
    const _0x4bb43d = _0x412469,
      _0x5aaeff = _0x4bb43d(0x5da);
    if (this[_0x4bb43d(0x1e5)][_0x5aaeff]) return this[_0x4bb43d(0x1e5)][_0x5aaeff];
    let _0x1ef10c = '';
    if (this[_0x4bb43d(0x1c5)][_0x4bb43d(0x40d)] > 0x0) _0x1ef10c += _0x4bb43d(0x57d)[_0x4bb43d(0x32c)](Math[_0x4bb43d(0x44d)](this[_0x4bb43d(0x1c5)][_0x4bb43d(0x40d)] * 0x64));
    if (this[_0x4bb43d(0x1c5)]['rateMP'] > 0x0 && this[_0x4bb43d(0x1c5)][_0x4bb43d(0x3e1)] > 0x0) _0x1ef10c += '\x20';
    if (this[_0x4bb43d(0x1c5)][_0x4bb43d(0x3e1)] > 0x0) _0x1ef10c += _0x4bb43d(0x3f9)[_0x4bb43d(0x32c)](this['_itemData'][_0x4bb43d(0x3e1)]);
    return _0x1ef10c;
  }),
  (Window_ShopStatus[_0x412469(0x331)][_0x412469(0x3d6)] = function (_0x4e6d95, _0x455534, _0x49891) {
    const _0x434bfc = _0x412469,
      _0x3b853d = 'TP\x20RECOVERY';
    if (this[_0x434bfc(0x1c5)]['gainTP'] <= 0x0 && !this[_0x434bfc(0x1e5)][_0x3b853d]) return ![];
    const _0x432ca4 = this[_0x434bfc(0x58c)]();
    this[_0x434bfc(0x366)](_0x432ca4, _0x4e6d95, _0x455534, _0x49891, !![]);
    const _0x497110 = this[_0x434bfc(0x54c)]();
    return (
      this['changeTextColor'](ColorManager[_0x434bfc(0x414)]()),
      this[_0x434bfc(0x366)](_0x497110, _0x4e6d95, _0x455534, _0x49891, ![], 'right'),
      this[_0x434bfc(0x50c)](_0x4e6d95, _0x455534, _0x49891),
      this[_0x434bfc(0x2d0)](),
      !![]
    );
  }),
  (Window_ShopStatus[_0x412469(0x331)]['getItemEffectsTpRecoveryLabel'] = function () {
    const _0x3cd170 = _0x412469,
      _0x2fa15c = VisuMZ[_0x3cd170(0x215)][_0x3cd170(0x55e)][_0x3cd170(0x29f)][_0x3cd170(0x2ce)];
    return _0x2fa15c['format'](TextManager['tp']);
  }),
  (Window_ShopStatus[_0x412469(0x331)][_0x412469(0x54c)] = function () {
    const _0x247f20 = _0x412469,
      _0xd68963 = _0x247f20(0x38d);
    if (this['_customItemInfo'][_0xd68963]) return this[_0x247f20(0x1e5)][_0xd68963];
    let _0x2bbf7d = '';
    return (_0x2bbf7d += _0x247f20(0x3f9)[_0x247f20(0x32c)](this[_0x247f20(0x1c5)][_0x247f20(0x480)])), _0x2bbf7d;
  }),
  (Window_ShopStatus[_0x412469(0x331)][_0x412469(0x496)] = function (_0x59cf2b, _0x283a1a, _0x1c7ec5) {
    const _0x310a6b = _0x412469,
      _0x2c23ac = _0x310a6b(0x5a8);
    if (this[_0x310a6b(0x1c5)][_0x310a6b(0x1ab)] === 0x0 && !this[_0x310a6b(0x1e5)][_0x2c23ac]) return ![];
    const _0x1fb66e = this[_0x310a6b(0x4d4)]();
    this['drawItemKeyData'](_0x1fb66e, _0x59cf2b, _0x283a1a, _0x1c7ec5, !![]);
    const _0x54c621 = this['getItemEffectsSelfTpGainText']();
    return (
      this[_0x310a6b(0x1c5)][_0x310a6b(0x1ab)] > 0x0 ? this[_0x310a6b(0x45d)](ColorManager[_0x310a6b(0x414)]()) : this[_0x310a6b(0x45d)](ColorManager['powerDownColor']()),
      this['drawItemKeyData'](_0x54c621, _0x59cf2b, _0x283a1a, _0x1c7ec5, ![], 'right'),
      this[_0x310a6b(0x50c)](_0x59cf2b, _0x283a1a, _0x1c7ec5),
      this[_0x310a6b(0x2d0)](),
      !![]
    );
  }),
  (Window_ShopStatus[_0x412469(0x331)]['getItemEffectsSelfTpGainLabel'] = function () {
    const _0xa64092 = _0x412469,
      _0x44ca67 = VisuMZ[_0xa64092(0x215)][_0xa64092(0x55e)][_0xa64092(0x29f)][_0xa64092(0x2cb)];
    return _0x44ca67[_0xa64092(0x32c)](TextManager['tp']);
  }),
  (Window_ShopStatus[_0x412469(0x331)][_0x412469(0x203)] = function () {
    const _0x198937 = _0x412469,
      _0x3e933a = _0x198937(0x5a8);
    if (this[_0x198937(0x1e5)][_0x3e933a]) return this['_customItemInfo'][_0x3e933a];
    let _0x52cba7 = '';
    return (
      this[_0x198937(0x1c5)][_0x198937(0x1ab)] > 0x0
        ? (_0x52cba7 += _0x198937(0x3f9)[_0x198937(0x32c)](this[_0x198937(0x1c5)][_0x198937(0x1ab)]))
        : (_0x52cba7 += '%1'[_0x198937(0x32c)](this[_0x198937(0x1c5)][_0x198937(0x1ab)])),
      _0x52cba7
    );
  }),
  (Window_ShopStatus[_0x412469(0x331)][_0x412469(0x371)] = function (_0x3a4be5, _0x3499c0, _0x81aea) {
    const _0x111015 = _0x412469,
      _0x1f40f3 = _0x111015(0x53a);
    if (this[_0x111015(0x1c5)][_0x111015(0x4bc)] >= 0x0 && this['_itemData'][_0x111015(0x5b7)] >= 0x0 && !this[_0x111015(0x1e5)][_0x1f40f3]) return ![];
    const _0x28df6a = this[_0x111015(0x433)]();
    this['drawItemKeyData'](_0x28df6a, _0x3a4be5, _0x3499c0, _0x81aea, !![]);
    const _0x37f98b = this['getItemEffectsHpDamageText']();
    return (
      this[_0x111015(0x45d)](ColorManager[_0x111015(0x294)](0x0)),
      this[_0x111015(0x366)](_0x37f98b, _0x3a4be5, _0x3499c0, _0x81aea, ![], _0x111015(0x264)),
      this[_0x111015(0x50c)](_0x3a4be5, _0x3499c0, _0x81aea),
      this[_0x111015(0x2d0)](),
      !![]
    );
  }),
  (Window_ShopStatus[_0x412469(0x331)][_0x412469(0x433)] = function () {
    const _0x39f50a = _0x412469,
      _0x55cae9 = VisuMZ[_0x39f50a(0x215)]['Settings'][_0x39f50a(0x29f)][_0x39f50a(0x432)];
    return _0x55cae9['format'](TextManager['hp']);
  }),
  (Window_ShopStatus[_0x412469(0x331)]['getItemEffectsHpDamageText'] = function () {
    const _0x259b71 = _0x412469,
      _0x4b8295 = _0x259b71(0x53a);
    if (this[_0x259b71(0x1e5)][_0x4b8295]) return this[_0x259b71(0x1e5)][_0x4b8295];
    let _0x1c6bd3 = '';
    if (this[_0x259b71(0x1c5)][_0x259b71(0x4bc)] < 0x0) _0x1c6bd3 += _0x259b71(0x443)[_0x259b71(0x32c)](Math['floor'](this[_0x259b71(0x1c5)][_0x259b71(0x4bc)] * 0x64));
    if (this[_0x259b71(0x1c5)][_0x259b71(0x4bc)] < 0x0 && this[_0x259b71(0x1c5)][_0x259b71(0x5b7)] < 0x0) _0x1c6bd3 += '\x20';
    if (this[_0x259b71(0x1c5)]['flatHP'] < 0x0) _0x1c6bd3 += '%1'[_0x259b71(0x32c)](this[_0x259b71(0x1c5)][_0x259b71(0x5b7)]);
    return _0x1c6bd3;
  }),
  (Window_ShopStatus['prototype'][_0x412469(0x5f4)] = function (_0xa1e016, _0x1b4559, _0x1d9cf5) {
    const _0x33f0ae = _0x412469,
      _0x47a92f = _0x33f0ae(0x463);
    if (this[_0x33f0ae(0x1c5)]['rateMP'] >= 0x0 && this[_0x33f0ae(0x1c5)][_0x33f0ae(0x3e1)] >= 0x0 && !this['_customItemInfo'][_0x47a92f]) return ![];
    const _0x1e1671 = this[_0x33f0ae(0x22d)]();
    this[_0x33f0ae(0x366)](_0x1e1671, _0xa1e016, _0x1b4559, _0x1d9cf5, !![]);
    const _0x3483a6 = this['getItemEffectsMpDamageText']();
    return (
      this['changeTextColor'](ColorManager[_0x33f0ae(0x294)](0x2)),
      this[_0x33f0ae(0x366)](_0x3483a6, _0xa1e016, _0x1b4559, _0x1d9cf5, ![], _0x33f0ae(0x264)),
      this[_0x33f0ae(0x50c)](_0xa1e016, _0x1b4559, _0x1d9cf5),
      this[_0x33f0ae(0x2d0)](),
      !![]
    );
  }),
  (Window_ShopStatus[_0x412469(0x331)]['getItemEffectsMpDamageLabel'] = function () {
    const _0x2629ee = _0x412469,
      _0x28c04c = VisuMZ['ItemsEquipsCore'][_0x2629ee(0x55e)][_0x2629ee(0x29f)][_0x2629ee(0x1df)];
    return _0x28c04c['format'](TextManager['mp']);
  }),
  (Window_ShopStatus[_0x412469(0x331)][_0x412469(0x3e4)] = function () {
    const _0x9b99fb = _0x412469,
      _0x3c486f = _0x9b99fb(0x463);
    if (this['_customItemInfo'][_0x3c486f]) return this[_0x9b99fb(0x1e5)][_0x3c486f];
    let _0x93ecb0 = '';
    if (this[_0x9b99fb(0x1c5)][_0x9b99fb(0x40d)] < 0x0) _0x93ecb0 += _0x9b99fb(0x443)[_0x9b99fb(0x32c)](Math['floor'](this[_0x9b99fb(0x1c5)]['rateMP'] * 0x64));
    if (this[_0x9b99fb(0x1c5)][_0x9b99fb(0x40d)] < 0x0 && this[_0x9b99fb(0x1c5)][_0x9b99fb(0x3e1)] < 0x0) _0x93ecb0 += '\x20';
    if (this['_itemData']['flatMP'] < 0x0) _0x93ecb0 += '%1'[_0x9b99fb(0x32c)](this[_0x9b99fb(0x1c5)][_0x9b99fb(0x3e1)]);
    return _0x93ecb0;
  }),
  (Window_ShopStatus[_0x412469(0x331)][_0x412469(0x55f)] = function (_0x5d2544, _0x56d8cc, _0x150bbe) {
    const _0x432774 = _0x412469,
      _0x445ea2 = _0x432774(0x342);
    if (this[_0x432774(0x1c5)][_0x432774(0x480)] >= 0x0 && !this[_0x432774(0x1e5)][_0x445ea2]) return ![];
    const _0x909d31 = this[_0x432774(0x2e8)]();
    this[_0x432774(0x366)](_0x909d31, _0x5d2544, _0x56d8cc, _0x150bbe, !![]);
    const _0x3c76c0 = this[_0x432774(0x2af)]();
    return (
      this[_0x432774(0x45d)](ColorManager[_0x432774(0x5d6)]()),
      this['drawItemKeyData'](_0x3c76c0, _0x5d2544, _0x56d8cc, _0x150bbe, ![], _0x432774(0x264)),
      this[_0x432774(0x50c)](_0x5d2544, _0x56d8cc, _0x150bbe),
      this[_0x432774(0x2d0)](),
      !![]
    );
  }),
  (Window_ShopStatus['prototype']['getItemEffectsTpDamageLabel'] = function () {
    const _0x13d397 = _0x412469,
      _0x406af1 = VisuMZ[_0x13d397(0x215)][_0x13d397(0x55e)][_0x13d397(0x29f)][_0x13d397(0x1ef)];
    return _0x406af1[_0x13d397(0x32c)](TextManager['tp']);
  }),
  (Window_ShopStatus[_0x412469(0x331)][_0x412469(0x2af)] = function () {
    const _0x406b6b = _0x412469,
      _0x3a05e6 = _0x406b6b(0x342);
    if (this['_customItemInfo'][_0x3a05e6]) return this['_customItemInfo'][_0x3a05e6];
    let _0x1e9275 = '';
    return (_0x1e9275 += '%1'['format'](this[_0x406b6b(0x1c5)][_0x406b6b(0x480)])), _0x1e9275;
  }),
  (Window_ShopStatus['prototype'][_0x412469(0x542)] = function (_0x81352f, _0x413c98, _0xa03c1a) {
    const _0x1ea9ff = _0x412469,
      _0x34df80 = 'ADDED\x20EFFECTS';
    if (!this[_0x1ea9ff(0x1c5)][_0x1ea9ff(0x390)] && !this[_0x1ea9ff(0x1e5)][_0x34df80]) return ![];
    const _0x1f336b = this[_0x1ea9ff(0x359)]();
    if (_0x1f336b[_0x1ea9ff(0x1ec)] <= 0x0) return ![];
    const _0x35c8a8 = this[_0x1ea9ff(0x3c4)]();
    return (
      this[_0x1ea9ff(0x366)](_0x35c8a8, _0x81352f, _0x413c98, _0xa03c1a, !![]),
      this[_0x1ea9ff(0x366)](_0x1f336b, _0x81352f, _0x413c98, _0xa03c1a, ![], 'right'),
      this['drawItemDarkRect'](_0x81352f, _0x413c98, _0xa03c1a),
      this[_0x1ea9ff(0x2d0)](),
      !![]
    );
  }),
  (Window_ShopStatus[_0x412469(0x331)][_0x412469(0x3c4)] = function () {
    const _0x56e670 = _0x412469;
    return VisuMZ[_0x56e670(0x215)][_0x56e670(0x55e)][_0x56e670(0x29f)][_0x56e670(0x3d7)];
  }),
  (Window_ShopStatus[_0x412469(0x331)][_0x412469(0x359)] = function () {
    const _0x4f6b1b = _0x412469,
      _0x506372 = _0x4f6b1b(0x459);
    if (this[_0x4f6b1b(0x1e5)][_0x506372]) return this[_0x4f6b1b(0x1e5)][_0x506372];
    let _0x42c939 = '',
      _0x10ad7a = 0x0;
    const _0xd3bdf7 = 0x8;
    for (const _0xf2cbee of this['_itemData'][_0x4f6b1b(0x517)]) {
      const _0x520c1e = $dataStates[_0xf2cbee];
      if (_0x520c1e && _0x520c1e[_0x4f6b1b(0x314)] > 0x0) {
        (_0x42c939 += _0x4f6b1b(0x570)['format'](_0x520c1e[_0x4f6b1b(0x314)])), _0x10ad7a++;
        if (_0x10ad7a >= _0xd3bdf7) return _0x42c939;
      }
    }
    for (let _0x3056ac = 0x0; _0x3056ac < this[_0x4f6b1b(0x1c5)][_0x4f6b1b(0x3fe)]['length']; _0x3056ac++) {
      const _0x1e5aef = this['_itemData'][_0x4f6b1b(0x3fe)][_0x3056ac],
        _0x4104ee = Game_BattlerBase[_0x4f6b1b(0x331)][_0x4f6b1b(0x581)](_0x1e5aef, _0x3056ac);
      if (_0x4104ee > 0x0) {
        (_0x42c939 += _0x4f6b1b(0x570)['format'](_0x4104ee)), _0x10ad7a++;
        if (_0x10ad7a >= _0xd3bdf7) return _0x42c939;
      }
    }
    return _0x42c939;
  }),
  (Window_ShopStatus[_0x412469(0x331)][_0x412469(0x25f)] = function (_0x55cec2, _0x3c611a, _0x238bbc) {
    const _0x580304 = _0x412469,
      _0x1632f8 = _0x580304(0x348);
    if (!this[_0x580304(0x1c5)][_0x580304(0x30a)] && !this[_0x580304(0x1e5)][_0x1632f8]) return ![];
    const _0x3a1230 = this['getItemEffectsRemovedStatesBuffsLabel']();
    this['drawItemKeyData'](_0x3a1230, _0x55cec2, _0x3c611a, _0x238bbc, !![]);
    const _0x505cc0 = this['getItemEffectsRemovedStatesBuffsText']();
    return this[_0x580304(0x366)](_0x505cc0, _0x55cec2, _0x3c611a, _0x238bbc, ![], _0x580304(0x264)), this[_0x580304(0x50c)](_0x55cec2, _0x3c611a, _0x238bbc), this[_0x580304(0x2d0)](), !![];
  }),
  (Window_ShopStatus[_0x412469(0x331)][_0x412469(0x458)] = function () {
    const _0x59411d = _0x412469;
    return VisuMZ[_0x59411d(0x215)][_0x59411d(0x55e)][_0x59411d(0x29f)][_0x59411d(0x41f)];
  }),
  (Window_ShopStatus[_0x412469(0x331)][_0x412469(0x1b2)] = function () {
    const _0x3d143b = _0x412469,
      _0x346257 = _0x3d143b(0x348);
    if (this[_0x3d143b(0x1e5)][_0x346257]) return this[_0x3d143b(0x1e5)][_0x346257];
    let _0x37fce9 = '',
      _0x28b4c9 = 0x0;
    const _0x29d19c = VisuMZ[_0x3d143b(0x215)][_0x3d143b(0x55e)][_0x3d143b(0x29f)][_0x3d143b(0x312)];
    for (const _0xd39e71 of this['_itemData'][_0x3d143b(0x3bf)]) {
      const _0x108ed2 = $dataStates[_0xd39e71];
      if (_0x108ed2 && _0x108ed2[_0x3d143b(0x314)] > 0x0) {
        (_0x37fce9 += _0x3d143b(0x570)[_0x3d143b(0x32c)](_0x108ed2[_0x3d143b(0x314)])), _0x28b4c9++;
        if (_0x28b4c9 >= _0x29d19c) return _0x37fce9;
      }
    }
    for (let _0x2ed581 = 0x0; _0x2ed581 < this['_itemData'][_0x3d143b(0x276)][_0x3d143b(0x1ec)]; _0x2ed581++) {
      const _0x132ade = this[_0x3d143b(0x1c5)][_0x3d143b(0x276)][_0x2ed581],
        _0x328786 = Game_BattlerBase[_0x3d143b(0x331)][_0x3d143b(0x581)](0x1, _0x132ade);
      if (_0x328786 > 0x0) {
        (_0x37fce9 += _0x3d143b(0x570)[_0x3d143b(0x32c)](_0x328786)), _0x28b4c9++;
        if (_0x28b4c9 >= _0x29d19c) return _0x37fce9;
      }
    }
    for (let _0x56a396 = 0x0; _0x56a396 < this['_itemData'][_0x3d143b(0x278)][_0x3d143b(0x1ec)]; _0x56a396++) {
      const _0x260344 = this['_itemData'][_0x3d143b(0x278)][_0x56a396],
        _0x37cc20 = Game_BattlerBase['prototype'][_0x3d143b(0x581)](-0x1, _0x260344);
      if (_0x37cc20 > 0x0) {
        (_0x37fce9 += _0x3d143b(0x570)['format'](_0x37cc20)), _0x28b4c9++;
        if (_0x28b4c9 >= _0x29d19c) return _0x37fce9;
      }
    }
    return _0x37fce9;
  }),
  (Window_ShopStatus[_0x412469(0x331)][_0x412469(0x2fe)] = function (_0x5c4613, _0x432ae7, _0x7e1538) {
    const _0x3f7267 = _0x412469;
    if (this[_0x3f7267(0x4d5)][_0x3f7267(0x5a7)][_0x3f7267(0x512)](/<CUSTOM STATUS INFO>\s*([\s\S]*)\s*<\/CUSTOM STATUS INFO>/i)) {
      const _0x5b1e4d = String(RegExp['$1'])['split'](/[\r\n]+/);
      for (const _0x17c171 of _0x5b1e4d) {
        if (_0x17c171[_0x3f7267(0x512)](/(.*):[ ](.*)/i)) {
          const _0x29974c = String(RegExp['$1'])[_0x3f7267(0x5ed)](),
            _0x3d65d0 = String(RegExp['$2'])[_0x3f7267(0x5ed)]();
          this[_0x3f7267(0x502)](_0x29974c, _0x3d65d0, _0x5c4613, _0x432ae7, _0x7e1538), (_0x432ae7 += this[_0x3f7267(0x232)]());
        }
      }
    }
    return this[_0x3f7267(0x2d0)](), _0x432ae7;
  }),
  (Window_ShopStatus['prototype']['drawItemCustomEntryLine'] = function (_0x5e4ac3, _0x1c9878, _0x4cadd3, _0x8f77dc, _0x2b7ed5) {
    const _0x45137b = _0x412469;
    this[_0x45137b(0x366)](_0x5e4ac3, _0x4cadd3, _0x8f77dc, _0x2b7ed5, !![]),
      this[_0x45137b(0x366)](_0x1c9878, _0x4cadd3, _0x8f77dc, _0x2b7ed5, ![], 'right'),
      this[_0x45137b(0x50c)](_0x4cadd3, _0x8f77dc, _0x2b7ed5),
      this[_0x45137b(0x2d0)]();
  }),
  (Window_ShopStatus['prototype'][_0x412469(0x5be)] = function () {
    const _0x9e8965 = _0x412469;
    if (!this['_item']) return;
    const _0x129439 = this[_0x9e8965(0x4d5)][_0x9e8965(0x5a7)],
      _0x406239 = /<SHOP (?:PICTURE|IMAGE|PICTURE NAME|PICTURE FILENAME|IMAGE NAME|IMAGE FILENAME):[ ](.*)>/gi,
      _0x50d42c = _0x129439[_0x9e8965(0x512)](_0x406239);
    if (_0x50d42c)
      for (const _0xcffd48 of _0x50d42c) {
        _0xcffd48['match'](_0x406239);
        const _0x34bdb8 = String(RegExp['$1'])[_0x9e8965(0x5ed)]() || '';
        if (_0x34bdb8 === '') continue;
        const _0x2b846c = ImageManager[_0x9e8965(0x538)](_0x34bdb8);
        _0x2b846c[_0x9e8965(0x46e)](this['drawCustomShopGraphicLoad'][_0x9e8965(0x3ec)](this, _0x2b846c, this[_0x9e8965(0x4d5)]));
      }
  }),
  (Window_ShopStatus[_0x412469(0x331)][_0x412469(0x313)] = function (_0x7af77a, _0x2a927a) {
    const _0x2afb9c = _0x412469;
    if (this[_0x2afb9c(0x4d5)] !== _0x2a927a) return;
    if (!_0x7af77a) return;
    if (_0x7af77a[_0x2afb9c(0x2fa)] <= 0x0 || _0x7af77a[_0x2afb9c(0x563)] <= 0x0) return;
    const _0x113a7d = _0x2a927a[_0x2afb9c(0x5a7)];
    let _0x34e162 = _0x2afb9c(0x3dd);
    _0x113a7d[_0x2afb9c(0x512)](/<SHOP (?:PICTURE|IMAGE) LAYER:[ ]FOREGROUND>/i) && (_0x34e162 = _0x2afb9c(0x526));
    const _0x490486 = _0x34e162 === _0x2afb9c(0x3dd) ? this[_0x2afb9c(0x35a)] : this[_0x2afb9c(0x468)];
    let _0x2bd29d = this[_0x2afb9c(0x25c)],
      _0x13fa30 = this['innerHeight'];
    _0x113a7d['match'](/<SHOP (?:PICTURE|IMAGE) MAX WIDTH:[ ](\d+)>/i) && (_0x2bd29d = Number(RegExp['$1']));
    _0x113a7d[_0x2afb9c(0x512)](/<SHOP (?:PICTURE|IMAGE) MAX HEIGHT:[ ](\d+)>/i) && (_0x13fa30 = Number(RegExp['$1']));
    _0x113a7d[_0x2afb9c(0x512)](/<SHOP (?:PICTURE|IMAGE) MAX DIMENSIONS:[ ](\d+),[ ]*(\d+)>/i) && ((_0x2bd29d = Number(RegExp['$1'])), (_0x13fa30 = Number(RegExp['$2'])));
    const _0xdc1e41 = Math[_0x2afb9c(0x456)](0x1, _0x2bd29d / _0x7af77a[_0x2afb9c(0x2fa)], _0x13fa30 / _0x7af77a[_0x2afb9c(0x563)]);
    let _0x31957f = 0x0,
      _0xca9770 = 0x0,
      _0x34940f = Math[_0x2afb9c(0x44d)](_0x7af77a['width'] * _0xdc1e41),
      _0x349d18 = Math[_0x2afb9c(0x44d)](_0x7af77a[_0x2afb9c(0x563)] * _0xdc1e41),
      _0x3bee99 = _0x2afb9c(0x4ce);
    _0x113a7d[_0x2afb9c(0x512)](/<SHOP (?:PICTURE|IMAGE) (?:ALIGN|ALIGNMENT):[ ](LEFT|CENTER|RIGHT)>/i) && (_0x3bee99 = String(RegExp['$1'])[_0x2afb9c(0x3ea)]()[_0x2afb9c(0x5ed)]());
    if (_0x3bee99 === _0x2afb9c(0x1c9)) _0x31957f = 0x0;
    else _0x3bee99 === 'center' ? (_0x31957f = Math[_0x2afb9c(0x1c0)]((this[_0x2afb9c(0x25c)] - _0x34940f) / 0x2)) : (_0x31957f = this['innerWidth'] - _0x34940f);
    let _0x2058a8 = _0x2afb9c(0x44e);
    _0x113a7d[_0x2afb9c(0x512)](/<SHOP (?:PICTURE|IMAGE) POSITION:[ ](TOP|MIDDLE|BOTTOM)>/i) && (_0x2058a8 = String(RegExp['$1'])['toLowerCase']()['trim']());
    if (_0x2058a8 === 'top') _0xca9770 = 0x0;
    else _0x2058a8 === _0x2afb9c(0x44e) ? (_0xca9770 = Math['round']((this[_0x2afb9c(0x3fc)] - _0x349d18) / 0x2)) : (_0xca9770 = this[_0x2afb9c(0x3fc)] - _0x349d18);
    _0x113a7d['match'](/<SHOP (?:PICTURE|IMAGE) OFFSET X:[ ]([\+\-]\d+)>/i) && (_0x31957f += Number(RegExp['$1']));
    _0x113a7d[_0x2afb9c(0x512)](/<SHOP (?:PICTURE|IMAGE) OFFSET Y:[ ]([\+\-]\d+)>/i) && (_0xca9770 += Number(RegExp['$1']));
    _0x113a7d[_0x2afb9c(0x512)](/<SHOP (?:PICTURE|IMAGE) OFFSET:[ ]([\+\-]\d+),[ ]*([\+\-]\d+)>/i) && ((_0x31957f += Number(RegExp['$1'])), (_0xca9770 += Number(RegExp['$2'])));
    let _0x3781e0 = 0xff;
    if (_0x113a7d[_0x2afb9c(0x512)](/<SHOP (?:PICTURE|IMAGE) OPACITY:[ ](\d+)>/i)) _0x3781e0 = Number(RegExp['$1']);
    else _0x113a7d['match'](/<SHOP (?:PICTURE|IMAGE) OPACITY:[ ](\d+)([%％])>/i) && (_0x3781e0 = Math[_0x2afb9c(0x1c0)](Number(RegExp['$1']) * 0.01 * 0xff)[_0x2afb9c(0x46c)](0x0, 0xff));
    (_0x490486[_0x2afb9c(0x465)] = _0x3781e0),
      _0x490486[_0x2afb9c(0x317)](_0x7af77a, 0x0, 0x0, _0x7af77a[_0x2afb9c(0x2fa)], _0x7af77a['height'], _0x31957f, _0xca9770, _0x34940f, _0x349d18),
      (_0x490486[_0x2afb9c(0x465)] = 0xff);
  }),
  (VisuMZ[_0x412469(0x215)]['deepCopy'] = function (_0x3d72de) {
    const _0x168168 = _0x412469;
    if (_0x3d72de === null || typeof _0x3d72de !== _0x168168(0x38f)) return _0x3d72de;
    const _0x4601e8 = Array[_0x168168(0x1cf)](_0x3d72de) ? [] : Object[_0x168168(0x3ab)](Object['getPrototypeOf'](_0x3d72de));
    for (const _0x5260f0 in _0x3d72de) {
      Object[_0x168168(0x331)]['hasOwnProperty'][_0x168168(0x575)](_0x3d72de, _0x5260f0) &&
        (_0x4601e8[_0x5260f0] =
          typeof _0x3d72de[_0x5260f0] === _0x168168(0x38f) && _0x3d72de[_0x5260f0] !== null ? VisuMZ[_0x168168(0x215)][_0x168168(0x556)](_0x3d72de[_0x5260f0]) : _0x3d72de[_0x5260f0]);
    }
    return _0x4601e8;
  });
