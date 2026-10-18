//=============================================================================
// VisuStella MZ - Skills & States Core
// VisuMZ_1_SkillsStatesCore.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_1_SkillsStatesCore = true;

var VisuMZ = VisuMZ || {};
VisuMZ.SkillsStatesCore = VisuMZ.SkillsStatesCore || {};
VisuMZ.SkillsStatesCore.version = 1.48;

//=============================================================================
/*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 1] [Version 1.48] [SkillsStatesCore]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Skills_and_States_Core_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * The Skills & States Core plugin extends and builds upon the functionality of
 * RPG Maker MZ's inherent skill, state, and buff functionalities and allows
 * game devs to customize its various aspects.
 *
 * Features include all (but not limited to) the following:
 *
 * * Assigning multiple Skill Types to Skills.
 * * Making custom Skill Cost Types (such as HP, Gold, and Items).
 * * Allowing Skill Costs to become percentile-based or dynamic either directly
 *   through the Skills themselves or through trait-like notetags.
 * * Replacing gauges for different classes to display different types of
 *   Skill Cost Type resources.
 * * Hiding/Showing and enabling/disabling skills based on switches, learned
 *   skills, and code.
 * * Setting rulings for states, including if they're cleared upon death, how
 *   reapplying the state affects their turn count, and more.
 * * Allowing states to be categorized and affected by categories, too.
 * * Displaying turn counts on states drawn in the window or on sprites.
 * * Manipulation of state, buff, and debuff turns through skill and item
 *   effect notetags.
 * * Create custom damage over time state calculations through notetags.
 * * Allow database objects to apply passive states to its user.
 * * Passive states can have conditions before they become active as well.
 * * Updated Skill Menu Scene layout to fit more modern appearances.
 * * Added bonus if Items & Equips Core is installed to utilize the Shop Status
 *   Window to display skill data inside the Skill Menu.
 * * Control over various aspects of the Skill Menu Scene.
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
 * Major Changes
 * ============================================================================
 *
 * This plugin adds some new hard-coded features to RPG Maker MZ's functions.
 * The following is a list of them.
 *
 * ---
 *
 * Action End Removal for States
 *
 * - If your Plugin Parameter settings for "Action End Update" are enabled,
 * then "Action End" has been updated so that it actually applies per action
 * used instead of just being at the start of a battler's action set.
 *
 * - However, there are side effects to this: if a state has the "Cannot Move"
 * restriction along with the "Action End" removal timing, then unsurprisingly,
 * the state will never wear off because it's now based on actual actions
 * ending. To offset this and remove confusion, "Action End" auto-removal
 * timings for states with "Cannot Move" restrictions will be turned into
 * "Turn End" auto-removal timings while the "Action End Update" is enabled.
 *
 * - This automatic change won't make it behave like an "Action End" removal
 * timing would, but it's better than completely softlocking a battler.
 *
 * ---
 *
 * Buff & Debuff Level Management
 *
 * - In RPG Maker MZ, buffs and debuffs when applied to one another will shift
 * the buff modifier level up or down. This plugin will add an extra change to
 * the mechanic by making it so that once the buff modifier level reaches a
 * neutral point, the buff or debuff is removed altogether and resets the buff
 * and debuff turn counter for better accuracy.
 *
 * ---
 *
 * Skill Costs
 *
 * - In RPG Maker MZ, skill costs used to be hard-coded. Now, all Skill Cost
 * Types are now moved to the Plugin Parameters, including MP and TP. This
 * means that from payment to checking for them, it's all done through the
 * options available.
 *
 * - By default in RPG Maker MZ, displayed skill costs would only display only
 * one type: TP if available, then MP. If a skill costs both TP and MP, then
 * only TP was displayed. This plugin changes that aspect by displaying all the
 * cost types available in order of the Plugin Parameter Skill Cost Types.
 *
 * - By default in RPG Maker MZ, displayed skill costs were only color-coded.
 * This plugin changes that aspect by displaying the Skill Cost Type's name
 * alongside the cost. This is to help color-blind players distinguish what
 * costs a skill has.
 *
 * ---
 *
 * Sprite Gauges
 *
 * - Sprite Gauges in RPG Maker MZ by default are hard-coded and only work for
 * HP, MP, TP, and Time (used for ATB). This plugin makes it possible for them
 * to be customized through the use of Plugin Parameters under the Skill Cost
 * Types and their related-JavaScript entries.
 *
 * ---
 *
 * State Displays
 *
 * - To put values onto states and display them separately from the state turns
 * you can use the following script calls.
 *
 *   battler.getStateDisplay(stateId)
 *   - This returns whatever value is stored for the specified battler under
 *     that specific state value.
 *   - If there is no value to be returned it will return an empty string.
 *
 *   battler.setStateDisplay(stateId, value)
 *   - This sets the display for the battler's specific state to whatever you
 *     declared as the value.
 *   - The value is best used as a number or a string.
 *
 *   battler.clearStateDisplay(stateId)
 *   - This clears the display for the battler's specific state.
 *   - In short, this sets the stored display value to an empty string.
 *
 * ---
 *
 * Window Functions Moved
 *
 * - Some functions found in RPG Maker MZ's default code for Window_StatusBase
 * and Window_SkillList are now moved to Window_Base to make the functions
 * available throughout all windows for usage.
 *
 * ---
 *
 * ============================================================================
 * Slip Damage Popup Clarification
 * ============================================================================
 *
 * Slip Damage popups only show one popup for HP, MP, and TP each and it is the
 * grand total of all the states and effects combined regardless of the number
 * of states and effects on a battler. This is how it is in vanilla RPG Maker
 * MZ and this is how we intend for it to be with the VisuStella MZ library.
 *
 * This is NOT a bug!
 *
 * The reason we are not changing this is because it does not properly relay
 * information to the player accurately. When multiple popups appear, players
 * only have roughly a second and a half to calculate it all for any form of
 * information takeaway. We feel it is better suited for the player's overall
 * convenience to show a cummulative change and steer the experience towards a
 * more positive one.
 *
 * ============================================================================
 * Passive State Clarification
 * ============================================================================
 *
 * This section will explain various misconceptions regarding passive states.
 * No, passive states do not work the same way as states code-wise. Yes, they
 * use the same effects as states mechanically, but there are differences.
 *
 * ---
 *
 * For those using the code "a.isStateAffected(10)" to check if a target is
 * affected by a state or not, this does NOT check passive states. This only
 * checks for states that were directly applied to the target.
 *
 * This is NOT a bug.
 *
 * Instead, use "a.states().includes($dataStates[10])" to check for them. This
 * code will search for both directly applied states and passive states alike.
 *
 * ---
 *
 * As passive states are NOT considered directly applied to, they do NOT match
 * a Conditional Branch's state check as well. The Conditional Branch effect
 * checks for an affected state.
 *
 * ---
 *
 * Because passive states are NOT directly applied to a battler, the functions
 * of "addNewState", "addState", "eraseState", "removeState" do NOT apply to
 * passive states either. This means that any of the related JS notetags tied
 * to those functions will not occur either.
 *
 * ---
 *
 * Why are passive states not considered affected by? Let's look at it
 * differently. There are two ways to grant skills to actors. They can acquire
 * skills by levels/items/events or they can equip gear that temporarily grants
 * the skill in question.
 *
 * Learning the skill is direct. Temporarily granting the skill is indirect.
 * These two factors have mechanical importance and require differentiation.
 *
 * Regular states and passive states are the same way. Regular states are
 * directly applied, therefore, need to be distinguished in order for things
 * like state turns and steps, removal conditionals, and similar to matter at
 * all. Passive states are indirect and are therefore, unaffected by state
 * turns, steps, and removal conditions. These mechanical differences are
 * important for how RPG Maker works.
 *
 * ---
 *
 * Once again, it is NOT a bug that when using "a.isStateAffected(10)" to
 * check if a target has a passive state will return false.
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
 * === General Skill Notetags ===
 *
 * The following are general notetags that are skill-related.
 *
 * ---
 *
 * <Skill Type: x>
 * <Skill Types: x,x,x>
 *
 * <Skill Type: name>
 * <Skill Types: name, name, name>
 *
 * - Used for: Skill Notetags
 * - Marks the skill to have multiple Skill Types, meaning they would appear
 *   under different skill types without needing to create duplicate skills.
 * - Replace 'x' with a number value representing the Skill Type's ID.
 * - If using 'name' notetag variant, replace 'name' with the Skill Type(s)
 *   name desired to be added.
 *
 * ---
 *
 * <List Name: name>
 *
 * - Used for: Skill Notetags
 * - Makes the name of the skill appear different when show in the skill list.
 * - Using \V[x] as a part of the name will display that variable.
 *
 * ---
 *
 * <ID Sort Priority: x>
 *
 * - Used for: Skill Notetags
 * - Used for Scene_Skill.
 * - Changes sorting priority by ID for skills to 'x'.
 *   - Default priority level is '50'.
 * - Skills with higher priority values will be sorted higher up on the list
 *   while lower values will be lower on the list.
 *
 * ---
 *
 * === Skill Cost Notetags ===
 *
 * The following are notetags that can be used to adjust skill costs. Some of
 * these notetags are added through the Plugin Parameter: Skill Cost Types and
 * can be altered there. This also means that some of these notetags can have
 * their functionality altered and/or removed.
 *
 * ---
 *
 * <type Cost: x>
 * <type Cost: x%>
 *
 * - Used for: Skill Notetags
 * - These notetags are used to designate costs of custom or already existing
 *   types that cannot be made by the Database Editor.
 * - Replace 'type' with a resource type. Existing ones found in the Plugin
 *   Parameters are 'HP', 'MP', 'TP', 'Gold', and 'Potion'. More can be added.
 * - Replace 'x' with a number value to determine the exact type cost value.
 *   This lets you bypass the Database Editor's limit of 9,999 MP and 100 TP.
 * - The 'x%' version is replaced with a percentile value to determine a cost
 *   equal to a % of the type's maximum quantity limit.
 * - Functionality for these notetags can be altered in the Plugin Parameters.
 *
 * Examples:
 *   <HP Cost: 500>
 *   <MP Cost: 25%>
 *   <Gold Cost: 3000>
 *   <Potion Cost: 5>
 *
 * ---
 *
 * <type Cost Max: x>
 * <type Cost Min: x>
 *
 * - Used for: Skill Notetags
 * - These notetags are used to ensure conditional and % costs don't become too
 *   large or too small.
 * - Replace 'type' with a resource type. Existing ones found in the Plugin
 *   Parameters are 'HP', 'MP', 'TP', 'Gold', and 'Potion'. More can be added.
 * - Replace 'x' with a number value to determine the maximum or minimum values
 *   that the cost can be.
 * - Functionality for these notetags can be altered in the Plugin Parameters.
 *
 * Examples:
 *   <HP Cost Max: 1500>
 *   <MP Cost Min: 5>
 *   <Gold Cost Max: 10000>
 *   <Potion Cost Min: 3>
 *
 * ---
 *
 * <type Cost: +x>
 * <type Cost: -x>
 *
 * <type Cost: x%>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - The related actor will raise/lower the cost of any skill that uses the
 *   'type' cost by a specified amount.
 * - Replace 'type' with a resource type. Existing ones found in the Plugin
 *   Parameters are 'HP', 'MP', 'TP', 'Gold', and 'Potion'. More can be added.
 * - For % notetag variant: Replace 'x' with a number value to determine the
 *   rate to adjust the Skill Cost Type by as a rate value. This is applied
 *   before <type Cost: +x> and <type Cost: -x> notetags.
 * - For + and - notetag variants: Replace 'x' with a number value to determine
 *   how much to adjust the Skill Cost Type by as a flat value. This is applied
 *   after <type Cost: x%> notetags.
 * - Functionality for these notetags can be altered in the Plugin Parameters.
 *
 * Examples:
 *   <HP Cost: +20>
 *   <MP Cost: -10>
 *   <Gold Cost: 50%>
 *   <Potion Cost: 200%>
 *
 * ---
 *
 * <Custom Cost Text>
 *  text
 * </Custom Cost Text>
 *
 * - Used for: Skill Notetags
 * - Allows you to insert custom text into the skill's cost area towards the
 *   end of the costs.
 * - Replace 'text' with the text you wish to display.
 * - Text codes may be used.
 *
 * ---
 *
 * === JavaScript Notetags: Skill Costs ===
 *
 * The following are notetags made for users with JavaScript knowledge to
 * determine any dynamic Skill Cost Types used for particular skills.
 *
 * ---
 *
 * <JS type Cost>
 *  code
 *  code
 *  cost = code;
 * </JS type Cost>
 *
 * - Used for: Skill Notetags
 * - Replace 'type' with a resource type. Existing ones found in the Plugin
 *   Parameters are 'HP', 'MP', 'TP', 'Gold', and 'Potion'. More can be added.
 * - Replace 'code' to determine the type 'cost' of the skill.
 * - Insert the final type cost into the 'cost' variable.
 * - The 'user' variable refers to the user about to perform the skill.
 * - The 'skill' variable refers to the skill being used.
 * - Functionality for the notetag can be altered in the Plugin Parameters.
 *
 * ---
 *
 * === Gauge Replacement Notetags ===
 *
 * Certain classes can have their gauges swapped out for other Skill Cost
 * Types. This is especially helpful for the classes that don't utilize those
 * Skill Cost Types. You can mix and match them however you want.
 *
 * ---
 *
 * <Replace HP Gauge: type>
 * <Replace MP Gauge: type>
 * <Replace TP Gauge: type>
 *
 * - Used for: Class Notetags
 * - Replaces the HP (1st), MP (2nd), or TP (3rd) gauge with a different Skill
 *   Cost Type.
 * - Replace 'type' with a resource type. Existing ones found in the Plugin
 *   Parameters are 'HP', 'MP', 'TP', 'Gold', and 'Potion'. More can be added.
 *   - Does not work with 'Item Cost', 'Weapon Cost', or 'Armor Cost'.
 * - Replace 'type' with 'none' to not display any gauges there.
 * - The <Replace TP Gauge: type> will require 'Display TP in Window' setting
 *   to be on in the Database > System 1 tab.
 * - Functionality for the notetags can be altered by changes made to the
 *   Skill & States Core Plugin Parameters.
 *
 * ---
 *
 * === Item Cost-Related Notetags ===
 *
 * ---
 *
 * <Item Cost: x name>
 * <Weapon Cost: x name>
 * <Armor Cost: x name>
 *
 * - Used for: Skill Notetags
 * - The skill will consume items, weapons, and/or armors in order to be used.
 *   - Even non-consumable items will be consumed.
 * - Replace 'x' with a number representing the respective item cost.
 * - Replace 'name' with text representing the respective item, weapon, or
 *   armor to be consumed.
 * - Insert multiples of this notetag to consume multiple items, weapons,
 *   and/or armors.
 * - Functionality for these notetags can be altered in the Plugin Parameters.
 *
 * Examples:
 *
 *   <Item Cost: 5 Magic Water>
 *   <Item Cost: 2 Antidote>
 *   <Weapon Cost: 1 Short Sword>
 *   <Armor Cost: 3 Cloth Armor>
 *
 * ---
 *
 * <Item Cost Max: x name>
 * <Item Cost Min: x name>
 *
 * <Weapon Cost Max: x name>
 * <Weapon Cost Min: x name>
 *
 * <Armor Cost Max: x name>
 * <Armor Cost Min: x name>
 *
 * - Used for: Skill Notetags
 * - Sets up a maximum/minimum cost for the item, weapon, armor type costs.
 * - Replace 'x' with a number representing the maximum or minimum cost.
 * - Replace 'name' with text representing the respective item, weapon, or
 *   armor to be consumed.
 *
 * Examples:
 *
 *   <Item Cost Max: 10 Magic Water>
 *   <Item Cost Min: 2 Antidote>
 *   <Weapon Cost Max: 3 Short Sword>
 *   <Armor Cost Min: 1 Cloth Armor>
 *
 * ---
 *
 * <Item Cost: +x name>
 * <Item Cost: -x name>
 *
 * <Weapon Cost: +x name>
 * <Weapon Cost: -x name>
 *
 * <Armor Cost: +x name>
 * <Armor Cost: -x name>
 *
 * <Item Cost: x% name>
 * <Weapon Cost: x% name>
 * <Armor Cost: x% name>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - The related actor will raise/lower the item, weapon, and/or armor costs of
 *   any skill that costs those items, weapons, and/or armors by x%.
 * - For % notetag variant: Replace 'x' with a number value to determine the
 *   rate to adjust the Skill Cost Type by as a rate value. This is applied
 *   before <type Cost: +x> and <type Cost: -x> notetags.
 * - For + and - notetag variants: Replace 'x' with a number value to determine
 *   how much to adjust the Skill Cost Type by as a flat value. This is applied
 *   after <type Cost: x%> notetags.
 * - Replace 'name' with text representing the respective item, weapon, or
 *   armor to be consumed.
 * - Insert multiples of this notetag to consume multiple items, weapons,
 *   and/or armors.
 * - Functionality for these notetags can be altered in the Plugin Parameters.
 *
 * Examples:
 *
 *   <Item Cost: +1 Magic Water>
 *   <Item Cost: -2 Antidote>
 *   <Weapon Cost: 50% Short Sword>
 *   <Armor Cost: 200% Cloth Armor>
 *
 * ---
 *
 * <Replace Item name1 Cost: name2>
 * <Replace Weapon name1 Cost: name2>
 * <Replace Armor name1 Cost: name2>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - The related actor will not consume 'name1' items, weapons, or armors.
 *   Instead, the cost will be redirected to 'name2' items, weapons, or armors.
 *   - Even non-consumable items will be consumed.
 * - Replace 'name1' with text representing the respective item, weapon, or
 *   armor that is the original cost type.
 * - Replace 'name2' with text representing the respective item, weapon, or
 *   armor that will be consumed instead.
 *
 * Examples:
 *
 *   <Replace Item Magic Water Cost: Potion>
 *   <Replace Item Antidote Cost: Dispel Herb>
 *   <Replace Weapon Short Sword Cost: Falchion>
 *   <Replace Armor Cloth Armor Cost: Leather Armor>
 *
 * ---
 *
 * === Skill Accessibility Notetags ===
 *
 * Sometimes, you don't want all skills to be visible whether it be to hide
 * menu-only skills during battle, until certain switches are turned ON/OFF, or
 * until certain skills have been learned.
 *
 * ---
 *
 * <Hide in Battle>
 * <Hide outside Battle>
 *
 * - Used for: Skill Notetags
 * - Makes the specific skill visible or hidden depending on whether or not the
 *   player is currently in battle.
 *
 * ---
 *
 * <Show Switch: x>
 *
 * <Show All Switches: x,x,x>
 * <Show Any Switches: x,x,x>
 *
 * - Used for: Skill Notetags
 * - Determines the visibility of the skill based on switches.
 * - Replace 'x' with the switch ID to determine the skill's visibility.
 * - If 'All' notetag variant is used, skill will be hidden until all switches
 *   are ON. Then, it would be shown.
 * - If 'Any' notetag variant is used, skill will be shown if any of the
 *   switches are ON. Otherwise, it would be hidden.
 *
 * ---
 *
 * <Hide Switch: x>
 *
 * <Hide All Switches: x,x,x>
 * <Hide Any Switches: x,x,x>
 *
 * - Used for: Skill Notetags
 * - Determines the visibility of the skill based on switches.
 * - Replace 'x' with the switch ID to determine the skill's visibility.
 * - If 'All' notetag variant is used, skill will be shown until all switches
 *   are ON. Then, it would be hidden.
 * - If 'Any' notetag variant is used, skill will be hidden if any of the
 *   switches are ON. Otherwise, it would be shown.
 *
 * ---
 *
 * <Show if learned Skill: x>
 *
 * <Show if learned All Skills: x,x,x>
 * <Show if learned Any Skills: x,x,x>
 *
 * <Show if learned Skill: name>
 *
 * <Show if learned All Skills: name, name, name>
 * <Show if learned Any Skills: name, name, name>
 *
 * - Used for: Skill Notetags
 * - Determines the visibility of the skill based on skills learned.
 * - This does not apply to skills added by traits on actors, classes, any
 *   equipment, or states. These are not considered learned skills. They are
 *   considered temporary skills.
 * - Replace 'x' with the skill ID to determine the skill's visibility.
 * - If 'name' notetag viarant is used, replace 'name' with the skill's name to
 *   be checked for the notetag.
 * - If 'All' notetag variant is used, skill will be hidden until all skills
 *   are learned. Then, it would be shown.
 * - If 'Any' notetag variant is used, skill will be shown if any of the skills
 *   are learned. Otherwise, it would be hidden.
 *
 * ---
 *
 * <Hide if learned Skill: x>
 *
 * <Hide if learned All Skills: x,x,x>
 * <Hide if learned Any Skills: x,x,x>
 *
 * <Hide if learned Skill: name>
 *
 * <Hide if learned All Skills: name, name, name>
 * <Hide if learned Any Skills: name, name, name>
 *
 * - Used for: Skill Notetags
 * - Determines the visibility of the skill based on skills learned.
 * - This does not apply to skills added by traits on actors, classes, any
 *   equipment, or states. These are not considered learned skills. They are
 *   considered temporary skills.
 * - Replace 'x' with the skill ID to determine the skill's visibility.
 * - If 'name' notetag viarant is used, replace 'name' with the skill's name to
 *   be checked for the notetag.
 * - If 'All' notetag variant is used, skill will be shown until all skills
 *   are learned. Then, it would be hidden.
 * - If 'Any' notetag variant is used, skill will be hidden if any of the
 *   skills are learned. Otherwise, it would be shown.
 *
 * ---
 *
 * <Show if has Skill: x>
 *
 * <Show if have All Skills: x,x,x>
 * <Show if have Any Skills: x,x,x>
 *
 * <Show if has Skill: name>
 *
 * <Show if have All Skills: name, name, name>
 * <Show if have Any Skills: name, name, name>
 *
 * - Used for: Skill Notetags
 * - Determines the visibility of the skill based on skills available.
 * - This applies to both skills that have been learned and/or temporarily
 *   added through traits on actors, classes, equipment, or states.
 * - Replace 'x' with the skill ID to determine the skill's visibility.
 * - If 'name' notetag viarant is used, replace 'name' with the skill's name to
 *   be checked for the notetag.
 * - If 'All' notetag variant is used, skill will be hidden until all skills
 *   are learned. Then, it would be shown.
 * - If 'Any' notetag variant is used, skill will be shown if any of the skills
 *   are learned. Otherwise, it would be hidden.
 *
 * ---
 *
 * <Hide if has Skill: x>
 *
 * <Hide if have All Skills: x,x,x>
 * <Hide if have Any Skills: x,x,x>
 *
 * <Hide if has Skill: name>
 *
 * <Hide if have All Skills: name, name, name>
 * <Hide if have Any Skills: name, name, name>
 *
 * - Used for: Skill Notetags
 * - Determines the visibility of the skill based on skills available.
 * - This applies to both skills that have been learned and/or temporarily
 *   added through traits on actors, classes, equipment, or states.
 * - Replace 'x' with the skill ID to determine the skill's visibility.
 * - If 'name' notetag viarant is used, replace 'name' with the skill's name to
 *   be checked for the notetag.
 * - If 'All' notetag variant is used, skill will be shown until all skills
 *   are learned. Then, it would be hidden.
 * - If 'Any' notetag variant is used, skill will be hidden if any of the
 *   skills are learned. Otherwise, it would be shown.
 *
 * ---
 *
 * <Enable Switch: x>
 *
 * <Enable All Switches: x,x,x>
 * <Enable Any Switches: x,x,x>
 *
 * - Used for: Skill Notetags
 * - Determines the enabled status of the skill based on switches.
 * - Replace 'x' with the switch ID to determine the skill's enabled status.
 * - If 'All' notetag variant is used, skill will be disabled until all
 *   switches are ON. Then, it would be enabled.
 * - If 'Any' notetag variant is used, skill will be enabled if any of the
 *   switches are ON. Otherwise, it would be disabled.
 *
 * ---
 *
 * <Disable Switch: x>
 *
 * <Disable All Switches: x,x,x>
 * <Disable Any Switches: x,x,x>
 *
 * - Used for: Skill Notetags
 * - Determines the enabled status of the skill based on switches.
 * - Replace 'x' with the switch ID to determine the skill's enabled status.
 * - If 'All' notetag variant is used, skill will be enabled until all switches
 *   are ON. Then, it would be disabled.
 * - If 'Any' notetag variant is used, skill will be disabled if any of the
 *   switches are ON. Otherwise, it would be enabled.
 *
 * ---
 *
 * === JavaScript Notetags: Skill Accessibility ===
 *
 * The following are notetags made for users with JavaScript knowledge to
 * determine if a skill can be accessible visibly or through usage.
 *
 * ---
 *
 * <JS Skill Visible>
 *  code
 *  code
 *  visible = code;
 * </JS Skill Visible>
 *
 * - Used for: Skill Notetags
 * - Determines the visibility of the skill based on JavaScript code.
 * - Replace 'code' to determine the type visibility of the skill.
 * - The 'visible' variable returns a boolean (true/false) to determine if the
 *   skill will be visible or not.
 * - The 'user' variable refers to the user with the skill.
 * - The 'skill' variable refers to the skill being checked.
 * - All other visibility conditions must be met for this code to count.
 *
 * ---
 *
 * <JS Skill Enable>
 *  code
 *  code
 *  enabled = code;
 * </JS Skill Enable>
 *
 * - Used for: Skill Notetags
 * - Determines the enabled status of the skill based on JavaScript code.
 * - Replace 'code' to determine the type enabled status of the skill.
 * - The 'enabled' variable returns a boolean (true/false) to determine if the
 *   skill will be enabled or not.
 * - The 'user' variable refers to the user with the skill.
 * - The 'skill' variable refers to the skill being checked.
 * - All other skill conditions must be met in order for this to code to count.
 *
 * ---
 *
 * === General State-Related Notetags ===
 *
 * The following notetags are centered around states, such as how their turn
 * counts are displayed, items and skills that affect state turns, if the state
 * can avoid removal by death state, etc.
 *
 * ---
 *
 * <No Death Clear>
 *
 * - Used for: State Notetags
 * - Prevents this state from being cleared upon death.
 * - This allows this state to be added to an already dead battler, too.
 *
 * ---
 *
 * <No Recover All Clear>
 *
 * - Used for: State Notetags
 * - Prevents this state from being cleared upon using the Recover All command.
 *
 * ---
 *
 * <Group Defeat>
 *
 * - Used for: State Notetags
 * - If an entire party is affected by states with the <Group Defeat> notetag,
 *   they are considered defeated.
 * - Usage for this includes party-wide petrification, frozen, etc.
 *
 * ---
 *
 * <Reapply Rules: Ignore>
 * <Reapply Rules: Reset>
 * <Reapply Rules: Greater>
 * <Reapply Rules: Add>
 *
 * - Used for: State Notetags
 * - Choose what kind of rules this state follows if the state is being applied
 *   to a target that already has the state. This affects turns specifically.
 * - 'Ignore' will bypass any turn changes.
 * - 'Reset' will recalculate the state's turns.
 * - 'Greater' will choose to either keep the current turn count if it's higher
 *   than the reset amount or reset it if the current turn count is lower.
 * - 'Add' will add the state's turn count to the applied amount.
 * - If this notetag isn't used, it will use the rules set in the States >
 *   Plugin Parameters.
 *
 * ---
 *
 * <Positive State>
 * <Negative State>
 *
 * - Used for: State Notetags
 * - Marks the state as a positive state or negative state, also altering the
 *   state's turn count color to match the Plugin Parameter settings.
 * - This also puts the state into either the 'Positive' category or
 *   'Negative' category.
 *
 * ---
 *
 * <Category: name>
 * <Category: name, name, name>
 *
 * - Used for: State Notetags
 * - Arranges states into certain/multiple categories.
 * - Replace 'name' with a category name to mark this state as.
 * - Insert multiples of this to mark the state with  multiple categories.
 *
 * ---
 *
 * <Categories>
 *  name
 *  name
 * </Categories>
 *
 * - Used for: State Notetags
 * - Arranges states into certain/multiple categories.
 * - Replace each 'name' with a category name to mark this state as.
 *
 * ---
 *
 * <Bypass State Damage Removal: id>
 * <Bypass State Damage Removal: id, id, id>
 *
 * <Bypass State Damage Removal: name>
 * <Bypass State Damage Removal: name, name, name>
 *
 * - Used for: Skill, Item Notetags
 * - When this skill/item is used to attack an enemy with the listed state that
 *   would normally have on damage removal (ie Sleep).
 * - For 'id' variant, replace each 'id' with a number representing the state's
 *   ID to bypass the damage removal for.
 * - For 'name' variant, replace each 'name' with the state's name to bypass
 *   the damage removal for.
 * - This can be used for attacks like "Dream Eater" that would prevent waking
 *   up a sleeping opponent.
 *
 * ---
 *
 * <Bypass State Damage Removal as Attacker: id>
 * <Bypass State Damage Removal as Attacker: id, id, id>
 *
 * <Bypass State Damage Removal as Attacker: name>
 * <Bypass State Damage Removal as Attacker: name, name, name>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - When an attacker with an associated trait object that has this notetag
 *   would attack an enemy with the listed state, bypass on damage removal.
 * - For 'id' variant, replace each 'id' with a number representing the state's
 *   ID to bypass the damage removal for.
 * - For 'name' variant, replace each 'name' with the state's name to bypass
 *   the damage removal for.
 * - This can be used for effects like "Sleep Striker" that would prevent the
 *   attacker from waking up a sleeping opponent.
 *
 * ---
 *
 * <Bypass State Damage Removal as Target: id>
 * <Bypass State Damage Removal as Target: id, id, id>
 *
 * <Bypass State Damage Removal as Target: name>
 * <Bypass State Damage Removal as Target: name, name, name>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - When a target with an associated trait object that has this notetag is
 *   attacked as the target with the listed state, bypass on damage removal.
 * - For 'id' variant, replace each 'id' with a number representing the state's
 *   ID to bypass the damage removal for.
 * - For 'name' variant, replace each 'name' with the state's name to bypass
 *   the damage removal for.
 * - This can be used for effects like "Deep Sleep" that would prevent the
 *   attacked target from waking up.
 *
 * ---
 *
 * <Resist State Category: name>
 * <Resist State Categories: name, name, name>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Causes the affected battler resist the listed categories.
 * - Replace each 'name' with a category name to resist.
 *   - Insert multiple 'name' entries to add more categories.
 * - This works exactly like how state resistances work in-game. If a battler
 *   who was originally NOT resistant to "Poison" before gaining a
 *   poison-resistant trait, the "Poison" state will remain because it was
 *   applied before poison-resistance as enabled.
 *
 * ---
 *
 * <Resist State Categories>
 *  name
 *  name
 *  name
 * </Resist State Categories>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Causes the affected battler resist the listed categories.
 * - Replace each 'name' with a category name to resist.
 *   - Insert multiple 'name' entries to add more categories.
 * - This works exactly like how state resistances work in-game. If a battler
 *   who was originally NOT resistant to "Poison" before gaining a
 *   poison-resistant trait, the "Poison" state will remain because it was
 *   applied before poison-resistance as enabled.
 *
 * ---
 *
 * <State x Category Remove: y>
 *
 * <State x Category Remove: All>
 *
 * - Used for: Skill, Item Notetags
 * - Allows the skill/item to remove 'y' states from specific category 'x'.
 * - Replace 'x' with a category name to remove from.
 * - Replace 'y' with the number of times to remove from that category.
 * - Use the 'All' variant to remove all of the states of that category.
 * - Insert multiples of this to remove different types of categories.
 *
 * ---
 *
 * <Remove Other x States>
 *
 * - Used for: State Notetags
 * - When the state with this notetag is added, remove other 'x' category
 *   states from the battler (except for the state being added).
 * - Replace 'x' with a category name to remove from.
 * - Insert multiples of this to remove different types of categories.
 * - Useful for thing state types like stances and forms that there is usually
 *   only one active at a time.
 *
 * ---
 *
 * <Hide State Turns>
 *
 * - Used for: State Notetags
 * - Hides the state turns from being shown at all.
 * - This will by pass any Plugin Parameter settings.
 *
 * ---
 *
 * <Turn Color: x>
 * <Turn Color: #rrggbb>
 *
 * - Used for: State Notetags
 * - Hides the state turns from being shown at all.
 * - Determines the color of the state's turn count.
 * - Replace 'x' with a number value depicting a window text color.
 * - Replace 'rrggbb' with a hex color code for a more custom color.
 *
 * ---
 *
 * <Max Turns: x>
 *
 * - Used for: State Notetags
 * - Determines the upper limit on the maximum number of turns for this state.
 * - Replace 'x' with a number representing the maximum number of turns used
 *   for this state.
 * - If no notetag is used, refer to the default setting found in the Plugin
 *   Parameters under "State Settings".
 *
 * ---
 *
 * <State id Turns: +x>
 * <State id Turns: -x>
 *
 * <Set State id Turns: x>
 *
 * <State name Turns: +x>
 * <State name Turns: -x>
 *
 * <Set State name Turns: x>
 *
 * - Used for: Skill, Item Notetags
 * - If the target is affected by state 'id' or state 'name', change the state
 *   turn duration for target.
 * - For 'id' variant, replace 'id' with the ID of the state to modify.
 * - For 'name' variant, replace 'name' with the name of the state to modify.
 * - Replace 'x' with the value you wish to increase, decrease, or set to.
 * - Insert multiples of this notetag to affect multiple states at once.
 *
 * ---
 *
 * <param Buff Turns: +x>
 * <param Buff Turns: -x>
 *
 * <Set param Buff Turns: x>
 *
 * - Used for: Skill, Item Notetags
 * - If the target is affected by a 'param' buff, change that buff's turn
 *   duration for target.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter buff to modify.
 * - Replace 'x' with the value you wish to increase, decrease, or set to.
 * - Insert multiples of this notetag to affect multiple parameters at once.
 *
 * ---
 *
 * <param Debuff Turns: +x>
 * <param Debuff Turns: -x>
 *
 * <Set param Debuff Turns: x>
 *
 * - Used for: Skill, Item Notetags
 * - If the target is affected by a 'param' debuff, change that debuff's turn
 *   duration for target.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter debuff to modify.
 * - Replace 'x' with the value you wish to increase, decrease, or set to.
 * - Insert multiples of this notetag to affect multiple parameters at once.
 *
 * ---
 *
 * === JavaScript Notetags: On Add/Erase/Expire ===
 *
 * Using JavaScript code, you can use create custom effects that occur when a
 * state has bee added, erased, or expired.
 *
 * ---
 *
 * <JS On Add State>
 *  code
 *  code
 * </JS On Add State>
 *
 * - Used for: State Notetags
 * - When a state is added, run the code added by this notetag.
 * - The 'user' variable refers to the current active battler.
 * - The 'target' variable refers to the battler affected by this state.
 * - The 'origin' variable refers to the one who applied this state.
 * - The 'state' variable refers to the current state being affected.
 *
 * ---
 *
 * <JS On Erase State>
 *  code
 *  code
 * </JS On Erase State>
 *
 * - Used for: State Notetags
 * - When a state is erased, run the code added by this notetag.
 * - The 'user' variable refers to the current active battler.
 * - The 'target' variable refers to the battler affected by this state.
 * - The 'origin' variable refers to the one who applied this state.
 * - The 'state' variable refers to the current state being affected.
 *
 * ---
 *
 * <JS On Expire State>
 *  code
 *  code
 * </JS On Expire State>
 *
 * - Used for: State Notetags
 * - When a state has expired, run the code added by this notetag.
 * - The 'user' variable refers to the current active battler.
 * - The 'target' variable refers to the battler affected by this state.
 * - The 'origin' variable refers to the one who applied this state.
 * - The 'state' variable refers to the current state being affected.
 *
 * ---
 *
 * === JavaScript Notetags: Slip Damage/Healing ===
 *
 * Slip Damage, in RPG Maker vocabulary, refers to damage over time. The
 * following notetags allow you to perform custom slip damage/healing.
 *
 * ---
 *
 * <JS type Slip Damage>
 *  code
 *  code
 *  damage = code;
 * </JS type Slip Damage>
 *
 * - Used for: State Notetags
 * - Code used to determine how much slip damage is dealt to the affected unit
 *   during each regeneration phase.
 * - Replace 'type' with 'HP', 'MP', or 'TP'.
 * - Replace 'code' with the calculations on what to determine slip damage.
 * - The 'user' variable refers to the origin of the state.
 * - The 'target' variable refers to the affected unit receiving the damage.
 * - The 'state' variable refers to the current state being affected.
 * - The 'damage' variable is the finalized slip damage to be dealt.
 * - When these states are applied via action effects, the slip calculations
 *   are one time calculations made upon applying and the damage is cached to
 *   be used for future on regeneration calculations.
 * - For that reason, do not include game mechanics here such as adding states,
 *   buffs, debuffs, etc. as this notetag is meant for calculations only. Use
 *   the VisuStella Battle Core's <JS Pre-Regenerate> and <JS Post-Regenerate>
 *   notetags for game mechanics instead.
 * - Passive states and states with the <JS Slip Refresh> notetag are exempt
 *   from the one time calculation and recalculated each regeneration phase.
 *
 * ---
 *
 * <JS type Slip Heal>
 *  code
 *  code
 *  heal = code;
 * </JS type Slip Heal>
 *
 * - Used for: State Notetags
 * - Code used to determine how much slip healing is dealt to the affected unit
 *   during each regeneration phase.
 * - Replace 'type' with 'HP', 'MP', or 'TP'.
 * - Replace 'code' with the calculations on what to determine slip healing.
 * - The 'user' variable refers to the origin of the state.
 * - The 'target' variable refers to the affected unit receiving the healing.
 * - The 'state' variable refers to the current state being affected.
 * - The 'heal' variable is the finalized slip healing to be recovered.
 * - When these states are applied via action effects, the slip calculations
 *   are one time calculations made upon applying and the damage is cached to
 *   be used for future on regeneration calculations.
 * - For that reason, do not include game mechanics here such as adding states,
 *   buffs, debuffs, etc. as this notetag is meant for calculations only. Use
 *   the VisuStella Battle Core's <JS Pre-Regenerate> and <JS Post-Regenerate>
 *   notetags for game mechanics instead.
 * - Passive states and states with the <JS Slip Refresh> notetag are exempt
 *   from the one time calculation and recalculated each regeneration phase.
 *
 * ---
 *
 * <JS Slip Refresh>
 *
 * - Used for: State Notetags
 * - Refreshes the calculations made for the JS Slip Damage/Heal amounts at the
 *   start of each regeneration phase to allow for dynamic damage ranges.
 *
 * ---
 *
 * === Passive State Notetags ===
 *
 * Passive States are states that are always applied to actors and enemies
 * provided that their conditions have been met. These can be granted through
 * database objects or through the Passive States Plugin Parameters.
 *
 * ---
 *
 * For those using the code "a.isStateAffected(10)" to check if a target is
 * affected by a state or not, this does NOT check passive states. This only
 * checks for states that were directly applied to the target.
 *
 * This is NOT a bug.
 *
 * Instead, use "a.states().includes($dataStates[10])" to check for them. This
 * code will search for both directly applied states and passive states alike.
 *
 * ---
 *
 * As passive states are NOT considered directly applied to, they do NOT match
 * a Conditional Branch's state check as well. The Conditional Branch effect
 * checks for an affected state.
 *
 * ---
 *
 * Because passive states are NOT directly applied to a battler, the functions
 * of "addNewState", "addState", "eraseState", "removeState" do NOT apply to
 * passive states either. This means that any of the related JS notetags tied
 * to those functions will not occur either.
 *
 * ---
 *
 * Why are passive states not considered affected by? Let's look at it
 * differently. There are two ways to grant skills to actors. They can acquire
 * skills by levels/items/events or they can equip gear that temporarily grants
 * the skill in question.
 *
 * Learning the skill is direct. Temporarily granting the skill is indirect.
 * These two factors have mechanical importance and require differentiation.
 *
 * Regular states and passive states are the same way. Regular states are
 * directly applied, therefore, need to be distinguished in order for things
 * like state turns and steps, removal conditionals, and similar to matter at
 * all. Passive states are indirect and are therefore, unaffected by state
 * turns, steps, and removal conditions. These mechanical differences are
 * important for how RPG Maker works.
 *
 * ---
 *
 * Once again, it is NOT a bug that when using "a.isStateAffected(10)" to
 * check if a target has a passive state will return false.
 *
 * ---
 *
 * <Passive State: x>
 * <Passive States: x,x,x>
 *
 * <Passive State: name>
 * <Passive States: name, name, name>
 *
 * - Used for: Actor, Class, Skill, Weapon, Armor, Enemy Notetags
 * - Adds passive state(s) x to trait object, applying it to related actor or
 *   enemy unit(s).
 * - Replace 'x' with a number to determine which state to add as a passive.
 * - If using 'name' notetag variant, replace 'name' with the name of the
 *   state(s) to add as a passive.
 * - Note: If you plan on applying a passive state through a skill, it must be
 *   through a skill that has been learned by the target and not a skill that
 *   is given through a trait.
 *
 * ---
 *
 * <Passive Stackable>
 *
 * - Used for: State Notetags
 * - Makes it possible for this passive state to be added multiple times.
 * - Otherwise, only one instance of the passive state can be available.
 *
 * ---
 *
 * <Passive Condition Class: id>
 * <Passive Condition Classes: id, id, id>
 *
 * <Passive Condition Class: name>
 * <Passive Condition Classes: name, name, name>
 *
 * - Used for: State Notetags
 * - Determines the passive condition of the passive state based on the actor's
 *   current class. As long as the actor's current class matches one of the
 *   data entries, the passive condition is considered passed.
 * - For 'id' variant, replace 'id' with a number representing class's ID.
 * - For 'name' variant, replace 'name' with the class's name.
 *
 * ---
 *
 * <Passive Condition Multiclass: id>
 * <Passive Condition Multiclass: id, id, id>
 *
 * <Passive Condition Multiclass: name>
 * <Passive Condition Multiclass: name, name, name>
 *
 * - Used for: State Notetags
 * - Requires VisuMZ_2_ClassChangeSystem!
 * - Determines the passive condition of the passive state based on the actor's
 *   multiclasses. As long as the actor has any of the matching classes
 *   assigned as a multiclass, the passive condition is considered passed.
 * - For 'id' variant, replace 'id' with a number representing class's ID.
 * - For 'name' variant, replace 'name' with the class's name.
 *
 * ---
 *
 * <Passive Condition Switch ON: x>
 *
 * <Passive Condition All Switches ON: x,x,x>
 * <Passive Condition Any Switch ON: x,x,x>
 *
 * - Used for: State Notetags
 * - Determines the passive condition of the passive state based on switches.
 * - Replace 'x' with the switch ID to determine the state's passive condition.
 * - If 'All' notetag variant is used, conditions will not be met until all
 *   switches are ON. Then, it would be met.
 * - If 'Any' notetag variant is used, conditions will be met if any of the
 *   switches are ON. Otherwise, it would not be met.
 *
 * ---
 *
 * <Passive Condition Switch OFF: x>
 *
 * <Passive Condition All Switches OFF: x,x,x>
 * <Passive Condition Any Switch OFF: x,x,x>
 *
 * - Used for: State Notetags
 * - Determines the passive condition of the passive state based on switches.
 * - Replace 'x' with the switch ID to determine the state's passive condition.
 * - If 'All' notetag variant is used, conditions will not be met until all
 *   switches are OFF. Then, it would be met.
 * - If 'Any' notetag variant is used, conditions will be met if any of the
 *   switches are OFF. Otherwise, it would not be met.
 *
 * ---
 *
 * === Aura & Miasma Notetags ===
 *
 * Auras are a type passive that affects an allied party. Miasmas are a type of
 * passive that affects an opposing party. Auras and Miasmas only need to come
 * from a single source to give an entire party or troop a passive provided
 * that the battler emitting the aura/miasma is alive and in battle.
 *
 * ---
 *
 * <Aura State: x>
 * <Aura States: x, x, x>
 *
 * <Aura State: name>
 * <Aura States: name, name, name>
 *
 * - Used for: Actor, Class, Skill, Weapon, Armor, Enemy Notetags
 * - Emits an aura that affects the battler's allies and gives each affected
 *   member passive state(s) 'x'.
 * - Replace 'x' with a number to determine which state to add as a passive
 *   generated by this aura.
 * - If using 'name' notetag variant, replace 'name' with the name of the
 *   state(s) to add as a passive generated by this aura.
 * - Note: If you plan on applying an aura effect through a skill, it must be
 *   through a skill that has been learned by the target and not a skill that
 *   is given through a trait.
 *
 * ---
 *
 * <Miasma State: x>
 * <Miasma States: x, x, x>
 *
 * <Miasma State: name>
 * <Miasma States: name, name, name>
 *
 * - Used for: Actor, Class, Skill, Weapon, Armor, Enemy Notetags
 * - Emits an miasma that affects the battler's opponents and gives each
 *   affected member passive state(s) 'x'.
 * - Miasmas do NOT apply outside of battle.
 * - Replace 'x' with a number to determine which state to add as a passive
 *   generated by this miasma.
 * - If using 'name' notetag variant, replace 'name' with the name of the
 *   state(s) to add as a passive generated by this miasma.
 * - Note: If you plan on applying a miasma effect through a skill, it must be
 *   through a skill that has been learned by the target and not a skill that
 *   is given through a trait.
 *
 * ---
 *
 * <Not User Aura>
 * <Aura Not For User>
 *
 * - Used for: Actor, Class, Skill, Weapon, Armor, Enemy, State Notetags
 * - Prevents the emitting user from being affected by the related aura.
 *
 * ---
 *
 * <Allow Dead Aura>
 * <Allow Dead Miasma>
 *
 * - Used for: Actor, Class, Skill, Weapon, Armor, Enemy, State Notetags
 * - Allows aura/miasma to continue emitting even after the emitting user is
 *   in a dead state.
 * - When used with Actor, Class, Skill, Weapon, Armor, Enemy objects, it will
 *   only affect the auras/miasmas emitted from that object.
 * - When used with States, the effect will take place as long as it is used
 *   as an aura or miasma regardless of where it is emitting from.
 * - Takes priority over <Dead Aura Only> and <Dead Miasma Only> notetags.
 *
 * ---
 *
 * <Dead Aura Only>
 * <Dead Miasma Only>
 *
 * - Used for: Actor, Class, Skill, Weapon, Armor, Enemy, State Notetags
 * - Allows aura/miasma to only emit if the emitting user is in a dead state.
 * - When used with Actor, Class, Skill, Weapon, Armor, Enemy objects, it will
 *   only affect the auras/miasmas emitted from that object.
 * - When used with States, the effect will take place as long as it is used
 *   as an aura or miasma regardless of where it is emitting from.
 *
 * ---
 *
 * === JavaScript Notetags: Passive State ===
 *
 * The following is a notetag made for users with JavaScript knowledge to
 * determine if a passive state's condition can be met.
 *
 * ---
 *
 * <JS Passive Condition>
 *  code
 *  code
 *  condition = code;
 * </JS Passive Condition>
 *
 * - Used for: State Notetags
 * - Determines the passive condition of the state based on JavaScript code.
 * - Replace 'code' to determine if a passive state's condition has been met.
 * - The 'condition' variable returns a boolean (true/false) to determine if
 *   the passive state's condition is met or not.
 * - The 'user' variable refers to the user affected by the passive state.
 * - The 'state' variable refers to the passive state being checked.
 * - All other passive conditions must be met for this code to count.
 *
 * **NOTE** Not everything can be used as a custom JS Passive Condition due to
 * limitations of the code. There are failsafe checks to prevent infinite loops
 * and some passive conditions will not register for this reason and the
 * conditional checks will behave as if the passive states have NOT been
 * applied for this reason. Such examples include the following:
 *
 * - A passive state that requires another passive state
 * - A passive state that requires a trait effect from another state
 * - A passive state that requires a parameter value altered by another state
 * - A passive state that requires equipment to be worn but its equipment type
 *   access is provided by another state.
 * - Anything else that is similar in style.
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
 * === Skill Cost Plugin Commands ===
 *
 * ---
 *
 * Skill Cost: Emulate Actor Pay
 * - Target actor(s) emulates paying for skill cost.
 * -
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) will pay skill cost.
 *
 *   Skill ID:
 *   - What is the ID of the skill to emulate paying the skill cost for?
 *
 * ---
 *
 * Skill Cost: Emulate Enemy Pay
 * - Target enemy(s) emulates paying for skill cost.
 * -
 *
 *   Enemy Index(es):
 *   - Select which enemy index(es) will pay skill cost.
 *
 *   Skill ID:
 *   - What is the ID of the skill to emulate paying the skill cost for?
 *
 * ---
 *
 * === State Turns Plugin Commands ===
 *
 * ---
 *
 * State Turns: Actor State Turns Change By
 * - Changes actor(s) state turns by an amount.
 * - Only works on states that can have turns.
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to affect.
 *
 *   State ID:
 *   - What is the ID of the state you wish to change turns for?
 *   - Only works on states that can have turns.
 *
 *   Change Turns By:
 *   - How many turns should the state be changed to?
 *   - You may use JavaScript code.
 *
 *   Auto-Add State?:
 *   - Automatically adds state if actor(s) does not have it applied?
 *
 * ---
 *
 * State Turns: Actor State Turns Change To
 * - Changes actor(s) state turns to a specific value.
 * - Only works on states that can have turns.
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to affect.
 *
 *   State ID:
 *   - What is the ID of the state you wish to change turns for?
 *   - Only works on states that can have turns.
 *
 *   Change Turns To:
 *   - How many turns should the state be changed to?
 *   - You may use JavaScript code.
 *
 *   Auto-Add State?:
 *   - Automatically adds state if actor(s) does not have it applied?
 *
 * ---
 *
 * State Turns: Enemy State Turns Change By
 * - Changes enemy(s) state turns by an amount.
 * - Only works on states that can have turns.
 *
 *   Enemy Index(es):
 *   - Select which enemy index(es) to affect.
 *
 *   State ID:
 *   - What is the ID of the state you wish to change turns for?
 *   - Only works on states that can have turns.
 *
 *   Change Turns By:
 *   - How many turns should the state be changed to?
 *   - You may use JavaScript code.
 *
 *   Auto-Add State?:
 *   - Automatically adds state if actor(s) does not have it applied?
 *
 * ---
 *
 * State Turns: Enemy State Turns Change To
 * - Changes enemy(s) state turns to a specific value.
 * - Only works on states that can have turns.
 *
 *   Enemy Index(es):
 *   - Select which enemy index(es) to affect.
 *
 *   State ID:
 *   - What is the ID of the state you wish to change turns for?
 *   - Only works on states that can have turns.
 *
 *   Change Turns To:
 *   - How many turns should the state be changed to?
 *   - You may use JavaScript code.
 *
 *   Auto-Add State?:
 *   - Automatically adds state if actor(s) does not have it applied?
 *
 * ---
 *
 *
 * ============================================================================
 * Plugin Parameters: General Skill Settings
 * ============================================================================
 *
 * These Plugin Parameters adjust various aspects of the game regarding skills
 * from the custom Skill Menu Layout to global custom effects made in code.
 *
 * ---
 *
 * General
 *
 *   Use Updated Layout:
 *   - Use the Updated Skill Menu Layout provided by this plugin?
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
 * Skill Type Window
 *
 *   Style:
 *   - How do you wish to draw commands in the Skill Type Window?
 *   - Text Only: Display only the text.
 *   - Icon Only: Display only the icon.
 *   - Icon + Text: Display the icon first, then the text.
 *   - Auto: Determine which is better to use based on the size of the cell.
 *
 *   Text Align:
 *   - Text alignment for the Skill Type Window.
 *
 *   Window Width:
 *   - What is the desired pixel width of this window?
 *   - Default: 240
 *
 * ---
 *
 * List Window
 *
 *   Columns:
 *   - Number of maximum columns.
 *
 * ---
 *
 * Shop Status Window
 *
 *   Show in Skill Menu?:
 *   - Show the Shop Status Window in the Skill Menu?
 *   - This is enabled if the Updated Layout is on.
 *
 *   Adjust List Window?:
 *   - Automatically adjust the Skill List Window in the Skill Menu if using
 *     the Shop Status Window?
 *
 *   Background Type:
 *   - Select background type for this window.
 *     - 0 - Window
 *     - 1 - Dim
 *     - 2 - Transparent
 *
 *   JS: X, Y, W, H:
 *   - Code used to determine the dimensions for this Shop Status Window in the
 *     Skill Menu.
 *
 * ---
 *
 * Skill Types
 *
 *   Hidden Skill Types:
 *   - Insert the ID's of the Skill Types you want hidden from view ingame.
 *
 *   Hidden During Battle:
 *   - Insert the ID's of the Skill Types you want hidden during battle only.
 *
 *   Icon: Normal Type:
 *   - Icon used for normal skill types that aren't assigned any icons.
 *   - To assign icons to skill types, simply insert \I[x] into the
 *     skill type's name in the Database > Types tab.
 *
 *   Icon: Magic Type:
 *   - Icon used for magic skill types that aren't assigned any icons.
 *   - To assign icons to skill types, simply insert \I[x] into the
 *     skill type's name in the Database > Types tab.
 *
 *   Sort: Alphabetical:
 *   - Insert the ID's of Skill Types you want sorted alphabetically.
 *
 * ---
 *
 * Global JS Effects
 *
 *   JS: Skill Conditions:
 *   - JavaScript code for a global-wide skill condition check.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Skill Cost Types
 * ============================================================================
 *
 * Skill Cost Types are the resources that are used for your skills. These can
 * range from the default MP and TP resources to the newly added HP, Gold, and
 * Potion resources.
 *
 * ---
 *
 * Settings
 *
 *   Name:
 *   - A name for this Skill Cost Type.
 *
 *   Icon:
 *   - Icon used for this Skill Cost Type.
 *   - Use 0 for no icon.
 *
 *   Font Color:
 *   - Text Color used to display this cost.
 *   - For a hex color, use #rrggbb with VisuMZ_1_MessageCore
 *
 *   Font Size:
 *   - Font size used to display this cost.
 *
 * ---
 *
 * Cost Processing
 *
 *   JS: Cost Calculation:
 *   - Code on how to calculate this resource cost for the skill.
 *
 *   JS: Can Pay Cost?:
 *   - Code on calculating whether or not the user is able to pay the cost.
 *
 *   JS: Paying Cost:
 *   - Code for if met, this is the actual process of paying of the cost.
 *
 * ---
 *
 * Window Display
 *
 *   JS: Show Cost?:
 *   - Code for determining if the cost is shown or not.
 *
 *   JS: Cost Text:
 *   - Code to determine the text (with Text Code support) used for the
 *     displayed cost.
 *
 * ---
 *
 * Gauge Display
 *
 *   JS: Maximum Value:
 *   - Code to determine the maximum value used for this Skill Cost resource
 *     for gauges.
 *
 *   JS: Current Value:
 *   - Code to determine the current value used for this Skill Cost resource
 *     for gauges.
 *
 *   JS: Draw Gauge:
 *   - Code to determine how to draw the Skill Cost resource for this
 *     gauge type.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Gauge Settings
 * ============================================================================
 *
 * Settings in regards to how skill cost gauges function and appear.
 *
 * ---
 *
 * Labels
 *
 *   Font Type:
 *   - Which font type should be used for labels?
 *
 *   Match Label Color:
 *   - Match the label color to the Gauge Color being used?
 *
 *     Match: Gauge # ?:
 *     - Which Gauge Color should be matched?
 *
 *     Preset: Gauge Color:
 *     - Use #rrggbb for custom colors or regular numbers for text colors from
 *       the Window Skin.
 *
 *   Solid Outline:
 *   - Make the label outline a solid black color?
 *
 *   Outline Width:
 *   - What width do you wish to use for your outline?
 *   - Use 0 to not use an outline.
 *
 * ---
 *
 * Values
 *
 *   Font Type:
 *   - Which font type should be used for values?
 *
 *   Solid Outline:
 *   - Make the value outline a solid black color?
 *
 *   Outline Width:
 *   - What width do you wish to use for your outline?
 *   - Use 0 to not use an outline.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General State Settings
 * ============================================================================
 *
 * These are general settings regarding RPG Maker MZ's state-related aspects
 * from how turns are reapplied to custom code that's ran whenever states are
 * added, erased, or expired.
 *
 * ---
 *
 * General
 *
 *   Reapply Rules:
 *   - These are the rules when reapplying states.
 *   - Ignore: State doesn't get added.
 *   - Reset: Turns get reset.
 *   - Greater: Turns take greater value (current vs reset).
 *   - Add: Turns add upon existing turns.
 *
 *   Maximum Turns:
 *   - Maximum number of turns to let states go up to.
 *   - This can be changed with the <Max Turns: x> notetag.
 *
 *   Action End Update:
 *   - States with "Action End" auto-removal will also update turns at the end
 *     of each action instead of all actions.
 *
 *   Turn End on Map:
 *   - Update any state and buff turns on the map after this many steps.
 *   - Use 0 to disable.
 *
 * ---
 *
 * Turn Display
 *
 *   Show Turns?:
 *   - Display state turns on top of window icons and sprites?
 *
 *   Turn Font Size:
 *   - Font size used for displaying turns.
 *
 *   Offset X:
 *   - Offset the X position of the turn display.
 *
 *   Offset Y:
 *   - Offset the Y position of the turn display.
 *
 *   Turn Font Size:
 *   - Font size used for displaying turns.
 *
 *   Turn Color: Neutral:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 *
 *   Turn Color: Positive:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 *
 *   Turn Color: Negative:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 *
 * ---
 *
 * Data Display
 *
 *   Show Data?:
 *   - Display state data on top of window icons and sprites?
 *
 *   Data Font Size:
 *   - Font size used for displaying state data.
 *
 *   Offset X:
 *   - Offset the X position of the state data display.
 *
 *   Offset Y:
 *   - Offset the Y position of the state data display.
 *
 * ---
 *
 * Global JS Effects
 *
 *   JS: On Add State:
 *   - JavaScript code for a global-wide custom effect whenever a state
 *     is added.
 *
 *   JS: On Erase State:
 *   - JavaScript code for a global-wide custom effect whenever a state
 *     is erased.
 *
 *   JS: On Expire State:
 *   - JavaScript code for a global-wide custom effect whenever a state
 *     has expired.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General Buff/Debuff Settings
 * ============================================================================
 *
 * Buffs and debuffs don't count as states by RPG Maker MZ's mechanics, but
 * they do function close enough for them to be added to this plugin for
 * adjusting. Change these settings to make buffs and debuffs work to your
 * game's needs.
 *
 * ---
 *
 * General
 *
 *   Reapply Rules:
 *   - These are the rules when reapplying buffs/debuffs.
 *   - Ignore: Buff/Debuff doesn't get added.
 *   - Reset: Turns get reset.
 *   - Greater: Turns take greater value (current vs reset).
 *   - Add: Turns add upon existing turns.
 *
 *   Maximum Turns:
 *   - Maximum number of turns to let buffs and debuffs go up to.
 *
 * ---
 *
 * Stacking
 *
 *   Max Stacks: Buff:
 *   - Maximum number of stacks for buffs.
 *
 *   Max Stacks: Debuff:
 *   - Maximum number of stacks for debuffs.
 *
 *   JS: Buff/Debuff Rate:
 *   - Code to determine how much buffs and debuffs affect parameters.
 *
 * ---
 *
 * Turn Display
 *
 *   Show Turns?:
 *   - Display buff and debuff turns on top of window icons and sprites?
 *
 *   Turn Font Size:
 *   - Font size used for displaying turns.
 *
 *   Offset X:
 *   - Offset the X position of the turn display.
 *
 *   Offset Y:
 *   - Offset the Y position of the turn display.
 *
 *   Turn Color: Buffs:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 *
 *   Turn Color: Debuffs:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 *
 * ---
 *
 * Rate Display
 *
 *   Show Rate?:
 *   - Display buff and debuff rate on top of window icons and sprites?
 *
 *   Rate Font Size:
 *   - Font size used for displaying rate.
 *
 *   Offset X:
 *   - Offset the X position of the rate display.
 *
 *   Offset Y:
 *   - Offset the Y position of the rate display.
 *
 * ---
 *
 * Global JS Effects
 *
 *   JS: On Add Buff:
 *   - JavaScript code for a global-wide custom effect whenever a
 *     buff is added.
 *
 *   JS: On Add Debuff:
 *   - JavaScript code for a global-wide custom effect whenever a
 *     debuff is added.
 *
 *   JS: On Erase Buff:
 *   - JavaScript code for a global-wide custom effect whenever a
 *     buff is added.
 *
 *   JS: On Erase Debuff:
 *   - JavaScript code for a global-wide custom effect whenever a
 *     debuff is added.
 *
 *   JS: On Expire Buff:
 *   - JavaScript code for a global-wide custom effect whenever a
 *     buff is added.
 *
 *   JS: On Expire Debuff:
 *   - JavaScript code for a global-wide custom effect whenever a
 *     debuff is added.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Passive State Settings
 * ============================================================================
 *
 * These Plugin Parameters adjust passive states that can affect all actors and
 * enemies as well as have global conditions.
 *
 * ---
 *
 * For those using the code "a.isStateAffected(10)" to check if a target is
 * affected by a state or not, this does NOT check passive states. This only
 * checks for states that were directly applied to the target.
 *
 * This is NOT a bug.
 *
 * Instead, use "a.states().includes($dataStates[10])" to check for them. This
 * code will search for both directly applied states and passive states alike.
 *
 * ---
 *
 * As passive states are NOT considered directly applied to, they do NOT match
 * a Conditional Branch's state check as well. The Conditional Branch effect
 * checks for an affected state.
 *
 * ---
 *
 * Because passive states are NOT directly applied to a battler, the functions
 * of "addNewState", "addState", "eraseState", "removeState" do NOT apply to
 * passive states either. This means that any of the related JS notetags tied
 * to those functions will not occur either.
 *
 * ---
 *
 * Why are passive states not considered affected by? Let's look at it
 * differently. There are two ways to grant skills to actors. They can acquire
 * skills by levels/items/events or they can equip gear that temporarily grants
 * the skill in question.
 *
 * Learning the skill is direct. Temporarily granting the skill is indirect.
 * These two factors have mechanical importance and require differentiation.
 *
 * Regular states and passive states are the same way. Regular states are
 * directly applied, therefore, need to be distinguished in order for things
 * like state turns and steps, removal conditionals, and similar to matter at
 * all. Passive states are indirect and are therefore, unaffected by state
 * turns, steps, and removal conditions. These mechanical differences are
 * important for how RPG Maker works.
 *
 * ---
 *
 * Once again, it is NOT a bug that when using "a.isStateAffected(10)" to
 * check if a target has a passive state will return false.
 *
 * ---
 *
 * List
 *
 *   Global Passives:
 *   - A list of passive states to affect actors and enemies.
 *
 *   Actor-Only Passives:
 *   - A list of passive states to affect actors only.
 *
 *   Enemy Passives:
 *   - A list of passive states to affect enemies only.
 *
 * ---
 *
 * Cache
 *
 *   Switch Refresh?:
 *   - Refresh all battle members when switches are changed in battle?
 *   - This is primarily used for passive state conditions involve parameters
 *     that do not update due to cached data until a refresh occurs.
 *   - If this is on, do not spam Switch changes during battle in order to
 *     prevent lag spikes.
 *
 *   Variable Refresh?:
 *   - Refresh all battle members when variables are changed in battle?
 *   - This is primarily used for passive state conditions involve parameters
 *     that do not update due to cached data until a refresh occurs.
 *   - If this is on, do not spam Variable changes during battle in order to
 *     prevent lag spikes.
 *
 * ---
 *
 * Global JS Effects
 *
 *   JS: Condition Check:
 *   - JavaScript code for a global-wide passive condition check.
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
 * - Yanfly
 * - Arisu
 * - Olivia
 * - Irina
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 *
 * Version 1.48: December 19, 2024
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** Auras & Miasmas added by Olivia:
 * *** Auras are a type passive that affects an allied party. Miasmas are a
 *     type of passive that affects an opposing party. Auras and Miasmas only
 *     need to come from a single source to give an entire party or troop a
 *     passive provided that the battler emitting the aura/miasma is alive and
 *     in battle.
 * ** New Notetags added by Olivia:
 * *** <Aura State: x>
 * **** Emits an aura that affects the battler's allies and gives each affected
 *      member passive state(s) 'x'.
 * *** <Miasma State: x>
 * **** Emits an aura that affects the battler's opponents and gives each
 *      affected member passive state(s) 'x'.
 * *** <Not User Aura>
 * **** Prevents the emitting user from being affected by the related aura.
 * *** <Allow Dead Aura>
 * *** <Allow Dead Miasma>
 * **** Allows aura/miasma to continue emitting even after the emitting user is
 *      in a dead state.
 * *** <Dead Aura Only>
 * *** <Dead Miasma Only>
 * **** Allows aura/miasma to only emit if the emitting user is in a dead state
 * * Optimization Update!
 * ** Plugin should run more optimized.
 *
 * Version 1.47: August 29, 2024
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New notetags added by Arisu:
 * *** <Bypass State Damage Removal: id/name>
 * **** When this skill/item is used to attack an enemy with the listed state
 *      that would normally have on damage removal (ie Sleep).
 * **** This can be used for attacks like "Dream Eater" that would prevent
 *      waking up a sleeping opponent.
 * *** <Bypass State Damage Removal as Attacker: id/name>
 * **** When an attacker with an associated trait object that has this notetag
 *      would attack an enemy with the listed state, bypass on damage removal.
 * **** This can be used for effects like "Sleep Striker" that would prevent
 *      the attacker from waking up a sleeping opponent.
 * *** <Bypass State Damage Removal as Target: id/name>
 * **** When a target with an associated trait object that has this notetag is
 *      attacked as the target with the listed state, bypass on damage removal.
 * **** This can be used for effects like "Deep Sleep" that would prevent the
 *      attacked target from waking up.
 *
 * Version 1.46: July 18, 2024
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameter added by Irina:
 * *** Parameters > Skill Settings > Skill Types > Sort: Alphabetical
 * **** Insert the ID's of Skill Types you want sorted alphabetically.
 * ** New notetags added by Irina:
 * *** <ID Sort Priority: x>
 * **** Used for Scene_Skill.
 * **** Changes sorting priority by ID for skill to 'x'.
 * **** Default priority level is '50'.
 * **** Skills with higher priority values will be sorted higher up on the list
 *      while lower values will be lower on the list.
 *
 * Version 1.45: May 16, 2024
 * * Bug Fixes!
 * ** Fixed a problem with passive state conditional notetags not working
 *    properly. Fix made by Irina.
 *
 * Version 1.44: April 18, 2024
 * * Bug Fixes!
 * ** Fixed a bug where passive states would not appear. Fix made by Olivia.
 * ** Fixed a bug where a crash would occur if certain plugins cleared the
 *    passive state cache midway through trying to register it. Fix by Olivia.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * ** States with lots and lots of text data within their notes will no longer
 *    cause FPS drops.
 *
 * Version 1.43: January 18, 2024
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Commands added by Arisu!
 * *** Skill Cost: Emulate Actor Pay
 * *** Skill Cost: Emulate Enemy Pay
 * **** Target actor(s)/enemy(s) emulates paying for skill cost.
 * *** State Turns: Actor State Turns Change By
 * *** State Turns: Actor State Turns Change To
 * *** State Turns: Enemy State Turns Change By
 * *** State Turns: Enemy State Turns Change To
 * **** Changes actor(s)/enemy(s) state turns to a specific value/by an amount.
 * **** Only works on states that can have turns.
 *
 * Version 1.42: November 16, 2023
 * * Bug Fixes!
 * ** 'origin' variable was not working properly for <JS On Expire State>
 *    JavaScript notetag. Should now be working properly. Fix made by Irina.
 *
 * Version 1.41: September 14, 2023
 * * Bug Fixes!
 * ** Fixed a bug that prevented <Max Turns: x> for states from working due to
 *    one of the recent updates. Fix made by Arisu.
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 * * Documentation Update!
 * ** Apparently, we never put <Max Turns: x> in the help notetag section.
 *    Woops... It's there now.
 *
 * Version 1.40: August 17, 2023
 * * Bug Fixes!
 * ** Fixed a bug involving the "Item Cost" skill cost type found in the Plugin
 *    Parameters when involving consumable items.
 * *** If you want to acquire these settings for an already-existing project,
 *     do either of the following:
 * **** Delete the existing VisuMZ_1_SkillsStatesCore.js in the Plugin Manager
 *      list and install the newest version.
 * **** Or create a new project, install VisuMZ_1_SkillsStatesCore.js there,
 *      then copy over the "Item Cost" plugin parameters found in the "Skill
 *      Cost Types" plugin parameter settings to your current project.
 *
 * Version 1.39: July 13, 2023
 * * Feature Update!
 * ** Updated the "Item Cost" skill cost type found in the Plugin Parameters to
 *    no longer consume items that are key items or nonconsumable.
 * *** If you want to acquire these settings for an already-existing project,
 *     do either of the following:
 * **** Delete the existing VisuMZ_1_SkillsStatesCore.js in the Plugin Manager
 *      list and install the newest version.
 * **** Or create a new project, install VisuMZ_1_SkillsStatesCore.js there,
 *      then copy over the "Item Cost" plugin parameters found in the "Skill
 *      Cost Types" plugin parameter settings to your current project.
 *
 * Version 1.38: March 16, 2023
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Added segment to <Replace x Gauge: type> in documentation:
 * *** Does not work with 'Item Cost', 'Weapon Cost', or 'Armor Cost'.
 * * New Features!
 * ** New "Skill Cost Type" and notetags added by Arisu and sponsored by FAQ.
 * *** <Item Cost: x name>
 * *** <Weapon Cost: x name>
 * *** <Armor Cost: x name>
 * **** The skill will consume items, weapons, and/or armors in order to be
 *      used. Even non-consumable items will be consumed.
 * *** <Item Cost Max/Min: x name>
 * *** <Weapon Cost Max/Min: x name>
 * *** <Armor Cost Max/Min: x name>
 * **** Sets up a maximum/minimum cost for the item, weapon, armor type costs.
 * *** <Item Cost: x% name>
 * *** <Weapon Cost: x% name>
 * *** <Armor Cost: x% name>
 * **** Alters cost rate of skills that would consume item, weapon, or armor.
 * *** <Item Cost: +/-x name>
 * *** <Weapon Cost: +/-x name>
 * *** <Armor Cost: +/-x name>
 * **** Alters flat costs of skills that would consume item, weapon, or armor.
 * *** <Replace Item name1 Cost: name2>
 * *** <Replace Weapon name1 Cost: name2>
 * *** <Replace Armor name1 Cost: name2>
 * **** Replaces item, weapon, or armor to be consumed for another type.
 * *** Projects with the Skills and States Core already installed will not have
 *     this update, but you can copy over the settings from a new project with
 *     the following steps:
 * **** Create a new project. Install Skills and States Core. Open up the new
 *      project's 'Skill Cost Types'.
 * **** Right click the 'Item Cost' option(s) and click copy.
 * **** Go to the target project's Skills and States Core's 'Skill Cost Types'
 *      plugin parameter. Paste the command where you want it to go.
 * **** Only 'Item Cost' is needed as it encompasses all three types for item,
 *      weapon, and armor costs.
 *
 * Version 1.38: February 16, 2023
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 *
 * Version 1.37: January 20, 2023
 * * Bug Fixes!
 * ** Fixed a bug that caused equipment to unequip if the needed equipment
 *    traits came from passive states upon learning new skills. Fix by Irina.
 *
 * Version 1.36: December 15, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * Feature Update!
 * ** When enemies are defeated with their entire party having a state with the
 *    <Group Defeat> notetag, then the party will gain EXP, Gold, and Drops
 *    before when they wouldn't. Update made by Irina.
 * * New Features!
 * ** New Plugin Parameter added by Irina!
 * *** Plugin Parameters > Skill Settings > Skill Type Window > Window Width
 * **** What is the desired pixel width of this window? Default: 240
 *
 * Verison 1.35: October 13, 2022
 * * Feature Update!
 * ** Default values for Passive States > Cache > Switch Refresh? and Variable
 *    Refresh? are now set to "false" in order to prevent sudden lag spikes for
 *    those who are unfamiliar with how this setting works.
 * ** Update made by Irina.
 *
 * Version 1.34: September 29, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameters added by Irina and sponsored by AndyL:
 * *** Plugin Parameters > Gauge Settings
 * **** These settings allow you to make minor tweaks to how the gauges look
 *      ranging from the color used for the labels to the outline types used
 *      for the values.
 *
 * Version 1.33: August 11, 2022
 * * Bug Fixes!
 * ** Fixed a crash that occurs when performing a custom action sequence
 *    without a skill attached to it. Fix made by Olivia.
 *
 * Version 1.32: June 16, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameters added by Arisu:
 * *** Plugin Parameters > Passive State Settings > Cache > Switch Refresh?
 * *** Plugin Parameters > Passive State Settings > Cache > Variable Refresh?
 * **** Refresh all battle members when switches/variables are changed in
 *      battle?
 * **** This is primarily used for passive state conditions involve parameters
 *      that do not update due to cached data until a refresh occurs.
 * **** If this is on, do not spam Switch/Variable changes during battle in
 *      order to prevent lag spikes.
 *
 * Version 1.31: April 28, 2022
 * * Bug Fixes!
 * ** Custom Slip Damage JS is now totalled correctly into regular slip damage
 *    totals for damage popups. Fix made by Olivia.
 *
 * Version 1.30: April 14, 2022
 * * Feature Update!
 * ** Changed the state data removal timing to be after JS notetag effects
 *    take place in order for data such as origin data to remain intact. Update
 *    made by Irina.
 *
 * Version 1.29: March 31, 2022
 * * Bug Fixes!
 * ** Fixed an error with <State x Category Remove: y> not countaing correctly
 *    unless the state count matched the exact amount. The notetag effect
 *    should work properly now. Fix made by Olivia.
 *
 * Version 1.28: March 10, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * Feature Update!
 * ** <State x Category Remove: All> updated to allow multiple cases in a
 *    single notebox. Updated by Arisu.
 * * New Features!
 * ** New Notetag added by Arisu and sponsored by Archeia!
 * *** <Remove Other x States>
 * **** When the state with this notetag is added, remove other 'x' category
 *      states from the battler (except for the state being added).
 * **** Useful for thing state types like stances and forms that there is
 *      usually only one active at a time.
 *
 * Version 1.27: January 27, 2022
 * * Bug Fixes!
 * ** Custom JS Slip Damage/Healing values should now be recalculated on
 *    demand. Fix made by Olivia.
 *
 * Version 1.26: January 20, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * Feature Update!
 * ** Conditional Passive Bypass check is now stronger to prevent even more
 *    infinite loops from happening. Update made by Olivia.
 * * New Features!
 * ** New Plugin Parameter added by Olivia:
 * *** Plugin Parameters > State Settings > General > Turn End on Map
 * **** Update any state and buff turns on the map after this many steps.
 * **** Use 0 to disable.
 *
 * Version 1.25: November 11, 2021
 * * Bug Fixes!
 * ** Hidden skill notetags should no longer crash upon not detecting actors
 *    for learned skills. Fix made by Olivia.
 *
 * Version 1.24: November 4, 2021
 * * Documentation Update!
 * ** Added section: "Slip Damage Popup Clarification"
 * *** Slip Damage popups only show one popup for HP, MP, and TP each and it is
 *     the grand total of all the states and effects combined regardless of the
 *     number of states and effects on a battler. This is how it is in vanilla
 *     RPG Maker MZ and this is how we intend for it to be with the VisuStella
 *     MZ library.
 * *** This is NOT a bug!
 * *** The reason we are not changing this is because it does not properly
 *     relay information to the player accurately. When multiple popups appear,
 *     players only have roughly a second and a half to calculate it all for
 *     any form of information takeaway. We feel it is better suited for the
 *     player's overall convenience to show a cummulative change and steer the
 *     experience towards a more positive one.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 *
 * Version 1.23: September 17, 2021
 * * Compatibility Update!
 * ** RPG Maker MZ 1.3.3 compatibility.
 * *** Updated how gauges are drawn.
 * *** Skill Cost Types Plugin Parameters need to be updated for those who want
 *     the updated gauges. This can be done easily with the following steps:
 * **** Step 1: Create a new project.
 * **** Step 2: Install Skills and States Core version 1.23 into it.
 * **** Step 3: Copy the Plugin Parameter Settings for "Skill Cost Types".
 * **** Step 4: Return back to your original project.
 * **** Step 5: Paste Plugin Parameter Settings on top of "Skill Cost Types".
 *
 * Version 1.22: August 6, 2021
 * * Documentation Update!
 * ** "Action End Removal for States" under Major Updates is changed to:
 * *** If your Plugin Parameter settings for "Action End Update" are enabled,
 *     then "Action End" has been updated so that it actually applies per
 *     action used instead of just being at the start of a battler's action
 *     set.
 * *** However, there are side effects to this: if a state has the "Cannot
 *     Move" restriction along with the "Action End" removal timing, then
 *     unsurprisingly, the state will never wear off because it's now based on
 *     actual actions ending. To offset this and remove confusion, "Action End"
 *     auto-removal timings for states with "Cannot Move" restrictions will be
 *     turned into "Turn End" auto-removal timings while the "Action End
 *     Update" is enabled.
 * *** This automatic change won't make it behave like an "Action End" removal
 *     timing would, but it's better than completely softlocking a battler.
 * * Feature Update!
 * ** Those using "Cannot Move" states with "Action End" auto-removal will now
 *    have be automatically converted into "Turn End" auto-removal if the
 *    plugin parameter "Action End Update" is set to true. Update by Irina.
 *
 * Version 1.21: July 30, 2021
 * * Documentation Update!
 * ** Expanded "Action End Removal for States" section in Major Changes.
 * *** These changes have been in effect since Version 1.07 but have not been
 *     explained in excess detail in the documentation since.
 * **** Action End has been updated so that it actually applies per action used
 *      instead of just being at the start of a battler's action set. However,
 *      there are side effects to this: if a state has the "Cannot Move"
 *      restriction along with the "Action End" removal timing, then
 *      unsurprisingly, the state will never wear off because it's now based on
 *      actual actions ending. There are two solutions to this:
 * **** Don't make "Cannot Move" restriction states with "Action End". This is
 *      not a workaround. This is how the state removal is intended to work
 *      under the new change.
 * **** Go to the Skills & States Core Plugin Parameters, go to State
 *      Setttings, look for "Action End Update", and set it to false. You now
 *      reverted the removal timing system back to how it originally was in RPG
 *      Maker MZ's default battle system where it only updates based on an
 *      action set rather than per actual action ending.
 *
 * Version 1.20: June 18, 2021
 * * Feature Update!
 * ** Updated automatic caching for conditional passive states to update more
 *    efficiently. Update made by Arisu.
 *
 * Version 1.19: June 4, 2021
 * * Optimization Update!
 * ** Plugin should run more optimized.
 *
 * Version 1.18: May 21, 2021
 * * Documentation Update
 * ** Added "Passive State Clarification" section.
 * *** As there is a lot of confusion regarding how passive states work and how
 *     people still miss the explanations found in the "Passive State Notetags"
 *     section AND the "Plugin Parameters: Passive State Settings", we are
 *     adding a third section to explain how they work.
 * *** All three sections will contain the full detailed explanation of how
 *     passive states work to clear common misconceptions about them.
 *
 * Version 1.17: May 7, 2021
 * * Bug Fixes
 * ** State category removal is now usable outside of battle. Fix by Irina.
 *
 * Version 1.16: April 30, 2021
 * * Bug Fixes!
 * ** When states with step removal have the <No Recover All Clear> or
 *    <No Death Clear> notetags, their step counter is no longer reset either.
 *    Fix made by Irina.
 * * New Features!
 * ** New notetag added by Arisu!
 * *** <List Name: name>
 * **** Makes the name of the skill appear different when show in the skill
 *      list. Using \V[x] as a part of the name will display that variable.
 *
 * Version 1.15: March 19, 2021
 * * Compatibility Update
 * ** Added compatibility functionality for future plugins.
 *
 * Version 1.14: March 12, 2021
 * * Bug Fixes!
 * ** Max HP Buff/Debuff should now display its turn counter. Fix by Yanfly.
 * * Documentation Update!
 * ** For the <JS Passive Condition>, we've added documentation on the
 *    limitations of passive conditions since they have been reported as bug
 *    reports, when in reality, they are failsafes to prevent infinite loops.
 *    Such limitations include the following:
 * *** A passive state that requires another passive state
 * *** A passive state that requires a trait effect from another state
 * *** A passive state that requires a parameter value altered by another state
 * *** A passive state that requires equipment to be worn but its equipment
 *     type access is provided by another state.
 * *** Anything else that is similar in style.
 *
 * Version 1.13: February 26, 2021
 * * Documentation Update!
 * ** For <JS type Slip Damage> and <JS type Slip Heal> notetags, added the
 *    following notes:
 * *** When these states are applied via action effects, the slip calculations
 *     are one time calculations made upon applying and the damage is cached to
 *     be used for future on regeneration calculations.
 * *** For that reason, do not include game mechanics here such as adding
 *     states, buffs, debuffs, etc. as this notetag is meant for calculations
 *     only. Use the VisuStella Battle Core's <JS Pre-Regenerate> and
 *     <JS Post-Regenerate> notetags for game mechanics instead.
 * *** Passive states and states with the <JS Slip Refresh> notetag are exempt
 *     from the one time calculation and recalculated each regeneration phase.
 * * Feature Update!
 * ** Changed slip refresh requirements to entail <JS Slip Refresh> notetag for
 *    extra clarity. Update made by Olivia.
 *
 * Version 1.12: February 19, 2021
 * * Feature Update
 * ** Changed the way passive state infinite stacking as a blanket coverage.
 *    Update made by Olivia.
 *
 * Version 1.11: February 12, 2021
 * * Bug Fixes!
 * ** Added a check to prevent passive states from infinitely stacking. Fix
 *    made by Olivia.
 *
 * Version 1.10: January 15, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Feature!
 * ** New Plugin Parameters added
 * *** Plugin Parameters > Skill Settings > Background Type
 *
 * Version 1.09: January 1, 2021
 * * Bug Fixes!
 * ** Custom JS TP slip damage and healing should now work properly.
 *    Fix made by Yanfly.
 *
 * Version 1.08: December 25, 2020
 * * Bug Fixes!
 * ** <JS On Add State> should no longer trigger multiple times for the death
 *    state. Fix made by Yanfly.
 * * Documentation Update!
 * ** Added documentation for updated feature(s)!
 * * Feature Update!
 * ** <No Death Clear> can now allow the affected state to be added to an
 *    already dead battler. Update made by Yanfly.
 *
 * Version 1.07: December 18, 2020
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * New Features!
 * ** New notetags added by Yanfly:
 * *** <Passive Condition Multiclass: id>
 * *** <Passive Condition Multiclass: id, id, id>
 * *** <Passive Condition Multiclass: name>
 * *** <Passive Condition Multiclass: name, name, name>
 * ** New Plugin Parameter added by Yanfly.
 * *** Plugin Parameters > States > General > Action End Update
 * **** States with "Action End" auto-removal will also update turns at the end
 *      of each action instead of all actions.
 * ***** Turn this off if you wish for state turn updates to function like they
 *       do by default for "Action End".
 *
 * Version 1.06: December 4, 2020
 * * Optimization Update!
 * ** Plugin should run more optimized.
 *
 * Version 1.05: November 15, 2020
 * * Bug Fixes!
 * ** The alignment of the Skill Type Window is now fixed and will reflect upon
 *    the default settings. Fix made by Yanfly.
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * New Features!
 * ** <State x Category Remove: All> notetag added by Yanfly.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 *
 * Version 1.04: September 27, 2020
 * * Documentation Update
 * ** "Use Updated Layout" plugin parameters now have the added clause:
 *    "This will override the Core Engine windows settings." to reduce
 *    confusion. Added by Irina.
 *
 * Version 1.03: September 13, 2020
 * * Bug Fixes!
 * ** <JS type Slip Damage> custom notetags now work for passive states. Fix
 *    made by Olivia.
 * ** Setting the Command Window style to "Text Only" will no longer add in
 *    the icon text codes. Bug fixed by Yanfly.
 *
 * Version 1.02: August 30, 2020
 * * Bug Fixes!
 * ** The JS Notetags for Add, Erase, and Expire states are now fixed. Fix made
 *    by Yanfly.
 * * Documentation Update!
 * ** <Show if learned Skill: x> and <Hide if learned Skill: x> notetags have
 *    the following added to their descriptions:
 * *** This does not apply to skills added by traits on actors, classes, any
 *     equipment, or states. These are not considered learned skills. They are
 *     considered temporary skills.
 * * New Features!
 * ** Notetags added by Yanfly:
 * *** <Show if has Skill: x>
 * *** <Show if have All Skills: x,x,x>
 * *** <Show if have Any Skills: x,x,x>
 * *** <Show if has Skill: name>
 * *** <Show if have All Skills: name, name, name>
 * *** <Show if have Any Skills: name, name, name>
 * *** <Hide if has Skill: x>
 * *** <Hide if have All Skills: x,x,x>
 * *** <Hide if have Any Skills: x,x,x>
 * *** <Hide if has Skill: name>
 * *** <Hide if have All Skills: name, name, name>
 * *** <Hide if have Any Skills: name, name, name>
 * *** These have been added to remove the confusion regarding learned skills
 *     as skills added through trait effects are not considered learned skills
 *     by RPG Maker MZ.
 *
 * Version 1.01: August 23, 2020
 * * Bug Fixes!
 * ** Passive states from Elements & Status Menu Core are now functional.
 *    Fix made by Olivia.
 * * Compatibility Update
 * ** Extended functions to allow for better compatibility.
 * * Updated documentation
 * ** Explains that passive states are not directly applied and are therefore
 *    not affected by code such as "a.isStateAffected(10)".
 * ** Instead, use "a.states().includes($dataStates[10])"
 * ** "Use #rrggbb for a hex color." lines now replaced with
 *    "For a hex color, use #rrggbb with VisuMZ_1_MessageCore"
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
 * @command SkillActorPaySkillCost
 * @text Skill Cost: Emulate Actor Pay
 * @desc Target actor(s) emulates paying for skill cost.
 *
 * @arg ActorIDs:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) will pay skill cost.
 * @default ["1"]
 *
 * @arg SkillID:num
 * @text Skill ID
 * @type skill
 * @desc What is the ID of the skill to emulate paying the skill cost for?
 * @default 99
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SkillEnemyPaySkillCost
 * @text Skill Cost: Emulate Enemy Pay
 * @desc Target enemy(s) emulates paying for skill cost.
 *
 * @arg EnemyIndex:arraynum
 * @text Enemy Index(es)
 * @type actr[]
 * @desc Select which enemy index(es) will pay skill cost.
 * @default ["1"]
 *
 * @arg SkillID:num
 * @text Skill ID
 * @type skill
 * @desc What is the ID of the skill to emulate paying the skill cost for?
 * @default 99
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_StateTurns
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command StateTurnsActorChangeBy
 * @text State Turns: Actor State Turns Change By
 * @desc Changes actor(s) state turns by an amount.
 * Only works on states that can have turns.
 *
 * @arg ActorIDs:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 *
 * @arg StateID:num
 * @text State ID
 * @type state
 * @desc What is the ID of the state you wish to change turns for?
 * Only works on states that can have turns.
 * @default 5
 *
 * @arg Turns:eval
 * @text Change Turns By
 * @desc How many turns should the state be changed to?
 * You may use JavaScript code.
 * @default +1
 *
 * @arg AutoAddState:eval
 * @text Auto-Add State?
 * @type boolean
 * @on Auto-Add
 * @off Don't Add
 * @desc Automatically adds state if actor(s) does not have it applied?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command StateTurnsActorChangeTo
 * @text State Turns: Actor State Turns Change To
 * @desc Changes actor(s) state turns to a specific value.
 * Only works on states that can have turns.
 *
 * @arg ActorIDs:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 *
 * @arg StateID:num
 * @text State ID
 * @type state
 * @desc What is the ID of the state you wish to change turns for?
 * Only works on states that can have turns.
 * @default 5
 *
 * @arg Turns:eval
 * @text Change Turns To
 * @desc How many turns should the state be changed to?
 * You may use JavaScript code.
 * @default 10
 *
 * @arg AutoAddState:eval
 * @text Auto-Add State?
 * @type boolean
 * @on Auto-Add
 * @off Don't Add
 * @desc Automatically adds state if actor(s) does not have it applied?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command StateTurnsEnemyChangeBy
 * @text State Turns: Enemy State Turns Change By
 * @desc Changes enemy(s) state turns by an amount.
 * Only works on states that can have turns.
 *
 * @arg EnemyIndex:arraynum
 * @text Enemy Index(es)
 * @type actr[]
 * @desc Select which enemy index(es) to affect.
 * @default ["1"]
 *
 * @arg StateID:num
 * @text State ID
 * @type state
 * @desc What is the ID of the state you wish to change turns for?
 * Only works on states that can have turns.
 * @default 5
 *
 * @arg Turns:eval
 * @text Change Turns By
 * @desc How many turns should the state be changed to?
 * You may use JavaScript code.
 * @default +1
 *
 * @arg AutoAddState:eval
 * @text Auto-Add State?
 * @type boolean
 * @on Auto-Add
 * @off Don't Add
 * @desc Automatically adds state if enemy(s) does not have it applied?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command StateTurnsEnemyChangeTo
 * @text State Turns: Enemy State Turns Change To
 * @desc Changes enemy(s) state turns to a specific value.
 * Only works on states that can have turns.
 *
 * @arg EnemyIndex:arraynum
 * @text Enemy Index(es)
 * @type actr[]
 * @desc Select which enemy index(es) to affect.
 * @default ["1"]
 *
 * @arg StateID:num
 * @text State ID
 * @type state
 * @desc What is the ID of the state you wish to change turns for?
 * Only works on states that can have turns.
 * @default 5
 *
 * @arg Turns:eval
 * @text Change Turns To
 * @desc How many turns should the state be changed to?
 * You may use JavaScript code.
 * @default 10
 *
 * @arg AutoAddState:eval
 * @text Auto-Add State?
 * @type boolean
 * @on Auto-Add
 * @off Don't Add
 * @desc Automatically adds state if enemy(s) does not have it applied?
 * @default true
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
 * @param SkillsStatesCore
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param Skills:struct
 * @text Skill Settings
 * @type struct<Skills>
 * @desc Adjust general skill settings here.
 * @default {"General":"","EnableLayout:eval":"true","LayoutStyle:str":"upper/left","SkillTypeWindow":"","CmdStyle:str":"auto","CmdTextAlign:str":"left","ListWindow":"","ListWindowCols:num":"1","ShopStatusWindow":"","ShowShopStatus:eval":"true","SkillSceneAdjustSkillList:eval":"true","SkillMenuStatusRect:func":"\"const ww = this.shopStatusWidth();\\nconst wh = this._itemWindow.height;\\nconst wx = Graphics.boxWidth - this.shopStatusWidth();\\nconst wy = this._itemWindow.y;\\nreturn new Rectangle(wx, wy, ww, wh);\"","SkillTypes":"","HiddenSkillTypes:arraynum":"[]","BattleHiddenSkillTypes:arraynum":"[]","IconStypeNorm:num":"78","IconStypeMagic:num":"79","CustomJS":"","SkillConditionJS:func":"\"// Declare Variables\\nconst skill = arguments[0];\\nconst user = this;\\nconst target = this;\\nconst a = this;\\nconst b = this;\\nlet enabled = true;\\n\\n// Perform Checks\\n\\n\\n// Return boolean\\nreturn enabled;\""}
 *
 * @param Costs:arraystruct
 * @text Skill Cost Types
 * @parent Skills:struct
 * @type struct<Cost>[]
 * @desc A list of all the skill cost types added by this plugin
 * and the code that controls them in-game.
 * @default ["{\"Name:str\":\"HP\",\"Settings\":\"\",\"Icon:num\":\"0\",\"FontColor:str\":\"20\",\"FontSize:num\":\"22\",\"Cost\":\"\",\"CalcJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nlet cost = 0;\\\\n\\\\n// Calculations\\\\nconst note = skill.note;\\\\nif (note.match(/<HP COST:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost += Number(RegExp.$1);\\\\n}\\\\nif (note.match(/<HP COST:[ ](\\\\\\\\d+)([%％])>/i)) {\\\\n    cost += Math.ceil(Number(RegExp.$1) * user.mhp / 100);\\\\n}\\\\nif (note.match(/<JS HP COST>\\\\\\\\s*([\\\\\\\\s\\\\\\\\S]*)\\\\\\\\s*<\\\\\\\\/JS HP COST>/i)) {\\\\n    const code = String(RegExp.$1);\\\\n    eval(code);\\\\n}\\\\n\\\\n// Apply Trait Cost Alterations\\\\nif (cost > 0) {\\\\n    const rateNote = /<HP COST:[ ](\\\\\\\\d+\\\\\\\\.?\\\\\\\\d*)([%％])>/i;\\\\n    const rates = user.traitObjects().map((obj) => (obj && obj.note.match(rateNote) ? Number(RegExp.$1) / 100 : 1));\\\\n    const flatNote = /<HP COST:[ ]([\\\\\\\\+\\\\\\\\-]\\\\\\\\d+)>/i;\\\\n    const flats = user.traitObjects().map((obj) => (obj && obj.note.match(flatNote) ? Number(RegExp.$1) : 0));\\\\n    cost = rates.reduce((r, rate) => r * rate, cost);\\\\n    cost = flats.reduce((r, flat) => r + flat, cost);\\\\n    cost = Math.max(1, cost);\\\\n}\\\\n\\\\n// Set Cost Limits\\\\nif (note.match(/<HP COST MAX:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.min(cost, Number(RegExp.$1));\\\\n}\\\\nif (note.match(/<HP COST MIN:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.max(cost, Number(RegExp.$1));\\\\n}\\\\n\\\\n// Return cost value\\\\nreturn Math.round(Math.max(0, cost));\\\"\",\"CanPayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nif (cost <= 0) {\\\\n    return true;\\\\n} else {\\\\n    return user._hp > cost;\\\\n}\\\"\",\"PayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Process Payment\\\\nuser._hp -= cost;\\\"\",\"Windows\":\"\",\"ShowJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn cost > 0;\\\"\",\"TextJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst settings = arguments[2];\\\\nconst fontSize = settings.FontSize;\\\\nconst color = settings.FontColor;\\\\nconst name = TextManager.hp;\\\\nconst icon = settings.Icon;\\\\nlet text = '';\\\\n\\\\n// Text: Change Font Size\\\\ntext += '\\\\\\\\\\\\\\\\FS[%1]'.format(fontSize);\\\\n\\\\n// Text: Add Color\\\\nif (color.match(/#(.*)/i) && Imported.VisuMZ_1_MessageCore) {\\\\n    text += '\\\\\\\\\\\\\\\\HexColor<%1>'.format(String(RegExp.$1));\\\\n} else {\\\\n    text += '\\\\\\\\\\\\\\\\C[%1]'.format(color);\\\\n}\\\\n\\\\n// Text: Add Cost\\\\ntext += '%1 %2'.format(cost, name);\\\\n\\\\n// Text: Add Icon\\\\nif (icon  > 0) {\\\\n    text += '\\\\\\\\\\\\\\\\I[%1]'.format(icon);\\\\n}\\\\n\\\\n// Return text\\\\nreturn text;\\\"\",\"Gauges\":\"\",\"GaugeMaxJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn user.mhp;\\\"\",\"GaugeCurrentJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn user.hp;\\\"\",\"GaugeDrawJS:func\":\"\\\"// Declare Settings\\\\nconst color1 = ColorManager.hpGaugeColor1();\\\\nconst color2 = ColorManager.hpGaugeColor2();\\\\nconst label = TextManager.hpA;\\\\n\\\\n// Declare Variables\\\\nconst sprite = this;\\\\nconst settings = sprite._costSettings;\\\\nconst bitmap = sprite.bitmap;\\\\nconst user = sprite._battler;\\\\nconst currentValue = sprite.currentDisplayedValue();\\\\nconst bitmapWidth = sprite.bitmapWidth();\\\\nconst bitmapHeight = sprite.textHeight ? sprite.textHeight() : sprite.bitmapHeight();\\\\nconst gaugeHeight = sprite.gaugeHeight();\\\\n\\\\n// Draw Gauge\\\\nconst gx = 0;\\\\nconst gy = bitmapHeight - gaugeHeight;\\\\nconst gw = bitmapWidth - gx;\\\\nconst gh = gaugeHeight;\\\\nthis.drawFullGauge(color1, color2, gx, gy, gw, gh);\\\\n\\\\n// Draw Label\\\\nconst lx = 4;\\\\nconst ly = 0;\\\\nconst lw = bitmapWidth;\\\\nconst lh = bitmapHeight;\\\\nsprite.setupLabelFont();\\\\nbitmap.paintOpacity = 255;\\\\nbitmap.drawText(label, lx, ly, lw, lh, \\\\\\\"left\\\\\\\");\\\\n\\\\n// Draw Value\\\\nconst vw = bitmapWidth - 2;\\\\nconst vh = bitmapHeight;\\\\nsprite.setupValueFont();\\\\nbitmap.textColor = ColorManager.hpColor(user);\\\\nbitmap.drawText(currentValue, 0, 0, vw, vh, \\\\\\\"right\\\\\\\");\\\"\"}","{\"Name:str\":\"MP\",\"Settings\":\"\",\"Icon:num\":\"0\",\"FontColor:str\":\"23\",\"FontSize:num\":\"22\",\"Cost\":\"\",\"CalcJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nlet cost = 0;\\\\n\\\\n// Calculations\\\\nconst note = skill.note;\\\\ncost = Math.floor(skill.mpCost * user.mcr);\\\\nif (note.match(/<MP COST:[ ](\\\\\\\\d+)([%％])>/i)) {\\\\n    cost += Math.ceil(Number(RegExp.$1) * user.mmp / 100);\\\\n}\\\\nif (note.match(/<JS MP COST>\\\\\\\\s*([\\\\\\\\s\\\\\\\\S]*)\\\\\\\\s*<\\\\\\\\/JS MP COST>/i)) {\\\\n    const code = String(RegExp.$1);\\\\n    eval(code);\\\\n}\\\\n\\\\n// Apply Trait Cost Alterations\\\\nif (cost > 0) {\\\\n    const rateNote = /<MP COST:[ ](\\\\\\\\d+\\\\\\\\.?\\\\\\\\d*)([%％])>/i;\\\\n    const rates = user.traitObjects().map((obj) => (obj && obj.note.match(rateNote) ? Number(RegExp.$1) / 100 : 1));\\\\n    const flatNote = /<MP COST:[ ]([\\\\\\\\+\\\\\\\\-]\\\\\\\\d+)>/i;\\\\n    const flats = user.traitObjects().map((obj) => (obj && obj.note.match(flatNote) ? Number(RegExp.$1) : 0));\\\\n    cost = rates.reduce((r, rate) => r * rate, cost);\\\\n    cost = flats.reduce((r, flat) => r + flat, cost);\\\\n    cost = Math.max(1, cost);\\\\n}\\\\n\\\\n// Set Cost Limits\\\\nif (note.match(/<MP COST MAX:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.min(cost, Number(RegExp.$1));\\\\n}\\\\nif (note.match(/<MP COST MIN:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.max(cost, Number(RegExp.$1));\\\\n}\\\\n\\\\n// Return cost value\\\\nreturn Math.round(Math.max(0, cost));\\\"\",\"CanPayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn user._mp >= cost;\\\"\",\"PayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Process Payment\\\\nuser._mp -= cost;\\\"\",\"Windows\":\"\",\"ShowJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn cost > 0;\\\"\",\"TextJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst settings = arguments[2];\\\\nconst fontSize = settings.FontSize;\\\\nconst color = settings.FontColor;\\\\nconst name = TextManager.mp;\\\\nconst icon = settings.Icon;\\\\nlet text = '';\\\\n\\\\n// Text: Change Font Size\\\\ntext += '\\\\\\\\\\\\\\\\FS[%1]'.format(fontSize);\\\\n\\\\n// Text: Add Color\\\\nif (color.match(/#(.*)/i) && Imported.VisuMZ_1_MessageCore) {\\\\n    text += '\\\\\\\\\\\\\\\\HexColor<#%1>'.format(String(RegExp.$1));\\\\n} else {\\\\n    text += '\\\\\\\\\\\\\\\\C[%1]'.format(color);\\\\n}\\\\n\\\\n// Text: Add Cost\\\\ntext += '%1 %2'.format(cost, name);\\\\n\\\\n// Text: Add Icon\\\\nif (icon  > 0) {\\\\n    text += '\\\\\\\\\\\\\\\\I[%1]'.format(icon);\\\\n}\\\\n\\\\n// Return text\\\\nreturn text;\\\"\",\"Gauges\":\"\",\"GaugeMaxJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn user.mmp;\\\"\",\"GaugeCurrentJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn user.mp;\\\"\",\"GaugeDrawJS:func\":\"\\\"// Declare Settings\\\\nconst color1 = ColorManager.mpGaugeColor1();\\\\nconst color2 = ColorManager.mpGaugeColor2();\\\\nconst label = TextManager.mpA;\\\\n\\\\n// Declare Variables\\\\nconst sprite = this;\\\\nconst settings = sprite._costSettings;\\\\nconst bitmap = sprite.bitmap;\\\\nconst user = sprite._battler;\\\\nconst currentValue = sprite.currentDisplayedValue();\\\\nconst bitmapWidth = sprite.bitmapWidth();\\\\nconst bitmapHeight = sprite.textHeight ? sprite.textHeight() : sprite.bitmapHeight();\\\\nconst gaugeHeight = sprite.gaugeHeight();\\\\n\\\\n// Draw Gauge\\\\nconst gx = 0;\\\\nconst gy = bitmapHeight - gaugeHeight;\\\\nconst gw = bitmapWidth - gx;\\\\nconst gh = gaugeHeight;\\\\nthis.drawFullGauge(color1, color2, gx, gy, gw, gh);\\\\n\\\\n// Draw Label\\\\nconst lx = 4;\\\\nconst ly = 0;\\\\nconst lw = bitmapWidth;\\\\nconst lh = bitmapHeight;\\\\nsprite.setupLabelFont();\\\\nbitmap.paintOpacity = 255;\\\\nbitmap.drawText(label, lx, ly, lw, lh, \\\\\\\"left\\\\\\\");\\\\n\\\\n// Draw Value\\\\nconst vw = bitmapWidth - 2;\\\\nconst vh = bitmapHeight;\\\\nsprite.setupValueFont();\\\\nbitmap.textColor = ColorManager.mpColor(user);\\\\nbitmap.drawText(currentValue, 0, 0, vw, vh, \\\\\\\"right\\\\\\\");\\\"\"}","{\"Name:str\":\"TP\",\"Settings\":\"\",\"Icon:num\":\"0\",\"FontColor:str\":\"29\",\"FontSize:num\":\"22\",\"Cost\":\"\",\"CalcJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nlet cost = 0;\\\\n\\\\n// Calculations\\\\nconst note = skill.note;\\\\ncost = skill.tpCost;\\\\nif (note.match(/<TP COST:[ ](\\\\\\\\d+)([%％])>/i)) {\\\\n    cost += Math.ceil(Number(RegExp.$1) * user.maxTp() / 100);\\\\n}\\\\nif (note.match(/<JS TP COST>\\\\\\\\s*([\\\\\\\\s\\\\\\\\S]*)\\\\\\\\s*<\\\\\\\\/JS TP COST>/i)) {\\\\n    const code = String(RegExp.$1);\\\\n    eval(code);\\\\n}\\\\n\\\\n// Apply Trait Cost Alterations\\\\nif (cost > 0) {\\\\n    const rateNote = /<TP COST:[ ](\\\\\\\\d+\\\\\\\\.?\\\\\\\\d*)([%％])>/i;\\\\n    const rates = user.traitObjects().map((obj) => (obj && obj.note.match(rateNote) ? Number(RegExp.$1) / 100 : 1));\\\\n    const flatNote = /<TP COST:[ ]([\\\\\\\\+\\\\\\\\-]\\\\\\\\d+)>/i;\\\\n    const flats = user.traitObjects().map((obj) => (obj && obj.note.match(flatNote) ? Number(RegExp.$1) : 0));\\\\n    cost = rates.reduce((r, rate) => r * rate, cost);\\\\n    cost = flats.reduce((r, flat) => r + flat, cost);\\\\n    cost = Math.max(1, cost);\\\\n}\\\\n\\\\n// Set Cost Limits\\\\nif (note.match(/<TP COST MAX:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.min(cost, Number(RegExp.$1));\\\\n}\\\\nif (note.match(/<TP COST MIN:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.max(cost, Number(RegExp.$1));\\\\n}\\\\n\\\\n// Return cost value\\\\nreturn Math.round(Math.max(0, cost));\\\"\",\"CanPayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn user._tp >= cost;\\\"\",\"PayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Process Payment\\\\nuser._tp -= cost;\\\"\",\"Windows\":\"\",\"ShowJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn cost > 0;\\\"\",\"TextJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst settings = arguments[2];\\\\nconst fontSize = settings.FontSize;\\\\nconst color = settings.FontColor;\\\\nconst name = TextManager.tp;\\\\nconst icon = settings.Icon;\\\\nlet text = '';\\\\n\\\\n// Text: Change Font Size\\\\ntext += '\\\\\\\\\\\\\\\\FS[%1]'.format(fontSize);\\\\n\\\\n// Text: Add Color\\\\nif (color.match(/#(.*)/i) && Imported.VisuMZ_1_MessageCore) {\\\\n    text += '\\\\\\\\\\\\\\\\HexColor<#%1>'.format(String(RegExp.$1));\\\\n} else {\\\\n    text += '\\\\\\\\\\\\\\\\C[%1]'.format(color);\\\\n}\\\\n\\\\n// Text: Add Cost\\\\ntext += '%1 %2'.format(cost, name);\\\\n\\\\n// Text: Add Icon\\\\nif (icon  > 0) {\\\\n    text += '\\\\\\\\\\\\\\\\I[%1]'.format(icon);\\\\n}\\\\n\\\\n// Return text\\\\nreturn text;\\\"\",\"Gauges\":\"\",\"GaugeMaxJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn user.maxTp();\\\"\",\"GaugeCurrentJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn user.tp;\\\"\",\"GaugeDrawJS:func\":\"\\\"// Declare Settings\\\\nconst color1 = ColorManager.tpGaugeColor1();\\\\nconst color2 = ColorManager.tpGaugeColor2();\\\\nconst label = TextManager.tpA;\\\\n\\\\n// Declare Variables\\\\nconst sprite = this;\\\\nconst settings = sprite._costSettings;\\\\nconst bitmap = sprite.bitmap;\\\\nconst user = sprite._battler;\\\\nconst currentValue = sprite.currentDisplayedValue();\\\\nconst bitmapWidth = sprite.bitmapWidth();\\\\nconst bitmapHeight = sprite.textHeight ? sprite.textHeight() : sprite.bitmapHeight();\\\\nconst gaugeHeight = sprite.gaugeHeight();\\\\n\\\\n// Draw Gauge\\\\nconst gx = 0;\\\\nconst gy = bitmapHeight - gaugeHeight;\\\\nconst gw = bitmapWidth - gx;\\\\nconst gh = gaugeHeight;\\\\nthis.drawFullGauge(color1, color2, gx, gy, gw, gh);\\\\n\\\\n// Draw Label\\\\nconst lx = 4;\\\\nconst ly = 0;\\\\nconst lw = bitmapWidth;\\\\nconst lh = bitmapHeight;\\\\nsprite.setupLabelFont();\\\\nbitmap.paintOpacity = 255;\\\\nbitmap.drawText(label, lx, ly, lw, lh, \\\\\\\"left\\\\\\\");\\\\n\\\\n// Draw Value\\\\nconst vw = bitmapWidth - 2;\\\\nconst vh = bitmapHeight;\\\\nsprite.setupValueFont();\\\\nbitmap.textColor = ColorManager.tpColor(user);\\\\nbitmap.drawText(currentValue, 0, 0, vw, vh, \\\\\\\"right\\\\\\\");\\\"\"}","{\"Name:str\":\"Gold\",\"Settings\":\"\",\"Icon:num\":\"0\",\"FontColor:str\":\"17\",\"FontSize:num\":\"22\",\"Cost\":\"\",\"CalcJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nlet cost = 0;\\\\n\\\\n// Calculations\\\\nconst note = skill.note;\\\\nif (note.match(/<GOLD COST:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost += Number(RegExp.$1);\\\\n}\\\\nif (note.match(/<GOLD COST:[ ](\\\\\\\\d+)([%％])>/i)) {\\\\n    cost += Math.ceil(Number(RegExp.$1) * $gameParty.gold() / 100);\\\\n}\\\\nif (note.match(/<JS GOLD COST>\\\\\\\\s*([\\\\\\\\s\\\\\\\\S]*)\\\\\\\\s*<\\\\\\\\/JS GOLD COST>/i)) {\\\\n    const code = String(RegExp.$1);\\\\n    eval(code);\\\\n}\\\\n\\\\n// Apply Trait Cost Alterations\\\\nif (cost > 0) {\\\\n    const rateNote = /<GOLD COST:[ ](\\\\\\\\d+\\\\\\\\.?\\\\\\\\d*)([%％])>/i;\\\\n    const rates = user.traitObjects().map((obj) => (obj && obj.note.match(rateNote) ? Number(RegExp.$1) / 100 : 1));\\\\n    const flatNote = /<GOLD COST:[ ]([\\\\\\\\+\\\\\\\\-]\\\\\\\\d+)>/i;\\\\n    const flats = user.traitObjects().map((obj) => (obj && obj.note.match(flatNote) ? Number(RegExp.$1) : 0));\\\\n    cost = rates.reduce((r, rate) => r * rate, cost);\\\\n    cost = flats.reduce((r, flat) => r + flat, cost);\\\\n    cost = Math.max(1, cost);\\\\n}\\\\n\\\\n// Set Cost Limits\\\\nif (note.match(/<GOLD COST MAX:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.min(cost, Number(RegExp.$1));\\\\n}\\\\nif (note.match(/<GOLD COST MIN:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.max(cost, Number(RegExp.$1));\\\\n}\\\\n\\\\n// Return cost value\\\\nreturn Math.round(Math.max(0, cost));\\\"\",\"CanPayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn $gameParty.gold() >= cost;\\\"\",\"PayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Process Payment\\\\n$gameParty.loseGold(cost);\\\"\",\"Windows\":\"\",\"ShowJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn cost > 0;\\\"\",\"TextJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst settings = arguments[2];\\\\nconst fontSize = settings.FontSize;\\\\nconst color = settings.FontColor;\\\\nconst name = TextManager.currencyUnit;\\\\nconst icon = settings.Icon;\\\\nlet text = '';\\\\n\\\\n// Text: Change Font Size\\\\ntext += '\\\\\\\\\\\\\\\\FS[%1]'.format(fontSize);\\\\n\\\\n// Text: Add Color\\\\nif (color.match(/#(.*)/i) && Imported.VisuMZ_1_MessageCore) {\\\\n    text += '\\\\\\\\\\\\\\\\HexColor<#%1>'.format(String(RegExp.$1));\\\\n} else {\\\\n    text += '\\\\\\\\\\\\\\\\C[%1]'.format(color);\\\\n}\\\\n\\\\n// Text: Add Cost\\\\ntext += '%1 %2'.format(cost, name);\\\\n\\\\n// Text: Add Icon\\\\nif (icon  > 0) {\\\\n    text += '\\\\\\\\\\\\\\\\I[%1]'.format(icon);\\\\n}\\\\n\\\\n// Return text\\\\nreturn text;\\\"\",\"Gauges\":\"\",\"GaugeMaxJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn $gameParty.maxGold();\\\"\",\"GaugeCurrentJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn $gameParty.gold();\\\"\",\"GaugeDrawJS:func\":\"\\\"// Declare Variables\\\\nconst sprite = this;\\\\nconst settings = sprite._costSettings;\\\\nconst bitmap = sprite.bitmap;\\\\nconst user = sprite._battler;\\\\nconst currentValue = sprite.currentDisplayedValue();\\\\n\\\\n// Draw Label\\\\nconst label = TextManager.currencyUnit;\\\\nconst lx = 4;\\\\nconst ly = 0;\\\\nconst lw = sprite.bitmapWidth();\\\\nconst lh = sprite.bitmapHeight();\\\\nsprite.setupLabelFont();\\\\nbitmap.paintOpacity = 255;\\\\nbitmap.drawText(label, lx, ly, lw, lh, \\\\\\\"left\\\\\\\");\\\\n\\\\n// Draw Value\\\\nconst vw = sprite.bitmapWidth() - 2;\\\\nconst vh = sprite.bitmapHeight();\\\\nsprite.setupValueFont();\\\\nbitmap.textColor = ColorManager.normalColor();\\\\nbitmap.drawText(currentValue, 0, 0, vw, vh, \\\\\\\"right\\\\\\\");\\\"\"}","{\"Name:str\":\"Potion\",\"Settings\":\"\",\"Icon:num\":\"176\",\"FontColor:str\":\"0\",\"FontSize:num\":\"22\",\"Cost\":\"\",\"CalcJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nlet cost = 0;\\\\n\\\\n// Calculations\\\\nconst note = skill.note;\\\\nif (note.match(/<POTION COST:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost += Number(RegExp.$1);\\\\n}\\\\nif (note.match(/<JS POTION COST>\\\\\\\\s*([\\\\\\\\s\\\\\\\\S]*)\\\\\\\\s*<\\\\\\\\/JS POTION COST>/i)) {\\\\n    const code = String(RegExp.$1);\\\\n    eval(code);\\\\n}\\\\n\\\\n// Apply Trait Cost Alterations\\\\nif (cost > 0) {\\\\n    const rateNote = /<POTION COST:[ ](\\\\\\\\d+\\\\\\\\.?\\\\\\\\d*)([%％])>/i;\\\\n    const rates = user.traitObjects().map((obj) => (obj && obj.note.match(rateNote) ? Number(RegExp.$1) / 100 : 1));\\\\n    const flatNote = /<POTION COST:[ ]([\\\\\\\\+\\\\\\\\-]\\\\\\\\d+)>/i;\\\\n    const flats = user.traitObjects().map((obj) => (obj && obj.note.match(flatNote) ? Number(RegExp.$1) : 0));\\\\n    cost = rates.reduce((r, rate) => r * rate, cost);\\\\n    cost = flats.reduce((r, flat) => r + flat, cost);\\\\n    cost = Math.max(1, cost);\\\\n}\\\\n\\\\n// Set Cost Limits\\\\nif (note.match(/<POTION COST MAX:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.min(cost, Number(RegExp.$1));\\\\n}\\\\nif (note.match(/<POTION COST MIN:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.max(cost, Number(RegExp.$1));\\\\n}\\\\n\\\\n// Return cost value\\\\nreturn Math.round(Math.max(0, cost));\\\"\",\"CanPayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst item = $dataItems[7];\\\\n\\\\n// Return Boolean\\\\nif (user.isActor() && cost > 0) {\\\\n    return $gameParty.numItems(item) >= cost;\\\\n} else {\\\\n    return true;\\\\n}\\\"\",\"PayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst item = $dataItems[7];\\\\n\\\\n// Process Payment\\\\nif (user.isActor()) {\\\\n    $gameParty.loseItem(item, cost);\\\\n}\\\"\",\"Windows\":\"\",\"ShowJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn cost > 0;\\\"\",\"TextJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst item = $dataItems[7];\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst settings = arguments[2];\\\\nconst fontSize = settings.FontSize;\\\\nconst color = settings.FontColor;\\\\nconst name = settings.Name;\\\\nconst icon = settings.Icon;\\\\nlet text = '';\\\\n\\\\n// Text: Change Font Size\\\\ntext += '\\\\\\\\\\\\\\\\FS[%1]'.format(fontSize);\\\\n\\\\n// Text: Add Color\\\\nif (color.match(/#(.*)/i) && Imported.VisuMZ_1_MessageCore) {\\\\n    text += '\\\\\\\\\\\\\\\\HexColor<#%1>'.format(String(RegExp.$1));\\\\n} else {\\\\n    text += '\\\\\\\\\\\\\\\\C[%1]'.format(color);\\\\n}\\\\n\\\\n// Text: Add Cost\\\\ntext += '×%1'.format(cost);\\\\n\\\\n// Text: Add Icon\\\\ntext += '\\\\\\\\\\\\\\\\I[%1]'.format(item.iconIndex);\\\\n\\\\n// Return text\\\\nreturn text;\\\"\",\"Gauges\":\"\",\"GaugeMaxJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst item = $dataItems[7];\\\\n\\\\n// Return value\\\\nreturn $gameParty.maxItems(item);\\\"\",\"GaugeCurrentJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst item = $dataItems[7];\\\\n\\\\n// Return value\\\\nreturn $gameParty.numItems(item);\\\"\",\"GaugeDrawJS:func\":\"\\\"// Declare Settings\\\\nconst color1 = ColorManager.textColor(30);\\\\nconst color2 = ColorManager.textColor(31);\\\\n\\\\n// Declare Variables\\\\nconst sprite = this;\\\\nconst settings = sprite._costSettings;\\\\nconst bitmap = sprite.bitmap;\\\\nconst user = sprite._battler;\\\\nconst item = $dataItems[7];\\\\nconst currentValue = sprite.currentDisplayedValue();\\\\nconst bitmapWidth = sprite.bitmapWidth();\\\\nconst bitmapHeight = sprite.textHeight ? sprite.textHeight() : sprite.bitmapHeight();\\\\nconst gaugeHeight = sprite.gaugeHeight();\\\\n\\\\n// Draw Gauge\\\\nconst gx = 0;\\\\nconst gy = bitmapHeight - gaugeHeight;\\\\nconst gw = bitmapWidth - gx;\\\\nconst gh = gaugeHeight;\\\\nthis.drawFullGauge(color1, color2, gx, gy, gw, gh);\\\\n\\\\n// Draw Icon\\\\nconst iconIndex = item.iconIndex;\\\\nconst iconBitmap = ImageManager.loadSystem(\\\\\\\"IconSet\\\\\\\");\\\\nconst pw = ImageManager.iconWidth;\\\\nconst ph = ImageManager.iconHeight;\\\\nconst sx = (iconIndex % 16) * pw;\\\\nconst sy = Math.floor(iconIndex / 16) * ph;\\\\nbitmap.blt(iconBitmap, sx, sy, pw, ph, 0, 0, 24, 24);\\\\n\\\\n// Draw Value\\\\nconst vw = bitmapWidth - 2;\\\\nconst vh = bitmapHeight;\\\\nsprite.setupValueFont();\\\\nbitmap.textColor = ColorManager.normalColor();\\\\nbitmap.drawText(currentValue, 0, 0, vw, vh, \\\\\\\"right\\\\\\\");\\\"\"}","{\"Name:str\":\"Item Cost\",\"Settings\":\"\",\"Icon:num\":\"0\",\"FontColor:str\":\"0\",\"FontSize:num\":\"22\",\"Cost\":\"\",\"CalcJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nlet cost = 0;\\\\n\\\\n// Calculations\\\\nconst note = skill.note;\\\\ncost = {\\\\n    items: {},\\\\n    weapons: {},\\\\n    armors: {},\\\\n};\\\\n\\\\n// Gather Cost Notetags\\\\n{ // Item Costs\\\\n    const notetag = /<ITEM COST:[ ](\\\\\\\\d+)[ ](.*)>/gi;\\\\n    const matches = note.match(notetag);\\\\n    if (matches) {\\\\n        for (const currentMatch of matches) {\\\\n            currentMatch.match(notetag);\\\\n            const amount = Number(RegExp.$1);\\\\n            const name = String(RegExp.$2).toUpperCase().trim();\\\\n            const entry = $dataItems.find(obj => obj && obj.name.toUpperCase().trim() === name);\\\\n            if (entry) {\\\\n                cost.items[entry.id] = amount;\\\\n            }\\\\n        }\\\\n    }\\\\n}\\\\n{ // Weapon Costs\\\\n    const notetag = /<WEAPON COST:[ ](\\\\\\\\d+)[ ](.*)>/gi;\\\\n    const matches = note.match(notetag);\\\\n    if (matches) {\\\\n        for (const currentMatch of matches) {\\\\n            currentMatch.match(notetag);\\\\n            const amount = Number(RegExp.$1);\\\\n            const name = String(RegExp.$2).toUpperCase().trim();\\\\n            const entry = $dataWeapons.find(obj => obj && obj.name.toUpperCase().trim() === name);\\\\n            if (entry) {\\\\n                cost.weapons[entry.id] = amount;\\\\n            }\\\\n        }\\\\n    }\\\\n}\\\\n{ // Armor Costs\\\\n    const notetag = /<ARMOR COST:[ ](\\\\\\\\d+)[ ](.*)>/gi;\\\\n    const matches = note.match(notetag);\\\\n    if (matches) {\\\\n        for (const currentMatch of matches) {\\\\n            currentMatch.match(notetag);\\\\n            const amount = Number(RegExp.$1);\\\\n            const name = String(RegExp.$2).toUpperCase().trim();\\\\n            const entry = $dataArmors.find(obj => obj && obj.name.toUpperCase().trim() === name);\\\\n            if (entry) {\\\\n                cost.armors[entry.id] = amount;\\\\n            }\\\\n        }\\\\n    }\\\\n}\\\\n\\\\n// Declare Trait Objects\\\\nconst traitObjects = user.traitObjects();\\\\n\\\\n// Apply Cost Rate Modifiers\\\\nfor (const traitObject of traitObjects) {\\\\n    if (!traitObject) continue;\\\\n    const objNote = traitObject.note || '';\\\\n    { // Item Cost Rate Modifiers\\\\n        const notetag = /<ITEM COST:[ ](\\\\\\\\d+)([%％])[ ](.*)>/gi;\\\\n        const matches = objNote.match(notetag);\\\\n        if (matches) {\\\\n            for (const currentMatch of matches) {\\\\n                currentMatch.match(notetag);\\\\n                const rate = Number(RegExp.$1) * 0.01;\\\\n                const name = String(RegExp.$3).toUpperCase().trim();\\\\n                const entry = $dataItems.find(obj => obj && obj.name.toUpperCase().trim() === name);\\\\n                if (entry && cost.items[entry.id]) {\\\\n                    cost.items[entry.id] = Math.ceil(cost.items[entry.id] * rate);\\\\n                    if (cost.items[entry.id] <= 0) cost.items[entry.id] = 0;\\\\n                }\\\\n            }\\\\n        }\\\\n    }\\\\n    { // Weapon Cost Rate Modifiers\\\\n        const notetag = /<WEAPON COST:[ ](\\\\\\\\d+)([%％])[ ](.*)>/gi;\\\\n        const matches = objNote.match(notetag);\\\\n        if (matches) {\\\\n            for (const currentMatch of matches) {\\\\n                currentMatch.match(notetag);\\\\n                const rate = Number(RegExp.$1) * 0.01;\\\\n                const name = String(RegExp.$3).toUpperCase().trim();\\\\n                const entry = $dataWeapons.find(obj => obj && obj.name.toUpperCase().trim() === name);\\\\n                if (entry && cost.weapons[entry.id]) {\\\\n                    cost.weapons[entry.id] = Math.ceil(cost.weapons[entry.id] * rate);\\\\n                    if (cost.weapons[entry.id] <= 0) cost.weapons[entry.id] = 0;\\\\n                }\\\\n            }\\\\n        }\\\\n    }\\\\n    { // Armor Cost Rate Modifiers\\\\n        const notetag = /<ARMOR COST:[ ](\\\\\\\\d+)([%％])[ ](.*)>/gi;\\\\n        const matches = objNote.match(notetag);\\\\n        if (matches) {\\\\n            for (const currentMatch of matches) {\\\\n                currentMatch.match(notetag);\\\\n                const rate = Number(RegExp.$1) * 0.01;\\\\n                const name = String(RegExp.$3).toUpperCase().trim();\\\\n                const entry = $dataArmors.find(obj => obj && obj.name.toUpperCase().trim() === name);\\\\n                if (entry && cost.armors[entry.id]) {\\\\n                    cost.armors[entry.id] = Math.ceil(cost.armors[entry.id] * rate);\\\\n                    if (cost.armors[entry.id] <= 0) cost.armors[entry.id] = 0;\\\\n                }\\\\n            }\\\\n        }\\\\n    }\\\\n}\\\\n\\\\n// Apply Flat Cost Modifiers\\\\nfor (const traitObject of traitObjects) {\\\\n    if (!traitObject) continue;\\\\n    const objNote = traitObject.note || '';\\\\n    { // Item Flat Cost Modifiers\\\\n        const notetag = /<ITEM COST:[ ]([\\\\\\\\+\\\\\\\\-]\\\\\\\\d+)[ ](.*)>/gi;\\\\n        const matches = objNote.match(notetag);\\\\n        if (matches) {\\\\n            for (const currentMatch of matches) {\\\\n                currentMatch.match(notetag);\\\\n                const flat = Number(RegExp.$1);\\\\n                const name = String(RegExp.$2).toUpperCase().trim();\\\\n                const entry = $dataItems.find(obj => obj && obj.name.toUpperCase().trim() === name);\\\\n                if (entry && cost.items[entry.id]) {\\\\n                    cost.items[entry.id] += flat;\\\\n                    if (cost.items[entry.id] <= 0) cost.items[entry.id] = 0;\\\\n                }\\\\n            }\\\\n        }\\\\n    }\\\\n    { // Weapon Flat Cost Modifiers\\\\n        const notetag = /<WEAPON COST:[ ]([\\\\\\\\+\\\\\\\\-]\\\\\\\\d+)[ ](.*)>/gi;\\\\n        const matches = objNote.match(notetag);\\\\n        if (matches) {\\\\n            for (const currentMatch of matches) {\\\\n                currentMatch.match(notetag);\\\\n                const flat = Number(RegExp.$1);\\\\n                const name = String(RegExp.$2).toUpperCase().trim();\\\\n                const entry = $dataWeapons.find(obj => obj && obj.name.toUpperCase().trim() === name);\\\\n                if (entry && cost.weapons[entry.id]) {\\\\n                    cost.weapons[entry.id] += flat;\\\\n                    if (cost.weapons[entry.id] <= 0) cost.weapons[entry.id] = 0;\\\\n                }\\\\n            }\\\\n        }\\\\n    }\\\\n    { // Armor Flat Cost Modifiers\\\\n        const notetag = /<ARMOR COST:[ ]([\\\\\\\\+\\\\\\\\-]\\\\\\\\d+)[ ](.*)>/gi;\\\\n        const matches = objNote.match(notetag);\\\\n        if (matches) {\\\\n            for (const currentMatch of matches) {\\\\n                currentMatch.match(notetag);\\\\n                const flat = Number(RegExp.$1);\\\\n                const name = String(RegExp.$2).toUpperCase().trim();\\\\n                const entry = $dataArmors.find(obj => obj && obj.name.toUpperCase().trim() === name);\\\\n                if (entry && cost.armors[entry.id]) {\\\\n                    cost.armors[entry.id] += flat;\\\\n                    if (cost.armors[entry.id] <= 0) cost.armors[entry.id] = 0;\\\\n                }\\\\n            }\\\\n        }\\\\n    }\\\\n}\\\\n\\\\n// Set Cost Limits\\\\n{ // Item Cost Limits\\\\n    { // Maximum Cost\\\\n        const notetag = /<ITEM COST MAX:[ ](\\\\\\\\d+)[ ](.*)>/gi;\\\\n        const matches = note.match(notetag);\\\\n        if (matches) {\\\\n            for (const currentMatch of matches) {\\\\n                currentMatch.match(notetag);\\\\n                const max = Number(RegExp.$1);\\\\n                const name = String(RegExp.$2).toUpperCase().trim();\\\\n                const entry = $dataItems.find(obj => obj && obj.name.toUpperCase().trim() === name);\\\\n                if (entry && cost.items[entry.id] !== undefined) {\\\\n                    cost.items[entry.id] = Math.min(max, cost.items[entry.id]);\\\\n                }\\\\n            }\\\\n        }\\\\n    }\\\\n    { // Minimum Cost\\\\n        const notetag = /<ITEM COST MIN:[ ](\\\\\\\\d+)[ ](.*)>/gi;\\\\n        const matches = note.match(notetag);\\\\n        if (matches) {\\\\n            for (const currentMatch of matches) {\\\\n                currentMatch.match(notetag);\\\\n                const min = Number(RegExp.$1);\\\\n                const name = String(RegExp.$2).toUpperCase().trim();\\\\n                const entry = $dataItems.find(obj => obj && obj.name.toUpperCase().trim() === name);\\\\n                if (entry && cost.items[entry.id] !== undefined) {\\\\n                    cost.items[entry.id] = Math.max(min, cost.items[entry.id]);\\\\n                }\\\\n            }\\\\n        }\\\\n    }\\\\n}\\\\n{ // Weapon Cost Limits\\\\n    { // Maximum Cost\\\\n        const notetag = /<WEAPON COST MAX:[ ](\\\\\\\\d+)[ ](.*)>/gi;\\\\n        const matches = note.match(notetag);\\\\n        if (matches) {\\\\n            for (const currentMatch of matches) {\\\\n                currentMatch.match(notetag);\\\\n                const max = Number(RegExp.$1);\\\\n                const name = String(RegExp.$2).toUpperCase().trim();\\\\n                const entry = $dataWeapons.find(obj => obj && obj.name.toUpperCase().trim() === name);\\\\n                if (entry && cost.weapons[entry.id] !== undefined) {\\\\n                    cost.weapons[entry.id] = Math.min(max, cost.weapons[entry.id]);\\\\n                }\\\\n            }\\\\n        }\\\\n    }\\\\n    { // Minimum Cost\\\\n        const notetag = /<WEAPON COST MIN:[ ](\\\\\\\\d+)[ ](.*)>/gi;\\\\n        const matches = note.match(notetag);\\\\n        if (matches) {\\\\n            for (const currentMatch of matches) {\\\\n                currentMatch.match(notetag);\\\\n                const min = Number(RegExp.$1);\\\\n                const name = String(RegExp.$2).toUpperCase().trim();\\\\n                const entry = $dataWeapons.find(obj => obj && obj.name.toUpperCase().trim() === name);\\\\n                if (entry && cost.weapons[entry.id] !== undefined) {\\\\n                    cost.weapons[entry.id] = Math.max(min, cost.weapons[entry.id]);\\\\n                }\\\\n            }\\\\n        }\\\\n    }\\\\n}\\\\n{ // Armor Cost Limits\\\\n    { // Maximum Cost\\\\n        const notetag = /<ARMOR COST MAX:[ ](\\\\\\\\d+)[ ](.*)>/gi;\\\\n        const matches = note.match(notetag);\\\\n        if (matches) {\\\\n            for (const currentMatch of matches) {\\\\n                currentMatch.match(notetag);\\\\n                const max = Number(RegExp.$1);\\\\n                const name = String(RegExp.$2).toUpperCase().trim();\\\\n                const entry = $dataArmors.find(obj => obj && obj.name.toUpperCase().trim() === name);\\\\n                if (entry && cost.armors[entry.id] !== undefined) {\\\\n                    cost.armors[entry.id] = Math.min(max, cost.armors[entry.id]);\\\\n                }\\\\n            }\\\\n        }\\\\n    }\\\\n    { // Minimum Cost\\\\n        const notetag = /<ARMOR COST MIN:[ ](\\\\\\\\d+)[ ](.*)>/gi;\\\\n        const matches = note.match(notetag);\\\\n        if (matches) {\\\\n            for (const currentMatch of matches) {\\\\n                currentMatch.match(notetag);\\\\n                const min = Number(RegExp.$1);\\\\n                const name = String(RegExp.$2).toUpperCase().trim();\\\\n                const entry = $dataArmors.find(obj => obj && obj.name.toUpperCase().trim() === name);\\\\n                if (entry && cost.armors[entry.id] !== undefined) {\\\\n                    cost.armors[entry.id] = Math.max(min, cost.armors[entry.id]);\\\\n                }\\\\n            }\\\\n        }\\\\n    }\\\\n}\\\\n\\\\n// Apply Replacement Costs\\\\nfor (const traitObject of traitObjects) {\\\\n    if (!traitObject) continue;\\\\n    const objNote = traitObject.note || '';\\\\n    { // Item Replacement Costs\\\\n        const notetag = /<REPLACE ITEM (.*) COST:[ ](.*)>/gi;\\\\n        const matches = objNote.match(notetag);\\\\n        if (matches) {\\\\n            for (const currentMatch of matches) {\\\\n                currentMatch.match(notetag);\\\\n                const name1 = String(RegExp.$1).toUpperCase().trim();\\\\n                const name2 = String(RegExp.$2).toUpperCase().trim();\\\\n                const entry1 = $dataItems.find(obj => obj && obj.name.toUpperCase().trim() === name1);\\\\n                const entry2 = $dataItems.find(obj => obj && obj.name.toUpperCase().trim() === name2);\\\\n                if (entry1 && entry2 && cost.items[entry1.id]) {\\\\n                    cost.items[entry2.id] = cost.items[entry1.id];\\\\n                    delete cost.items[entry1.id];\\\\n                }\\\\n            }\\\\n        }\\\\n    }\\\\n    { // Weapon Replacement Costs\\\\n        const notetag = /<REPLACE WEAPON (.*) COST:[ ](.*)>/gi;\\\\n        const matches = objNote.match(notetag);\\\\n        if (matches) {\\\\n            for (const currentMatch of matches) {\\\\n                currentMatch.match(notetag);\\\\n                const name1 = String(RegExp.$1).toUpperCase().trim();\\\\n                const name2 = String(RegExp.$2).toUpperCase().trim();\\\\n                const entry1 = $dataWeapons.find(obj => obj && obj.name.toUpperCase().trim() === name1);\\\\n                const entry2 = $dataWeapons.find(obj => obj && obj.name.toUpperCase().trim() === name2);\\\\n                if (entry1 && entry2 && cost.weapons[entry1.id]) {\\\\n                    cost.weapons[entry2.id] = cost.weapons[entry1.id];\\\\n                    delete cost.items[entry1.id];\\\\n                }\\\\n            }\\\\n        }\\\\n    }\\\\n    { // Armor Replacement Costs\\\\n        const notetag = /<REPLACE ARMOR (.*) COST:[ ](.*)>/gi;\\\\n        const matches = objNote.match(notetag);\\\\n        if (matches) {\\\\n            for (const currentMatch of matches) {\\\\n                currentMatch.match(notetag);\\\\n                const name1 = String(RegExp.$1).toUpperCase().trim();\\\\n                const name2 = String(RegExp.$2).toUpperCase().trim();\\\\n                const entry1 = $dataArmors.find(obj => obj && obj.name.toUpperCase().trim() === name1);\\\\n                const entry2 = $dataArmors.find(obj => obj && obj.name.toUpperCase().trim() === name2);\\\\n                if (entry1 && entry2 && cost.armors[entry1.id]) {\\\\n                    cost.armors[entry2.id] = cost.armors[entry1.id];\\\\n                    delete cost.items[entry1.id];\\\\n                }\\\\n            }\\\\n        }\\\\n    }\\\\n}\\\\n\\\\n// Return cost data\\\\nreturn cost;\\\"\",\"CanPayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Check Individual Costs\\\\n{ // Check Item Costs\\\\n    for (let id in cost.items) {\\\\n        const obj = $dataItems[id];\\\\n        if (obj) {\\\\n            const costAmount = cost.items[id];\\\\n            const ownedAmount = $gameParty.numItems(obj);\\\\n            if (costAmount > ownedAmount) return false;\\\\n        }\\\\n    }\\\\n}\\\\n{ // Check Weapon Costs\\\\n    for (let id in cost.weapons) {\\\\n        const obj = $dataWeapons[id];\\\\n        if (obj) {\\\\n            const costAmount = cost.weapons[id];\\\\n            const ownedAmount = $gameParty.numItems(obj);\\\\n            if (costAmount > ownedAmount) return false;\\\\n        }\\\\n    }\\\\n}\\\\n{ // Check Armor Costs\\\\n    for (let id in cost.armors) {\\\\n        const obj = $dataArmors[id];\\\\n        if (obj) {\\\\n            const costAmount = cost.armors[id];\\\\n            const ownedAmount = $gameParty.numItems(obj);\\\\n            if (costAmount > ownedAmount) return false;\\\\n        }\\\\n    }\\\\n}\\\\n\\\\n// Return True\\\\nreturn true;\\\"\",\"PayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Process Payment\\\\n{ // Check Item Costs\\\\n    for (let id in cost.items) {\\\\n        const obj = $dataItems[id];\\\\n        if (obj && obj.consumable) {\\\\n            if (obj.itypeId !== 2) {\\\\n                const costAmount = cost.items[id];\\\\n                $gameParty.loseItem(obj, costAmount);\\\\n            }\\\\n        }\\\\n    }\\\\n}\\\\n{ // Check Weapon Costs\\\\n    for (let id in cost.weapons) {\\\\n        const obj = $dataWeapons[id];\\\\n        if (obj) {\\\\n            const costAmount = cost.weapons[id];\\\\n            $gameParty.loseItem(obj, costAmount);\\\\n        }\\\\n    }\\\\n}\\\\n{ // Check Armor Costs\\\\n    for (let id in cost.armors) {\\\\n        const obj = $dataArmors[id];\\\\n        if (obj) {\\\\n            const costAmount = cost.armors[id];\\\\n            $gameParty.loseItem(obj, costAmount);\\\\n        }\\\\n    }\\\\n}\\\"\",\"Windows\":\"\",\"ShowJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Check Keys\\\\nconst keys = ['items', 'weapons', 'armors'];\\\\n\\\\n// Return False\\\\nreturn keys.some(key => Object.keys(cost[key]).length > 0);\\\"\",\"TextJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst settings = arguments[2];\\\\nconst fontSize = settings.FontSize;\\\\nconst color = settings.FontColor;\\\\nconst name = settings.Name;\\\\nconst icon = settings.Icon;\\\\nconst keys = ['items', 'weapons', 'armors'];\\\\nlet text = '';\\\\n\\\\n// Text: Change Font Size\\\\ntext += '\\\\\\\\\\\\\\\\FS[%1]'.format(fontSize);\\\\n\\\\n// Text: Add Color\\\\nif (color.match(/#(.*)/i) && Imported.VisuMZ_1_MessageCore) {\\\\n    text += '\\\\\\\\\\\\\\\\HexColor<#%1>'.format(String(RegExp.$1));\\\\n} else {\\\\n    text += '\\\\\\\\\\\\\\\\C[%1]'.format(color);\\\\n}\\\\n\\\\n// Text: Add Cost\\\\nfor (const key of keys) {\\\\n    const database = [$dataItems, $dataWeapons, $dataArmors][keys.indexOf(key)];\\\\n    const costData = cost[key];\\\\n    const idList = Object.keys(costData).sort((a, b) => a - b);\\\\n    for (const id of idList) {\\\\n        const obj = database[id];\\\\n        const iconIndex = obj.iconIndex;\\\\n        const costAmount = costData[id];\\\\n        text += '\\\\\\\\\\\\\\\\I[%1]×%2 '.format(iconIndex, costAmount);\\\\n    }\\\\n}\\\\n\\\\n// Return text\\\\nreturn text.trim();\\\"\",\"Gauges\":\"\",\"GaugeMaxJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn 0;\\\"\",\"GaugeCurrentJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn 0;\\\"\",\"GaugeDrawJS:func\":\"\\\"// Don't Draw Anything\\\\n// This does not work as a gauge.\\\"\"}"]
 *
 * @param Gauge:struct
 * @text Gauge Settings
 * @parent Skills:struct
 * @type struct<Gauge>
 * @desc Settings in regards to how skill cost gauges function and appear.
 * @default {"Labels":"","LabelFontMainType:str":"main","MatchLabelColor:eval":"true","MatchLabelGaugeColor:num":"2","PresetLabelGaugeColor:num":"16","LabelOutlineSolid:eval":"true","LabelOutlineWidth:num":"3","Values":"","ValueFontMainType:str":"number","ValueOutlineSolid:eval":"true","ValueOutlineWidth:num":"3"}
 *
 * @param BreakSkills
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param States:struct
 * @text State Settings
 * @type struct<States>
 * @desc Adjust general state settings here.
 * @default {"General":"","ReapplyRules:str":"greater","MaxTurns:num":"99","ActionEndUpdate:eval":"true","Turns":"","ShowTurns:eval":"true","TurnFontSize:num":"16","TurnOffsetX:num":"-4","TurnOffsetY:num":"-6","ColorNeutral:str":"0","ColorPositive:str":"24","ColorNegative:str":"27","Data":"","ShowData:eval":"true","DataFontSize:num":"12","DataOffsetX:num":"0","DataOffsetY:num":"8","CustomJS":"","onAddStateJS:func":"\"// Declare Variables\\nconst stateId = arguments[0];\\nconst origin = this.getStateOrigin(stateId);\\nconst state = $dataStates[stateId];\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\"","onEraseStateJS:func":"\"// Declare Variables\\nconst stateId = arguments[0];\\nconst origin = this.getStateOrigin(stateId);\\nconst state = $dataStates[stateId];\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\"","onExpireStateJS:func":"\"// Declare Variables\\nconst stateId = arguments[0];\\nconst origin = this.getStateOrigin(stateId);\\nconst state = $dataStates[stateId];\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\""}
 *
 * @param Buffs:struct
 * @text Buff/Debuff Settings
 * @parent States:struct
 * @type struct<Buffs>
 * @desc Adjust general buff/debuff settings here.
 * @default {"General":"","ReapplyRules:str":"greater","MaxTurns:num":"99","Stacking":"","StackBuffMax:num":"2","StackDebuffMax:num":"2","MultiplierJS:func":"\"// Declare Variables\\nconst user = this;\\nconst paramId = arguments[0];\\nconst buffLevel = arguments[1];\\nlet rate = 1;\\n\\n// Perform Calculations\\nrate += buffLevel * 0.25;\\n\\n// Return Rate\\nreturn Math.max(0, rate);\"","Turns":"","ShowTurns:eval":"true","TurnFontSize:num":"16","TurnOffsetX:num":"-4","TurnOffsetY:num":"-6","ColorBuff:str":"24","ColorDebuff:str":"27","Data":"","ShowData:eval":"false","DataFontSize:num":"12","DataOffsetX:num":"0","DataOffsetY:num":"8","CustomJS":"","onAddBuffJS:func":"\"// Declare Variables\\nconst paramId = arguments[0];\\nconst modifier = this._buffs[paramId];\\nconst origin = this.getCurrentStateActiveUser();\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\"","onAddDebuffJS:func":"\"// Declare Variables\\nconst paramId = arguments[0];\\nconst modifier = this._buffs[paramId];\\nconst origin = this.getCurrentStateActiveUser();\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\"","onEraseBuffJS:func":"\"// Declare Variables\\nconst paramId = arguments[0];\\nconst modifier = this._buffs[paramId];\\nconst origin = this.getCurrentStateActiveUser();\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\"","onEraseDebuffJS:func":"\"// Declare Variables\\nconst paramId = arguments[0];\\nconst modifier = this._buffs[paramId];\\nconst origin = this.getCurrentStateActiveUser();\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\"","onExpireBuffJS:func":"\"// Declare Variables\\nconst paramId = arguments[0];\\nconst modifier = this._buffs[paramId];\\nconst origin = this.getCurrentStateActiveUser();\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\"","onExpireDebuffJS:func":"\"// Declare Variables\\nconst paramId = arguments[0];\\nconst modifier = this._buffs[paramId];\\nconst origin = this.getCurrentStateActiveUser();\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\""}
 *
 * @param PassiveStates:struct
 * @text Passive States
 * @parent States:struct
 * @type struct<PassiveStates>
 * @desc Adjust passive state settings here.
 * @default {"List":"","Global:arraynum":"[]","Actor:arraynum":"[]","Enemy:arraynum":"[]","CustomJS":"","PassiveConditionJS:func":"\"// Declare Variables\\nconst state = arguments[0];\\nconst stateId = state.id;\\nconst user = this;\\nconst target = this;\\nconst a = this;\\nconst b = this;\\nlet condition = true;\\n\\n// Perform Checks\\n\\n\\n// Return boolean\\nreturn condition;\""}
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
 * General Skill Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Skills:
 *
 * @param General
 *
 * @param EnableLayout:eval
 * @text Use Updated Layout
 * @parent General
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use the Updated Skill Menu Layout provided by this plugin?
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
 * @param SkillTypeWindow
 * @text Skill Type Window
 *
 * @param CmdStyle:str
 * @text Style
 * @parent SkillTypeWindow
 * @type select
 * @option Text Only
 * @value text
 * @option Icon Only
 * @value icon
 * @option Icon + Text
 * @value iconText
 * @option Automatic
 * @value auto
 * @desc How do you wish to draw commands in the Skill Type Window?
 * @default auto
 *
 * @param CmdTextAlign:str
 * @text Text Align
 * @parent SkillTypeWindow
 * @type combo
 * @option left
 * @option center
 * @option right
 * @desc Text alignment for the Skill Type Window.
 * @default left
 *
 * @param CmdWidth:num
 * @text Window Width
 * @parent SkillTypeWindow
 * @type number
 * @min 1
 * @desc What is the desired pixel width of this window?
 * Default: 240
 * @default 240
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
 * @param ShopStatusWindow
 * @text Shop Status Window
 *
 * @param ShowShopStatus:eval
 * @text Show in Skill Menu?
 * @parent ShopStatusWindow
 * @type boolean
 * @on Show
 * @off Don't Show
 * @desc Show the Shop Status Window in the Skill Menu?
 * This is enabled if the Updated Layout is on.
 * @default true
 *
 * @param SkillSceneAdjustSkillList:eval
 * @text Adjust List Window?
 * @parent ShopStatusWindow
 * @type boolean
 * @on Adjust
 * @off Don't
 * @desc Automatically adjust the Skill List Window in the Skill Menu if using the Shop Status Window?
 * @default true
 *
 * @param SkillSceneStatusBgType:num
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
 * @param SkillMenuStatusRect:func
 * @text JS: X, Y, W, H
 * @parent ShopStatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this Shop Status Window in the Skill Menu.
 * @default "const ww = this.shopStatusWidth();\nconst wh = this._itemWindow.height;\nconst wx = Graphics.boxWidth - this.shopStatusWidth();\nconst wy = this._itemWindow.y;\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 * @param SkillTypes
 * @text Skill Types
 *
 * @param HiddenSkillTypes:arraynum
 * @text Hidden Skill Types
 * @parent SkillTypes
 * @type number[]
 * @min 1
 * @max 99
 * @desc Insert the ID's of the Skill Types you want hidden from view ingame.
 * @default []
 *
 * @param BattleHiddenSkillTypes:arraynum
 * @text Hidden During Battle
 * @parent SkillTypes
 * @type number[]
 * @min 1
 * @max 99
 * @desc Insert the ID's of the Skill Types you want hidden during battle only.
 * @default []
 *
 * @param IconStypeNorm:num
 * @text Icon: Normal Type
 * @parent SkillTypes
 * @desc Icon used for normal skill types that aren't assigned any icons.
 * @default 78
 *
 * @param IconStypeMagic:num
 * @text Icon: Magic Type
 * @parent SkillTypes
 * @desc Icon used for magic skill types that aren't assigned any icons.
 * @default 79
 *
 * @param SortSkillTypesAbc:arraynum
 * @text Sort: Alphabetical
 * @parent SkillTypes
 * @type number[]
 * @min 1
 * @max 99
 * @desc Insert the ID's of Skill Types you want sorted alphabetically.
 * @default []
 *
 * @param CustomJS
 * @text Global JS Effects
 *
 * @param SkillConditionJS:func
 * @text JS: Skill Conditions
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide skill condition check.
 * @default "// Declare Variables\nconst skill = arguments[0];\nconst user = this;\nconst target = this;\nconst a = this;\nconst b = this;\nlet enabled = true;\n\n// Perform Checks\n\n\n// Return boolean\nreturn enabled;"
 *
 */
/* ----------------------------------------------------------------------------
 * Skill Cost Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Cost:
 *
 * @param Name:str
 * @text Name
 * @desc A name for this Skill Cost Type.
 * @default Untitled
 *
 * @param Settings
 *
 * @param Icon:num
 * @text Icon
 * @parent Settings
 * @desc Icon used for this Skill Cost Type.
 * Use 0 for no icon.
 * @default 0
 *
 * @param FontColor:str
 * @text Font Color
 * @parent Settings
 * @desc Text Color used to display this cost.
 * For a hex color, use #rrggbb with VisuMZ_1_MessageCore
 * @default 0
 *
 * @param FontSize:num
 * @text Font Size
 * @parent Settings
 * @type number
 * @min 1
 * @desc Font size used to display this cost.
 * @default 22
 *
 * @param Cost
 * @text Cost Processing
 *
 * @param CalcJS:func
 * @text JS: Cost Calculation
 * @parent Cost
 * @type note
 * @desc Code on how to calculate this resource cost for the skill.
 * @default "// Declare Variables\nconst user = this;\nconst skill = arguments[0];\nlet cost = 0;\n\n// Return cost value\nreturn Math.round(Math.max(0, cost));"
 *
 * @param CanPayJS:func
 * @text JS: Can Pay Cost?
 * @parent Cost
 * @type note
 * @desc Code on calculating whether or not the user is able to pay the cost.
 * @default "// Declare Variables\nconst user = this;\nconst skill = arguments[0];\nconst cost = arguments[1];\n\n// Return Boolean\nreturn true;"
 *
 * @param PayJS:func
 * @text JS: Paying Cost
 * @parent Cost
 * @type note
 * @desc Code for if met, this is the actual process of paying of the cost.
 * @default "// Declare Variables\nconst user = this;\nconst skill = arguments[0];\nconst cost = arguments[1];\n\n// Process Payment\n"
 *
 * @param Windows
 * @text Window Display
 *
 * @param ShowJS:func
 * @text JS: Show Cost?
 * @parent  Windows
 * @type note
 * @desc Code for determining if the cost is shown or not.
 * @default "// Declare Variables\nconst user = this;\nconst skill = arguments[0];\nconst cost = arguments[1];\n\n// Return Boolean\nreturn cost > 0;"
 *
 * @param TextJS:func
 * @text JS: Cost Text
 * @parent  Windows
 * @type note
 * @desc Code to determine the text (with Text Code support) used for the displayed cost.
 * @default "// Declare Variables\nconst user = this;\nconst skill = arguments[0];\nconst cost = arguments[1];\nconst settings = arguments[2];\nconst fontSize = settings.FontSize;\nconst color = settings.FontColor;\nconst name = settings.Name;\nconst icon = settings.Icon;\nlet text = '';\n\n// Text: Change Font Size\ntext += '\\\\FS[%1]'.format(fontSize);\n\n// Text: Add Color\nif (color.match(/#(.*)/i) && Imported.VisuMZ_1_MessageCore) {\n    text += '\\\\HexColor<#%1>'.format(String(RegExp.$1));\n} else {\n    text += '\\\\C[%1]'.format(color);\n}\n\n// Text: Add Cost\ntext += '%1 %2'.format(cost, name);\n\n// Text: Add Icon\nif (icon  > 0) {\n    text += '\\\\I[%1]'.format(icon);\n}\n\n// Return text\nreturn text;"
 *
 * @param Gauges
 * @text Gauge Display
 *
 * @param GaugeMaxJS:func
 * @text JS: Maximum Value
 * @parent  Gauges
 * @type note
 * @desc Code to determine the maximum value used for this Skill Cost resource for gauges.
 * @default "// Declare Variables\nconst user = this;\n\n// Return value\nreturn 0;"
 *
 * @param GaugeCurrentJS:func
 * @text JS: Current Value
 * @parent  Gauges
 * @type note
 * @desc Code to determine the current value used for this Skill Cost resource for gauges.
 * @default "// Declare Variables\nconst user = this;\n\n// Return value\nreturn 0;"
 *
 * @param GaugeDrawJS:func
 * @text JS: Draw Gauge
 * @parent  Gauges
 * @type note
 * @desc Code to determine how to draw the Skill Cost resource for this gauge type.
 * @default "// Declare Variables\nconst sprite = this;\nconst settings = sprite._costSettings;\nconst bitmap = sprite.bitmap;\nconst user = sprite._battler;\nconst currentValue = sprite.currentDisplayedValue();\n\n// Draw Gauge\nconst color1 = ColorManager.textColor(30);\nconst color2 = ColorManager.textColor(31);\nconst gx = 0;\nconst gy = sprite.bitmapHeight() - sprite.gaugeHeight();\nconst gw = sprite.bitmapWidth() - gx;\nconst gh = sprite.gaugeHeight();\nthis.drawFullGauge(color1, color2, gx, gy, gw, gh);\n\n// Draw Label\nconst label = settings.Name;\nconst lx = 4;\nconst ly = 0;\nconst lw = sprite.bitmapWidth();\nconst lh = sprite.bitmapHeight();\nsprite.setupLabelFont();\nbitmap.paintOpacity = 255;\nbitmap.drawText(label, lx, ly, lw, lh, \"left\");\n\n// Draw Value\nconst vw = sprite.bitmapWidth() - 2;\nconst vh = sprite.bitmapHeight();\nsprite.setupValueFont();\nbitmap.textColor = ColorManager.normalColor();\nbitmap.drawText(currentValue, 0, 0, vw, vh, \"right\");"
 *
 */
/* ----------------------------------------------------------------------------
 * Gauge Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Gauge:
 *
 * @param Labels
 *
 * @param LabelFontMainType:str
 * @text Font Type
 * @parent Labels
 * @type select
 * @option main
 * @option number
 * @desc Which font type should be used for labels?
 * @default main
 *
 * @param MatchLabelColor:eval
 * @text Match Label Color
 * @parent Labels
 * @type boolean
 * @on Match
 * @off Preset
 * @desc Match the label color to the Gauge Color being used?
 * @default true
 *
 * @param MatchLabelGaugeColor:num
 * @text Match: Gauge # ?
 * @parent MatchLabelColor:eval
 * @type number
 * @min 1
 * @max 2
 * @desc Which Gauge Color should be matched?
 * @default 2
 *
 * @param PresetLabelGaugeColor:num
 * @text Preset: Gauge Color
 * @parent MatchLabelColor:eval
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 16
 *
 * @param LabelOutlineSolid:eval
 * @text Solid Outline
 * @parent Labels
 * @type boolean
 * @on Solid
 * @off Semi-Transparent
 * @desc Make the label outline a solid black color?
 * @default true
 *
 * @param LabelOutlineWidth:num
 * @text Outline Width
 * @parent Labels
 * @type number
 * @min 0
 * @desc What width do you wish to use for your outline?
 * Use 0 to not use an outline.
 * @default 3
 *
 * @param Values
 *
 * @param ValueFontMainType:str
 * @text Font Type
 * @parent Values
 * @type select
 * @option main
 * @option number
 * @desc Which font type should be used for values?
 * @default number
 *
 * @param ValueOutlineSolid:eval
 * @text Solid Outline
 * @parent Values
 * @type boolean
 * @on Solid
 * @off Semi-Transparent
 * @desc Make the value outline a solid black color?
 * @default true
 *
 * @param ValueOutlineWidth:num
 * @text Outline Width
 * @parent Values
 * @type number
 * @min 0
 * @desc What width do you wish to use for your outline?
 * Use 0 to not use an outline.
 * @default 3
 *
 */
/* ----------------------------------------------------------------------------
 * General State Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~States:
 *
 * @param General
 *
 * @param ReapplyRules:str
 * @text Reapply Rules
 * @parent General
 * @type select
 * @option Ignore: State doesn't get added.
 * @value ignore
 * @option Reset: Turns get reset.
 * @value reset
 * @option Greater: Turns take greater value (current vs reset).
 * @value greater
 * @option Add: Turns add upon existing turns.
 * @value add
 * @desc These are the rules when reapplying states.
 * @default greater
 *
 * @param MaxTurns:num
 * @text Maximum Turns
 * @parent General
 * @type number
 * @min 1
 * @desc Maximum number of turns to let states go up to.
 * This can be changed with the <Max Turns: x> notetag.
 * @default 9999
 *
 * @param ActionEndUpdate:eval
 * @text Action End Update
 * @parent General
 * @type boolean
 * @on Update Each Action
 * @off Don't Change
 * @desc States with "Action End" auto-removal will also update
 * turns at the end of each action instead of all actions.
 * @default true
 *
 * @param TurnEndOnMap:num
 * @text Turn End on Map
 * @parent General
 * @type number
 * @desc Update any state and buff turns on the map after
 * this many steps. Use 0 to disable.
 * @default 20
 *
 * @param Turns
 * @text Turn Display
 *
 * @param ShowTurns:eval
 * @text Show Turns?
 * @parent Turns
 * @type boolean
 * @on Display
 * @off Hide
 * @desc Display state turns on top of window icons and sprites?
 * @default true
 *
 * @param TurnFontSize:num
 * @text Turn Font Size
 * @parent Turns
 * @type number
 * @min 1
 * @desc Font size used for displaying turns.
 * @default 16
 *
 * @param TurnOffsetX:num
 * @text Offset X
 * @parent Turns
 * @desc Offset the X position of the turn display.
 * @default -4
 *
 * @param TurnOffsetY:num
 * @text Offset Y
 * @parent Turns
 * @desc Offset the Y position of the turn display.
 * @default -6
 *
 * @param TurnFontSize:num
 * @text Turn Font Size
 * @parent Turns
 * @desc Font size used for displaying turns.
 * @default 16
 *
 * @param ColorNeutral:str
 * @text Turn Color: Neutral
 * @parent Turns
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 0
 *
 * @param ColorPositive:str
 * @text Turn Color: Positive
 * @parent Turns
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 24
 *
 * @param ColorNegative:str
 * @text Turn Color: Negative
 * @parent Turns
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 27
 *
 * @param Data
 * @text Data Display
 *
 * @param ShowData:eval
 * @text Show Data?
 * @parent Data
 * @type boolean
 * @on Display
 * @off Hide
 * @desc Display state data on top of window icons and sprites?
 * @default true
 *
 * @param DataFontSize:num
 * @text Data Font Size
 * @parent Data
 * @type number
 * @min 1
 * @desc Font size used for displaying state data.
 * @default 12
 *
 * @param DataOffsetX:num
 * @text Offset X
 * @parent Data
 * @desc Offset the X position of the state data display.
 * @default 0
 *
 * @param DataOffsetY:num
 * @text Offset Y
 * @parent Data
 * @desc Offset the Y position of the state data display.
 * @default 8
 *
 * @param CustomJS
 * @text Global JS Effects
 *
 * @param onAddStateJS:func
 * @text JS: On Add State
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * state is added.
 * @default "// Declare Variables\nconst stateId = arguments[0];\nconst origin = this.getStateOrigin(stateId);\nconst state = $dataStates[stateId];\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 * @param onEraseStateJS:func
 * @text JS: On Erase State
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * state is erased.
 * @default "// Declare Variables\nconst stateId = arguments[0];\nconst origin = this.getStateOrigin(stateId);\nconst state = $dataStates[stateId];\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 * @param onExpireStateJS:func
 * @text JS: On Expire State
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * state has expired.
 * @default "// Declare Variables\nconst stateId = arguments[0];\nconst origin = this.getStateOrigin(stateId);\nconst state = $dataStates[stateId];\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 */
/* ----------------------------------------------------------------------------
 * General Buff/Debuff Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Buffs:
 *
 * @param General
 *
 * @param ReapplyRules:str
 * @text Reapply Rules
 * @parent General
 * @type select
 * @option Ignore: Buff/Debuff doesn't get added.
 * @value ignore
 * @option Reset: Turns get reset.
 * @value reset
 * @option Greater: Turns take greater value (current vs reset).
 * @value greater
 * @option Add: Turns add upon existing turns.
 * @value add
 * @desc These are the rules when reapplying buffs/debuffs.
 * @default greater
 *
 * @param MaxTurns:num
 * @text Maximum Turns
 * @parent General
 * @type number
 * @min 1
 * @desc Maximum number of turns to let buffs and debuffs go up to.
 * @default 9999
 *
 * @param Stacking
 *
 * @param StackBuffMax:num
 * @text Max Stacks: Buff
 * @parent Stacking
 * @type number
 * @min 1
 * @desc Maximum number of stacks for buffs.
 * @default 2
 *
 * @param StackDebuffMax:num
 * @text Max Stacks: Debuff
 * @parent Stacking
 * @type number
 * @min 1
 * @desc Maximum number of stacks for debuffs.
 * @default 2
 *
 * @param MultiplierJS:func
 * @text JS: Buff/Debuff Rate
 * @parent Stacking
 * @type note
 * @desc Code to determine how much buffs and debuffs affect parameters.
 * @default "// Declare Variables\nconst user = this;\nconst paramId = arguments[0];\nconst buffLevel = arguments[1];\nlet rate = 1;\n\n// Perform Calculations\nrate += buffLevel * 0.25;\n\n// Return Rate\nreturn Math.max(0, rate);"
 *
 * @param Turns
 * @text Turns Display
 *
 * @param ShowTurns:eval
 * @text Show Turns?
 * @parent Turns
 * @type boolean
 * @on Display
 * @off Hide
 * @desc Display buff and debuff turns on top of window icons and sprites?
 * @default true
 *
 * @param TurnFontSize:num
 * @text Turn Font Size
 * @parent Turns
 * @type number
 * @min 1
 * @desc Font size used for displaying turns.
 * @default 16
 *
 * @param TurnOffsetX:num
 * @text Offset X
 * @parent Turns
 * @desc Offset the X position of the turn display.
 * @default -4
 *
 * @param TurnOffsetY:num
 * @text Offset Y
 * @parent Turns
 * @desc Offset the Y position of the turn display.
 * @default -6
 *
 * @param ColorBuff:str
 * @text Turn Color: Buffs
 * @parent Turns
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 24
 *
 * @param ColorDebuff:str
 * @text Turn Color: Debuffs
 * @parent Turns
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 27
 *
 * @param Data
 * @text Rate Display
 *
 * @param ShowData:eval
 * @text Show Rate?
 * @parent Data
 * @type boolean
 * @on Display
 * @off Hide
 * @desc Display buff and debuff rate on top of window icons and sprites?
 * @default false
 *
 * @param DataFontSize:num
 * @text Rate Font Size
 * @parent Data
 * @type number
 * @min 1
 * @desc Font size used for displaying rate.
 * @default 12
 *
 * @param DataOffsetX:num
 * @text Offset X
 * @parent Data
 * @desc Offset the X position of the rate display.
 * @default 0
 *
 * @param DataOffsetY:num
 * @text Offset Y
 * @parent Data
 * @desc Offset the Y position of the rate display.
 * @default 8
 *
 * @param CustomJS
 * @text Global JS Effects
 *
 * @param onAddBuffJS:func
 * @text JS: On Add Buff
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * buff is added.
 * @default "// Declare Variables\nconst paramId = arguments[0];\nconst modifier = this._buffs[paramId];\nconst origin = this.getCurrentStateActiveUser();\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 * @param onAddDebuffJS:func
 * @text JS: On Add Debuff
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * debuff is added.
 * @default "// Declare Variables\nconst paramId = arguments[0];\nconst modifier = this._buffs[paramId];\nconst origin = this.getCurrentStateActiveUser();\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 * @param onEraseBuffJS:func
 * @text JS: On Erase Buff
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * buff is erased.
 * @default "// Declare Variables\nconst paramId = arguments[0];\nconst modifier = this._buffs[paramId];\nconst origin = this.getCurrentStateActiveUser();\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 * @param onEraseDebuffJS:func
 * @text JS: On Erase Debuff
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * debuff is erased.
 * @default "// Declare Variables\nconst paramId = arguments[0];\nconst modifier = this._buffs[paramId];\nconst origin = this.getCurrentStateActiveUser();\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 * @param onExpireBuffJS:func
 * @text JS: On Expire Buff
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * buff has expired.
 * @default "// Declare Variables\nconst paramId = arguments[0];\nconst modifier = this._buffs[paramId];\nconst origin = this.getCurrentStateActiveUser();\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 * @param onExpireDebuffJS:func
 * @text JS: On Expire Debuff
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * debuff has expired.
 * @default "// Declare Variables\nconst paramId = arguments[0];\nconst modifier = this._buffs[paramId];\nconst origin = this.getCurrentStateActiveUser();\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 */
/* ----------------------------------------------------------------------------
 * Passive State Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~PassiveStates:
 *
 * @param List
 *
 * @param Global:arraynum
 * @text Global Passives
 * @parent List
 * @type state[]
 * @desc A list of passive states to affect actors and enemies.
 * @default []
 *
 * @param Actor:arraynum
 * @text Actor-Only Passives
 * @parent List
 * @type state[]
 * @desc A list of passive states to affect actors only.
 * @default []
 *
 * @param Enemy:arraynum
 * @text Enemy Passives
 * @parent List
 * @type state[]
 * @desc A list of passive states to affect enemies only.
 * @default []
 *
 * @param Cache
 *
 * @param RefreshCacheSwitch:eval
 * @text Switch Refresh?
 * @parent Cache
 * @type boolean
 * @on Refresh
 * @off No Changes
 * @desc Refresh all battle members when switches are changed in battle?
 * @default false
 *
 * @param RefreshCacheVar:eval
 * @text Variable Refresh?
 * @parent Cache
 * @type boolean
 * @on Refresh
 * @off No Changes
 * @desc Refresh all battle members when variables are changed in battle?
 * @default false
 *
 * @param CustomJS
 * @text Global JS Effects
 *
 * @param PassiveConditionJS:func
 * @text JS: Condition Check
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide passive condition check.
 * @default "// Declare Variables\nconst state = arguments[0];\nconst stateId = state.id;\nconst user = this;\nconst target = this;\nconst a = this;\nconst b = this;\nlet condition = true;\n\n// Perform Checks\n\n\n// Return boolean\nreturn condition;"
 *
 */
//=============================================================================

const _0x566724 = _0x336d;
(function (_0x4f2246, _0x1684f1) {
  const _0x56e51e = _0x336d,
    _0x5ef7e0 = _0x4f2246();
  while (!![]) {
    try {
      const _0x537637 =
        parseInt(_0x56e51e(0x218)) / 0x1 +
        -parseInt(_0x56e51e(0x1d7)) / 0x2 +
        (parseInt(_0x56e51e(0x11d)) / 0x3) * (parseInt(_0x56e51e(0x1fc)) / 0x4) +
        -parseInt(_0x56e51e(0x321)) / 0x5 +
        -parseInt(_0x56e51e(0x320)) / 0x6 +
        parseInt(_0x56e51e(0x92)) / 0x7 +
        (-parseInt(_0x56e51e(0x253)) / 0x8) * (-parseInt(_0x56e51e(0x269)) / 0x9);
      if (_0x537637 === _0x1684f1) break;
      else _0x5ef7e0['push'](_0x5ef7e0['shift']());
    } catch (_0x271ffc) {
      _0x5ef7e0['push'](_0x5ef7e0['shift']());
    }
  }
})(_0x4410, 0xdaf7c);
function _0x336d(_0x9b28b2, _0x16892f) {
  const _0x441097 = _0x4410();
  return (
    (_0x336d = function (_0x336db3, _0x4a41cf) {
      _0x336db3 = _0x336db3 - 0x84;
      let _0x2bc559 = _0x441097[_0x336db3];
      return _0x2bc559;
    }),
    _0x336d(_0x9b28b2, _0x16892f)
  );
}
var label = _0x566724(0x29c),
  tier = tier || 0x0,
  dependencies = [],
  pluginData = $plugins[_0x566724(0x1dc)](function (_0x2e3d31) {
    const _0x1cdb81 = _0x566724;
    return _0x2e3d31[_0x1cdb81(0x1e4)] && _0x2e3d31[_0x1cdb81(0x174)][_0x1cdb81(0x1f5)]('[' + label + ']');
  })[0x0];
(VisuMZ[label][_0x566724(0x180)] = VisuMZ[label][_0x566724(0x180)] || {}),
  (VisuMZ[_0x566724(0x216)] = function (_0x2ebf92, _0x4b8e3a) {
    const _0x1f0314 = _0x566724;
    for (const _0xbc4c6c in _0x4b8e3a) {
      if (_0xbc4c6c[_0x1f0314(0x26f)](/(.*):(.*)/i)) {
        const _0x22051d = String(RegExp['$1']),
          _0x2ab8d8 = String(RegExp['$2'])[_0x1f0314(0xaf)]()[_0x1f0314(0x2a8)]();
        let _0x2b0901, _0x32472c, _0x545688;
        switch (_0x2ab8d8) {
          case 'NUM':
            _0x2b0901 = _0x4b8e3a[_0xbc4c6c] !== '' ? Number(_0x4b8e3a[_0xbc4c6c]) : 0x0;
            break;
          case _0x1f0314(0x146):
            (_0x32472c = _0x4b8e3a[_0xbc4c6c] !== '' ? JSON[_0x1f0314(0x28f)](_0x4b8e3a[_0xbc4c6c]) : []), (_0x2b0901 = _0x32472c[_0x1f0314(0x283)](_0x3e6f2c => Number(_0x3e6f2c)));
            break;
          case 'EVAL':
            _0x2b0901 = _0x4b8e3a[_0xbc4c6c] !== '' ? eval(_0x4b8e3a[_0xbc4c6c]) : null;
            break;
          case _0x1f0314(0x29f):
            (_0x32472c = _0x4b8e3a[_0xbc4c6c] !== '' ? JSON['parse'](_0x4b8e3a[_0xbc4c6c]) : []), (_0x2b0901 = _0x32472c['map'](_0x12c343 => eval(_0x12c343)));
            break;
          case _0x1f0314(0xde):
            _0x2b0901 = _0x4b8e3a[_0xbc4c6c] !== '' ? JSON[_0x1f0314(0x28f)](_0x4b8e3a[_0xbc4c6c]) : '';
            break;
          case 'ARRAYJSON':
            (_0x32472c = _0x4b8e3a[_0xbc4c6c] !== '' ? JSON['parse'](_0x4b8e3a[_0xbc4c6c]) : []), (_0x2b0901 = _0x32472c[_0x1f0314(0x283)](_0x5c7b82 => JSON[_0x1f0314(0x28f)](_0x5c7b82)));
            break;
          case _0x1f0314(0x2f6):
            _0x2b0901 = _0x4b8e3a[_0xbc4c6c] !== '' ? new Function(JSON[_0x1f0314(0x28f)](_0x4b8e3a[_0xbc4c6c])) : new Function(_0x1f0314(0x2a6));
            break;
          case _0x1f0314(0x267):
            (_0x32472c = _0x4b8e3a[_0xbc4c6c] !== '' ? JSON['parse'](_0x4b8e3a[_0xbc4c6c]) : []), (_0x2b0901 = _0x32472c[_0x1f0314(0x283)](_0x2e8395 => new Function(JSON['parse'](_0x2e8395))));
            break;
          case 'STR':
            _0x2b0901 = _0x4b8e3a[_0xbc4c6c] !== '' ? String(_0x4b8e3a[_0xbc4c6c]) : '';
            break;
          case _0x1f0314(0x1ab):
            (_0x32472c = _0x4b8e3a[_0xbc4c6c] !== '' ? JSON[_0x1f0314(0x28f)](_0x4b8e3a[_0xbc4c6c]) : []), (_0x2b0901 = _0x32472c[_0x1f0314(0x283)](_0xc80b4b => String(_0xc80b4b)));
            break;
          case _0x1f0314(0x34c):
            (_0x545688 = _0x4b8e3a[_0xbc4c6c] !== '' ? JSON[_0x1f0314(0x28f)](_0x4b8e3a[_0xbc4c6c]) : {}), (_0x2ebf92[_0x22051d] = {}), VisuMZ[_0x1f0314(0x216)](_0x2ebf92[_0x22051d], _0x545688);
            continue;
          case 'ARRAYSTRUCT':
            (_0x32472c = _0x4b8e3a[_0xbc4c6c] !== '' ? JSON[_0x1f0314(0x28f)](_0x4b8e3a[_0xbc4c6c]) : []),
              (_0x2b0901 = _0x32472c['map'](_0x3acf61 => VisuMZ[_0x1f0314(0x216)]({}, JSON[_0x1f0314(0x28f)](_0x3acf61))));
            break;
          default:
            continue;
        }
        _0x2ebf92[_0x22051d] = _0x2b0901;
      }
    }
    return _0x2ebf92;
  }),
  (_0x5654fc => {
    const _0x498008 = _0x566724,
      _0x26d2c9 = _0x5654fc[_0x498008(0x1b1)];
    for (const _0x479935 of dependencies) {
      if (!Imported[_0x479935]) {
        alert(_0x498008(0x170)['format'](_0x26d2c9, _0x479935)), SceneManager[_0x498008(0x25e)]();
        break;
      }
    }
    const _0xff0362 = _0x5654fc['description'];
    if (_0xff0362['match'](/\[Version[ ](.*?)\]/i)) {
      const _0x620854 = Number(RegExp['$1']);
      _0x620854 !== VisuMZ[label]['version'] &&
        (alert('%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.'[_0x498008(0x109)](_0x26d2c9, _0x620854)),
        SceneManager[_0x498008(0x25e)]());
    }
    if (_0xff0362[_0x498008(0x26f)](/\[Tier[ ](\d+)\]/i)) {
      const _0x15e62d = Number(RegExp['$1']);
      _0x15e62d < tier ? (alert(_0x498008(0x2ff)['format'](_0x26d2c9, _0x15e62d, tier)), SceneManager[_0x498008(0x25e)]()) : (tier = Math[_0x498008(0x311)](_0x15e62d, tier));
    }
    VisuMZ[_0x498008(0x216)](VisuMZ[label]['Settings'], _0x5654fc['parameters']);
  })(pluginData),
  PluginManager[_0x566724(0x32e)](pluginData[_0x566724(0x1b1)], 'SkillActorPaySkillCost', _0x26a00d => {
    const _0xeaafcf = _0x566724;
    VisuMZ[_0xeaafcf(0x216)](_0x26a00d, _0x26a00d);
    const _0x2ad550 = _0x26a00d[_0xeaafcf(0x242)] || [],
      _0x54de03 = Number(_0x26a00d[_0xeaafcf(0x2a3)]),
      _0x114300 = $dataSkills[_0x54de03];
    if (!_0x114300) return;
    for (const _0x1f0530 of _0x2ad550) {
      const _0x4866d1 = $gameActors[_0xeaafcf(0x296)](_0x1f0530);
      if (!_0x4866d1) continue;
      _0x4866d1[_0xeaafcf(0x18d)](_0x114300);
    }
  }),
  PluginManager[_0x566724(0x32e)](pluginData[_0x566724(0x1b1)], _0x566724(0x1c3), _0xfa3df0 => {
    const _0x8d519f = _0x566724;
    VisuMZ['ConvertParams'](_0xfa3df0, _0xfa3df0);
    const _0x339048 = _0xfa3df0['EnemyIndex'] || [],
      _0x38b255 = Number(_0xfa3df0[_0x8d519f(0x2a3)]),
      _0x488b79 = $dataSkills[_0x38b255];
    if (!_0x488b79) return;
    for (const _0x46a298 of _0x339048) {
      const _0x3e2c9d = $gameTroop['members']()[_0x46a298];
      if (!_0x3e2c9d) continue;
      _0x3e2c9d[_0x8d519f(0x18d)](_0x488b79);
    }
  }),
  PluginManager[_0x566724(0x32e)](pluginData['name'], _0x566724(0x18f), _0x15a88a => {
    const _0x5564b2 = _0x566724;
    VisuMZ['ConvertParams'](_0x15a88a, _0x15a88a);
    const _0x199943 = _0x15a88a[_0x5564b2(0x242)] || [],
      _0x2750cc = Number(_0x15a88a[_0x5564b2(0x245)]),
      _0x20be8a = Number(_0x15a88a[_0x5564b2(0x14f)]),
      _0x118f38 = _0x15a88a[_0x5564b2(0x1e6)];
    for (const _0x2fed61 of _0x199943) {
      const _0x424f4e = $gameActors['actor'](_0x2fed61);
      if (!_0x424f4e) continue;
      _0x118f38 && !_0x424f4e[_0x5564b2(0x229)](_0x2750cc)
        ? (_0x424f4e[_0x5564b2(0x11f)](_0x2750cc), _0x424f4e['setStateTurns'](_0x2750cc, _0x20be8a))
        : _0x424f4e[_0x5564b2(0x1c7)](_0x2750cc, _0x20be8a);
    }
  }),
  PluginManager[_0x566724(0x32e)](pluginData['name'], 'StateTurnsActorChangeTo', _0x362266 => {
    const _0x25679a = _0x566724;
    VisuMZ[_0x25679a(0x216)](_0x362266, _0x362266);
    const _0x53a30c = _0x362266[_0x25679a(0x242)] || [],
      _0x30730a = Number(_0x362266['StateID']),
      _0x239e31 = Math['max'](Number(_0x362266[_0x25679a(0x14f)]), 0x0),
      _0x5ec3cc = _0x362266[_0x25679a(0x1e6)];
    for (const _0x1b3091 of _0x53a30c) {
      const _0x4de9c4 = $gameActors[_0x25679a(0x296)](_0x1b3091);
      if (!_0x4de9c4) continue;
      _0x5ec3cc && !_0x4de9c4[_0x25679a(0x229)](_0x30730a) && _0x4de9c4[_0x25679a(0x11f)](_0x30730a), _0x4de9c4[_0x25679a(0x131)](_0x30730a, _0x239e31);
    }
  }),
  PluginManager[_0x566724(0x32e)](pluginData[_0x566724(0x1b1)], 'StateTurnsEnemyChangeBy', _0x5c4cb6 => {
    const _0x51df38 = _0x566724;
    if (!$gameParty['inBattle']()) return;
    VisuMZ[_0x51df38(0x216)](_0x5c4cb6, _0x5c4cb6);
    const _0x2aea7f = _0x5c4cb6[_0x51df38(0x276)] || [],
      _0x5b8bb3 = Number(_0x5c4cb6[_0x51df38(0x245)]),
      _0x3eab83 = Number(_0x5c4cb6[_0x51df38(0x14f)]),
      _0x58ab98 = _0x5c4cb6['AutoAddState'];
    for (const _0x5b398c of _0x2aea7f) {
      const _0x3e3427 = $gameTroop[_0x51df38(0x1df)]()[_0x5b398c];
      if (!_0x3e3427) continue;
      _0x58ab98 && !_0x3e3427[_0x51df38(0x229)](_0x5b8bb3)
        ? (_0x3e3427[_0x51df38(0x11f)](_0x5b8bb3), _0x3e3427[_0x51df38(0x131)](_0x5b8bb3, _0x3eab83))
        : _0x3e3427[_0x51df38(0x1c7)](_0x5b8bb3, _0x3eab83);
    }
  }),
  PluginManager[_0x566724(0x32e)](pluginData[_0x566724(0x1b1)], 'StateTurnsEnemyChangeTo', _0x4160a5 => {
    const _0x275c02 = _0x566724;
    if (!$gameParty[_0x275c02(0x85)]()) return;
    VisuMZ[_0x275c02(0x216)](_0x4160a5, _0x4160a5);
    const _0x484dd7 = _0x4160a5[_0x275c02(0x276)] || [],
      _0x3d96cb = Number(_0x4160a5[_0x275c02(0x245)]),
      _0xa9d6ad = Math[_0x275c02(0x311)](Number(_0x4160a5[_0x275c02(0x14f)]), 0x0),
      _0x9ddcb = _0x4160a5[_0x275c02(0x1e6)];
    for (const _0x2d678c of _0x484dd7) {
      const _0x524609 = $gameTroop['members']()[_0x2d678c];
      if (!_0x524609) continue;
      _0x9ddcb && !_0x524609['isStateAffected'](_0x3d96cb) && _0x524609['addState'](_0x3d96cb), _0x524609[_0x275c02(0x131)](_0x3d96cb, _0xa9d6ad);
    }
  }),
  (VisuMZ[_0x566724(0x29c)][_0x566724(0x2e0)] = Scene_Boot[_0x566724(0x1a1)]['onDatabaseLoaded']),
  (Scene_Boot[_0x566724(0x1a1)][_0x566724(0x8c)] = function () {
    const _0x130885 = _0x566724;
    VisuMZ[_0x130885(0x29c)][_0x130885(0x2e0)]['call'](this), this[_0x130885(0x103)](), VisuMZ['SkillsStatesCore'][_0x130885(0x27b)]();
  }),
  (Scene_Boot['prototype']['process_VisuMZ_SkillsStatesCore_Notetags'] = function () {
    const _0x2a710a = _0x566724;
    this[_0x2a710a(0x138)]();
    if (VisuMZ[_0x2a710a(0x2f8)]) return;
    this['process_VisuMZ_SkillsStatesCore_Skill_Notetags'](), this[_0x2a710a(0x230)]();
  }),
  (Scene_Boot[_0x566724(0x1a1)][_0x566724(0xdf)] = function () {
    const _0x496965 = _0x566724;
    for (const _0x390616 of $dataSkills) {
      if (!_0x390616) continue;
      VisuMZ[_0x496965(0x29c)]['Parse_Notetags_Skill_Cost'](_0x390616), VisuMZ[_0x496965(0x29c)][_0x496965(0x26b)](_0x390616), VisuMZ[_0x496965(0x29c)][_0x496965(0x237)](_0x390616);
    }
  }),
  (Scene_Boot['prototype'][_0x566724(0x230)] = function () {
    const _0x23a7d2 = _0x566724;
    for (const _0x16a54d of $dataStates) {
      if (!_0x16a54d) continue;
      VisuMZ[_0x23a7d2(0x29c)][_0x23a7d2(0x295)](_0x16a54d),
        VisuMZ[_0x23a7d2(0x29c)][_0x23a7d2(0x324)](_0x16a54d),
        VisuMZ['SkillsStatesCore'][_0x23a7d2(0xdb)](_0x16a54d),
        VisuMZ[_0x23a7d2(0x29c)][_0x23a7d2(0x335)](_0x16a54d);
    }
  }),
  (VisuMZ[_0x566724(0x29c)]['ParseSkillNotetags'] = VisuMZ['ParseSkillNotetags']),
  (VisuMZ[_0x566724(0xd1)] = function (_0x1c6595) {
    const _0x2882be = _0x566724;
    VisuMZ['SkillsStatesCore'][_0x2882be(0xd1)]['call'](this, _0x1c6595),
      VisuMZ[_0x2882be(0x29c)][_0x2882be(0x285)](_0x1c6595),
      VisuMZ[_0x2882be(0x29c)]['Parse_Notetags_Skill_Sorting'](_0x1c6595),
      VisuMZ['SkillsStatesCore'][_0x2882be(0x237)](_0x1c6595);
  }),
  (VisuMZ[_0x566724(0x29c)][_0x566724(0xb2)] = VisuMZ['ParseStateNotetags']),
  (VisuMZ[_0x566724(0xb2)] = function (_0x421d02) {
    const _0x10f31f = _0x566724;
    VisuMZ['SkillsStatesCore'][_0x10f31f(0xb2)][_0x10f31f(0x8e)](this, _0x421d02),
      VisuMZ[_0x10f31f(0x29c)]['Parse_Notetags_State_Category'](_0x421d02),
      VisuMZ['SkillsStatesCore'][_0x10f31f(0x324)](_0x421d02),
      VisuMZ['SkillsStatesCore'][_0x10f31f(0xdb)](_0x421d02),
      VisuMZ[_0x10f31f(0x29c)]['Parse_Notetags_State_ApplyRemoveLeaveJS'](_0x421d02);
  }),
  (VisuMZ[_0x566724(0x29c)][_0x566724(0x285)] = function (_0x540b09) {
    const _0x40c39f = _0x566724,
      _0x447dbc = _0x540b09[_0x40c39f(0x26d)];
    _0x447dbc['match'](/<MP COST:[ ](\d+)>/i) && (_0x540b09[_0x40c39f(0x254)] = Number(RegExp['$1'])),
      _0x447dbc[_0x40c39f(0x26f)](/<TP COST:[ ](\d+)>/i) && (_0x540b09[_0x40c39f(0xda)] = Number(RegExp['$1']));
  }),
  (VisuMZ[_0x566724(0x29c)]['Parse_Notetags_Skill_Sorting'] = function (_0x3d7557) {
    const _0x237740 = _0x566724;
    if (!_0x3d7557) return;
    _0x3d7557[_0x237740(0x107)] = 0x32;
    const _0x45ab6a = _0x3d7557[_0x237740(0x26d)] || '';
    _0x45ab6a['match'](/<(?:|ID )SORT(?:|ING)[ ]PRIORITY:[ ](\d+)>/i) && (_0x3d7557[_0x237740(0x107)] = Number(RegExp['$1']));
  }),
  (VisuMZ[_0x566724(0x29c)][_0x566724(0x23c)] = {}),
  (VisuMZ[_0x566724(0x29c)][_0x566724(0x166)] = {}),
  (VisuMZ[_0x566724(0x29c)][_0x566724(0x237)] = function (_0xab4b63) {
    const _0x59bfce = _0x566724,
      _0x6ed0a2 = _0xab4b63[_0x59bfce(0x26d)];
    if (_0x6ed0a2[_0x59bfce(0x26f)](/<JS SKILL ENABLE>\s*([\s\S]*)\s*<\/JS SKILL ENABLE>/i)) {
      const _0x324180 = String(RegExp['$1']),
        _0x23b0b1 = _0x59bfce(0x24f)[_0x59bfce(0x109)](_0x324180);
      VisuMZ[_0x59bfce(0x29c)][_0x59bfce(0x23c)][_0xab4b63['id']] = new Function(_0x59bfce(0xb0), _0x23b0b1);
    }
    if (_0x6ed0a2[_0x59bfce(0x26f)](/<JS SKILL VISIBLE>\s*([\s\S]*)\s*<\/JS SKILL VISIBLE>/i)) {
      const _0x3c9fdc = String(RegExp['$1']),
        _0x384cd0 = _0x59bfce(0x306)[_0x59bfce(0x109)](_0x3c9fdc);
      VisuMZ['SkillsStatesCore'][_0x59bfce(0x166)][_0xab4b63['id']] = new Function('skill', _0x384cd0);
    }
  }),
  (VisuMZ[_0x566724(0x29c)][_0x566724(0x295)] = function (_0x250af7) {
    const _0x4f5f87 = _0x566724;
    _0x250af7[_0x4f5f87(0x8a)] = ['ALL', _0x4f5f87(0x239)];
    const _0x4b1ef7 = _0x250af7[_0x4f5f87(0x26d)],
      _0x8133e1 = _0x4b1ef7['match'](/<(?:CATEGORY|CATEGORIES):[ ](.*)>/gi);
    if (_0x8133e1)
      for (const _0x365d90 of _0x8133e1) {
        _0x365d90[_0x4f5f87(0x26f)](/<(?:CATEGORY|CATEGORIES):[ ](.*)>/gi);
        const _0x51efc6 = String(RegExp['$1'])['toUpperCase']()[_0x4f5f87(0x2a8)]()[_0x4f5f87(0xc9)](',');
        for (const _0x11cec7 of _0x51efc6) {
          _0x250af7['categories'][_0x4f5f87(0xb3)](_0x11cec7[_0x4f5f87(0x2a8)]());
        }
      }
    if (_0x4b1ef7[_0x4f5f87(0x26f)](/<(?:CATEGORY|CATEGORIES)>\s*([\s\S]*)\s*<\/(?:CATEGORY|CATEGORIES)>/i)) {
      const _0x33c79e = RegExp['$1'][_0x4f5f87(0xc9)](/[\r\n]+/);
      for (const _0x4065c6 of _0x33c79e) {
        _0x250af7[_0x4f5f87(0x8a)][_0x4f5f87(0xb3)](_0x4065c6[_0x4f5f87(0xaf)]()['trim']());
      }
    }
    _0x4b1ef7[_0x4f5f87(0x26f)](/<POSITIVE STATE>/i) && _0x250af7[_0x4f5f87(0x8a)]['push'](_0x4f5f87(0x12c)),
      _0x4b1ef7[_0x4f5f87(0x26f)](/<NEGATIVE STATE>/i) && _0x250af7[_0x4f5f87(0x8a)]['push'](_0x4f5f87(0x222));
  }),
  (VisuMZ[_0x566724(0x29c)][_0x566724(0x1cd)] = {}),
  (VisuMZ[_0x566724(0x29c)]['Parse_Notetags_State_PassiveJS'] = function (_0x418344) {
    const _0x368bfa = _0x566724,
      _0x499e6c = _0x418344[_0x368bfa(0x26d)];
    if (_0x499e6c[_0x368bfa(0x26f)](/<JS PASSIVE CONDITION>\s*([\s\S]*)\s*<\/JS PASSIVE CONDITION>/i)) {
      const _0xcbd33f = String(RegExp['$1']),
        _0x1f7827 =
          '\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20condition\x20=\x20true;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20condition;\x0a\x20\x20\x20\x20\x20\x20\x20\x20'[
            _0x368bfa(0x109)
          ](_0xcbd33f);
      VisuMZ['SkillsStatesCore'][_0x368bfa(0x1cd)][_0x418344['id']] = new Function(_0x368bfa(0x155), _0x1f7827);
    }
  }),
  (VisuMZ['SkillsStatesCore'][_0x566724(0x2b0)] = {}),
  (VisuMZ['SkillsStatesCore'][_0x566724(0x270)] = {}),
  (VisuMZ[_0x566724(0x29c)]['stateMpSlipDamageJS'] = {}),
  (VisuMZ['SkillsStatesCore']['stateMpSlipHealJS'] = {}),
  (VisuMZ[_0x566724(0x29c)][_0x566724(0x25d)] = {}),
  (VisuMZ['SkillsStatesCore']['stateTpSlipHealJS'] = {}),
  (VisuMZ[_0x566724(0x29c)][_0x566724(0xdb)] = function (_0x33c13d) {
    const _0x2d51ae = _0x566724,
      _0x54a154 = _0x33c13d[_0x2d51ae(0x26d)],
      _0x3e19eb = _0x2d51ae(0x1f7);
    if (_0x54a154[_0x2d51ae(0x26f)](/<JS HP SLIP DAMAGE>\s*([\s\S]*)\s*<\/JS HP SLIP DAMAGE>/i)) {
      const _0x279dd1 = String(RegExp['$1']),
        _0x5b9869 = _0x3e19eb[_0x2d51ae(0x109)](_0x279dd1, _0x2d51ae(0x2a2), -0x1, _0x2d51ae(0x22c));
      VisuMZ[_0x2d51ae(0x29c)][_0x2d51ae(0x2b0)][_0x33c13d['id']] = new Function(_0x2d51ae(0xea), _0x5b9869);
    } else {
      if (_0x54a154[_0x2d51ae(0x26f)](/<JS HP SLIP HEAL>\s*([\s\S]*)\s*<\/JS HP SLIP HEAL>/i)) {
        const _0x330b3f = String(RegExp['$1']),
          _0xe40e8a = _0x3e19eb['format'](_0x330b3f, 'heal', 0x1, _0x2d51ae(0x22c));
        VisuMZ[_0x2d51ae(0x29c)]['stateHpSlipHealJS'][_0x33c13d['id']] = new Function('stateId', _0xe40e8a);
      }
    }
    if (_0x54a154[_0x2d51ae(0x26f)](/<JS MP SLIP DAMAGE>\s*([\s\S]*)\s*<\/JS MP SLIP DAMAGE>/i)) {
      const _0x47cf2a = String(RegExp['$1']),
        _0x17dfbc = _0x3e19eb['format'](_0x47cf2a, _0x2d51ae(0x2a2), -0x1, 'slipMp');
      VisuMZ[_0x2d51ae(0x29c)][_0x2d51ae(0x147)][_0x33c13d['id']] = new Function(_0x2d51ae(0xea), _0x17dfbc);
    } else {
      if (_0x54a154[_0x2d51ae(0x26f)](/<JS MP SLIP HEAL>\s*([\s\S]*)\s*<\/JS MP SLIP HEAL>/i)) {
        const _0x4b932c = String(RegExp['$1']),
          _0xfc1dec = _0x3e19eb[_0x2d51ae(0x109)](_0x4b932c, _0x2d51ae(0x29d), 0x1, _0x2d51ae(0x314));
        VisuMZ['SkillsStatesCore']['stateMpSlipHealJS'][_0x33c13d['id']] = new Function(_0x2d51ae(0xea), _0xfc1dec);
      }
    }
    if (_0x54a154[_0x2d51ae(0x26f)](/<JS TP SLIP DAMAGE>\s*([\s\S]*)\s*<\/JS TP SLIP DAMAGE>/i)) {
      const _0x4d0888 = String(RegExp['$1']),
        _0x1eb94e = _0x3e19eb[_0x2d51ae(0x109)](_0x4d0888, _0x2d51ae(0x2a2), -0x1, _0x2d51ae(0x2d6));
      VisuMZ[_0x2d51ae(0x29c)][_0x2d51ae(0x25d)][_0x33c13d['id']] = new Function(_0x2d51ae(0xea), _0x1eb94e);
    } else {
      if (_0x54a154[_0x2d51ae(0x26f)](/<JS TP SLIP HEAL>\s*([\s\S]*)\s*<\/JS TP SLIP HEAL>/i)) {
        const _0x9b87a0 = String(RegExp['$1']),
          _0x5005ee = _0x3e19eb[_0x2d51ae(0x109)](_0x9b87a0, _0x2d51ae(0x29d), 0x1, 'slipTp');
        VisuMZ[_0x2d51ae(0x29c)][_0x2d51ae(0xe0)][_0x33c13d['id']] = new Function(_0x2d51ae(0xea), _0x5005ee);
      }
    }
  }),
  (VisuMZ[_0x566724(0x29c)]['stateAddJS'] = {}),
  (VisuMZ[_0x566724(0x29c)]['stateEraseJS'] = {}),
  (VisuMZ['SkillsStatesCore'][_0x566724(0x9a)] = {}),
  (VisuMZ[_0x566724(0x29c)][_0x566724(0x335)] = function (_0x32dc82) {
    const _0x126af9 = _0x566724,
      _0x23fbec = _0x32dc82[_0x126af9(0x26d)],
      _0x284a6d =
        '\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20origin\x20=\x20this.getStateOrigin(stateId);\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20state\x20=\x20$dataStates[stateId];\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20this.getCurrentStateActiveUser();\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20origin;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20';
    if (_0x23fbec[_0x126af9(0x26f)](/<JS ON ADD STATE>\s*([\s\S]*)\s*<\/JS ON ADD STATE>/i)) {
      const _0x49798a = String(RegExp['$1']),
        _0xfcbe39 = _0x284a6d['format'](_0x49798a);
      VisuMZ[_0x126af9(0x29c)][_0x126af9(0x126)][_0x32dc82['id']] = new Function(_0x126af9(0xea), _0xfcbe39);
    }
    if (_0x23fbec[_0x126af9(0x26f)](/<JS ON ERASE STATE>\s*([\s\S]*)\s*<\/JS ON ERASE STATE>/i)) {
      const _0x37549f = String(RegExp['$1']),
        _0x547848 = _0x284a6d[_0x126af9(0x109)](_0x37549f);
      VisuMZ['SkillsStatesCore']['stateEraseJS'][_0x32dc82['id']] = new Function(_0x126af9(0xea), _0x547848);
    }
    if (_0x23fbec[_0x126af9(0x26f)](/<JS ON EXPIRE STATE>\s*([\s\S]*)\s*<\/JS ON EXPIRE STATE>/i)) {
      const _0x3a6258 = String(RegExp['$1']),
        _0x25b97c = _0x284a6d[_0x126af9(0x109)](_0x3a6258);
      VisuMZ[_0x126af9(0x29c)]['stateExpireJS'][_0x32dc82['id']] = new Function(_0x126af9(0xea), _0x25b97c);
    }
  }),
  (VisuMZ[_0x566724(0x29c)][_0x566724(0x27b)] = function () {
    const _0x2cf191 = _0x566724;
    if (!VisuMZ['SkillsStatesCore'][_0x2cf191(0x180)]['States'][_0x2cf191(0x1b3)]) return;
    for (const _0x4b4913 of $dataStates) {
      if (!_0x4b4913) continue;
      _0x4b4913[_0x2cf191(0x1f4)] === 0x4 && _0x4b4913[_0x2cf191(0x160)] === 0x1 && (_0x4b4913[_0x2cf191(0x160)] = 0x2);
    }
  }),
  (VisuMZ['SkillsStatesCore']['createKeyJS'] = function (_0x58a2b7, _0x4ada9b) {
    const _0x37de7b = _0x566724;
    if (VisuMZ['createKeyJS']) return VisuMZ[_0x37de7b(0xb6)](_0x58a2b7, _0x4ada9b);
    let _0x4e978f = '';
    if ($dataActors['includes'](_0x58a2b7)) _0x4e978f = _0x37de7b(0xa2)[_0x37de7b(0x109)](_0x58a2b7['id'], _0x4ada9b);
    if ($dataClasses[_0x37de7b(0x1f5)](_0x58a2b7)) _0x4e978f = _0x37de7b(0x200)[_0x37de7b(0x109)](_0x58a2b7['id'], _0x4ada9b);
    if ($dataSkills[_0x37de7b(0x1f5)](_0x58a2b7)) _0x4e978f = _0x37de7b(0x196)['format'](_0x58a2b7['id'], _0x4ada9b);
    if ($dataItems['includes'](_0x58a2b7)) _0x4e978f = _0x37de7b(0x319)[_0x37de7b(0x109)](_0x58a2b7['id'], _0x4ada9b);
    if ($dataWeapons[_0x37de7b(0x1f5)](_0x58a2b7)) _0x4e978f = _0x37de7b(0x2b7)[_0x37de7b(0x109)](_0x58a2b7['id'], _0x4ada9b);
    if ($dataArmors[_0x37de7b(0x1f5)](_0x58a2b7)) _0x4e978f = _0x37de7b(0x293)[_0x37de7b(0x109)](_0x58a2b7['id'], _0x4ada9b);
    if ($dataEnemies['includes'](_0x58a2b7)) _0x4e978f = _0x37de7b(0x17c)['format'](_0x58a2b7['id'], _0x4ada9b);
    if ($dataStates[_0x37de7b(0x1f5)](_0x58a2b7)) _0x4e978f = 'State-%1-%2'[_0x37de7b(0x109)](_0x58a2b7['id'], _0x4ada9b);
    return _0x4e978f;
  }),
  (DataManager['getClassIdWithName'] = function (_0x49c595) {
    const _0xd70a91 = _0x566724;
    (_0x49c595 = _0x49c595[_0xd70a91(0xaf)]()[_0xd70a91(0x2a8)]()), (this['_classIDs'] = this[_0xd70a91(0xf8)] || {});
    if (this['_classIDs'][_0x49c595]) return this['_classIDs'][_0x49c595];
    for (const _0x318dbd of $dataClasses) {
      if (!_0x318dbd) continue;
      let _0x5cf948 = _0x318dbd[_0xd70a91(0x1b1)];
      (_0x5cf948 = _0x5cf948[_0xd70a91(0x150)](/\x1I\[(\d+)\]/gi, '')),
        (_0x5cf948 = _0x5cf948[_0xd70a91(0x150)](/\\I\[(\d+)\]/gi, '')),
        (this[_0xd70a91(0xf8)][_0x5cf948[_0xd70a91(0xaf)]()[_0xd70a91(0x2a8)]()] = _0x318dbd['id']);
    }
    return this[_0xd70a91(0xf8)][_0x49c595] || 0x0;
  }),
  (DataManager[_0x566724(0x286)] = function (_0x17f9f8) {
    const _0x427bff = _0x566724;
    this[_0x427bff(0xf9)] = this['_stypeIDs'] || {};
    if (this[_0x427bff(0xf9)][_0x17f9f8['id']]) return this['_stypeIDs'][_0x17f9f8['id']];
    this[_0x427bff(0xf9)][_0x17f9f8['id']] = [_0x17f9f8[_0x427bff(0x294)]];
    if (_0x17f9f8[_0x427bff(0x26d)][_0x427bff(0x26f)](/<SKILL[ ](?:TYPE|TYPES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)) {
      const _0x32eb91 = JSON[_0x427bff(0x28f)]('[' + RegExp['$1']['match'](/\d+/g) + ']');
      this[_0x427bff(0xf9)][_0x17f9f8['id']] = this[_0x427bff(0xf9)][_0x17f9f8['id']][_0x427bff(0x248)](_0x32eb91);
    } else {
      if (_0x17f9f8['note'][_0x427bff(0x26f)](/<SKILL[ ](?:TYPE|TYPES):[ ](.*)>/i)) {
        const _0x330c59 = RegExp['$1']['split'](',');
        for (const _0x8feb99 of _0x330c59) {
          const _0x1fa5a5 = DataManager[_0x427bff(0x2ca)](_0x8feb99);
          if (_0x1fa5a5) this['_stypeIDs'][_0x17f9f8['id']][_0x427bff(0xb3)](_0x1fa5a5);
        }
      }
    }
    return this[_0x427bff(0xf9)][_0x17f9f8['id']];
  }),
  (DataManager[_0x566724(0x2ca)] = function (_0x39bfc3) {
    const _0x4d8274 = _0x566724;
    (_0x39bfc3 = _0x39bfc3[_0x4d8274(0xaf)]()[_0x4d8274(0x2a8)]()), (this[_0x4d8274(0xf9)] = this[_0x4d8274(0xf9)] || {});
    if (this[_0x4d8274(0xf9)][_0x39bfc3]) return this[_0x4d8274(0xf9)][_0x39bfc3];
    for (let _0x432145 = 0x1; _0x432145 < 0x64; _0x432145++) {
      if (!$dataSystem[_0x4d8274(0x28b)][_0x432145]) continue;
      let _0x2dad50 = $dataSystem[_0x4d8274(0x28b)][_0x432145][_0x4d8274(0xaf)]()['trim']();
      (_0x2dad50 = _0x2dad50[_0x4d8274(0x150)](/\x1I\[(\d+)\]/gi, '')), (_0x2dad50 = _0x2dad50[_0x4d8274(0x150)](/\\I\[(\d+)\]/gi, '')), (this[_0x4d8274(0xf9)][_0x2dad50] = _0x432145);
    }
    return this[_0x4d8274(0xf9)][_0x39bfc3] || 0x0;
  }),
  (DataManager['getSkillIdWithName'] = function (_0x24289b) {
    const _0x4008d6 = _0x566724;
    (_0x24289b = _0x24289b[_0x4008d6(0xaf)]()[_0x4008d6(0x2a8)]()), (this['_skillIDs'] = this[_0x4008d6(0x17e)] || {});
    if (this['_skillIDs'][_0x24289b]) return this[_0x4008d6(0x17e)][_0x24289b];
    for (const _0x407c53 of $dataSkills) {
      if (!_0x407c53) continue;
      this[_0x4008d6(0x17e)][_0x407c53[_0x4008d6(0x1b1)][_0x4008d6(0xaf)]()[_0x4008d6(0x2a8)]()] = _0x407c53['id'];
    }
    return this[_0x4008d6(0x17e)][_0x24289b] || 0x0;
  }),
  (DataManager[_0x566724(0x2cf)] = function (_0x837ae2) {
    const _0x4fb0b9 = _0x566724;
    (_0x837ae2 = _0x837ae2[_0x4fb0b9(0xaf)]()[_0x4fb0b9(0x2a8)]()), (this['_stateIDs'] = this[_0x4fb0b9(0xbc)] || {});
    if (this[_0x4fb0b9(0xbc)][_0x837ae2]) return this['_stateIDs'][_0x837ae2];
    for (const _0x282623 of $dataStates) {
      if (!_0x282623) continue;
      this[_0x4fb0b9(0xbc)][_0x282623['name'][_0x4fb0b9(0xaf)]()['trim']()] = _0x282623['id'];
    }
    return this[_0x4fb0b9(0xbc)][_0x837ae2] || 0x0;
  }),
  (DataManager['stateMaximumTurns'] = function (_0x43e4a2) {
    const _0x369032 = _0x566724;
    this[_0x369032(0x272)] = this['_stateMaxTurns'] || {};
    if (this[_0x369032(0x272)][_0x43e4a2]) return this[_0x369032(0x272)][_0x43e4a2];
    return (
      $dataStates[_0x43e4a2]['note'][_0x369032(0x26f)](/<MAX TURNS:[ ](\d+)>/i)
        ? (this['_stateMaxTurns'][_0x43e4a2] = Number(RegExp['$1']))
        : (this[_0x369032(0x272)][_0x43e4a2] = VisuMZ[_0x369032(0x29c)][_0x369032(0x180)][_0x369032(0x214)][_0x369032(0x104)]),
      this['_stateMaxTurns'][_0x43e4a2]
    );
  }),
  (DataManager['getSkillChangesFromState'] = function (_0x2881c4) {
    const _0x3e0e3a = _0x566724;
    if (!_0x2881c4) return {};
    this[_0x3e0e3a(0x337)] = this[_0x3e0e3a(0x337)] || {};
    if (this[_0x3e0e3a(0x337)][_0x2881c4['id']] !== undefined) return this[_0x3e0e3a(0x337)][_0x2881c4['id']];
    const _0x597bd8 = _0x2881c4['note'] || '',
      _0x1e6ed8 = {};
    {
      const _0x16b19c = _0x597bd8['match'](/<SKILL CHANGE(?:|S):[ ](.*)[ ]>>>[ ](.*)>/gi);
      if (_0x16b19c)
        for (const _0x5ad276 of _0x16b19c) {
          _0x5ad276[_0x3e0e3a(0x26f)](/<SKILL CHANGE(?:|S):[ ](.*)[ ]>>>[ ](.*)>/gi);
          let _0x1714f2 = String(RegExp['$1']),
            _0xd7c382 = String(RegExp['$2']);
          VisuMZ[_0x3e0e3a(0x29c)][_0x3e0e3a(0x1da)](_0x1e6ed8, _0x1714f2, _0xd7c382);
        }
    }
    if (_0x597bd8['match'](/<SKILL CHANGE(?:|S)>\s*([\s\S]*)\s*<\/SKILL CHANGE(?:|S)>/i)) {
      const _0x38a62f = String(RegExp['$1'])
        [_0x3e0e3a(0xc9)](/[\r\n]+/)
        ['remove']('');
      for (const _0x5a2e50 of _0x38a62f) {
        if (_0x5a2e50[_0x3e0e3a(0x26f)](/(.*)[ ]>>>[ ](.*)/i)) {
          let _0x4a2dc1 = String(RegExp['$1']),
            _0xae5f49 = String(RegExp['$2']);
          VisuMZ[_0x3e0e3a(0x29c)][_0x3e0e3a(0x1da)](_0x1e6ed8, _0x4a2dc1, _0xae5f49);
        }
      }
    }
    return (this[_0x3e0e3a(0x337)][_0x2881c4['id']] = _0x1e6ed8), this[_0x3e0e3a(0x337)][_0x2881c4['id']];
  }),
  (VisuMZ[_0x566724(0x29c)]['ParseSkillChangessIntoData'] = function (_0x1dbf13, _0x2cac93, _0x148b34) {
    const _0x42c65e = _0x566724;
    /^\d+$/['test'](_0x2cac93) ? (_0x2cac93 = Number(_0x2cac93)) : (_0x2cac93 = DataManager[_0x42c65e(0x1e8)](_0x2cac93)),
      /^\d+$/[_0x42c65e(0x18a)](_0x148b34) ? (_0x148b34 = Number(_0x148b34)) : (_0x148b34 = DataManager[_0x42c65e(0x1e8)](_0x148b34)),
      (_0x1dbf13[_0x2cac93] = _0x148b34);
  }),
  (ColorManager[_0x566724(0x228)] = function (_0x32fdbd, _0x4db8b7) {
    const _0x517cae = _0x566724;
    return (
      (_0x4db8b7 = String(_0x4db8b7)),
      (this['_colorCache'] = this[_0x517cae(0x202)] || {}),
      _0x4db8b7['match'](/#(.*)/i) ? (this['_colorCache'][_0x32fdbd] = '#%1'['format'](String(RegExp['$1']))) : (this[_0x517cae(0x202)][_0x32fdbd] = this['textColor'](Number(_0x4db8b7))),
      this[_0x517cae(0x202)][_0x32fdbd]
    );
  }),
  (ColorManager[_0x566724(0x331)] = function (_0x5cf8b4) {
    const _0x3e3947 = _0x566724;
    return (_0x5cf8b4 = String(_0x5cf8b4)), _0x5cf8b4[_0x3e3947(0x26f)](/#(.*)/i) ? _0x3e3947(0x1ce)[_0x3e3947(0x109)](String(RegExp['$1'])) : this[_0x3e3947(0x25a)](Number(_0x5cf8b4));
  }),
  (ColorManager[_0x566724(0xc6)] = function (_0x1b9503) {
    const _0x50c64d = _0x566724;
    if (typeof _0x1b9503 === 'number') _0x1b9503 = $dataStates[_0x1b9503];
    const _0x2201f4 = '_stored_state-%1-color'[_0x50c64d(0x109)](_0x1b9503['id']);
    this[_0x50c64d(0x202)] = this[_0x50c64d(0x202)] || {};
    if (this[_0x50c64d(0x202)][_0x2201f4]) return this['_colorCache'][_0x2201f4];
    const _0x5d736a = this[_0x50c64d(0xbb)](_0x1b9503);
    return this['getColorDataFromPluginParameters'](_0x2201f4, _0x5d736a);
  }),
  (ColorManager[_0x566724(0xbb)] = function (_0x888b9d) {
    const _0x4c0c2e = _0x566724,
      _0x4f1350 = _0x888b9d['note'];
    if (_0x4f1350['match'](/<TURN COLOR:[ ](.*)>/i)) return String(RegExp['$1']);
    else {
      if (_0x4f1350[_0x4c0c2e(0x26f)](/<POSITIVE STATE>/i)) return VisuMZ['SkillsStatesCore'][_0x4c0c2e(0x180)][_0x4c0c2e(0x214)][_0x4c0c2e(0xa1)];
      else
        return _0x4f1350[_0x4c0c2e(0x26f)](/<NEGATIVE STATE>/i)
          ? VisuMZ[_0x4c0c2e(0x29c)][_0x4c0c2e(0x180)][_0x4c0c2e(0x214)][_0x4c0c2e(0x181)]
          : VisuMZ['SkillsStatesCore'][_0x4c0c2e(0x180)][_0x4c0c2e(0x214)][_0x4c0c2e(0x1a8)];
    }
  }),
  (ColorManager[_0x566724(0xcb)] = function () {
    const _0x17c1c0 = _0x566724,
      _0x32c968 = _0x17c1c0(0x179);
    this[_0x17c1c0(0x202)] = this[_0x17c1c0(0x202)] || {};
    if (this['_colorCache'][_0x32c968]) return this[_0x17c1c0(0x202)][_0x32c968];
    const _0x502eff = VisuMZ[_0x17c1c0(0x29c)][_0x17c1c0(0x180)]['Buffs'][_0x17c1c0(0xd4)];
    return this[_0x17c1c0(0x228)](_0x32c968, _0x502eff);
  }),
  (ColorManager[_0x566724(0x33d)] = function () {
    const _0x26c62c = _0x566724,
      _0x9be81f = '_stored_debuffColor';
    this[_0x26c62c(0x202)] = this[_0x26c62c(0x202)] || {};
    if (this[_0x26c62c(0x202)][_0x9be81f]) return this[_0x26c62c(0x202)][_0x9be81f];
    const _0x2e2b62 = VisuMZ[_0x26c62c(0x29c)][_0x26c62c(0x180)][_0x26c62c(0x19a)][_0x26c62c(0x17a)];
    return this[_0x26c62c(0x228)](_0x9be81f, _0x2e2b62);
  }),
  (SceneManager['isSceneBattle'] = function () {
    const _0xed1013 = _0x566724;
    return this[_0xed1013(0x2a9)] && this[_0xed1013(0x2a9)][_0xed1013(0x1e2)] === Scene_Battle;
  }),
  (VisuMZ[_0x566724(0x29c)][_0x566724(0x88)] = BattleManager['endAction']),
  (BattleManager[_0x566724(0x11e)] = function () {
    const _0x49402f = _0x566724;
    this[_0x49402f(0x2fa)](), VisuMZ[_0x49402f(0x29c)][_0x49402f(0x88)]['call'](this);
  }),
  (BattleManager[_0x566724(0x2fa)] = function () {
    const _0x4b0da8 = _0x566724,
      _0x10b62d = VisuMZ[_0x4b0da8(0x29c)]['Settings'][_0x4b0da8(0x214)];
    if (!_0x10b62d) return;
    if (_0x10b62d[_0x4b0da8(0x1b3)] === ![]) return;
    if (!this[_0x4b0da8(0x144)]) return;
    this[_0x4b0da8(0x144)]['updateStatesActionEnd']();
  }),
  (Game_Battler[_0x566724(0x1a1)][_0x566724(0x2fa)] = function () {
    const _0x4f2f6d = _0x566724;
    if (BattleManager[_0x4f2f6d(0x157)] !== _0x4f2f6d(0x31a)) return;
    if (this[_0x4f2f6d(0x2c5)] === Graphics['frameCount']) return;
    this['_lastStatesActionEndFrameCount'] = Graphics['frameCount'];
    for (const _0x203981 of this['_states']) {
      const _0x628a06 = $dataStates[_0x203981];
      if (!_0x628a06) continue;
      if (_0x628a06[_0x4f2f6d(0x160)] !== 0x1) continue;
      this[_0x4f2f6d(0x132)][_0x203981] > 0x0 && this[_0x4f2f6d(0x132)][_0x203981]--;
    }
    this['removeStatesAuto'](0x1);
  }),
  (Game_BattlerBase[_0x566724(0x1a1)][_0x566724(0x123)] = function () {
    const _0x4e7690 = _0x566724,
      _0x5c51c4 = VisuMZ['SkillsStatesCore'][_0x4e7690(0x180)]['States'];
    for (const _0x407e04 of this[_0x4e7690(0x130)]) {
      const _0x4c5e52 = $dataStates[_0x407e04];
      if (_0x5c51c4 && _0x5c51c4['ActionEndUpdate'] !== ![]) {
        if (_0x4c5e52 && _0x4c5e52[_0x4e7690(0x160)] === 0x1) continue;
      }
      this[_0x4e7690(0x132)][_0x407e04] > 0x0 && this[_0x4e7690(0x132)][_0x407e04]--;
    }
  }),
  (VisuMZ[_0x566724(0x29c)][_0x566724(0x346)] = Game_Switches['prototype'][_0x566724(0x1c2)]),
  (Game_Switches[_0x566724(0x1a1)][_0x566724(0x1c2)] = function () {
    const _0x2d7847 = _0x566724;
    VisuMZ['SkillsStatesCore'][_0x2d7847(0x346)]['call'](this);
    const _0x4e46c9 = VisuMZ[_0x2d7847(0x29c)]['Settings'][_0x2d7847(0x307)]['RefreshCacheSwitch'] ?? !![];
    if (!_0x4e46c9) return;
    if (SceneManager['isSceneBattle']())
      for (const _0xa4950e of BattleManager[_0x2d7847(0x2ba)]()) {
        if (_0xa4950e) _0xa4950e[_0x2d7847(0x309)]();
      }
  }),
  (VisuMZ['SkillsStatesCore']['Game_Variables_onChange'] = Game_Variables[_0x566724(0x1a1)][_0x566724(0x1c2)]),
  (Game_Variables['prototype'][_0x566724(0x1c2)] = function () {
    const _0x2742ef = _0x566724;
    VisuMZ[_0x2742ef(0x29c)][_0x2742ef(0x297)][_0x2742ef(0x8e)](this);
    const _0x30e62c = VisuMZ['SkillsStatesCore'][_0x2742ef(0x180)][_0x2742ef(0x307)]['RefreshCacheVar'] ?? !![];
    if (!_0x30e62c) return;
    if (SceneManager[_0x2742ef(0x23b)]())
      for (const _0x3430f3 of BattleManager[_0x2742ef(0x2ba)]()) {
        if (_0x3430f3) _0x3430f3[_0x2742ef(0x309)]();
      }
  }),
  (VisuMZ['SkillsStatesCore'][_0x566724(0x171)] = Game_Action['prototype'][_0x566724(0x1cf)]),
  (Game_Action[_0x566724(0x1a1)]['applyItemUserEffect'] = function (_0x3a0a) {
    const _0x2ad1f0 = _0x566724;
    VisuMZ[_0x2ad1f0(0x29c)][_0x2ad1f0(0x171)][_0x2ad1f0(0x8e)](this, _0x3a0a), this[_0x2ad1f0(0x34b)](_0x3a0a);
  }),
  (Game_Action['prototype'][_0x566724(0x34b)] = function (_0x30253d) {
    const _0x5af534 = _0x566724;
    this['applyStateCategoryRemovalEffects'](_0x30253d), this[_0x5af534(0x116)](_0x30253d), this[_0x5af534(0x2f1)](_0x30253d), this[_0x5af534(0x2f2)](_0x30253d);
  }),
  (VisuMZ[_0x566724(0x29c)][_0x566724(0x236)] = Game_Action[_0x566724(0x1a1)]['testApply']),
  (Game_Action['prototype']['testApply'] = function (_0xbf7edb) {
    const _0x24f015 = _0x566724;
    if (this['testSkillStatesCoreNotetags'](_0xbf7edb)) return !![];
    return VisuMZ['SkillsStatesCore'][_0x24f015(0x236)][_0x24f015(0x8e)](this, _0xbf7edb);
  }),
  (Game_Action[_0x566724(0x1a1)][_0x566724(0x100)] = function (_0x4ce2cc) {
    const _0x5150ac = _0x566724;
    if (!this['item']()) return;
    const _0x5bc66e = this[_0x5150ac(0x2cd)]()[_0x5150ac(0x26d)];
    if (_0x5bc66e[_0x5150ac(0x26f)](/<STATE[ ](.*)[ ]CATEGORY REMOVE:[ ](.*)>/i)) {
      const _0x172b22 = String(RegExp['$1']);
      if (_0x4ce2cc['isStateCategoryAffected'](_0x172b22)) return !![];
    }
    if (_0x5bc66e[_0x5150ac(0x26f)](/<SET STATE[ ](\d+)[ ]TURNS:[ ](.*)>/i)) {
      const _0x476a05 = Number(RegExp['$1']);
      if (_0x4ce2cc[_0x5150ac(0x229)](_0x476a05)) return !![];
    } else {
      if (_0x5bc66e[_0x5150ac(0x26f)](/<SET STATE[ ](.*)[ ]TURNS:[ ](.*)>/i)) {
        const _0x493e83 = DataManager[_0x5150ac(0x2cf)](RegExp['$1']);
        if (_0x4ce2cc[_0x5150ac(0x229)](_0x493e83)) return !![];
      }
    }
    return ![];
  }),
  (Game_Action[_0x566724(0x1a1)][_0x566724(0x19e)] = function (_0x56ac81) {
    const _0x53c60a = _0x566724;
    if (_0x56ac81[_0x53c60a(0x124)]()[_0x53c60a(0x11b)] <= 0x0) return;
    const _0x5662c0 = this[_0x53c60a(0x2cd)]()[_0x53c60a(0x26d)];
    {
      const _0x354b86 = _0x5662c0[_0x53c60a(0x26f)](/<STATE[ ](.*)[ ]CATEGORY REMOVE:[ ]ALL>/gi);
      if (_0x354b86)
        for (const _0x3c6407 of _0x354b86) {
          _0x3c6407['match'](/<STATE[ ](.*)[ ]CATEGORY REMOVE:[ ]ALL>/i);
          const _0x574724 = String(RegExp['$1']);
          _0x56ac81['removeStatesByCategoryAll'](_0x574724);
        }
    }
    {
      const _0x3cdd36 = _0x5662c0[_0x53c60a(0x26f)](/<STATE[ ](.*)[ ]CATEGORY REMOVE:[ ](\d+)>/gi);
      if (_0x3cdd36)
        for (const _0x2d322d of _0x3cdd36) {
          _0x2d322d[_0x53c60a(0x26f)](/<STATE[ ](.*)[ ]CATEGORY REMOVE:[ ](\d+)>/i);
          const _0x2c9b50 = String(RegExp['$1']),
            _0x21ff4d = Number(RegExp['$2']);
          _0x56ac81['removeStatesByCategory'](_0x2c9b50, _0x21ff4d);
        }
    }
  }),
  (Game_Action[_0x566724(0x1a1)][_0x566724(0x116)] = function (_0x544852) {
    const _0x1049af = _0x566724,
      _0x107d1c = this['item']()[_0x1049af(0x26d)],
      _0x56a47c = _0x107d1c[_0x1049af(0x26f)](/<SET STATE[ ](.*)[ ]TURNS:[ ](\d+)>/gi);
    if (_0x56a47c)
      for (const _0x5c308d of _0x56a47c) {
        let _0x163503 = 0x0,
          _0x406a22 = 0x0;
        if (_0x5c308d[_0x1049af(0x26f)](/<SET STATE[ ](\d+)[ ]TURNS:[ ](\d+)>/i)) (_0x163503 = Number(RegExp['$1'])), (_0x406a22 = Number(RegExp['$2']));
        else _0x5c308d[_0x1049af(0x26f)](/<SET STATE[ ](.*)[ ]TURNS:[ ](\d+)>/i) && ((_0x163503 = DataManager[_0x1049af(0x2cf)](RegExp['$1'])), (_0x406a22 = Number(RegExp['$2'])));
        _0x544852[_0x1049af(0x131)](_0x163503, _0x406a22), this[_0x1049af(0xac)](_0x544852);
      }
    const _0x5477be = _0x107d1c[_0x1049af(0x26f)](/<STATE[ ](.*)[ ]TURNS:[ ]([\+\-]\d+)>/gi);
    if (_0x5477be)
      for (const _0x19d91a of _0x5477be) {
        let _0x513d8f = 0x0,
          _0x46d173 = 0x0;
        if (_0x19d91a['match'](/<STATE[ ](\d+)[ ]TURNS:[ ]([\+\-]\d+)>/i)) (_0x513d8f = Number(RegExp['$1'])), (_0x46d173 = Number(RegExp['$2']));
        else _0x19d91a[_0x1049af(0x26f)](/<STATE[ ](.*)[ ]TURNS:[ ]([\+\-]\d+)>/i) && ((_0x513d8f = DataManager[_0x1049af(0x2cf)](RegExp['$1'])), (_0x46d173 = Number(RegExp['$2'])));
        _0x544852['addStateTurns'](_0x513d8f, _0x46d173), this[_0x1049af(0xac)](_0x544852);
      }
  }),
  (Game_Action[_0x566724(0x1a1)][_0x566724(0x2f1)] = function (_0x70e26a) {
    const _0x1b71f6 = _0x566724,
      _0x46dff9 = ['MAXHP', _0x1b71f6(0x2a7), 'ATK', _0x1b71f6(0x2d1), _0x1b71f6(0x14b), _0x1b71f6(0x2af), _0x1b71f6(0x15e), _0x1b71f6(0x2e3)],
      _0x194f14 = this[_0x1b71f6(0x2cd)]()['note'],
      _0x1d0dad = _0x194f14[_0x1b71f6(0x26f)](/<SET[ ](.*)[ ]BUFF TURNS:[ ](\d+)>/gi);
    if (_0x1d0dad)
      for (const _0x1a6e98 of _0x1d0dad) {
        _0x1a6e98[_0x1b71f6(0x26f)](/<SET[ ](.*)[ ]BUFF TURNS:[ ](\d+)>/i);
        const _0x1cc9f8 = _0x46dff9[_0x1b71f6(0x278)](String(RegExp['$1'])[_0x1b71f6(0xaf)]()),
          _0x5ccc16 = Number(RegExp['$2']);
        _0x1cc9f8 >= 0x0 && (_0x70e26a[_0x1b71f6(0x1f2)](_0x1cc9f8, _0x5ccc16), this[_0x1b71f6(0xac)](_0x70e26a));
      }
    const _0x19d9f6 = _0x194f14[_0x1b71f6(0x26f)](/<(.*)[ ]BUFF TURNS:[ ]([\+\-]\d+)>/gi);
    if (_0x19d9f6)
      for (const _0x336ce6 of _0x1d0dad) {
        _0x336ce6['match'](/<(.*)[ ]BUFF TURNS:[ ]([\+\-]\d+)>/i);
        const _0xc8af45 = _0x46dff9[_0x1b71f6(0x278)](String(RegExp['$1'])['toUpperCase']()),
          _0x1f6a9e = Number(RegExp['$2']);
        _0xc8af45 >= 0x0 && (_0x70e26a[_0x1b71f6(0x2eb)](_0xc8af45, _0x1f6a9e), this[_0x1b71f6(0xac)](_0x70e26a));
      }
  }),
  (Game_Action[_0x566724(0x1a1)][_0x566724(0x2f2)] = function (_0x3a23a1) {
    const _0x1dbfd4 = _0x566724,
      _0x3381c6 = [_0x1dbfd4(0x2db), _0x1dbfd4(0x2a7), 'ATK', _0x1dbfd4(0x2d1), _0x1dbfd4(0x14b), _0x1dbfd4(0x2af), _0x1dbfd4(0x15e), 'LUK'],
      _0x461e83 = this[_0x1dbfd4(0x2cd)]()[_0x1dbfd4(0x26d)],
      _0x5ad214 = _0x461e83[_0x1dbfd4(0x26f)](/<SET[ ](.*)[ ]DEBUFF TURNS:[ ](\d+)>/gi);
    if (_0x5ad214)
      for (const _0x250f23 of _0x5ad214) {
        _0x250f23['match'](/<SET[ ](.*)[ ]DEBUFF TURNS:[ ](\d+)>/i);
        const _0x38cbbf = _0x3381c6['indexOf'](String(RegExp['$1'])[_0x1dbfd4(0xaf)]()),
          _0x291007 = Number(RegExp['$2']);
        _0x38cbbf >= 0x0 && (_0x3a23a1[_0x1dbfd4(0x268)](_0x38cbbf, _0x291007), this[_0x1dbfd4(0xac)](_0x3a23a1));
      }
    const _0x36ce48 = _0x461e83[_0x1dbfd4(0x26f)](/<(.*)[ ]DEBUFF TURNS:[ ]([\+\-]\d+)>/gi);
    if (_0x36ce48)
      for (const _0x1116bb of _0x5ad214) {
        _0x1116bb[_0x1dbfd4(0x26f)](/<(.*)[ ]DEBUFF TURNS:[ ]([\+\-]\d+)>/i);
        const _0x29f60c = _0x3381c6['indexOf'](String(RegExp['$1'])[_0x1dbfd4(0xaf)]()),
          _0x59621f = Number(RegExp['$2']);
        _0x29f60c >= 0x0 && (_0x3a23a1[_0x1dbfd4(0xd9)](_0x29f60c, _0x59621f), this[_0x1dbfd4(0xac)](_0x3a23a1));
      }
  }),
  (VisuMZ[_0x566724(0x29c)][_0x566724(0x2b5)] = Game_BattlerBase['prototype'][_0x566724(0x1ed)]),
  (Game_BattlerBase['prototype'][_0x566724(0x1ed)] = function () {
    const _0x4baea2 = _0x566724;
    (this[_0x4baea2(0x290)] = {}), this[_0x4baea2(0xf0)](), VisuMZ[_0x4baea2(0x29c)]['Game_BattlerBase_initMembers'][_0x4baea2(0x8e)](this);
  }),
  (Game_BattlerBase[_0x566724(0x1a1)]['initMembersSkillsStatesCore'] = function () {
    const _0x2fa89f = _0x566724;
    (this[_0x2fa89f(0xc1)] = ''), (this['_stateData'] = {}), (this[_0x2fa89f(0x1f9)] = {}), (this[_0x2fa89f(0xd0)] = {});
  }),
  (Game_BattlerBase['prototype'][_0x566724(0xd7)] = function (_0x173db0) {
    const _0x48b88d = _0x566724;
    return (this['_cache'] = this['_cache'] || {}), this[_0x48b88d(0x290)][_0x173db0] !== undefined;
  }),
  (VisuMZ[_0x566724(0x29c)][_0x566724(0x2d9)] = Game_BattlerBase[_0x566724(0x1a1)][_0x566724(0x309)]),
  (Game_BattlerBase[_0x566724(0x1a1)]['refresh'] = function () {
    const _0x538f59 = _0x566724;
    (this['_cache'] = {}), VisuMZ['SkillsStatesCore']['Game_BattlerBase_refresh'][_0x538f59(0x8e)](this);
  }),
  (VisuMZ[_0x566724(0x29c)][_0x566724(0xeb)] = Game_BattlerBase['prototype'][_0x566724(0xdd)]),
  (Game_BattlerBase[_0x566724(0x1a1)]['eraseState'] = function (_0x2495ba) {
    const _0x3b4477 = _0x566724;
    let _0x2d768b = this[_0x3b4477(0x229)](_0x2495ba);
    VisuMZ[_0x3b4477(0x29c)][_0x3b4477(0xeb)]['call'](this, _0x2495ba);
    if (_0x2d768b && !this[_0x3b4477(0x229)](_0x2495ba)) this[_0x3b4477(0x149)](_0x2495ba);
  }),
  (Game_BattlerBase['prototype'][_0x566724(0x149)] = function (_0x512b20) {
    const _0x3b74e0 = _0x566724;
    this[_0x3b74e0(0x2a1)](_0x512b20), this[_0x3b74e0(0x1d0)](_0x512b20);
  }),
  (VisuMZ[_0x566724(0x29c)][_0x566724(0x2bb)] = Game_Battler['prototype'][_0x566724(0x2ea)]),
  (Game_Battler[_0x566724(0x1a1)][_0x566724(0x2ea)] = function () {
    const _0x4abea9 = _0x566724;
    VisuMZ[_0x4abea9(0x29c)][_0x4abea9(0x2bb)][_0x4abea9(0x8e)](this), this['clearAllStateOrigins']();
  }),
  (VisuMZ[_0x566724(0x29c)]['Game_BattlerBase_resetStateCounts'] = Game_BattlerBase['prototype'][_0x566724(0xc3)]),
  (Game_BattlerBase[_0x566724(0x1a1)][_0x566724(0xc3)] = function (_0x4e7831) {
    const _0x4f2e1a = _0x566724,
      _0x28ca72 = $dataStates[_0x4e7831],
      _0x41f1ab = this['stateTurns'](_0x4e7831),
      _0xc8682d = this[_0x4f2e1a(0x1db)](_0x28ca72)[_0x4f2e1a(0x129)]()[_0x4f2e1a(0x2a8)]();
    switch (_0xc8682d) {
      case _0x4f2e1a(0x31b):
        if (_0x41f1ab <= 0x0) this['prepareResetStateCounts'](_0x4e7831);
        break;
      case _0x4f2e1a(0x23d):
        this['prepareResetStateCounts'](_0x4e7831);
        break;
      case 'greater':
        this['prepareResetStateCounts'](_0x4e7831), (this['_stateTurns'][_0x4e7831] = Math[_0x4f2e1a(0x311)](this[_0x4f2e1a(0x132)][_0x4e7831], _0x41f1ab));
        break;
      case _0x4f2e1a(0x208):
        this[_0x4f2e1a(0x246)](_0x4e7831), (this['_stateTurns'][_0x4e7831] += _0x41f1ab);
        break;
      default:
        this[_0x4f2e1a(0x246)](_0x4e7831);
        break;
    }
    if (this[_0x4f2e1a(0x229)](_0x4e7831)) {
      const _0xda6b13 = DataManager['stateMaximumTurns'](_0x4e7831);
      this['_stateTurns'][_0x4e7831] = this[_0x4f2e1a(0x132)][_0x4e7831]['clamp'](0x0, _0xda6b13);
    }
  }),
  (Game_BattlerBase[_0x566724(0x1a1)][_0x566724(0x246)] = function (_0x25db86) {
    const _0x2bc016 = _0x566724;
    VisuMZ[_0x2bc016(0x29c)][_0x2bc016(0xce)][_0x2bc016(0x8e)](this, _0x25db86);
  }),
  (Game_BattlerBase[_0x566724(0x1a1)]['getStateReapplyRulings'] = function (_0x504e4c) {
    const _0x45fb8a = _0x566724,
      _0x2094a9 = _0x504e4c[_0x45fb8a(0x26d)];
    return _0x2094a9[_0x45fb8a(0x26f)](/<REAPPLY RULES:[ ](.*)>/i) ? String(RegExp['$1']) : VisuMZ[_0x45fb8a(0x29c)]['Settings'][_0x45fb8a(0x214)][_0x45fb8a(0x220)];
  }),
  (VisuMZ[_0x566724(0x29c)][_0x566724(0xec)] = Game_BattlerBase[_0x566724(0x1a1)][_0x566724(0xed)]),
  (Game_BattlerBase[_0x566724(0x1a1)][_0x566724(0xed)] = function (_0x33b27b, _0x39608c) {
    const _0x5b015a = _0x566724,
      _0x1dc3c0 = VisuMZ['SkillsStatesCore'][_0x5b015a(0x180)][_0x5b015a(0x19a)][_0x5b015a(0x220)],
      _0x2039bd = this[_0x5b015a(0x2c0)](_0x33b27b);
    switch (_0x1dc3c0) {
      case _0x5b015a(0x31b):
        if (_0x2039bd <= 0x0) this[_0x5b015a(0x2d2)][_0x33b27b] = _0x39608c;
        break;
      case _0x5b015a(0x23d):
        this[_0x5b015a(0x2d2)][_0x33b27b] = _0x39608c;
        break;
      case 'greater':
        this[_0x5b015a(0x2d2)][_0x33b27b] = Math[_0x5b015a(0x311)](_0x2039bd, _0x39608c);
        break;
      case 'add':
        this[_0x5b015a(0x2d2)][_0x33b27b] += _0x39608c;
        break;
      default:
        VisuMZ[_0x5b015a(0x29c)][_0x5b015a(0xec)]['call'](this, _0x33b27b, _0x39608c);
        break;
    }
    const _0xd7db80 = VisuMZ[_0x5b015a(0x29c)]['Settings'][_0x5b015a(0x19a)][_0x5b015a(0x104)];
    this[_0x5b015a(0x2d2)][_0x33b27b] = this[_0x5b015a(0x2d2)][_0x33b27b]['clamp'](0x0, _0xd7db80);
  }),
  (Game_BattlerBase['prototype'][_0x566724(0x203)] = function () {
    const _0x2b7885 = _0x566724;
    if (this[_0x2b7885(0x290)][_0x2b7885(0x1bf)] !== undefined) return this[_0x2b7885(0x290)][_0x2b7885(0x1bf)];
    this[_0x2b7885(0x290)][_0x2b7885(0x1bf)] = ![];
    const _0x3a9b5b = this['states']();
    for (const _0x1af548 of _0x3a9b5b) {
      if (!_0x1af548) continue;
      if (_0x1af548['note'][_0x2b7885(0x26f)](/<GROUP DEFEAT>/i)) {
        this[_0x2b7885(0x290)][_0x2b7885(0x1bf)] = !![];
        break;
      }
    }
    return this[_0x2b7885(0x290)][_0x2b7885(0x1bf)];
  }),
  (VisuMZ['SkillsStatesCore']['Game_Unit_deadMembers'] = Game_Unit[_0x566724(0x1a1)]['deadMembers']),
  (Game_Unit[_0x566724(0x1a1)][_0x566724(0x1fb)] = function () {
    const _0x28bfe8 = _0x566724;
    let _0x1f4753 = VisuMZ[_0x28bfe8(0x29c)][_0x28bfe8(0x2e8)]['call'](this);
    return BattleManager[_0x28bfe8(0x305)] && (_0x1f4753 = _0x1f4753[_0x28bfe8(0x248)](this[_0x28bfe8(0x1df)]()[_0x28bfe8(0x1dc)](_0x1b0658 => _0x1b0658[_0x28bfe8(0x203)]()))), _0x1f4753;
  }),
  (VisuMZ['SkillsStatesCore']['Game_BattlerBase_clearStates'] = Game_BattlerBase[_0x566724(0x1a1)][_0x566724(0x271)]),
  (Game_BattlerBase[_0x566724(0x1a1)]['clearStates'] = function () {
    const _0xace898 = _0x566724;
    this[_0xace898(0x1b6)]() !== '' ? this[_0xace898(0xa0)]() : (VisuMZ[_0xace898(0x29c)][_0xace898(0x2b2)][_0xace898(0x8e)](this), this[_0xace898(0xf0)]());
  }),
  (Game_Actor[_0x566724(0x1a1)][_0x566724(0x271)] = function () {
    const _0x39529e = _0x566724;
    (this['_stateSteps'] = this['_stateSteps'] || {}), Game_Battler[_0x39529e(0x1a1)][_0x39529e(0x271)]['call'](this);
  }),
  (Game_BattlerBase['prototype'][_0x566724(0xa0)] = function () {
    const _0x476205 = _0x566724,
      _0x51c33c = this['states']();
    for (const _0x142c4a of _0x51c33c) {
      if (_0x142c4a && this[_0x476205(0x1d4)](_0x142c4a)) this[_0x476205(0xdd)](_0x142c4a['id']);
    }
    this[_0x476205(0x290)] = {};
  }),
  (Game_BattlerBase[_0x566724(0x1a1)]['canClearState'] = function (_0x586ff4) {
    const _0x4775c5 = _0x566724,
      _0x5461e0 = this[_0x4775c5(0x1b6)]();
    if (_0x5461e0 !== '') {
      const _0x2b497b = _0x586ff4[_0x4775c5(0x26d)];
      if (_0x5461e0 === _0x4775c5(0x12e) && _0x2b497b[_0x4775c5(0x26f)](/<NO DEATH CLEAR>/i)) return ![];
      if (_0x5461e0 === _0x4775c5(0x2ab) && _0x2b497b[_0x4775c5(0x26f)](/<NO RECOVER ALL CLEAR>/i)) return ![];
    }
    return this['isStateAffected'](_0x586ff4['id']);
  }),
  (Game_BattlerBase[_0x566724(0x1a1)]['getStateRetainType'] = function () {
    const _0x24235c = _0x566724;
    return this[_0x24235c(0xc1)];
  }),
  (Game_BattlerBase[_0x566724(0x1a1)][_0x566724(0x168)] = function (_0x242ee4) {
    const _0x109215 = _0x566724;
    this[_0x109215(0xc1)] = _0x242ee4;
  }),
  (Game_BattlerBase[_0x566724(0x1a1)][_0x566724(0x178)] = function () {
    const _0x51faad = _0x566724;
    this[_0x51faad(0xc1)] = '';
  }),
  (VisuMZ['SkillsStatesCore'][_0x566724(0x210)] = Game_BattlerBase[_0x566724(0x1a1)]['die']),
  (Game_BattlerBase['prototype']['die'] = function () {
    const _0x5705d7 = _0x566724;
    this[_0x5705d7(0x168)](_0x5705d7(0x12e)), VisuMZ['SkillsStatesCore']['Game_BattlerBase_die'][_0x5705d7(0x8e)](this), this[_0x5705d7(0x178)]();
  }),
  (VisuMZ[_0x566724(0x29c)]['Game_BattlerBase_recoverAll'] = Game_BattlerBase[_0x566724(0x1a1)][_0x566724(0x21f)]),
  (Game_BattlerBase[_0x566724(0x1a1)][_0x566724(0x21f)] = function () {
    const _0x2bf0d6 = _0x566724;
    this['setStateRetainType']('recover\x20all'), VisuMZ[_0x2bf0d6(0x29c)]['Game_BattlerBase_recoverAll']['call'](this), this[_0x2bf0d6(0x178)]();
  }),
  (Game_BattlerBase[_0x566724(0x1a1)]['adjustSkillCost'] = function (_0x4e2402, _0xe88727, _0x21d5a6) {
    return _0xe88727;
  }),
  (Game_BattlerBase[_0x566724(0x1a1)][_0x566724(0x28e)] = function (_0x29396f) {
    const _0x48cd2d = _0x566724;
    for (settings of VisuMZ[_0x48cd2d(0x29c)][_0x48cd2d(0x180)][_0x48cd2d(0x10e)]) {
      let _0x1eb5f3 = settings['CalcJS'][_0x48cd2d(0x8e)](this, _0x29396f);
      _0x1eb5f3 = this[_0x48cd2d(0x2fd)](_0x29396f, _0x1eb5f3, settings);
      if (!settings['CanPayJS'][_0x48cd2d(0x8e)](this, _0x29396f, _0x1eb5f3)) return ![];
    }
    return !![];
  }),
  (Game_BattlerBase[_0x566724(0x1a1)][_0x566724(0x18d)] = function (_0x3d0abf) {
    const _0x5cfde6 = _0x566724;
    for (settings of VisuMZ['SkillsStatesCore'][_0x5cfde6(0x180)][_0x5cfde6(0x10e)]) {
      let _0x36431d = settings[_0x5cfde6(0x343)][_0x5cfde6(0x8e)](this, _0x3d0abf);
      (_0x36431d = this[_0x5cfde6(0x2fd)](_0x3d0abf, _0x36431d, settings)), settings[_0x5cfde6(0x105)][_0x5cfde6(0x8e)](this, _0x3d0abf, _0x36431d);
    }
  }),
  (VisuMZ[_0x566724(0x29c)][_0x566724(0x323)] = Game_BattlerBase['prototype'][_0x566724(0x2bf)]),
  (Game_BattlerBase[_0x566724(0x1a1)][_0x566724(0x2bf)] = function (_0x2c2474) {
    const _0x3acd50 = _0x566724;
    if (!_0x2c2474) return ![];
    if (!VisuMZ['SkillsStatesCore'][_0x3acd50(0x323)]['call'](this, _0x2c2474)) return ![];
    if (!this[_0x3acd50(0x2b1)](_0x2c2474)) return ![];
    if (!this[_0x3acd50(0x32a)](_0x2c2474)) return ![];
    if (!this[_0x3acd50(0x96)](_0x2c2474)) return ![];
    return !![];
  }),
  (Game_BattlerBase[_0x566724(0x1a1)][_0x566724(0x2b1)] = function (_0x544ad9) {
    const _0x4dccc4 = _0x566724;
    if (!this[_0x4dccc4(0xae)](_0x544ad9)) return ![];
    return !![];
  }),
  (Game_BattlerBase['prototype'][_0x566724(0xae)] = function (_0x34a3d4) {
    const _0x3cb7f2 = _0x566724,
      _0x1b8e12 = _0x34a3d4['note'];
    if (_0x1b8e12[_0x3cb7f2(0x26f)](/<ENABLE[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)) {
      const _0x58fc75 = JSON[_0x3cb7f2(0x28f)]('[' + RegExp['$1'][_0x3cb7f2(0x26f)](/\d+/g) + ']');
      for (const _0x531f27 of _0x58fc75) {
        if (!$gameSwitches['value'](_0x531f27)) return ![];
      }
      return !![];
    }
    if (_0x1b8e12[_0x3cb7f2(0x26f)](/<ENABLE ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)) {
      const _0x2b48fa = JSON[_0x3cb7f2(0x28f)]('[' + RegExp['$1'][_0x3cb7f2(0x26f)](/\d+/g) + ']');
      for (const _0x139e68 of _0x2b48fa) {
        if (!$gameSwitches[_0x3cb7f2(0xcf)](_0x139e68)) return ![];
      }
      return !![];
    }
    if (_0x1b8e12[_0x3cb7f2(0x26f)](/<ENABLE ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)) {
      const _0x308da8 = JSON['parse']('[' + RegExp['$1'][_0x3cb7f2(0x26f)](/\d+/g) + ']');
      for (const _0x5802a4 of _0x308da8) {
        if ($gameSwitches['value'](_0x5802a4)) return !![];
      }
      return ![];
    }
    if (_0x1b8e12[_0x3cb7f2(0x26f)](/<DISABLE[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)) {
      const _0x318aae = JSON[_0x3cb7f2(0x28f)]('[' + RegExp['$1'][_0x3cb7f2(0x26f)](/\d+/g) + ']');
      for (const _0x23a196 of _0x318aae) {
        if (!$gameSwitches[_0x3cb7f2(0xcf)](_0x23a196)) return !![];
      }
      return ![];
    }
    if (_0x1b8e12[_0x3cb7f2(0x26f)](/<DISABLE ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)) {
      const _0x358d62 = JSON['parse']('[' + RegExp['$1'][_0x3cb7f2(0x26f)](/\d+/g) + ']');
      for (const _0x46b091 of _0x358d62) {
        if (!$gameSwitches['value'](_0x46b091)) return !![];
      }
      return ![];
    }
    if (_0x1b8e12[_0x3cb7f2(0x26f)](/<DISABLE ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)) {
      const _0x4c7e25 = JSON['parse']('[' + RegExp['$1'][_0x3cb7f2(0x26f)](/\d+/g) + ']');
      for (const _0x5b8ad2 of _0x4c7e25) {
        if ($gameSwitches[_0x3cb7f2(0xcf)](_0x5b8ad2)) return ![];
      }
      return !![];
    }
    return !![];
  }),
  (Game_BattlerBase[_0x566724(0x1a1)][_0x566724(0x32a)] = function (_0x147e43) {
    const _0x190b8c = _0x566724,
      _0x1d98ed = _0x147e43[_0x190b8c(0x26d)],
      _0x222adb = VisuMZ[_0x190b8c(0x29c)][_0x190b8c(0x23c)];
    return _0x222adb[_0x147e43['id']] ? _0x222adb[_0x147e43['id']][_0x190b8c(0x8e)](this, _0x147e43) : !![];
  }),
  (Game_BattlerBase[_0x566724(0x1a1)][_0x566724(0x96)] = function (_0x48519d) {
    const _0x329322 = _0x566724;
    return VisuMZ['SkillsStatesCore'][_0x329322(0x180)][_0x329322(0x1a5)]['SkillConditionJS'][_0x329322(0x8e)](this, _0x48519d);
  }),
  (VisuMZ['SkillsStatesCore']['Game_BattlerBase_skillMpCost'] = Game_BattlerBase[_0x566724(0x1a1)][_0x566724(0x121)]),
  (Game_BattlerBase[_0x566724(0x1a1)][_0x566724(0x121)] = function (_0x4c1c6c) {
    const _0x24cddd = _0x566724;
    for (settings of VisuMZ[_0x24cddd(0x29c)][_0x24cddd(0x180)][_0x24cddd(0x10e)]) {
      if (settings[_0x24cddd(0x32d)]['toUpperCase']() === 'MP') {
        let _0x2403be = settings[_0x24cddd(0x343)][_0x24cddd(0x8e)](this, _0x4c1c6c);
        return (_0x2403be = this['adjustSkillCost'](_0x4c1c6c, _0x2403be, settings)), _0x2403be;
      }
    }
    return VisuMZ[_0x24cddd(0x29c)]['Game_BattlerBase_skillMpCost'][_0x24cddd(0x8e)](this, _0x4c1c6c);
  }),
  (VisuMZ['SkillsStatesCore']['Game_BattlerBase_skillTpCost'] = Game_BattlerBase['prototype'][_0x566724(0x152)]),
  (Game_BattlerBase[_0x566724(0x1a1)][_0x566724(0x152)] = function (_0x260aa9) {
    const _0x3059c3 = _0x566724;
    for (settings of VisuMZ[_0x3059c3(0x29c)][_0x3059c3(0x180)]['Costs']) {
      if (settings[_0x3059c3(0x32d)][_0x3059c3(0xaf)]() === 'TP') {
        let _0x1bd1d8 = settings['CalcJS'][_0x3059c3(0x8e)](this, _0x260aa9);
        return (_0x1bd1d8 = this[_0x3059c3(0x2fd)](_0x260aa9, _0x1bd1d8, settings)), _0x1bd1d8;
      }
    }
    return VisuMZ[_0x3059c3(0x29c)]['Game_BattlerBase_skillTpCost'][_0x3059c3(0x8e)](this, _0x260aa9);
  }),
  (Game_BattlerBase[_0x566724(0x1a1)]['hasState'] = function (_0x5dd5ab) {
    const _0x939ca4 = _0x566724;
    if (typeof _0x5dd5ab === _0x939ca4(0x317)) _0x5dd5ab = $dataStates[_0x5dd5ab];
    return this['states']()[_0x939ca4(0x1f5)](_0x5dd5ab);
  }),
  (VisuMZ['SkillsStatesCore'][_0x566724(0x233)] = Game_BattlerBase[_0x566724(0x1a1)][_0x566724(0x124)]),
  (Game_BattlerBase[_0x566724(0x1a1)][_0x566724(0x124)] = function () {
    const _0x876b9e = _0x566724;
    let _0x3d74a9 = VisuMZ[_0x876b9e(0x29c)][_0x876b9e(0x233)][_0x876b9e(0x8e)](this);
    if ($gameTemp[_0x876b9e(0x33c)]) return _0x3d74a9;
    return ($gameTemp['_checkingPassiveStates'] = !![]), this[_0x876b9e(0x184)](_0x3d74a9), ($gameTemp[_0x876b9e(0x33c)] = undefined), _0x3d74a9;
  }),
  (Game_BattlerBase[_0x566724(0x1a1)][_0x566724(0x184)] = function (_0x19bf12) {
    const _0x226dec = _0x566724,
      _0x21cdfb = this[_0x226dec(0x277)]();
    for (state of _0x21cdfb) {
      if (!state) continue;
      if (!this[_0x226dec(0x225)](state) && _0x19bf12[_0x226dec(0x1f5)](state)) continue;
      _0x19bf12['push'](state);
    }
    _0x21cdfb[_0x226dec(0x11b)] > 0x0 &&
      _0x19bf12[_0x226dec(0x1d6)]((_0x5d41e4, _0x1df555) => {
        const _0x2c60dd = _0x226dec,
          _0x115e23 = _0x5d41e4[_0x2c60dd(0x243)],
          _0x3a4edf = _0x1df555['priority'];
        if (_0x115e23 !== _0x3a4edf) return _0x3a4edf - _0x115e23;
        return _0x5d41e4 - _0x1df555;
      });
  }),
  (Game_BattlerBase[_0x566724(0x1a1)][_0x566724(0x225)] = function (_0xead588) {
    const _0x3b0e1d = _0x566724;
    return _0xead588['note'][_0x3b0e1d(0x26f)](/<PASSIVE STACKABLE>/i);
  }),
  (VisuMZ[_0x566724(0x29c)][_0x566724(0x300)] = Game_BattlerBase[_0x566724(0x1a1)][_0x566724(0x90)]),
  (Game_BattlerBase[_0x566724(0x1a1)]['traitsSet'] = function (_0x5ea91b) {
    const _0x47360a = _0x566724;
    this[_0x47360a(0x316)] = !![];
    let _0x27aae9 = VisuMZ[_0x47360a(0x29c)][_0x47360a(0x300)]['call'](this, _0x5ea91b);
    return (this[_0x47360a(0x316)] = undefined), _0x27aae9;
  }),
  (Game_BattlerBase[_0x566724(0x1a1)][_0x566724(0x2f4)] = function () {
    const _0x562821 = _0x566724;
    let _0x41ca71 = [];
    this[_0x562821(0x14c)] = this[_0x562821(0x14c)] || {};
    for (;;) {
      _0x41ca71 = [];
      let _0x17b324 = !![];
      for (const _0xb94977 of this[_0x562821(0x290)]['passiveStates']) {
        const _0x460352 = $dataStates[_0xb94977];
        if (!_0x460352) continue;
        let _0x4d3f36 = this[_0x562821(0x139)](_0x460352);
        this[_0x562821(0x14c)][_0xb94977] !== _0x4d3f36 && ((_0x17b324 = ![]), (this[_0x562821(0x14c)][_0xb94977] = _0x4d3f36));
        if (!_0x4d3f36) continue;
        _0x41ca71[_0x562821(0xb3)](_0x460352);
      }
      if (_0x17b324) break;
      else {
        if (!this[_0x562821(0x316)]) this[_0x562821(0x309)]();
        this[_0x562821(0x89)]();
      }
    }
    return _0x41ca71;
  }),
  (Game_BattlerBase[_0x566724(0x1a1)]['meetsPassiveStateConditions'] = function (_0x4420c8) {
    const _0x527c9a = _0x566724;
    if (!this[_0x527c9a(0x1af)](_0x4420c8)) return ![];
    if (!this[_0x527c9a(0x11a)](_0x4420c8)) return ![];
    if (!this['meetsPassiveStateConditionJS'](_0x4420c8)) return ![];
    if (!this[_0x527c9a(0xa3)](_0x4420c8)) return ![];
    return !![];
  }),
  (Game_BattlerBase[_0x566724(0x1a1)]['meetsPassiveStateConditionClasses'] = function (_0x541a20) {
    return !![];
  }),
  (Game_Actor[_0x566724(0x1a1)][_0x566724(0x1af)] = function (_0x316ee2) {
    const _0x7dfadd = _0x566724,
      _0x3a739c = DataManager[_0x7dfadd(0x153)](_0x316ee2);
    if (_0x3a739c[_0x7dfadd(0x1d2)]['length'] > 0x0) {
      const _0x369e18 = _0x3a739c[_0x7dfadd(0x1d2)];
      if (!_0x369e18[_0x7dfadd(0x1f5)](this[_0x7dfadd(0x1d2)]())) return ![];
    }
    if (_0x3a739c[_0x7dfadd(0x262)][_0x7dfadd(0x11b)] > 0x0) {
      const _0x2b0a91 = _0x3a739c[_0x7dfadd(0x262)];
      let _0x155a3b = [this['currentClass']()];
      Imported[_0x7dfadd(0x24e)] && this['multiclasses'] && (_0x155a3b = this[_0x7dfadd(0xad)]());
      if (_0x2b0a91['filter'](_0x5e67da => _0x155a3b[_0x7dfadd(0x1f5)](_0x5e67da))['length'] <= 0x0) return ![];
    }
    return Game_BattlerBase[_0x7dfadd(0x1a1)][_0x7dfadd(0x1af)][_0x7dfadd(0x8e)](this, _0x316ee2);
  }),
  (DataManager[_0x566724(0x153)] = function (_0x123e3c) {
    const _0x318782 = _0x566724,
      _0x1e7153 = { currentClass: [], multiClass: [] };
    if (!_0x123e3c) return _0x1e7153;
    this[_0x318782(0x20a)] = this['_cache_getPassiveStateConditionClassesData'] || {};
    if (this[_0x318782(0x20a)][_0x123e3c['id']] !== undefined) return this['_cache_getPassiveStateConditionClassesData'][_0x123e3c['id']];
    const _0xdd3e39 = _0x123e3c[_0x318782(0x26d)] || '';
    if (_0xdd3e39[_0x318782(0x26f)](/<PASSIVE CONDITION[ ](?:CLASS|CLASSES):[ ](.*)>/i)) {
      const _0x1635aa = String(RegExp['$1'])
        [_0x318782(0xc9)](',')
        [_0x318782(0x283)](_0x45641a => _0x45641a[_0x318782(0x2a8)]());
      _0x1e7153[_0x318782(0x1d2)] = VisuMZ['SkillsStatesCore'][_0x318782(0x10b)](_0x1635aa);
    }
    if (_0xdd3e39['match'](/<PASSIVE CONDITION[ ](?:MULTICLASS|MULTICLASSES):[ ](.*)>/i)) {
      const _0x7a1208 = String(RegExp['$1'])
        [_0x318782(0xc9)](',')
        [_0x318782(0x283)](_0x135703 => _0x135703[_0x318782(0x2a8)]());
      _0x1e7153[_0x318782(0x262)] = VisuMZ['SkillsStatesCore'][_0x318782(0x10b)](_0x7a1208);
    }
    return (this[_0x318782(0x20a)][_0x123e3c['id']] = _0x1e7153), this[_0x318782(0x20a)][_0x123e3c['id']];
  }),
  (VisuMZ[_0x566724(0x29c)][_0x566724(0x10b)] = function (_0x18fea7) {
    const _0x27a527 = _0x566724,
      _0x201647 = [];
    for (let _0x2876d5 of _0x18fea7) {
      _0x2876d5 = (String(_0x2876d5) || '')[_0x27a527(0x2a8)]();
      const _0x2b0873 = /^\d+$/[_0x27a527(0x18a)](_0x2876d5);
      _0x2b0873 ? _0x201647[_0x27a527(0xb3)](Number(_0x2876d5)) : _0x201647[_0x27a527(0xb3)](DataManager[_0x27a527(0x1b9)](_0x2876d5));
    }
    return _0x201647[_0x27a527(0x283)](_0x37a6b8 => $dataClasses[Number(_0x37a6b8)])[_0x27a527(0x151)](null);
  }),
  (Game_BattlerBase['prototype'][_0x566724(0x11a)] = function (_0x33aa7b) {
    const _0x3d8f8a = _0x566724,
      _0x4c897d = DataManager['getPassiveStateConditionSwitchData'](_0x33aa7b);
    if (_0x4c897d[_0x3d8f8a(0x28d)] && _0x4c897d['allSwitchOn']['length'] > 0x0) {
      const _0x1635c0 = _0x4c897d[_0x3d8f8a(0x28d)];
      for (const _0x1a9495 of _0x1635c0) {
        if (!$gameSwitches[_0x3d8f8a(0xcf)](_0x1a9495)) return ![];
      }
    }
    if (_0x4c897d['anySwitchOn'] && _0x4c897d['anySwitchOn'][_0x3d8f8a(0x11b)] > 0x0) {
      const _0x30fe29 = _0x4c897d[_0x3d8f8a(0xfb)];
      let _0x311aae = !![];
      for (const _0x478c68 of _0x30fe29) {
        if ($gameSwitches[_0x3d8f8a(0xcf)](_0x478c68)) {
          _0x311aae = ![];
          break;
        }
      }
      if (_0x311aae) return ![];
    }
    if (_0x4c897d['allSwitchOff'] && _0x4c897d[_0x3d8f8a(0x23e)][_0x3d8f8a(0x11b)] > 0x0) {
      const _0x431325 = _0x4c897d[_0x3d8f8a(0x23e)];
      for (const _0x246ee6 of _0x431325) {
        if ($gameSwitches[_0x3d8f8a(0xcf)](_0x246ee6)) return ![];
      }
    }
    if (_0x4c897d[_0x3d8f8a(0xb1)] && _0x4c897d[_0x3d8f8a(0xb1)][_0x3d8f8a(0x11b)] > 0x0) {
      const _0x1cf2c0 = _0x4c897d[_0x3d8f8a(0xb1)];
      let _0x122f96 = !![];
      for (const _0x27d357 of _0x1cf2c0) {
        if (!$gameSwitches[_0x3d8f8a(0xcf)](_0x27d357)) {
          _0x122f96 = ![];
          break;
        }
      }
      if (_0x122f96) return ![];
    }
    return !![];
  }),
  (DataManager[_0x566724(0x187)] = function (_0x1f8426) {
    const _0x153b27 = _0x566724;
    let _0x137623 = { allSwitchOn: [], anySwitchOn: [], allSwitchOff: [], anySwitchOff: [] };
    if (!_0x1f8426) return _0x137623;
    const _0x571f05 = _0x1f8426['id'];
    this[_0x153b27(0x1a7)] = this[_0x153b27(0x1a7)] || {};
    if (this[_0x153b27(0x1a7)][_0x571f05] !== undefined) return this[_0x153b27(0x1a7)][_0x571f05];
    const _0x13d006 = _0x1f8426[_0x153b27(0x26d)] || '';
    return (
      _0x13d006[_0x153b27(0x26f)](/PASSIVE CONDITION(?:| ALL)[ ](?:SWITCH|SWITCHES)[ ]ON:[ ](.*)>/i) &&
        (_0x137623[_0x153b27(0x28d)] = String(RegExp['$1'])
          ['split'](',')
          [_0x153b27(0x283)](_0x12289f => Number(_0x12289f))),
      _0x13d006[_0x153b27(0x26f)](/PASSIVE CONDITION ANY[ ](?:SWITCH|SWITCHES)[ ]ON:[ ](.*)>/i) &&
        (_0x137623['anySwitchOn'] = String(RegExp['$1'])
          [_0x153b27(0xc9)](',')
          [_0x153b27(0x283)](_0x37c3b6 => Number(_0x37c3b6))),
      _0x13d006[_0x153b27(0x26f)](/PASSIVE CONDITION(?:| ALL)[ ](?:SWITCH|SWITCHES)[ ]OFF:[ ](.*)>/i) &&
        (_0x137623[_0x153b27(0x23e)] = String(RegExp['$1'])
          [_0x153b27(0xc9)](',')
          [_0x153b27(0x283)](_0x3daca1 => Number(_0x3daca1))),
      _0x13d006['match'](/PASSIVE CONDITION ANY[ ](?:SWITCH|SWITCHES)[ ]OFF:[ ](.*)>/i) &&
        (_0x137623[_0x153b27(0xb1)] = String(RegExp['$1'])
          [_0x153b27(0xc9)](',')
          [_0x153b27(0x283)](_0x555a2e => Number(_0x555a2e))),
      (this[_0x153b27(0x1a7)][_0x571f05] = _0x137623),
      this['_cache_getPassiveStateConditionSwitchData'][_0x571f05]
    );
  }),
  (Game_BattlerBase[_0x566724(0x1a1)][_0x566724(0x1f6)] = function (_0xcc55a6) {
    const _0x3ab2db = _0x566724,
      _0x1e4777 = VisuMZ['SkillsStatesCore'][_0x3ab2db(0x1cd)];
    if (_0x1e4777[_0xcc55a6['id']] && !_0x1e4777[_0xcc55a6['id']][_0x3ab2db(0x8e)](this, _0xcc55a6)) return ![];
    return !![];
  }),
  (Game_BattlerBase[_0x566724(0x1a1)][_0x566724(0xa3)] = function (_0x3aea99) {
    const _0xc4f2b0 = _0x566724;
    return VisuMZ[_0xc4f2b0(0x29c)]['Settings'][_0xc4f2b0(0x307)]['PassiveConditionJS']['call'](this, _0x3aea99);
  }),
  (Game_BattlerBase[_0x566724(0x1a1)]['passiveStates'] = function () {
    const _0x4ecc3b = _0x566724;
    if (this[_0x4ecc3b(0xd7)](_0x4ecc3b(0x277))) return this[_0x4ecc3b(0x2f4)]();
    if (this['_checkingVisuMzPassiveStateObjects']) return [];
    return (this['_checkingVisuMzPassiveStateObjects'] = !![]), this[_0x4ecc3b(0x89)](), (this[_0x4ecc3b(0xa9)] = undefined), this[_0x4ecc3b(0x2f4)]();
  }),
  (Game_BattlerBase[_0x566724(0x1a1)][_0x566724(0x89)] = function () {
    const _0x54f5bc = _0x566724;
    (this[_0x54f5bc(0xa9)] = !![]),
      (this[_0x54f5bc(0x290)]['passiveStates'] = []),
      this['addPassiveStatesFromOtherPlugins'](),
      this[_0x54f5bc(0x1a2)](),
      this['addPassiveStatesByPluginParameters'](),
      Game_BattlerBase[_0x54f5bc(0x26e)] && this[_0x54f5bc(0x348)](),
      (this[_0x54f5bc(0x290)]['passiveStates'] = this[_0x54f5bc(0x290)][_0x54f5bc(0x277)][_0x54f5bc(0x1d6)]((_0x43ab8e, _0x2185d4) => _0x43ab8e - _0x2185d4)),
      (this[_0x54f5bc(0xa9)] = undefined);
  }),
  (Game_BattlerBase[_0x566724(0x1a1)][_0x566724(0x1d1)] = function () {
    const _0x463f53 = _0x566724;
    if (Imported[_0x463f53(0x23a)]) this[_0x463f53(0xc8)]();
  }),
  (Game_BattlerBase[_0x566724(0x1a1)][_0x566724(0x2f9)] = function () {
    return [];
  }),
  (Game_BattlerBase['prototype'][_0x566724(0x1a2)] = function () {
    const _0x1721c9 = _0x566724,
      _0x3e8b68 = this[_0x1721c9(0x290)]['passiveStates'] || [],
      _0x4351e7 = this[_0x1721c9(0x2f9)]();
    this[_0x1721c9(0x290)][_0x1721c9(0x277)] = _0x3e8b68 || [];
    for (const _0x1dd50f of _0x4351e7) {
      if (!_0x1dd50f) continue;
      const _0x273ac8 = DataManager['getPassiveStatesFromObj'](_0x1dd50f);
      for (const _0x23c87a of _0x273ac8) {
        this[_0x1721c9(0x290)][_0x1721c9(0x277)]['push'](_0x23c87a);
      }
    }
  }),
  (DataManager[_0x566724(0x2bc)] = function (_0x1b138b) {
    const _0x400354 = _0x566724;
    if (!_0x1b138b) return [];
    const _0x1eaea9 = VisuMZ[_0x400354(0x29c)][_0x400354(0xb6)](_0x1b138b, _0x400354(0x162));
    this[_0x400354(0x2ef)] = this[_0x400354(0x2ef)] || {};
    if (this['_cache_getPassiveStatesFromObj'][_0x1eaea9] !== undefined) return this[_0x400354(0x2ef)][_0x1eaea9];
    const _0x23ed75 = [],
      _0xbeb4e0 = _0x1b138b[_0x400354(0x26d)] || '',
      _0x18fc50 = /<PASSIVE (?:STATE|STATES):[ ](.*)>/gi,
      _0x481827 = _0xbeb4e0['match'](_0x18fc50);
    if (_0x481827)
      for (const _0x226a3c of _0x481827) {
        _0x226a3c['match'](_0x18fc50);
        const _0x5e6765 = String(RegExp['$1'])
          [_0x400354(0xc9)](',')
          [_0x400354(0x283)](_0x4267ea => _0x4267ea[_0x400354(0x2a8)]());
        for (const _0x1330e9 of _0x5e6765) {
          const _0x1605fa = /^\d+$/[_0x400354(0x18a)](_0x1330e9);
          let _0x469fe8 = 0x0;
          _0x1605fa ? (_0x469fe8 = Number(_0x1330e9)) : (_0x469fe8 = DataManager['getStateIdWithName'](_0x1330e9)), _0x469fe8 && _0x23ed75[_0x400354(0xb3)](_0x469fe8);
        }
      }
    return (this[_0x400354(0x2ef)][_0x1eaea9] = _0x23ed75), this[_0x400354(0x2ef)][_0x1eaea9];
  }),
  (Game_BattlerBase[_0x566724(0x1a1)][_0x566724(0x31e)] = function () {
    const _0x43a312 = _0x566724,
      _0x171d75 = VisuMZ['SkillsStatesCore'][_0x43a312(0x180)][_0x43a312(0x307)]['Global'];
    this['_cache'][_0x43a312(0x277)] = this[_0x43a312(0x290)][_0x43a312(0x277)][_0x43a312(0x248)](_0x171d75);
  }),
  (Game_BattlerBase[_0x566724(0x26e)] = ![]),
  (Scene_Boot[_0x566724(0x1a1)]['process_VisuMZ_SkillsStatesCore_CheckForAuras'] = function () {
    const _0x296578 = _0x566724,
      _0x17b1d5 = [$dataActors, $dataClasses, $dataSkills, $dataWeapons, $dataArmors, $dataEnemies];
    for (const _0x15f70b of _0x17b1d5) {
      for (const _0x453d80 of _0x15f70b) {
        if (!_0x453d80) continue;
        const _0x35606b = _0x453d80[_0x296578(0x26d)] || '';
        if (_0x35606b[_0x296578(0x26f)](/<(?:AURA|MIASMA) (?:STATE|STATES):[ ](.*)>/gi)) {
          Game_BattlerBase[_0x296578(0x26e)] = !![];
          break;
        }
      }
    }
  }),
  (Game_BattlerBase[_0x566724(0x1a1)][_0x566724(0x348)] = function () {
    const _0x146860 = _0x566724;
    if (this[_0x146860(0x22a)]()) return;
    if (!this[_0x146860(0xe8)]()) return;
    const _0x4320f9 = this[_0x146860(0x290)][_0x146860(0x277)] || [],
      _0x220adc = this,
      _0x316d1a = this[_0x146860(0x1f3)]()[_0x146860(0x234)](!![], _0x220adc),
      _0x456362 = $gameParty['inBattle']() ? this[_0x146860(0x183)]()[_0x146860(0x234)](![], _0x220adc) : [];
    (this[_0x146860(0x290)][_0x146860(0x277)] = _0x4320f9 || []),
      (this[_0x146860(0x290)]['passiveStates'] = this[_0x146860(0x290)][_0x146860(0x277)][_0x146860(0x248)](_0x316d1a)[_0x146860(0x248)](_0x456362));
  }),
  (Game_Unit[_0x566724(0x1a1)][_0x566724(0x234)] = function (_0x3518a8, _0x38facc) {
    const _0x1ab257 = _0x566724;
    let _0x42c014 = [];
    const _0x5d764f = this === $gameParty ? this['battleMembers']() : this[_0x1ab257(0x1df)]();
    for (const _0x2be485 of _0x5d764f) {
      if (!_0x2be485) continue;
      if (!_0x2be485[_0x1ab257(0xe8)]()) continue;
      const _0x4e332e = _0x2be485[_0x1ab257(0x2f9)]();
      for (const _0x25f58a of _0x4e332e) {
        if (!_0x25f58a) continue;
        if (!VisuMZ[_0x1ab257(0x29c)][_0x1ab257(0x143)](_0x25f58a, _0x3518a8, _0x2be485, _0x38facc)) continue;
        let _0x4ede37 = DataManager[_0x1ab257(0x32c)](_0x25f58a, _0x3518a8);
        for (const _0x49f74a of _0x4ede37) {
          if (!VisuMZ[_0x1ab257(0x29c)][_0x1ab257(0x27f)](_0x49f74a, _0x3518a8, _0x2be485, _0x38facc)) continue;
          _0x42c014[_0x1ab257(0xb3)](_0x49f74a), !_0x38facc[_0x1ab257(0x229)](_0x49f74a) && _0x38facc[_0x1ab257(0x339)](_0x49f74a, _0x2be485);
        }
      }
    }
    return _0x42c014;
  }),
  (DataManager[_0x566724(0x32c)] = function (_0x2afd7a, _0x5e8ffd) {
    const _0x888caa = _0x566724;
    if (!_0x2afd7a) return [];
    const _0x58240e = _0x5e8ffd ? 'auraStateIDs' : _0x888caa(0x330),
      _0x1efda2 = VisuMZ[_0x888caa(0x29c)][_0x888caa(0xb6)](_0x2afd7a, _0x58240e);
    this[_0x888caa(0xd3)] = this['_cache_getAuraPassiveStatesFromObj'] || {};
    if (this[_0x888caa(0xd3)][_0x1efda2] !== undefined) return this[_0x888caa(0xd3)][_0x1efda2];
    const _0xce86d5 = [],
      _0x2d7992 = _0x2afd7a[_0x888caa(0x26d)] || '',
      _0xdeba47 = _0x5e8ffd ? /<AURA (?:STATE|STATES):[ ](.*)>/gi : /<MIASMA (?:STATE|STATES):[ ](.*)>/gi,
      _0x1e25cd = _0x2d7992['match'](_0xdeba47);
    if (_0x1e25cd)
      for (const _0x43fc87 of _0x1e25cd) {
        _0x43fc87[_0x888caa(0x26f)](_0xdeba47);
        const _0x5bcd84 = String(RegExp['$1'])
          [_0x888caa(0xc9)](',')
          [_0x888caa(0x283)](_0x4d1a0f => _0x4d1a0f[_0x888caa(0x2a8)]());
        for (const _0x16c602 of _0x5bcd84) {
          const _0x372759 = /^\d+$/[_0x888caa(0x18a)](_0x16c602);
          let _0x22e76f = 0x0;
          _0x372759 ? (_0x22e76f = Number(_0x16c602)) : (_0x22e76f = DataManager[_0x888caa(0x2cf)](_0x16c602)), _0x22e76f && _0xce86d5[_0x888caa(0xb3)](_0x22e76f);
        }
      }
    return (this[_0x888caa(0xd3)][_0x1efda2] = _0xce86d5), this[_0x888caa(0xd3)][_0x1efda2];
  }),
  (VisuMZ[_0x566724(0x29c)][_0x566724(0x143)] = function (_0xe5c777, _0x1b9351, _0x5bf2a5, _0x423834) {
    const _0x195e7e = _0x566724;
    if (!_0xe5c777) return ![];
    if (_0xe5c777[_0x195e7e(0x160)] !== undefined && _0xe5c777[_0x195e7e(0x13c)] !== undefined) return ![];
    const _0x133b1b = _0xe5c777[_0x195e7e(0x26d)] || '';
    if (!VisuMZ[_0x195e7e(0x29c)][_0x195e7e(0x8d)](_0x133b1b, _0x1b9351, _0x5bf2a5, _0x423834)) return ![];
    return !![];
  }),
  (VisuMZ[_0x566724(0x29c)][_0x566724(0x27f)] = function (_0xa7049d, _0xd8634f, _0x17cf02, _0x3b7283) {
    const _0x3ec8c3 = _0x566724,
      _0x1facd8 = $dataStates[_0xa7049d];
    if (!_0x1facd8) return ![];
    const _0x83c27b = _0x1facd8[_0x3ec8c3(0x26d)] || '';
    if (!VisuMZ['SkillsStatesCore'][_0x3ec8c3(0x8d)](_0x83c27b, _0xd8634f, _0x17cf02, _0x3b7283)) return ![];
    return !![];
  }),
  (VisuMZ[_0x566724(0x29c)]['MeetsAuraNoteConditions'] = function (_0x2e3b6a, _0x2de3c7, _0x50ec2b, _0x19d679) {
    const _0x90cafb = _0x566724;
    _0x2e3b6a = _0x2e3b6a || '';
    if (_0x50ec2b[_0x90cafb(0x22a)]()) {
      if (_0x2de3c7 && _0x2e3b6a[_0x90cafb(0x26f)](/<ALLOW DEAD AURA>/i)) {
      } else {
        if (!_0x2de3c7 && _0x2e3b6a[_0x90cafb(0x26f)](/<ALLOW DEAD MIASMA>/i)) {
        } else {
          if (_0x2de3c7 && _0x2e3b6a[_0x90cafb(0x26f)](/<DEAD AURA ONLY>/i)) {
          } else {
            if (!_0x2de3c7 && _0x2e3b6a[_0x90cafb(0x26f)](/<DEAD MIASMA ONLY>/i)) {
            } else return ![];
          }
        }
      }
    } else {
      if (_0x2de3c7 && _0x2e3b6a[_0x90cafb(0x26f)](/<DEAD AURA ONLY>/i)) return ![];
      else {
        if (!_0x2de3c7 && _0x2e3b6a[_0x90cafb(0x26f)](/<DEAD MIASMA ONLY>/i)) return ![];
      }
    }
    if (_0x2de3c7) {
      if (_0x2e3b6a[_0x90cafb(0x26f)](/<AURA NOT FOR USER>/i)) {
        if (_0x50ec2b === _0x19d679) return ![];
      } else {
        if (_0x2e3b6a['match'](/<NOT USER AURA>/i)) {
          if (_0x50ec2b === _0x19d679) return ![];
        }
      }
    }
    return !![];
  }),
  (Game_BattlerBase['prototype'][_0x566724(0x122)] = function (_0xee1fd6) {
    const _0x2e074b = _0x566724;
    if (typeof _0xee1fd6 !== 'number') _0xee1fd6 = _0xee1fd6['id'];
    return this[_0x2e074b(0x132)][_0xee1fd6] || 0x0;
  }),
  (Game_BattlerBase[_0x566724(0x1a1)]['setStateTurns'] = function (_0x55b952, _0x2cf06b) {
    const _0x4d625b = _0x566724;
    if (typeof _0x55b952 !== _0x4d625b(0x317)) _0x55b952 = _0x55b952['id'];
    if (this['isStateAffected'](_0x55b952)) {
      const _0x139874 = DataManager[_0x4d625b(0x1be)](_0x55b952);
      this['_stateTurns'][_0x55b952] = _0x2cf06b[_0x4d625b(0x2fc)](0x0, _0x139874);
      if (this[_0x4d625b(0x132)][_0x55b952] <= 0x0) this['removeState'](_0x55b952);
    }
  }),
  (Game_BattlerBase[_0x566724(0x1a1)][_0x566724(0x1c7)] = function (_0x563ac9, _0x5a3448) {
    const _0x40623b = _0x566724;
    if (typeof _0x563ac9 !== 'number') _0x563ac9 = _0x563ac9['id'];
    this['isStateAffected'](_0x563ac9) && ((_0x5a3448 += this[_0x40623b(0x122)](_0x563ac9)), this[_0x40623b(0x131)](_0x563ac9, _0x5a3448));
  }),
  (VisuMZ[_0x566724(0x29c)][_0x566724(0x2cb)] = Game_BattlerBase[_0x566724(0x1a1)]['eraseBuff']),
  (Game_BattlerBase['prototype'][_0x566724(0x332)] = function (_0x515d22) {
    const _0x128208 = _0x566724,
      _0x3163f9 = this[_0x128208(0x2b4)][_0x515d22];
    VisuMZ['SkillsStatesCore']['Game_BattlerBase_eraseBuff'][_0x128208(0x8e)](this, _0x515d22);
    if (_0x3163f9 > 0x0) this[_0x128208(0x224)](_0x515d22);
    if (_0x3163f9 < 0x0) this[_0x128208(0x20c)](_0x515d22);
  }),
  (VisuMZ[_0x566724(0x29c)][_0x566724(0x2f5)] = Game_BattlerBase[_0x566724(0x1a1)][_0x566724(0x23f)]),
  (Game_BattlerBase[_0x566724(0x1a1)]['increaseBuff'] = function (_0x48bcce) {
    const _0x2ed818 = _0x566724;
    VisuMZ[_0x2ed818(0x29c)][_0x2ed818(0x2f5)][_0x2ed818(0x8e)](this, _0x48bcce);
    if (!this[_0x2ed818(0xf6)](_0x48bcce)) this['eraseBuff'](_0x48bcce);
  }),
  (VisuMZ[_0x566724(0x29c)][_0x566724(0xe1)] = Game_BattlerBase[_0x566724(0x1a1)]['decreaseBuff']),
  (Game_BattlerBase[_0x566724(0x1a1)]['decreaseBuff'] = function (_0x4bd312) {
    const _0x3c6cdb = _0x566724;
    VisuMZ[_0x3c6cdb(0x29c)][_0x3c6cdb(0xe1)][_0x3c6cdb(0x8e)](this, _0x4bd312);
    if (!this[_0x3c6cdb(0xf6)](_0x4bd312)) this[_0x3c6cdb(0x332)](_0x4bd312);
  }),
  (Game_BattlerBase['prototype']['onEraseBuff'] = function (_0x29638f) {}),
  (Game_BattlerBase[_0x566724(0x1a1)][_0x566724(0x20c)] = function (_0x55125e) {}),
  (Game_BattlerBase[_0x566724(0x1a1)][_0x566724(0x29e)] = function (_0x193260) {
    const _0x3a753d = _0x566724;
    return this[_0x3a753d(0x2b4)][_0x193260] === VisuMZ[_0x3a753d(0x29c)]['Settings']['Buffs'][_0x3a753d(0x20e)];
  }),
  (Game_BattlerBase[_0x566724(0x1a1)][_0x566724(0xc2)] = function (_0x57d290) {
    const _0x1f2379 = _0x566724;
    return this['_buffs'][_0x57d290] === -VisuMZ['SkillsStatesCore'][_0x1f2379(0x180)][_0x1f2379(0x19a)][_0x1f2379(0xef)];
  }),
  (VisuMZ[_0x566724(0x29c)][_0x566724(0x327)] = Game_BattlerBase['prototype']['buffIconIndex']),
  (Game_BattlerBase[_0x566724(0x1a1)][_0x566724(0xe2)] = function (_0x564064, _0x1e5756) {
    const _0x39ba26 = _0x566724;
    return (_0x564064 = _0x564064[_0x39ba26(0x2fc)](-0x2, 0x2)), VisuMZ['SkillsStatesCore'][_0x39ba26(0x327)]['call'](this, _0x564064, _0x1e5756);
  }),
  (Game_BattlerBase['prototype'][_0x566724(0x301)] = function (_0x150482) {
    const _0xee7af8 = _0x566724,
      _0x88bac1 = this[_0xee7af8(0x2b4)][_0x150482];
    return VisuMZ[_0xee7af8(0x29c)][_0xee7af8(0x180)][_0xee7af8(0x19a)][_0xee7af8(0x9e)][_0xee7af8(0x8e)](this, _0x150482, _0x88bac1);
  }),
  (Game_BattlerBase['prototype'][_0x566724(0x2c0)] = function (_0x9cbfdf) {
    const _0x39323d = _0x566724;
    return this[_0x39323d(0x2d2)][_0x9cbfdf] || 0x0;
  }),
  (Game_BattlerBase[_0x566724(0x1a1)]['debuffTurns'] = function (_0x28ea07) {
    const _0x2c541f = _0x566724;
    return this[_0x2c541f(0x2c0)](_0x28ea07);
  }),
  (Game_BattlerBase[_0x566724(0x1a1)][_0x566724(0x1f2)] = function (_0xe52141, _0x3379b2) {
    const _0x5b7e1d = _0x566724;
    if (this['isBuffAffected'](_0xe52141)) {
      const _0x3d8a71 = VisuMZ[_0x5b7e1d(0x29c)]['Settings']['Buffs'][_0x5b7e1d(0x104)];
      this[_0x5b7e1d(0x2d2)][_0xe52141] = _0x3379b2['clamp'](0x0, _0x3d8a71);
    }
  }),
  (Game_BattlerBase[_0x566724(0x1a1)][_0x566724(0x2eb)] = function (_0x5aac33, _0x249c6) {
    const _0x51229e = _0x566724;
    this[_0x51229e(0x1ff)](_0x5aac33) && ((_0x249c6 += this[_0x51229e(0x2c0)](stateId)), this[_0x51229e(0x1f2)](_0x5aac33, _0x249c6));
  }),
  (Game_BattlerBase[_0x566724(0x1a1)][_0x566724(0x268)] = function (_0x1ee9f9, _0xe9ee86) {
    const _0x58de97 = _0x566724;
    if (this[_0x58de97(0x30c)](_0x1ee9f9)) {
      const _0x4a84f4 = VisuMZ[_0x58de97(0x29c)][_0x58de97(0x180)]['Buffs'][_0x58de97(0x104)];
      this[_0x58de97(0x2d2)][_0x1ee9f9] = _0xe9ee86[_0x58de97(0x2fc)](0x0, _0x4a84f4);
    }
  }),
  (Game_BattlerBase[_0x566724(0x1a1)][_0x566724(0xd9)] = function (_0x1886f5, _0x501e9b) {
    const _0xa6ced6 = _0x566724;
    this['isDebuffAffected'](_0x1886f5) && ((_0x501e9b += this[_0xa6ced6(0x2c0)](stateId)), this[_0xa6ced6(0x268)](_0x1886f5, _0x501e9b));
  }),
  (Game_BattlerBase['prototype'][_0x566724(0x334)] = function (_0x5a9729) {
    const _0x5ece58 = _0x566724;
    if (typeof _0x5a9729 !== _0x5ece58(0x317)) _0x5a9729 = _0x5a9729['id'];
    return (this[_0x5ece58(0xb5)] = this[_0x5ece58(0xb5)] || {}), (this[_0x5ece58(0xb5)][_0x5a9729] = this[_0x5ece58(0xb5)][_0x5a9729] || {}), this[_0x5ece58(0xb5)][_0x5a9729];
  }),
  (Game_BattlerBase[_0x566724(0x1a1)][_0x566724(0x22e)] = function (_0x265751, _0x4853dc) {
    const _0x1af1d7 = _0x566724;
    if (typeof _0x265751 !== 'number') _0x265751 = _0x265751['id'];
    const _0x553c1f = this[_0x1af1d7(0x334)](_0x265751);
    return _0x553c1f[_0x4853dc];
  }),
  (Game_BattlerBase[_0x566724(0x1a1)][_0x566724(0xb4)] = function (_0x1f272d, _0x1b3154, _0x15d131) {
    const _0x36088a = _0x566724;
    if (typeof _0x1f272d !== _0x36088a(0x317)) _0x1f272d = _0x1f272d['id'];
    const _0x1fba3e = this['stateData'](_0x1f272d);
    _0x1fba3e[_0x1b3154] = _0x15d131;
  }),
  (Game_BattlerBase['prototype'][_0x566724(0x2a1)] = function (_0x489fcf) {
    const _0xf15e11 = _0x566724;
    if (typeof _0x489fcf !== _0xf15e11(0x317)) _0x489fcf = _0x489fcf['id'];
    (this['_stateData'] = this[_0xf15e11(0xb5)] || {}), (this[_0xf15e11(0xb5)][_0x489fcf] = {});
  }),
  (Game_BattlerBase['prototype'][_0x566724(0x15b)] = function (_0x21020e) {
    const _0x344726 = _0x566724;
    if (typeof _0x21020e !== _0x344726(0x317)) _0x21020e = _0x21020e['id'];
    return (this[_0x344726(0x1f9)] = this[_0x344726(0x1f9)] || {}), this[_0x344726(0x1f9)][_0x21020e] === undefined && (this[_0x344726(0x1f9)][_0x21020e] = ''), this[_0x344726(0x1f9)][_0x21020e];
  }),
  (Game_BattlerBase[_0x566724(0x1a1)][_0x566724(0xb8)] = function (_0x1813c2, _0x3fcbb2) {
    const _0x4a470f = _0x566724;
    if (typeof _0x1813c2 !== _0x4a470f(0x317)) _0x1813c2 = _0x1813c2['id'];
    (this['_stateDisplay'] = this['_stateDisplay'] || {}), (this['_stateDisplay'][_0x1813c2] = _0x3fcbb2);
  }),
  (Game_BattlerBase['prototype'][_0x566724(0x1d0)] = function (_0x2bdbc2) {
    const _0xe0a532 = _0x566724;
    if (typeof _0x2bdbc2 !== 'number') _0x2bdbc2 = _0x2bdbc2['id'];
    (this[_0xe0a532(0x1f9)] = this[_0xe0a532(0x1f9)] || {}), (this[_0xe0a532(0x1f9)][_0x2bdbc2] = '');
  }),
  (Game_BattlerBase[_0x566724(0x1a1)][_0x566724(0x340)] = function (_0x139bd0) {
    const _0xe19b7 = _0x566724;
    if (typeof _0x139bd0 !== _0xe19b7(0x317)) _0x139bd0 = _0x139bd0['id'];
    (this[_0xe19b7(0xd0)] = this['_stateOrigin'] || {}), (this['_stateOrigin'][_0x139bd0] = this[_0xe19b7(0xd0)][_0x139bd0] || _0xe19b7(0x14a));
    const _0x14e881 = this[_0xe19b7(0xd0)][_0x139bd0];
    return this[_0xe19b7(0x17d)](_0x14e881);
  }),
  (Game_BattlerBase[_0x566724(0x1a1)][_0x566724(0x339)] = function (_0x1aa563, _0xb86f08) {
    const _0x471718 = _0x566724;
    this[_0x471718(0xd0)] = this[_0x471718(0xd0)] || {};
    const _0x465b7d = _0xb86f08 ? this[_0x471718(0x1bd)](_0xb86f08) : this['getCurrentStateOriginKey']();
    this[_0x471718(0xd0)][_0x1aa563] = _0x465b7d;
  }),
  (Game_BattlerBase['prototype']['clearStateOrigin'] = function (_0x203a51) {
    const _0x5ad1e8 = _0x566724;
    (this[_0x5ad1e8(0xd0)] = this[_0x5ad1e8(0xd0)] || {}), delete this[_0x5ad1e8(0xd0)][_0x203a51];
  }),
  (Game_BattlerBase[_0x566724(0x1a1)][_0x566724(0x336)] = function () {
    this['_stateOrigin'] = {};
  }),
  (Game_BattlerBase[_0x566724(0x1a1)][_0x566724(0x33b)] = function () {
    const _0x3290ae = _0x566724,
      _0x656796 = this[_0x3290ae(0x97)]();
    return this[_0x3290ae(0x1bd)](_0x656796);
  }),
  (Game_BattlerBase[_0x566724(0x1a1)]['getCurrentStateActiveUser'] = function () {
    const _0x5ec26f = _0x566724;
    if ($gameParty[_0x5ec26f(0x85)]()) {
      if (BattleManager[_0x5ec26f(0x144)]) return BattleManager['_subject'];
      else {
        if (BattleManager[_0x5ec26f(0x247)]) return BattleManager[_0x5ec26f(0x247)];
      }
    } else {
      const _0x52fe7b = SceneManager[_0x5ec26f(0x2a9)];
      if (![Scene_Map, Scene_Item][_0x5ec26f(0x1f5)](_0x52fe7b[_0x5ec26f(0x1e2)])) return $gameParty[_0x5ec26f(0x26c)]();
    }
    return this;
  }),
  (Game_BattlerBase[_0x566724(0x1a1)][_0x566724(0x1bd)] = function (_0x14ad35) {
    const _0x21bb65 = _0x566724;
    if (!_0x14ad35) return _0x21bb65(0x14a);
    if (_0x14ad35['isActor']()) return _0x21bb65(0x2e7)['format'](_0x14ad35['actorId']());
    else {
      const _0x42b147 = _0x21bb65(0x1e7)[_0x21bb65(0x109)](_0x14ad35[_0x21bb65(0x2fe)]()),
        _0x5ac6f8 = _0x21bb65(0x287)[_0x21bb65(0x109)](_0x14ad35[_0x21bb65(0x29a)]()),
        _0x5664ee = _0x21bb65(0x182)[_0x21bb65(0x109)]($gameTroop[_0x21bb65(0x14d)]());
      return _0x21bb65(0x197)[_0x21bb65(0x109)](_0x42b147, _0x5ac6f8, _0x5664ee);
    }
    return 'user';
  }),
  (Game_BattlerBase['prototype']['getStateOriginByKey'] = function (_0x58c324) {
    const _0x3af7a9 = _0x566724;
    if (_0x58c324 === 'user') return this;
    else {
      if (_0x58c324['match'](/<actor-(\d+)>/i)) return $gameActors['actor'](Number(RegExp['$1']));
      else {
        if ($gameParty['inBattle']() && _0x58c324[_0x3af7a9(0x26f)](/<troop-(\d+)>/i)) {
          const _0x1bf788 = Number(RegExp['$1']);
          if (_0x1bf788 === $gameTroop[_0x3af7a9(0x14d)]()) {
            if (_0x58c324['match'](/<member-(\d+)>/i)) return $gameTroop[_0x3af7a9(0x1df)]()[Number(RegExp['$1'])];
          }
        }
        if (_0x58c324['match'](/<enemy-(\d+)>/i)) return new Game_Enemy(Number(RegExp['$1']), -0x1f4, -0x1f4);
      }
    }
    return this;
  }),
  (VisuMZ['SkillsStatesCore'][_0x566724(0x2e4)] = Game_Battler[_0x566724(0x1a1)][_0x566724(0x11f)]),
  (Game_Battler[_0x566724(0x1a1)]['addState'] = function (_0x24ca14) {
    const _0x190673 = _0x566724,
      _0xf95abc = this[_0x190673(0xfd)](_0x24ca14);
    VisuMZ[_0x190673(0x29c)]['Game_Battler_addState'][_0x190673(0x8e)](this, _0x24ca14);
    if (_0xf95abc && this[_0x190673(0x1c8)]($dataStates[_0x24ca14])) {
      this[_0x190673(0x313)](_0x24ca14);
    }
  }),
  (VisuMZ['SkillsStatesCore'][_0x566724(0xbd)] = Game_Battler[_0x566724(0x1a1)][_0x566724(0xfd)]),
  (Game_Battler[_0x566724(0x1a1)][_0x566724(0xfd)] = function (_0x330d53) {
    const _0x46c018 = _0x566724,
      _0x12ef51 = $dataStates[_0x330d53];
    if (_0x12ef51 && _0x12ef51[_0x46c018(0x26d)]['match'](/<NO DEATH CLEAR>/i))
      return !this[_0x46c018(0x21a)](_0x330d53) && !this[_0x46c018(0x215)](_0x330d53) && !this[_0x46c018(0x98)][_0x46c018(0x94)](_0x330d53);
    return VisuMZ[_0x46c018(0x29c)][_0x46c018(0xbd)]['call'](this, _0x330d53);
  }),
  (Game_Battler['prototype'][_0x566724(0x313)] = function (_0x5dac54) {
    const _0x127c3a = _0x566724;
    this['setStateOrigin'](_0x5dac54), this[_0x127c3a(0x113)](_0x5dac54), this['onAddStateMakeCustomSlipValues'](_0x5dac54), this[_0x127c3a(0x12a)](_0x5dac54), this['onAddStateGlobalJS'](_0x5dac54);
  }),
  (Game_Battler[_0x566724(0x1a1)]['onRemoveState'] = function (_0x5240f2) {
    const _0x914249 = _0x566724;
    this[_0x914249(0x175)](_0x5240f2), this[_0x914249(0x312)](_0x5240f2), Game_BattlerBase[_0x914249(0x1a1)][_0x914249(0x149)][_0x914249(0x8e)](this, _0x5240f2);
  }),
  (Game_Battler[_0x566724(0x1a1)][_0x566724(0x2dd)] = function (_0xbf990f) {
    const _0x5e2150 = _0x566724;
    for (const _0x20a4e1 of this['states']()) {
      this[_0x5e2150(0x282)](_0x20a4e1['id']) &&
        _0x20a4e1[_0x5e2150(0x160)] === _0xbf990f &&
        (this[_0x5e2150(0x275)](_0x20a4e1['id']), this[_0x5e2150(0x133)](_0x20a4e1['id']), this[_0x5e2150(0x2e1)](_0x20a4e1['id']));
    }
  }),
  (Game_Battler[_0x566724(0x1a1)][_0x566724(0x133)] = function (_0x437ae9) {
    const _0xda9d7 = _0x566724;
    this[_0xda9d7(0x1a0)](_0x437ae9);
  }),
  (Game_Battler[_0x566724(0x1a1)][_0x566724(0x12a)] = function (_0x587745) {
    const _0x39576f = _0x566724;
    if (this[_0x39576f(0xf3)] || this[_0x39576f(0x190)]) return;
    const _0x2a140b = VisuMZ[_0x39576f(0x29c)][_0x39576f(0x126)];
    if (_0x2a140b[_0x587745]) _0x2a140b[_0x587745][_0x39576f(0x8e)](this, _0x587745);
  }),
  (Game_Battler[_0x566724(0x1a1)][_0x566724(0x175)] = function (_0x406276) {
    const _0x56d057 = _0x566724;
    if (this[_0x56d057(0xf3)] || this[_0x56d057(0x190)]) return;
    const _0x333fdc = VisuMZ[_0x56d057(0x29c)][_0x56d057(0xa5)];
    if (_0x333fdc[_0x406276]) _0x333fdc[_0x406276][_0x56d057(0x8e)](this, _0x406276);
  }),
  (Game_Battler['prototype'][_0x566724(0x1a0)] = function (_0xba5773) {
    const _0x25354a = _0x566724;
    if (this['_tempActor'] || this[_0x25354a(0x190)]) return;
    const _0x50660f = VisuMZ['SkillsStatesCore'][_0x25354a(0x9a)];
    if (_0x50660f[_0xba5773]) _0x50660f[_0xba5773][_0x25354a(0x8e)](this, _0xba5773);
  }),
  (Game_Battler[_0x566724(0x1a1)]['onAddStateGlobalJS'] = function (_0x3a457f) {
    const _0x211a5b = _0x566724;
    if (this[_0x211a5b(0xf3)] || this[_0x211a5b(0x190)]) return;
    try {
      VisuMZ['SkillsStatesCore']['Settings'][_0x211a5b(0x214)]['onAddStateJS'][_0x211a5b(0x8e)](this, _0x3a457f);
    } catch (_0x1c4d8e) {
      if ($gameTemp[_0x211a5b(0xe4)]()) console[_0x211a5b(0x264)](_0x1c4d8e);
    }
  }),
  (Game_Battler[_0x566724(0x1a1)]['onEraseStateGlobalJS'] = function (_0x467b2e) {
    const _0x11cd04 = _0x566724;
    if (this['_tempActor'] || this[_0x11cd04(0x190)]) return;
    try {
      VisuMZ['SkillsStatesCore'][_0x11cd04(0x180)][_0x11cd04(0x214)][_0x11cd04(0x15c)][_0x11cd04(0x8e)](this, _0x467b2e);
    } catch (_0x5d0092) {
      if ($gameTemp[_0x11cd04(0xe4)]()) console[_0x11cd04(0x264)](_0x5d0092);
    }
  }),
  (Game_Battler[_0x566724(0x1a1)][_0x566724(0x2e1)] = function (_0x1d213f) {
    const _0x5dd177 = _0x566724;
    if (this[_0x5dd177(0xf3)] || this[_0x5dd177(0x190)]) return;
    try {
      VisuMZ[_0x5dd177(0x29c)][_0x5dd177(0x180)][_0x5dd177(0x214)][_0x5dd177(0x172)][_0x5dd177(0x8e)](this, _0x1d213f);
    } catch (_0x44e498) {
      if ($gameTemp[_0x5dd177(0xe4)]()) console[_0x5dd177(0x264)](_0x44e498);
    }
  }),
  (Game_Battler[_0x566724(0x1a1)][_0x566724(0x235)] = function (_0x1121a9) {
    const _0x437541 = _0x566724;
    return (_0x1121a9 = _0x1121a9['toUpperCase']()[_0x437541(0x2a8)]()), this[_0x437541(0x124)]()['filter'](_0x10302d => _0x10302d[_0x437541(0x8a)][_0x437541(0x1f5)](_0x1121a9));
  }),
  (Game_Battler[_0x566724(0x1a1)][_0x566724(0x106)] = function (_0x706e9f, _0x4bf9db) {
    const _0x5df179 = _0x566724;
    (_0x706e9f = _0x706e9f['toUpperCase']()['trim']()), (_0x4bf9db = _0x4bf9db || 0x0);
    const _0x5060d0 = this[_0x5df179(0x235)](_0x706e9f),
      _0x29ee1 = [];
    for (const _0x4011e1 of _0x5060d0) {
      if (!_0x4011e1) continue;
      if (_0x4bf9db <= 0x0) break;
      _0x29ee1[_0x5df179(0xb3)](_0x4011e1['id']), (this['_result'][_0x5df179(0x2ad)] = !![]), _0x4bf9db--;
    }
    while (_0x29ee1[_0x5df179(0x11b)] > 0x0) {
      this[_0x5df179(0x275)](_0x29ee1['shift']());
    }
  }),
  (Game_Battler[_0x566724(0x1a1)][_0x566724(0x136)] = function (_0xfb9b06, _0x2a23d2) {
    const _0xb59d44 = _0x566724;
    (_0xfb9b06 = _0xfb9b06[_0xb59d44(0xaf)]()['trim']()), (_0x2a23d2 = _0x2a23d2 || []);
    const _0x33afef = this[_0xb59d44(0x235)](_0xfb9b06),
      _0x6d71fe = [];
    for (const _0x556a7f of _0x33afef) {
      if (!_0x556a7f) continue;
      if (_0x2a23d2[_0xb59d44(0x1f5)](_0x556a7f)) continue;
      _0x6d71fe[_0xb59d44(0xb3)](_0x556a7f['id']), (this['_result'][_0xb59d44(0x2ad)] = !![]);
    }
    while (_0x6d71fe[_0xb59d44(0x11b)] > 0x0) {
      this['removeState'](_0x6d71fe[_0xb59d44(0x241)]());
    }
  }),
  (Game_Battler[_0x566724(0x1a1)][_0x566724(0x257)] = function (_0x4c6100) {
    return this['totalStateCategoryAffected'](_0x4c6100) > 0x0;
  }),
  (Game_Battler[_0x566724(0x1a1)][_0x566724(0x1f0)] = function (_0x1bb9b6) {
    const _0x39258b = _0x566724;
    return this[_0x39258b(0x9d)](_0x1bb9b6) > 0x0;
  }),
  (Game_Battler[_0x566724(0x1a1)]['totalStateCategoryAffected'] = function (_0x3faa34) {
    const _0x2c3251 = _0x566724,
      _0xecf35b = this[_0x2c3251(0x235)](_0x3faa34)[_0x2c3251(0x1dc)](_0x2b3cd5 => this[_0x2c3251(0x229)](_0x2b3cd5['id']));
    return _0xecf35b['length'];
  }),
  (Game_Battler['prototype'][_0x566724(0x9d)] = function (_0xa0b60d) {
    const _0x3f99b3 = this['statesByCategory'](_0xa0b60d);
    return _0x3f99b3['length'];
  }),
  (VisuMZ[_0x566724(0x29c)][_0x566724(0x1c4)] = Game_BattlerBase[_0x566724(0x1a1)][_0x566724(0x21a)]),
  (Game_BattlerBase[_0x566724(0x1a1)][_0x566724(0x21a)] = function (_0x180d2e) {
    const _0xe91fc7 = _0x566724,
      _0x5c443b = $dataStates[_0x180d2e];
    if (_0x5c443b && _0x5c443b[_0xe91fc7(0x8a)][_0xe91fc7(0x11b)] > 0x0)
      for (const _0x1312a4 of _0x5c443b[_0xe91fc7(0x8a)]) {
        if (this['isStateCategoryResisted'](_0x1312a4)) return !![];
      }
    return VisuMZ[_0xe91fc7(0x29c)][_0xe91fc7(0x1c4)]['call'](this, _0x180d2e);
  }),
  (Game_BattlerBase['prototype'][_0x566724(0x19c)] = function (_0x1a9f7a) {
    const _0x2dd400 = _0x566724;
    let _0x10177e = _0x2dd400(0x2d0);
    if (this[_0x2dd400(0xd7)](_0x10177e)) return this[_0x2dd400(0x290)][_0x10177e][_0x2dd400(0x1f5)](_0x1a9f7a);
    return (this[_0x2dd400(0x290)][_0x10177e] = this[_0x2dd400(0x154)]()), this[_0x2dd400(0x290)][_0x10177e]['includes'](_0x1a9f7a);
  }),
  (Game_BattlerBase[_0x566724(0x1a1)][_0x566724(0x154)] = function () {
    const _0x57421e = _0x566724,
      _0x1f7f61 = /<RESIST STATE (?:CATEGORY|CATEGORIES):[ ](.*)>/gi,
      _0x303b1d = /<RESIST STATE (?:CATEGORY|CATEGORIES)>\s*([\s\S]*)\s*<\/RESIST STATE (?:CATEGORY|CATEGORIES)>/i;
    let _0x163d0b = [];
    for (const _0xbb86cb of this[_0x57421e(0x15f)]()) {
      if (!_0xbb86cb) continue;
      const _0x319b47 = _0xbb86cb[_0x57421e(0x26d)],
        _0x409069 = _0x319b47[_0x57421e(0x26f)](_0x1f7f61);
      if (_0x409069)
        for (const _0x2837f7 of _0x409069) {
          _0x2837f7[_0x57421e(0x26f)](_0x1f7f61);
          const _0x3f460c = String(RegExp['$1'])
            [_0x57421e(0xc9)](',')
            ['map'](_0x3527c2 => String(_0x3527c2)[_0x57421e(0xaf)]()[_0x57421e(0x2a8)]());
          _0x163d0b = _0x163d0b[_0x57421e(0x248)](_0x3f460c);
        }
      if (_0x319b47[_0x57421e(0x26f)](_0x303b1d)) {
        const _0x4d2d6e = String(RegExp['$1'])
          [_0x57421e(0xc9)](/[\r\n]+/)
          [_0x57421e(0x283)](_0x2cb493 => String(_0x2cb493)['toUpperCase']()[_0x57421e(0x2a8)]());
        _0x163d0b = _0x163d0b[_0x57421e(0x248)](_0x4d2d6e);
      }
    }
    return _0x163d0b;
  }),
  (Game_BattlerBase['prototype'][_0x566724(0x113)] = function (_0x181d17) {
    const _0x52f6c9 = _0x566724,
      _0x56f137 = $dataStates[_0x181d17];
    if (!_0x56f137) return;
    const _0x1f8e4f = _0x56f137[_0x52f6c9(0x26d)] || '',
      _0x41802c = _0x1f8e4f['match'](/<REMOVE OTHER (.*) STATES>/gi);
    if (_0x41802c) {
      const _0xa68ff5 = [_0x56f137];
      for (const _0x62e09d of _0x41802c) {
        _0x62e09d[_0x52f6c9(0x26f)](/<REMOVE OTHER (.*) STATES>/i);
        const _0x3add30 = String(RegExp['$1']);
        this[_0x52f6c9(0x136)](_0x3add30, _0xa68ff5);
      }
    }
  }),
  (Game_Battler[_0x566724(0x1a1)][_0x566724(0x1e3)] = function () {
    const _0x117085 = _0x566724;
    for (const _0x270f1a of this[_0x117085(0x124)]()) {
      if (!_0x270f1a) continue;
      if (!this['isStateAffected'](_0x270f1a['id'])) continue;
      if (!_0x270f1a[_0x117085(0x344)]) continue;
      if (this[_0x117085(0x27a)](_0x270f1a)) continue;
      Math['randomInt'](0x64) < _0x270f1a['chanceByDamage'] && this[_0x117085(0x275)](_0x270f1a['id']);
    }
  }),
  (VisuMZ[_0x566724(0x29c)][_0x566724(0x12b)] = Game_Action[_0x566724(0x1a1)][_0x566724(0x1a4)]),
  (Game_Action[_0x566724(0x1a1)][_0x566724(0x1a4)] = function (_0x22b6fd, _0x14ab3a) {
    const _0x380c27 = _0x566724;
    ($gameTemp['_bypassRemoveStateDamage_action'] = this[_0x380c27(0x2cd)]()),
      ($gameTemp[_0x380c27(0xb7)] = this[_0x380c27(0x1f8)]()),
      ($gameTemp[_0x380c27(0x318)] = _0x14ab3a),
      VisuMZ[_0x380c27(0x29c)][_0x380c27(0x12b)][_0x380c27(0x8e)](this, _0x22b6fd, _0x14ab3a),
      ($gameTemp[_0x380c27(0x114)] = undefined),
      ($gameTemp['_bypassRemoveStateDamage_user'] = undefined),
      ($gameTemp['_bypassRemoveStateDamage_value'] = undefined);
  }),
  (Game_Battler[_0x566724(0x1a1)]['bypassRemoveStatesByDamage'] = function (_0x127077) {
    const _0x3b84ba = _0x566724;
    if ($gameTemp[_0x3b84ba(0x114)]) {
      const _0x30a06a = $gameTemp[_0x3b84ba(0x114)],
        _0xc5c840 = /<BYPASS STATE DAMAGE REMOVAL:[ ](.*)>/gi;
      if (DataManager[_0x3b84ba(0x1b4)](_0x127077, _0x30a06a, _0xc5c840, _0x3b84ba(0x31a))) return !![];
    }
    if ($gameTemp['_bypassRemoveStateDamage_user']) {
      const _0x544143 = $gameTemp['_bypassRemoveStateDamage_user'];
      if (_0x544143[_0x3b84ba(0x217)](_0x127077)) return !![];
    }
    if (this[_0x3b84ba(0xc5)](_0x127077)) return !![];
    return ![];
  }),
  (Game_Battler[_0x566724(0x1a1)][_0x566724(0x217)] = function (_0x4ecc36) {
    const _0x443c4e = _0x566724,
      _0x184b07 = /<BYPASS STATE DAMAGE REMOVAL AS (?:ATTACKER|USER):[ ](.*)>/gi;
    for (const _0x2b43c4 of this['traitObjects']()) {
      if (!_0x2b43c4) continue;
      if (DataManager[_0x443c4e(0x1b4)](_0x4ecc36, _0x2b43c4, _0x184b07, _0x443c4e(0x195))) return !![];
    }
    return ![];
  }),
  (Game_Battler[_0x566724(0x1a1)][_0x566724(0xc5)] = function (_0xbb115) {
    const _0x588580 = _0x566724,
      _0xf4982e = /<BYPASS STATE DAMAGE REMOVAL AS (?:TARGET|VICTIM):[ ](.*)>/gi;
    for (const _0x4e4e77 of this[_0x588580(0x15f)]()) {
      if (!_0x4e4e77) continue;
      if (DataManager[_0x588580(0x1b4)](_0xbb115, _0x4e4e77, _0xf4982e, _0x588580(0x304))) return !![];
    }
    return ![];
  }),
  (DataManager['CheckBypassRemoveStatesByDamage'] = function (_0x98507c, _0x2e7591, _0xe0b0e, _0x4159af) {
    const _0x12d585 = _0x566724,
      _0x137090 = _0x12d585(0x199)[_0x12d585(0x109)](_0x2e7591[_0x12d585(0x1b1)], _0x2e7591['id'], _0x4159af);
    this[_0x12d585(0x101)] = this[_0x12d585(0x101)] || {};
    if (this[_0x12d585(0x101)][_0x137090] !== undefined) return this[_0x12d585(0x101)][_0x137090][_0x12d585(0x1f5)](_0x98507c['id']);
    const _0x96b8dd = [],
      _0x2481c3 = _0x2e7591[_0x12d585(0x26d)][_0x12d585(0x26f)](_0xe0b0e);
    if (_0x2481c3)
      for (const _0x533e57 of _0x2481c3) {
        _0x533e57[_0x12d585(0x26f)](_0xe0b0e);
        const _0xb913e9 = String(RegExp['$1'])
          ['split'](',')
          [_0x12d585(0x283)](_0x188f38 => _0x188f38['trim']());
        for (let _0x2ff8ba of _0xb913e9) {
          _0x2ff8ba = (String(_0x2ff8ba) || '')[_0x12d585(0x2a8)]();
          if (_0x2ff8ba['match'](/(\d+)[ ](?:THROUGH|to)[ ](\d+)/i)) {
            const _0x26925f = Math[_0x12d585(0x219)](Number(RegExp['$1']), Number(RegExp['$2'])),
              _0x3282b5 = Math['max'](Number(RegExp['$1']), Number(RegExp['$2']));
            for (let _0x249855 = _0x26925f; _0x249855 <= _0x3282b5; _0x249855++) elements[_0x12d585(0xb3)](_0x249855);
            continue;
          }
          const _0xa258bb = /^\d+$/['test'](_0x2ff8ba);
          _0xa258bb ? (entryID = Number(_0x2ff8ba)) : (entryID = DataManager[_0x12d585(0x2cf)](_0x2ff8ba)), entryID && _0x96b8dd[_0x12d585(0xb3)](entryID);
        }
      }
    return (this[_0x12d585(0x101)][_0x137090] = _0x96b8dd), this[_0x12d585(0x101)][_0x137090][_0x12d585(0x1f5)](_0x98507c['id']);
  }),
  (VisuMZ[_0x566724(0x29c)][_0x566724(0x326)] = Game_Battler[_0x566724(0x1a1)]['addBuff']),
  (Game_Battler[_0x566724(0x1a1)]['addBuff'] = function (_0x3a50c3, _0x15c6bd) {
    const _0x4eba0b = _0x566724;
    VisuMZ[_0x4eba0b(0x29c)][_0x4eba0b(0x326)]['call'](this, _0x3a50c3, _0x15c6bd), this['isBuffAffected'](_0x3a50c3) && this['onAddBuff'](_0x3a50c3, _0x15c6bd);
  }),
  (Game_Battler[_0x566724(0x1a1)][_0x566724(0x1bb)] = function (_0xebd56) {}),
  (VisuMZ['SkillsStatesCore']['Game_Battler_addDebuff'] = Game_Battler[_0x566724(0x1a1)]['addDebuff']),
  (Game_Battler[_0x566724(0x1a1)][_0x566724(0x25b)] = function (_0x28c859, _0x1b00e8) {
    const _0x531455 = _0x566724;
    VisuMZ[_0x531455(0x29c)]['Game_Battler_addDebuff']['call'](this, _0x28c859, _0x1b00e8), this[_0x531455(0x30c)](_0x28c859) && this[_0x531455(0x112)](_0x28c859, _0x1b00e8);
  }),
  (Game_Battler[_0x566724(0x1a1)][_0x566724(0x188)] = function () {
    const _0x5635c7 = _0x566724;
    for (let _0x2a006f = 0x0; _0x2a006f < this[_0x5635c7(0x30d)](); _0x2a006f++) {
      if (this[_0x5635c7(0x349)](_0x2a006f)) {
        const _0x5b6495 = this[_0x5635c7(0x2b4)][_0x2a006f];
        this[_0x5635c7(0x328)](_0x2a006f);
        if (_0x5b6495 > 0x0) this[_0x5635c7(0x99)](_0x2a006f);
        if (_0x5b6495 < 0x0) this[_0x5635c7(0x10d)](_0x2a006f);
      }
    }
  }),
  (Game_Battler[_0x566724(0x1a1)]['onAddBuff'] = function (_0xce0b92, _0x1a7975) {
    this['onAddBuffGlobalJS'](_0xce0b92, _0x1a7975);
  }),
  (Game_Battler['prototype'][_0x566724(0x112)] = function (_0x5e8c08, _0x2570f5) {
    const _0x2af675 = _0x566724;
    this[_0x2af675(0xd2)](_0x5e8c08, _0x2570f5);
  }),
  (Game_Battler[_0x566724(0x1a1)][_0x566724(0x224)] = function (_0x178e6e) {
    const _0x4d6f31 = _0x566724;
    Game_BattlerBase[_0x4d6f31(0x1a1)][_0x4d6f31(0x224)]['call'](this, _0x178e6e), this[_0x4d6f31(0x308)](_0x178e6e);
  }),
  (Game_Battler['prototype'][_0x566724(0x20c)] = function (_0x38f661) {
    const _0x35396a = _0x566724;
    Game_BattlerBase[_0x35396a(0x1a1)][_0x35396a(0x20c)][_0x35396a(0x8e)](this, _0x38f661), this['onEraseDebuffGlobalJS'](_0x38f661);
  }),
  (Game_Battler[_0x566724(0x1a1)][_0x566724(0x99)] = function (_0x13eae2) {
    const _0x411624 = _0x566724;
    this[_0x411624(0x22f)](_0x13eae2);
  }),
  (Game_Battler[_0x566724(0x1a1)][_0x566724(0x10d)] = function (_0x492c72) {
    const _0x2fbf35 = _0x566724;
    this[_0x2fbf35(0x1b5)](_0x492c72);
  }),
  (Game_Battler[_0x566724(0x1a1)]['onAddBuffGlobalJS'] = function (_0x100238, _0x1a5a06) {
    const _0x19598a = _0x566724;
    VisuMZ[_0x19598a(0x29c)][_0x19598a(0x180)][_0x19598a(0x19a)][_0x19598a(0x102)]['call'](this, _0x100238, _0x1a5a06);
  }),
  (Game_Battler[_0x566724(0x1a1)][_0x566724(0xd2)] = function (_0x175169, _0x3c7933) {
    const _0x49e40c = _0x566724;
    VisuMZ[_0x49e40c(0x29c)][_0x49e40c(0x180)]['Buffs']['onAddDebuffJS']['call'](this, _0x175169, _0x3c7933);
  }),
  (Game_BattlerBase[_0x566724(0x1a1)][_0x566724(0x308)] = function (_0x37a9c9) {
    const _0x251823 = _0x566724;
    VisuMZ[_0x251823(0x29c)][_0x251823(0x180)]['Buffs'][_0x251823(0x19d)][_0x251823(0x8e)](this, _0x37a9c9);
  }),
  (Game_BattlerBase[_0x566724(0x1a1)][_0x566724(0x1aa)] = function (_0x4b5f4c) {
    const _0x3c2479 = _0x566724;
    VisuMZ[_0x3c2479(0x29c)][_0x3c2479(0x180)][_0x3c2479(0x19a)][_0x3c2479(0x2e9)][_0x3c2479(0x8e)](this, _0x4b5f4c);
  }),
  (Game_Battler[_0x566724(0x1a1)][_0x566724(0x22f)] = function (_0x393314) {
    const _0x379aab = _0x566724;
    VisuMZ['SkillsStatesCore'][_0x379aab(0x180)][_0x379aab(0x19a)]['onExpireBuffJS'][_0x379aab(0x8e)](this, _0x393314);
  }),
  (Game_Battler[_0x566724(0x1a1)][_0x566724(0x1b5)] = function (_0x10f985) {
    const _0x486fee = _0x566724;
    VisuMZ[_0x486fee(0x29c)][_0x486fee(0x180)][_0x486fee(0x19a)][_0x486fee(0x17f)]['call'](this, _0x10f985);
  }),
  (Game_Battler['prototype'][_0x566724(0x1cc)] = function (_0x545ee7) {
    const _0x33cff6 = _0x566724,
      _0x2a1c91 = VisuMZ[_0x33cff6(0x29c)],
      _0x5eb88c = [_0x33cff6(0x2b0), _0x33cff6(0x270), 'stateMpSlipDamageJS', _0x33cff6(0x1b7), _0x33cff6(0x25d), _0x33cff6(0xe0)];
    for (const _0x25078c of _0x5eb88c) {
      _0x2a1c91[_0x25078c][_0x545ee7] && _0x2a1c91[_0x25078c][_0x545ee7][_0x33cff6(0x8e)](this, _0x545ee7);
    }
  }),
  (VisuMZ[_0x566724(0x29c)][_0x566724(0x127)] = Game_Battler[_0x566724(0x1a1)][_0x566724(0x260)]),
  (Game_Battler[_0x566724(0x1a1)][_0x566724(0x260)] = function () {
    const _0x2558bc = _0x566724;
    this[_0x2558bc(0x1c0)](), VisuMZ['SkillsStatesCore']['Game_Battler_regenerateAll']['call'](this), this['setPassiveStateSlipDamageJS'](), this['regenerateAllSkillsStatesCore']();
  }),
  (Game_Battler[_0x566724(0x1a1)]['setPassiveStateSlipDamageJS'] = function () {
    const _0x1998d4 = _0x566724;
    for (const _0x38550b of this[_0x1998d4(0x277)]()) {
      if (!_0x38550b) continue;
      this['onAddStateMakeCustomSlipValues'](_0x38550b['id']);
    }
  }),
  (Game_Battler[_0x566724(0x1a1)]['recalculateSlipDamageJS'] = function () {
    const _0x2ac3a4 = _0x566724;
    for (const _0x45b5a4 of this[_0x2ac3a4(0x124)]()) {
      if (!_0x45b5a4) continue;
      _0x45b5a4[_0x2ac3a4(0x26d)][_0x2ac3a4(0x26f)](/<JS SLIP REFRESH>/i) && this[_0x2ac3a4(0x1cc)](_0x45b5a4['id']);
    }
  }),
  (Game_Battler[_0x566724(0x1a1)]['regenerateAllSkillsStatesCore'] = function () {
    const _0x1b209a = _0x566724;
    if (!this[_0x1b209a(0x205)]()) return;
    const _0x50ab4c = this[_0x1b209a(0x124)]();
    for (const _0x4f5cec of _0x50ab4c) {
      if (!_0x4f5cec) continue;
      this['onRegenerateCustomStateDamageOverTime'](_0x4f5cec);
    }
  }),
  (Game_Battler[_0x566724(0x1a1)]['onRegenerateCustomStateDamageOverTime'] = function (_0x408f6e) {
    const _0x5e66e1 = _0x566724,
      _0x20bad0 = this['getStateData'](_0x408f6e['id'], _0x5e66e1(0x22c)) || 0x0,
      _0xb27157 = -this[_0x5e66e1(0x345)](),
      _0x192416 = Math[_0x5e66e1(0x311)](_0x20bad0, _0xb27157);
    if (_0x192416 !== 0x0) {
      const _0x46b9ea = this['_result']['hpDamage'] || 0x0;
      this['gainHp'](_0x192416), (this['_result'][_0x5e66e1(0x2ce)] += _0x46b9ea);
    }
    const _0x211226 = this[_0x5e66e1(0x22e)](_0x408f6e['id'], _0x5e66e1(0x314)) || 0x0;
    if (_0x211226 !== 0x0) {
      const _0x3d3d3c = this[_0x5e66e1(0x98)]['mpDamage'] || 0x0;
      this[_0x5e66e1(0x118)](_0x211226), (this['_result'][_0x5e66e1(0x2d5)] += _0x3d3d3c);
    }
    const _0x22e7af = this['getStateData'](_0x408f6e['id'], 'slipTp') || 0x0;
    _0x22e7af !== 0x0 && this[_0x5e66e1(0x28a)](_0x22e7af);
  }),
  (VisuMZ[_0x566724(0x29c)]['Game_Actor_skillTypes'] = Game_Actor['prototype']['skillTypes']),
  (Game_Actor['prototype'][_0x566724(0x28b)] = function () {
    const _0x342f05 = _0x566724,
      _0x1d30dc = VisuMZ[_0x342f05(0x29c)][_0x342f05(0x1e9)][_0x342f05(0x8e)](this),
      _0xc422b7 = VisuMZ[_0x342f05(0x29c)][_0x342f05(0x180)][_0x342f05(0x1a5)];
    let _0x3c938d = _0xc422b7[_0x342f05(0x303)];
    return $gameParty[_0x342f05(0x85)]() && (_0x3c938d = _0x3c938d[_0x342f05(0x248)](_0xc422b7[_0x342f05(0x227)])), _0x1d30dc[_0x342f05(0x1dc)](_0x789b48 => !_0x3c938d[_0x342f05(0x1f5)](_0x789b48));
  }),
  (Game_Actor[_0x566724(0x1a1)][_0x566724(0x2d7)] = function () {
    const _0x332020 = _0x566724;
    return this['skills']()['filter'](_0xad70f9 => this[_0x332020(0x10a)](_0xad70f9));
  }),
  (Game_Actor['prototype'][_0x566724(0x10a)] = function (_0x13a401) {
    const _0x3d0f78 = _0x566724;
    if (!this[_0x3d0f78(0x12d)](_0x13a401)) return ![];
    if (!_0x13a401) return ![];
    if (!this[_0x3d0f78(0x159)](_0x13a401)) return ![];
    if (this[_0x3d0f78(0xab)](_0x13a401)) return ![];
    return !![];
  }),
  (Game_Actor[_0x566724(0x1a1)]['isSkillTypeMatchForUse'] = function (_0x3886fa) {
    const _0x599252 = _0x566724,
      _0xfe1948 = this['skillTypes'](),
      _0x19f003 = DataManager['getSkillTypes'](_0x3886fa),
      _0x6d8127 = _0xfe1948[_0x599252(0x1dc)](_0x181c4d => _0x19f003[_0x599252(0x1f5)](_0x181c4d));
    return _0x6d8127[_0x599252(0x11b)] > 0x0;
  }),
  (Game_Actor['prototype'][_0x566724(0xab)] = function (_0x23d001) {
    const _0x9af654 = _0x566724;
    if (!VisuMZ[_0x9af654(0x29c)][_0x9af654(0x2d8)](this, _0x23d001)) return !![];
    if (!VisuMZ['SkillsStatesCore'][_0x9af654(0x1ec)](this, _0x23d001)) return !![];
    if (!VisuMZ[_0x9af654(0x29c)]['CheckVisibleSkillNotetags'](this, _0x23d001)) return !![];
    return ![];
  }),
  (Game_Actor[_0x566724(0x1a1)]['passiveStateObjects'] = function () {
    const _0x2f901a = _0x566724;
    let _0x29638d = [this[_0x2f901a(0x296)](), this['currentClass']()];
    _0x29638d = _0x29638d['concat'](this[_0x2f901a(0x31c)]()['filter'](_0x3c4596 => _0x3c4596));
    for (const _0x18f93b of this['_skills']) {
      const _0x246df8 = $dataSkills[_0x18f93b];
      if (!_0x246df8) continue;
      _0x29638d[_0x2f901a(0xb3)](_0x246df8);
    }
    return _0x29638d;
  }),
  (Game_Actor[_0x566724(0x1a1)][_0x566724(0x31e)] = function () {
    const _0x556dba = _0x566724;
    Game_Battler[_0x556dba(0x1a1)][_0x556dba(0x31e)]['call'](this);
    const _0x5746e3 = VisuMZ[_0x556dba(0x29c)]['Settings'][_0x556dba(0x307)]['Actor'];
    this['_cache'][_0x556dba(0x277)] = this[_0x556dba(0x290)][_0x556dba(0x277)]['concat'](_0x5746e3);
  }),
  (VisuMZ['SkillsStatesCore'][_0x566724(0xd5)] = Game_Actor['prototype'][_0x566724(0x13f)]),
  (Game_Actor[_0x566724(0x1a1)][_0x566724(0x13f)] = function (_0x1ea6e9) {
    const _0x1e41c7 = _0x566724;
    VisuMZ[_0x1e41c7(0x29c)][_0x1e41c7(0xd5)][_0x1e41c7(0x8e)](this, _0x1ea6e9), (this[_0x1e41c7(0x290)] = {}), this[_0x1e41c7(0x277)]();
  }),
  (VisuMZ[_0x566724(0x29c)][_0x566724(0x1eb)] = Game_Actor[_0x566724(0x1a1)][_0x566724(0x11c)]),
  (Game_Actor[_0x566724(0x1a1)][_0x566724(0x11c)] = function (_0x26d5a1) {
    const _0x376d1b = _0x566724;
    VisuMZ[_0x376d1b(0x29c)]['Game_Actor_forgetSkill'][_0x376d1b(0x8e)](this, _0x26d5a1), (this['_cache'] = {}), this[_0x376d1b(0x277)]();
  }),
  (Game_Actor[_0x566724(0x1a1)]['stepsForTurn'] = function () {
    const _0x5ebefa = _0x566724;
    return VisuMZ[_0x5ebefa(0x29c)][_0x5ebefa(0x180)][_0x5ebefa(0x214)]['TurnEndOnMap'] ?? 0x14;
  }),
  (Game_Enemy['prototype']['passiveStateObjects'] = function () {
    const _0x349214 = _0x566724;
    let _0x32d0dd = [this[_0x349214(0x9c)]()];
    return _0x32d0dd[_0x349214(0x248)](this['skills']());
  }),
  (Game_Enemy[_0x566724(0x1a1)][_0x566724(0x31e)] = function () {
    const _0x4f7668 = _0x566724;
    Game_Battler['prototype'][_0x4f7668(0x31e)][_0x4f7668(0x8e)](this);
    const _0x4656fc = VisuMZ[_0x4f7668(0x29c)][_0x4f7668(0x180)][_0x4f7668(0x307)][_0x4f7668(0x1a6)];
    this[_0x4f7668(0x290)][_0x4f7668(0x277)] = this[_0x4f7668(0x290)][_0x4f7668(0x277)]['concat'](_0x4656fc);
  }),
  (Game_Enemy['prototype'][_0x566724(0x176)] = function () {
    const _0x286c88 = _0x566724,
      _0x6514cd = [];
    for (const _0x2a1281 of this[_0x286c88(0x9c)]()[_0x286c88(0x2a0)]) {
      const _0x506e7d = $dataSkills[_0x2a1281[_0x286c88(0x19b)]];
      if (_0x506e7d && !_0x6514cd[_0x286c88(0x1f5)](_0x506e7d)) _0x6514cd[_0x286c88(0xb3)](_0x506e7d);
    }
    return _0x6514cd;
  }),
  (Game_Enemy[_0x566724(0x1a1)]['meetsStateCondition'] = function (_0x1d5063) {
    const _0x34a822 = _0x566724;
    return this[_0x34a822(0x1c8)]($dataStates[_0x1d5063]);
  }),
  (VisuMZ[_0x566724(0x29c)]['Game_Unit_isAllDead'] = Game_Unit[_0x566724(0x1a1)][_0x566724(0x9f)]),
  (Game_Unit['prototype'][_0x566724(0x9f)] = function () {
    const _0x33d0c1 = _0x566724;
    if (this['isPartyAllAffectedByGroupDefeatStates']()) return !![];
    return VisuMZ[_0x33d0c1(0x29c)][_0x33d0c1(0x255)][_0x33d0c1(0x8e)](this);
  }),
  (Game_Unit[_0x566724(0x1a1)]['isPartyAllAffectedByGroupDefeatStates'] = function () {
    const _0x249fe4 = _0x566724,
      _0x2546e4 = this[_0x249fe4(0x322)]();
    for (const _0x2d7e8b of _0x2546e4) {
      if (!_0x2d7e8b[_0x249fe4(0x203)]()) return ![];
    }
    return !![];
  }),
  (Game_Unit[_0x566724(0x1a1)][_0x566724(0x86)] = function () {
    const _0x6cc426 = _0x566724;
    for (const _0x115e5d of this[_0x6cc426(0x1df)]()) {
      if (!_0x115e5d) continue;
      _0x115e5d[_0x6cc426(0x309)]();
    }
  }),
  (VisuMZ[_0x566724(0x29c)][_0x566724(0x156)] = Game_Player[_0x566724(0x1a1)][_0x566724(0x309)]),
  (Game_Player[_0x566724(0x1a1)][_0x566724(0x309)] = function () {
    const _0x449623 = _0x566724;
    VisuMZ[_0x449623(0x29c)][_0x449623(0x156)][_0x449623(0x8e)](this), $gameParty['refreshAllMembers'](), $gameParty[_0x449623(0x85)]() && $gameTroop['refreshAllMembers']();
  }),
  (VisuMZ['SkillsStatesCore'][_0x566724(0x18b)] = Game_Troop['prototype'][_0x566724(0x115)]),
  (Game_Troop[_0x566724(0x1a1)][_0x566724(0x115)] = function (_0x161e04) {
    const _0x7043b0 = _0x566724;
    VisuMZ[_0x7043b0(0x29c)][_0x7043b0(0x18b)][_0x7043b0(0x8e)](this, _0x161e04), this['makeCurrentTroopUniqueID']();
  }),
  (Game_Troop['prototype'][_0x566724(0x1fd)] = function () {
    const _0x2b7f94 = _0x566724;
    this[_0x2b7f94(0xcc)] = Graphics['frameCount'];
  }),
  (Game_Troop[_0x566724(0x1a1)]['getCurrentTroopUniqueID'] = function () {
    const _0x8f98c0 = _0x566724;
    return (this[_0x8f98c0(0xcc)] = this[_0x8f98c0(0xcc)] || Graphics[_0x8f98c0(0x258)]), this['_currentTroopUniqueID'];
  }),
  (Scene_Skill[_0x566724(0x1a1)][_0x566724(0x33e)] = function () {
    const _0x22ff41 = _0x566724;
    if (ConfigManager['uiMenuStyle'] && ConfigManager[_0x22ff41(0x1c1)] !== undefined) return ConfigManager[_0x22ff41(0x1c1)];
    else {
      if (this[_0x22ff41(0xbe)]()) return this['updatedLayoutStyle']()[_0x22ff41(0x26f)](/LOWER/i);
      else Scene_ItemBase['prototype'][_0x22ff41(0x252)][_0x22ff41(0x8e)](this);
    }
  }),
  (Scene_Skill[_0x566724(0x1a1)][_0x566724(0x252)] = function () {
    const _0x3efda4 = _0x566724;
    if (ConfigManager[_0x3efda4(0x193)] && ConfigManager['uiInputPosition'] !== undefined) return ConfigManager[_0x3efda4(0x1d3)];
    else return this[_0x3efda4(0xbe)]() ? this[_0x3efda4(0x125)]()[_0x3efda4(0x26f)](/RIGHT/i) : Scene_ItemBase[_0x3efda4(0x1a1)]['isRightInputMode'][_0x3efda4(0x8e)](this);
  }),
  (Scene_Skill[_0x566724(0x1a1)][_0x566724(0x125)] = function () {
    const _0x55ded6 = _0x566724;
    return VisuMZ['SkillsStatesCore'][_0x55ded6(0x180)][_0x55ded6(0x1a5)][_0x55ded6(0x120)];
  }),
  (Scene_Skill[_0x566724(0x1a1)][_0x566724(0xb9)] = function () {
    const _0x24e885 = _0x566724;
    return this[_0x24e885(0x1c5)] && this['_categoryWindow']['isUseModernControls']();
  }),
  (Scene_Skill[_0x566724(0x1a1)]['isUseSkillsStatesCoreUpdatedLayout'] = function () {
    const _0x3b8b1c = _0x566724;
    return VisuMZ[_0x3b8b1c(0x29c)]['Settings'][_0x3b8b1c(0x1a5)][_0x3b8b1c(0x325)];
  }),
  (VisuMZ[_0x566724(0x29c)][_0x566724(0x1f1)] = Scene_Skill[_0x566724(0x1a1)][_0x566724(0xc7)]),
  (Scene_Skill['prototype'][_0x566724(0xc7)] = function () {
    const _0x19c011 = _0x566724;
    return this[_0x19c011(0xbe)]() ? this['helpWindowRectSkillsStatesCore']() : VisuMZ[_0x19c011(0x29c)]['Scene_Skill_helpWindowRect'][_0x19c011(0x8e)](this);
  }),
  (Scene_Skill['prototype'][_0x566724(0x165)] = function () {
    const _0xb12820 = _0x566724,
      _0x42bd38 = 0x0,
      _0x2d1026 = this['helpAreaTop'](),
      _0x35aa5d = Graphics[_0xb12820(0x25f)],
      _0x410b26 = this[_0xb12820(0x223)]();
    return new Rectangle(_0x42bd38, _0x2d1026, _0x35aa5d, _0x410b26);
  }),
  (VisuMZ['SkillsStatesCore'][_0x566724(0x186)] = Scene_Skill['prototype'][_0x566724(0x16c)]),
  (Scene_Skill[_0x566724(0x1a1)]['skillTypeWindowRect'] = function () {
    const _0x281df5 = _0x566724;
    return this[_0x281df5(0xbe)]() ? this[_0x281df5(0x211)]() : VisuMZ['SkillsStatesCore'][_0x281df5(0x186)]['call'](this);
  }),
  (Scene_Skill[_0x566724(0x1a1)][_0x566724(0x2ed)] = function () {
    const _0x56490e = _0x566724;
    return VisuMZ[_0x56490e(0x29c)][_0x56490e(0x180)][_0x56490e(0x1a5)][_0x56490e(0x185)] ?? Scene_MenuBase[_0x56490e(0x1a1)][_0x56490e(0x2ed)]['call'](this);
  }),
  (Scene_Skill['prototype'][_0x566724(0x211)] = function () {
    const _0x33b969 = _0x566724,
      _0x5c6bbd = this[_0x33b969(0x2ed)](),
      _0x253db4 = this['calcWindowHeight'](0x3, !![]),
      _0x6b91cf = this[_0x33b969(0x252)]() ? Graphics[_0x33b969(0x25f)] - _0x5c6bbd : 0x0,
      _0x3c3257 = this['mainAreaTop']();
    return new Rectangle(_0x6b91cf, _0x3c3257, _0x5c6bbd, _0x253db4);
  }),
  (VisuMZ[_0x566724(0x29c)][_0x566724(0x110)] = Scene_Skill[_0x566724(0x1a1)][_0x566724(0x93)]),
  (Scene_Skill['prototype'][_0x566724(0x93)] = function () {
    const _0x83d334 = _0x566724;
    return this['isUseSkillsStatesCoreUpdatedLayout']() ? this[_0x83d334(0xe9)]() : VisuMZ[_0x83d334(0x29c)]['Scene_Skill_statusWindowRect'][_0x83d334(0x8e)](this);
  }),
  (Scene_Skill[_0x566724(0x1a1)]['statusWindowRectSkillsStatesCore'] = function () {
    const _0x584bd4 = _0x566724,
      _0x42eadd = Graphics[_0x584bd4(0x25f)] - this[_0x584bd4(0x2ed)](),
      _0x2a0467 = this['_skillTypeWindow']['height'],
      _0x32480f = this['isRightInputMode']() ? 0x0 : Graphics[_0x584bd4(0x25f)] - _0x42eadd,
      _0x5e6dd2 = this['mainAreaTop']();
    return new Rectangle(_0x32480f, _0x5e6dd2, _0x42eadd, _0x2a0467);
  }),
  (VisuMZ[_0x566724(0x29c)][_0x566724(0x91)] = Scene_Skill[_0x566724(0x1a1)][_0x566724(0x292)]),
  (Scene_Skill[_0x566724(0x1a1)][_0x566724(0x292)] = function () {
    const _0x84320 = _0x566724;
    VisuMZ[_0x84320(0x29c)][_0x84320(0x91)][_0x84320(0x8e)](this), this[_0x84320(0x13e)]() && this[_0x84320(0x240)]();
  }),
  (VisuMZ[_0x566724(0x29c)][_0x566724(0x191)] = Scene_Skill['prototype']['itemWindowRect']),
  (Scene_Skill[_0x566724(0x1a1)][_0x566724(0x111)] = function () {
    const _0x5d07db = _0x566724;
    if (this[_0x5d07db(0xbe)]()) return this[_0x5d07db(0x273)]();
    else {
      const _0x1dff74 = VisuMZ[_0x5d07db(0x29c)][_0x5d07db(0x191)]['call'](this);
      return this[_0x5d07db(0x13e)]() && this[_0x5d07db(0x20d)]() && (_0x1dff74[_0x5d07db(0x280)] -= this['shopStatusWidth']()), _0x1dff74;
    }
  }),
  (Scene_Skill[_0x566724(0x1a1)][_0x566724(0x273)] = function () {
    const _0x9be5d = _0x566724,
      _0x1b8c6a = Graphics[_0x9be5d(0x25f)] - this[_0x9be5d(0x1ee)](),
      _0x35d206 = this[_0x9be5d(0x1c9)]() - this[_0x9be5d(0x24a)]['height'],
      _0x4b1bc2 = this[_0x9be5d(0x252)]() ? Graphics[_0x9be5d(0x25f)] - _0x1b8c6a : 0x0,
      _0x51e07f = this[_0x9be5d(0x24a)]['y'] + this['_statusWindow'][_0x9be5d(0x263)];
    return new Rectangle(_0x4b1bc2, _0x51e07f, _0x1b8c6a, _0x35d206);
  }),
  (Scene_Skill[_0x566724(0x1a1)][_0x566724(0x13e)] = function () {
    const _0x10a78f = _0x566724;
    if (!Imported[_0x10a78f(0x30b)]) return ![];
    else return this[_0x10a78f(0xbe)]() ? !![] : VisuMZ[_0x10a78f(0x29c)]['Settings'][_0x10a78f(0x1a5)]['ShowShopStatus'];
  }),
  (Scene_Skill[_0x566724(0x1a1)][_0x566724(0x20d)] = function () {
    const _0x2c8c3d = _0x566724;
    return VisuMZ[_0x2c8c3d(0x29c)]['Settings'][_0x2c8c3d(0x1a5)]['SkillSceneAdjustSkillList'];
  }),
  (Scene_Skill['prototype'][_0x566724(0x240)] = function () {
    const _0x3f18c9 = _0x566724,
      _0x1a9a72 = this[_0x3f18c9(0xba)]();
    (this['_shopStatusWindow'] = new Window_ShopStatus(_0x1a9a72)), this[_0x3f18c9(0xd8)](this[_0x3f18c9(0x201)]), this[_0x3f18c9(0x2de)][_0x3f18c9(0x1a9)](this[_0x3f18c9(0x201)]);
    const _0x270b81 = VisuMZ['SkillsStatesCore'][_0x3f18c9(0x180)][_0x3f18c9(0x1a5)][_0x3f18c9(0x207)];
    this[_0x3f18c9(0x201)][_0x3f18c9(0x29b)](_0x270b81 || 0x0);
  }),
  (Scene_Skill[_0x566724(0x1a1)]['shopStatusWindowRect'] = function () {
    const _0x40e137 = _0x566724;
    return this[_0x40e137(0xbe)]() ? this['shopStatusWindowRectSkillsStatesCore']() : VisuMZ[_0x40e137(0x29c)][_0x40e137(0x180)]['Skills'][_0x40e137(0x2b9)][_0x40e137(0x8e)](this);
  }),
  (Scene_Skill[_0x566724(0x1a1)][_0x566724(0x84)] = function () {
    const _0x53230d = _0x566724,
      _0x568bc7 = this[_0x53230d(0x1ee)](),
      _0x285c72 = this[_0x53230d(0x2de)][_0x53230d(0x263)],
      _0x1aaf84 = this['isRightInputMode']() ? 0x0 : Graphics[_0x53230d(0x25f)] - this['shopStatusWidth'](),
      _0x456d8b = this[_0x53230d(0x2de)]['y'];
    return new Rectangle(_0x1aaf84, _0x456d8b, _0x568bc7, _0x285c72);
  }),
  (Scene_Skill[_0x566724(0x1a1)][_0x566724(0x1ee)] = function () {
    const _0x420ec5 = _0x566724;
    return Imported[_0x420ec5(0x30b)] ? Scene_Shop['prototype'][_0x420ec5(0x8b)]() : 0x0;
  }),
  (Scene_Skill['prototype']['buttonAssistText1'] = function () {
    const _0x49f357 = _0x566724;
    return this[_0x49f357(0x177)] && this['_skillTypeWindow'][_0x49f357(0x10c)] ? TextManager['buttonAssistSwitch'] : '';
  }),
  (VisuMZ[_0x566724(0x29c)][_0x566724(0xff)] = Sprite_Gauge['prototype']['initMembers']),
  (Sprite_Gauge[_0x566724(0x1a1)]['initMembers'] = function () {
    const _0x4b1472 = _0x566724;
    VisuMZ[_0x4b1472(0x29c)][_0x4b1472(0xff)][_0x4b1472(0x8e)](this), (this[_0x4b1472(0xf2)] = null);
  }),
  (VisuMZ[_0x566724(0x29c)]['Sprite_Gauge_setup'] = Sprite_Gauge[_0x566724(0x1a1)][_0x566724(0x115)]),
  (Sprite_Gauge[_0x566724(0x1a1)][_0x566724(0x115)] = function (_0x176e71, _0x46c456) {
    const _0x53e487 = _0x566724;
    this[_0x53e487(0x281)](_0x176e71, _0x46c456), (_0x46c456 = _0x46c456['toLowerCase']()), VisuMZ[_0x53e487(0x29c)][_0x53e487(0x2dc)][_0x53e487(0x8e)](this, _0x176e71, _0x46c456);
  }),
  (Sprite_Gauge[_0x566724(0x1a1)][_0x566724(0x281)] = function (_0x4761e2, _0x24f84e) {
    const _0x395182 = _0x566724,
      _0x10fc2d = VisuMZ[_0x395182(0x29c)][_0x395182(0x180)][_0x395182(0x10e)][_0x395182(0x1dc)](_0x327110 => _0x327110[_0x395182(0x32d)][_0x395182(0xaf)]() === _0x24f84e[_0x395182(0xaf)]());
    _0x10fc2d[_0x395182(0x11b)] >= 0x1 ? (this['_costSettings'] = _0x10fc2d[0x0]) : (this[_0x395182(0xf2)] = null);
  }),
  (VisuMZ['SkillsStatesCore'][_0x566724(0x31f)] = Sprite_Gauge['prototype'][_0x566724(0xa4)]),
  (Sprite_Gauge[_0x566724(0x1a1)]['currentValue'] = function () {
    const _0x27288c = _0x566724;
    return this[_0x27288c(0x15d)] && this['_costSettings'] ? this[_0x27288c(0x2c6)]() : VisuMZ[_0x27288c(0x29c)][_0x27288c(0x31f)][_0x27288c(0x8e)](this);
  }),
  (Sprite_Gauge[_0x566724(0x1a1)][_0x566724(0x2c6)] = function () {
    const _0x2fa296 = _0x566724;
    return this['_costSettings']['GaugeCurrentJS'][_0x2fa296(0x8e)](this[_0x2fa296(0x15d)]);
  }),
  (VisuMZ[_0x566724(0x29c)][_0x566724(0x347)] = Sprite_Gauge[_0x566724(0x1a1)][_0x566724(0xf4)]),
  (Sprite_Gauge[_0x566724(0x1a1)]['currentMaxValue'] = function () {
    const _0x158edd = _0x566724;
    return this[_0x158edd(0x15d)] && this[_0x158edd(0xf2)] ? this[_0x158edd(0x1a3)]() : VisuMZ[_0x158edd(0x29c)][_0x158edd(0x347)][_0x158edd(0x8e)](this);
  }),
  (Sprite_Gauge[_0x566724(0x1a1)]['currentMaxValueSkillsStatesCore'] = function () {
    const _0x36106a = _0x566724;
    return this['_costSettings']['GaugeMaxJS'][_0x36106a(0x8e)](this[_0x36106a(0x15d)]);
  }),
  (VisuMZ[_0x566724(0x29c)][_0x566724(0x250)] = Sprite_Gauge[_0x566724(0x1a1)][_0x566724(0x27c)]),
  (Sprite_Gauge[_0x566724(0x1a1)][_0x566724(0x27c)] = function () {
    const _0x27bcec = _0x566724,
      _0x1d5f83 = VisuMZ[_0x27bcec(0x29c)][_0x27bcec(0x250)][_0x27bcec(0x8e)](this);
    return _0x1d5f83['clamp'](0x0, 0x1);
  }),
  (VisuMZ[_0x566724(0x29c)][_0x566724(0x2a4)] = Sprite_Gauge[_0x566724(0x1a1)]['redraw']),
  (Sprite_Gauge[_0x566724(0x1a1)][_0x566724(0x284)] = function () {
    const _0x2a5ad3 = _0x566724;
    this[_0x2a5ad3(0x15d)] && this['_costSettings'] ? (this[_0x2a5ad3(0x2ae)]['clear'](), this[_0x2a5ad3(0x10f)]()) : VisuMZ[_0x2a5ad3(0x29c)]['Sprite_Gauge_redraw'][_0x2a5ad3(0x8e)](this);
  }),
  (Sprite_Gauge[_0x566724(0x1a1)][_0x566724(0x2c3)] = function () {
    const _0x342624 = _0x566724;
    let _0x353661 = this[_0x342624(0xa4)]();
    return Imported[_0x342624(0x1e5)] && this['useDigitGrouping']() && (_0x353661 = VisuMZ[_0x342624(0xc0)](_0x353661)), _0x353661;
  }),
  (Sprite_Gauge[_0x566724(0x1a1)][_0x566724(0x10f)] = function () {
    const _0x2b6d07 = _0x566724;
    this[_0x2b6d07(0x2ae)][_0x2b6d07(0x33a)](), this[_0x2b6d07(0xf2)][_0x2b6d07(0x1d5)][_0x2b6d07(0x8e)](this);
  }),
  (Sprite_Gauge[_0x566724(0x1a1)][_0x566724(0x261)] = function (_0x4e82c2, _0x247c17, _0x19ee20, _0x1a5e7a, _0x4e3fca, _0x185a60) {
    const _0x32bae1 = _0x566724,
      _0x26be1e = this[_0x32bae1(0x27c)](),
      _0xf99321 = Math['floor']((_0x4e3fca - 0x2) * _0x26be1e),
      _0x2a5e84 = _0x185a60 - 0x2,
      _0x41deec = this[_0x32bae1(0x192)]();
    this[_0x32bae1(0x2ae)]['fillRect'](_0x19ee20, _0x1a5e7a, _0x4e3fca, _0x185a60, _0x41deec),
      this[_0x32bae1(0x2ae)][_0x32bae1(0x14e)](_0x19ee20 + 0x1, _0x1a5e7a + 0x1, _0xf99321, _0x2a5e84, _0x4e82c2, _0x247c17);
  }),
  (Sprite_Gauge['prototype'][_0x566724(0x291)] = function () {
    const _0x44c060 = _0x566724,
      _0xaaca04 = VisuMZ[_0x44c060(0x29c)]['Settings'][_0x44c060(0x27d)];
    return _0xaaca04[_0x44c060(0x2c9)] === _0x44c060(0x317) ? $gameSystem[_0x44c060(0x204)]() : $gameSystem[_0x44c060(0x2cc)]();
  }),
  (Sprite_Gauge['prototype']['labelFontSize'] = function () {
    const _0x22ea3a = _0x566724,
      _0xceef14 = VisuMZ[_0x22ea3a(0x29c)]['Settings'][_0x22ea3a(0x27d)];
    return _0xceef14[_0x22ea3a(0x2c9)] === _0x22ea3a(0x317) ? $gameSystem[_0x22ea3a(0x1d8)]() - 0x6 : $gameSystem['mainFontSize']() - 0x2;
  }),
  (Sprite_Gauge[_0x566724(0x1a1)][_0x566724(0x2fb)] = function () {
    const _0x2ba9f3 = _0x566724,
      _0x312ca6 = VisuMZ[_0x2ba9f3(0x29c)][_0x2ba9f3(0x180)][_0x2ba9f3(0x27d)];
    return _0x312ca6[_0x2ba9f3(0x194)] === _0x2ba9f3(0x317) ? $gameSystem[_0x2ba9f3(0x204)]() : $gameSystem['mainFontFace']();
  }),
  (Sprite_Gauge[_0x566724(0x1a1)][_0x566724(0x140)] = function () {
    const _0x369806 = _0x566724,
      _0x22835d = VisuMZ['SkillsStatesCore'][_0x369806(0x180)][_0x369806(0x27d)];
    return _0x22835d[_0x369806(0x194)] === _0x369806(0x317) ? $gameSystem[_0x369806(0x1d8)]() - 0x6 : $gameSystem[_0x369806(0x1d8)]() - 0x2;
  }),
  (Sprite_Gauge[_0x566724(0x1a1)][_0x566724(0x1ba)] = function () {
    const _0x2e0aee = _0x566724,
      _0x55e2c8 = VisuMZ[_0x2e0aee(0x29c)][_0x2e0aee(0x180)]['Gauge'];
    if (_0x55e2c8[_0x2e0aee(0x95)]) {
      if (_0x55e2c8[_0x2e0aee(0x2b3)] === 0x1) return this[_0x2e0aee(0x21c)]();
      else {
        if (_0x55e2c8[_0x2e0aee(0x2b3)] === 0x2) return this['gaugeColor2']();
      }
    }
    const _0x536411 = _0x55e2c8[_0x2e0aee(0x274)];
    return ColorManager[_0x2e0aee(0x331)](_0x536411);
  }),
  (Sprite_Gauge['prototype'][_0x566724(0x30e)] = function () {
    const _0x25547a = _0x566724,
      _0x2fbc34 = VisuMZ[_0x25547a(0x29c)][_0x25547a(0x180)][_0x25547a(0x27d)];
    if (this['labelOutlineWidth']() <= 0x0) return _0x25547a(0x20f);
    else return _0x2fbc34[_0x25547a(0x2e6)] ? _0x25547a(0x25c) : ColorManager[_0x25547a(0x256)]();
  }),
  (Sprite_Gauge[_0x566724(0x1a1)][_0x566724(0xe3)] = function () {
    const _0xca4e89 = _0x566724;
    return VisuMZ[_0xca4e89(0x29c)][_0xca4e89(0x180)]['Gauge'][_0xca4e89(0x2ac)] || 0x0;
  }),
  (Sprite_Gauge[_0x566724(0x1a1)][_0x566724(0x26a)] = function () {
    const _0x2da41d = _0x566724,
      _0x40dad4 = VisuMZ['SkillsStatesCore'][_0x2da41d(0x180)]['Gauge'];
    if (this[_0x2da41d(0x21b)]() <= 0x0) return _0x2da41d(0x20f);
    else return _0x40dad4[_0x2da41d(0x19f)] ? 'rgba(0,\x200,\x200,\x201)' : ColorManager[_0x2da41d(0x256)]();
  }),
  (Sprite_Gauge[_0x566724(0x1a1)][_0x566724(0x21b)] = function () {
    const _0x4445e4 = _0x566724;
    return VisuMZ[_0x4445e4(0x29c)]['Settings'][_0x4445e4(0x27d)]['ValueOutlineWidth'] || 0x0;
  }),
  (VisuMZ['SkillsStatesCore'][_0x566724(0x87)] = Sprite_StateIcon[_0x566724(0x1a1)][_0x566724(0x16a)]),
  (Sprite_StateIcon[_0x566724(0x1a1)][_0x566724(0x16a)] = function () {
    const _0x488880 = _0x566724;
    VisuMZ['SkillsStatesCore'][_0x488880(0x87)]['call'](this), this[_0x488880(0x1e0)]();
  }),
  (Sprite_StateIcon[_0x566724(0x1a1)][_0x566724(0x1e0)] = function () {
    const _0x33ba81 = _0x566724,
      _0x5bb9e6 = Window_Base[_0x33ba81(0x1a1)]['lineHeight']();
    (this[_0x33ba81(0x206)] = new Sprite()),
      (this['_turnDisplaySprite'][_0x33ba81(0x2ae)] = new Bitmap(ImageManager['iconWidth'], _0x5bb9e6)),
      (this['_turnDisplaySprite'][_0x33ba81(0x198)]['x'] = this['anchor']['x']),
      (this[_0x33ba81(0x206)][_0x33ba81(0x198)]['y'] = this[_0x33ba81(0x198)]['y']),
      this[_0x33ba81(0x2b6)](this['_turnDisplaySprite']),
      (this[_0x33ba81(0x2c4)] = this[_0x33ba81(0x206)][_0x33ba81(0x2ae)]);
  }),
  (VisuMZ[_0x566724(0x29c)]['Sprite_StateIcon_updateFrame'] = Sprite_StateIcon['prototype'][_0x566724(0x2f3)]),
  (Sprite_StateIcon[_0x566724(0x1a1)][_0x566724(0x2f3)] = function () {
    const _0x4b7af9 = _0x566724;
    VisuMZ[_0x4b7af9(0x29c)][_0x4b7af9(0x34a)][_0x4b7af9(0x8e)](this), this[_0x4b7af9(0x169)]();
  }),
  (Sprite_StateIcon['prototype']['drawText'] = function (_0x54bf7a, _0x43329a, _0x531f3c, _0x33e127, _0x9c7b24) {
    const _0x17ebe4 = _0x566724;
    this['contents'][_0x17ebe4(0x1ea)](_0x54bf7a, _0x43329a, _0x531f3c, _0x33e127, this[_0x17ebe4(0x2c4)][_0x17ebe4(0x263)], _0x9c7b24);
  }),
  (Sprite_StateIcon[_0x566724(0x1a1)][_0x566724(0x169)] = function () {
    const _0x546225 = _0x566724;
    this[_0x546225(0x310)](), this[_0x546225(0x2c4)]['clear']();
    const _0x419ad8 = this['_battler'];
    if (!_0x419ad8) return;
    const _0x28cc76 = _0x419ad8[_0x546225(0x124)]()['filter'](_0x3c605c => _0x3c605c[_0x546225(0xf5)] > 0x0),
      _0x3d6f75 = [...Array(0x8)[_0x546225(0x141)]()][_0x546225(0x1dc)](_0x3cb8b0 => _0x419ad8[_0x546225(0x2d4)](_0x3cb8b0) !== 0x0),
      _0x4ccaa0 = this[_0x546225(0x2c1)],
      _0x4bf923 = _0x28cc76[_0x4ccaa0];
    if (_0x4bf923)
      Window_Base['prototype'][_0x546225(0xa7)][_0x546225(0x8e)](this, _0x419ad8, _0x4bf923, 0x0, 0x0),
        Window_Base[_0x546225(0x1a1)]['drawActorStateData'][_0x546225(0x8e)](this, _0x419ad8, _0x4bf923, 0x0, 0x0);
    else {
      const _0x31879e = _0x3d6f75[_0x4ccaa0 - _0x28cc76[_0x546225(0x11b)]];
      if (_0x31879e === undefined) return;
      Window_Base[_0x546225(0x1a1)]['drawActorBuffTurns'][_0x546225(0x8e)](this, _0x419ad8, _0x31879e, 0x0, 0x0),
        Window_Base[_0x546225(0x1a1)][_0x546225(0x2ec)][_0x546225(0x8e)](this, _0x419ad8, _0x31879e, 0x0, 0x0);
    }
  }),
  (Sprite_StateIcon['prototype']['resetFontSettings'] = function () {
    const _0x30e332 = _0x566724;
    (this[_0x30e332(0x2c4)]['fontFace'] = $gameSystem[_0x30e332(0x2cc)]()), (this[_0x30e332(0x2c4)][_0x30e332(0x338)] = $gameSystem['mainFontSize']()), this[_0x30e332(0x30f)]();
  }),
  (Sprite_StateIcon[_0x566724(0x1a1)][_0x566724(0x30f)] = function () {
    const _0x1c6b3 = _0x566724;
    this['changeTextColor'](ColorManager['normalColor']()), this[_0x1c6b3(0x209)](ColorManager['outlineColor']());
  }),
  (Sprite_StateIcon[_0x566724(0x1a1)]['changeTextColor'] = function (_0x4f874c) {
    const _0x393642 = _0x566724;
    this[_0x393642(0x2c4)]['textColor'] = _0x4f874c;
  }),
  (Sprite_StateIcon[_0x566724(0x1a1)][_0x566724(0x209)] = function (_0x3f5c58) {
    const _0x2456c9 = _0x566724;
    this[_0x2456c9(0x2c4)][_0x2456c9(0x256)] = _0x3f5c58;
  }),
  (Sprite_StateIcon['prototype'][_0x566724(0x2df)] = function () {
    const _0x4b63ee = _0x566724;
    (this[_0x4b63ee(0xe6)] = !![]), this[_0x4b63ee(0x148)]();
  }),
  (Window_Base[_0x566724(0x1a1)][_0x566724(0xee)] = function (_0x404ad9, _0x446cb1, _0x2bdbdf, _0x422419, _0x24baf9) {
    const _0x1aef80 = _0x566724,
      _0x33f241 = this['createAllSkillCostText'](_0x404ad9, _0x446cb1),
      _0x95736d = this[_0x1aef80(0x1fe)](_0x33f241, _0x2bdbdf, _0x422419, _0x24baf9),
      _0x3eb7b5 = _0x2bdbdf + _0x24baf9 - _0x95736d[_0x1aef80(0x280)];
    this[_0x1aef80(0x2da)](_0x33f241, _0x3eb7b5, _0x422419, _0x24baf9), this[_0x1aef80(0x310)]();
  }),
  (Window_Base[_0x566724(0x1a1)]['createAllSkillCostText'] = function (_0x129628, _0xdb0fdf) {
    const _0x1480ac = _0x566724;
    let _0x2bf2ab = '';
    for (settings of VisuMZ[_0x1480ac(0x29c)][_0x1480ac(0x180)][_0x1480ac(0x10e)]) {
      if (!this[_0x1480ac(0x16d)](_0x129628, _0xdb0fdf, settings)) continue;
      if (_0x2bf2ab['length'] > 0x0) _0x2bf2ab += this[_0x1480ac(0xfc)]();
      _0x2bf2ab += this['createSkillCostText'](_0x129628, _0xdb0fdf, settings);
    }
    _0x2bf2ab = this[_0x1480ac(0x13b)](_0x129628, _0xdb0fdf, _0x2bf2ab);
    if (_0xdb0fdf[_0x1480ac(0x26d)][_0x1480ac(0x26f)](/<CUSTOM COST TEXT>\s*([\s\S]*)\s*<\/CUSTOM COST TEXT>/i)) {
      if (_0x2bf2ab[_0x1480ac(0x11b)] > 0x0) _0x2bf2ab += this[_0x1480ac(0xfc)]();
      _0x2bf2ab += String(RegExp['$1']);
    }
    return _0x2bf2ab;
  }),
  (Window_Base[_0x566724(0x1a1)][_0x566724(0x13b)] = function (_0x48a174, _0x3bdf45, _0x49423c) {
    return _0x49423c;
  }),
  (Window_Base[_0x566724(0x1a1)][_0x566724(0x16d)] = function (_0x1bd597, _0x4f4126, _0x58e2ee) {
    const _0x5d0f4c = _0x566724;
    let _0x3ec42f = _0x58e2ee[_0x5d0f4c(0x343)][_0x5d0f4c(0x8e)](_0x1bd597, _0x4f4126);
    return (_0x3ec42f = _0x1bd597[_0x5d0f4c(0x2fd)](_0x4f4126, _0x3ec42f, _0x58e2ee)), _0x58e2ee[_0x5d0f4c(0x24c)][_0x5d0f4c(0x8e)](_0x1bd597, _0x4f4126, _0x3ec42f, _0x58e2ee);
  }),
  (Window_Base['prototype'][_0x566724(0x32b)] = function (_0x532630, _0x308d51, _0x226f66) {
    const _0x6ab823 = _0x566724;
    let _0x46f8c4 = _0x226f66[_0x6ab823(0x343)][_0x6ab823(0x8e)](_0x532630, _0x308d51);
    return (_0x46f8c4 = _0x532630[_0x6ab823(0x2fd)](_0x308d51, _0x46f8c4, _0x226f66)), _0x226f66[_0x6ab823(0x333)][_0x6ab823(0x8e)](_0x532630, _0x308d51, _0x46f8c4, _0x226f66);
  }),
  (Window_Base[_0x566724(0x1a1)]['skillCostSeparator'] = function () {
    return '\x20';
  }),
  (Window_Base[_0x566724(0x1a1)][_0x566724(0x2bd)] = function (_0x3903a4, _0x5aacbe, _0x28ec34, _0x5281e7) {
    const _0x3a8680 = _0x566724;
    if (!_0x3903a4) return;
    VisuMZ['SkillsStatesCore']['Window_StatusBase_drawActorIcons'][_0x3a8680(0x8e)](this, _0x3903a4, _0x5aacbe, _0x28ec34, _0x5281e7),
      this['drawActorIconsAllTurnCounters'](_0x3903a4, _0x5aacbe, _0x28ec34, _0x5281e7);
  }),
  (Window_Base[_0x566724(0x1a1)][_0x566724(0xaa)] = function (_0x57e9bb, _0x27410a, _0x27c306, _0x51dad9) {
    const _0x24d14e = _0x566724;
    _0x51dad9 = _0x51dad9 || 0x90;
    const _0x22a02e = ImageManager['iconWidth'],
      _0x1f9a8b = _0x57e9bb[_0x24d14e(0x9b)]()[_0x24d14e(0x22d)](0x0, Math['floor'](_0x51dad9 / _0x22a02e)),
      _0x2f0436 = _0x57e9bb[_0x24d14e(0x124)]()[_0x24d14e(0x1dc)](_0x358e11 => _0x358e11[_0x24d14e(0xf5)] > 0x0),
      _0x565f15 = [...Array(0x8)[_0x24d14e(0x141)]()][_0x24d14e(0x1dc)](_0x3614e8 => _0x57e9bb[_0x24d14e(0x2d4)](_0x3614e8) !== 0x0),
      _0x246d15 = [];
    let _0x69fba9 = _0x27410a;
    for (let _0x3f1370 = 0x0; _0x3f1370 < _0x1f9a8b['length']; _0x3f1370++) {
      this[_0x24d14e(0x310)]();
      const _0xd95cc9 = _0x2f0436[_0x3f1370];
      if (_0xd95cc9)
        !_0x246d15[_0x24d14e(0x1f5)](_0xd95cc9) && this[_0x24d14e(0xa7)](_0x57e9bb, _0xd95cc9, _0x69fba9, _0x27c306),
          this[_0x24d14e(0x289)](_0x57e9bb, _0xd95cc9, _0x69fba9, _0x27c306),
          _0x246d15[_0x24d14e(0xb3)](_0xd95cc9);
      else {
        const _0x5b6043 = _0x565f15[_0x3f1370 - _0x2f0436[_0x24d14e(0x11b)]];
        this[_0x24d14e(0x212)](_0x57e9bb, _0x5b6043, _0x69fba9, _0x27c306), this['drawActorBuffRates'](_0x57e9bb, _0x5b6043, _0x69fba9, _0x27c306);
      }
      _0x69fba9 += _0x22a02e;
    }
  }),
  (Window_Base[_0x566724(0x1a1)]['drawActorStateTurns'] = function (_0x474562, _0x533cb1, _0x5bc91b, _0x41cd1b) {
    const _0x10faa7 = _0x566724;
    if (!VisuMZ['SkillsStatesCore'][_0x10faa7(0x180)]['States'][_0x10faa7(0x259)]) return;
    if (!_0x474562[_0x10faa7(0x229)](_0x533cb1['id'])) return;
    if (_0x533cb1[_0x10faa7(0x160)] === 0x0) return;
    if (_0x533cb1['note']['match'](/<HIDE STATE TURNS>/i)) return;
    const _0x3daf06 = _0x474562['stateTurns'](_0x533cb1['id']),
      _0x37e3bd = ImageManager['iconWidth'],
      _0x596ca7 = ColorManager[_0x10faa7(0xc6)](_0x533cb1);
    this[_0x10faa7(0x2f7)](_0x596ca7),
      this[_0x10faa7(0x209)](_0x10faa7(0x25c)),
      (this[_0x10faa7(0x2c4)][_0x10faa7(0x119)] = !![]),
      (this[_0x10faa7(0x2c4)][_0x10faa7(0x338)] = VisuMZ[_0x10faa7(0x29c)][_0x10faa7(0x180)][_0x10faa7(0x214)][_0x10faa7(0x161)]),
      (_0x5bc91b += VisuMZ[_0x10faa7(0x29c)][_0x10faa7(0x180)][_0x10faa7(0x214)][_0x10faa7(0x266)]),
      (_0x41cd1b += VisuMZ[_0x10faa7(0x29c)][_0x10faa7(0x180)][_0x10faa7(0x214)][_0x10faa7(0xf1)]),
      this['drawText'](_0x3daf06, _0x5bc91b, _0x41cd1b, _0x37e3bd, _0x10faa7(0x329)),
      (this[_0x10faa7(0x2c4)][_0x10faa7(0x119)] = ![]),
      this['resetFontSettings']();
  }),
  (Window_Base[_0x566724(0x1a1)][_0x566724(0x289)] = function (_0x33631d, _0x3ad900, _0x16b734, _0x22078e) {
    const _0x520301 = _0x566724;
    if (!VisuMZ['SkillsStatesCore'][_0x520301(0x180)][_0x520301(0x214)][_0x520301(0xe7)]) return;
    const _0x4caa29 = ImageManager[_0x520301(0x167)],
      _0x2a0db4 = ImageManager['iconHeight'] / 0x2,
      _0x2a2ac2 = ColorManager[_0x520301(0x21e)]();
    this[_0x520301(0x2f7)](_0x2a2ac2),
      this['changeOutlineColor']('rgba(0,\x200,\x200,\x201)'),
      (this['contents'][_0x520301(0x119)] = !![]),
      (this[_0x520301(0x2c4)][_0x520301(0x338)] = VisuMZ[_0x520301(0x29c)]['Settings'][_0x520301(0x214)][_0x520301(0x18c)]),
      (_0x16b734 += VisuMZ[_0x520301(0x29c)]['Settings'][_0x520301(0x214)][_0x520301(0x27e)]),
      (_0x22078e += VisuMZ[_0x520301(0x29c)][_0x520301(0x180)][_0x520301(0x214)]['DataOffsetY']);
    const _0x2f7c87 = String(_0x33631d[_0x520301(0x15b)](_0x3ad900['id']));
    this['drawText'](_0x2f7c87, _0x16b734, _0x22078e, _0x4caa29, _0x520301(0xca)), (this[_0x520301(0x2c4)][_0x520301(0x119)] = ![]), this['resetFontSettings']();
  }),
  (Window_Base[_0x566724(0x1a1)][_0x566724(0x212)] = function (_0x5e906f, _0x774815, _0x254662, _0x2a7b45) {
    const _0x252241 = _0x566724;
    if (!VisuMZ[_0x252241(0x29c)][_0x252241(0x180)][_0x252241(0x19a)][_0x252241(0x259)]) return;
    const _0x3af223 = _0x5e906f['buff'](_0x774815);
    if (_0x3af223 === 0x0) return;
    const _0x4540e1 = _0x5e906f[_0x252241(0x2c0)](_0x774815),
      _0x52332d = ImageManager[_0x252241(0x167)],
      _0x30efff = _0x3af223 > 0x0 ? ColorManager[_0x252241(0xcb)]() : ColorManager[_0x252241(0x33d)]();
    this[_0x252241(0x2f7)](_0x30efff),
      this['changeOutlineColor'](_0x252241(0x25c)),
      (this[_0x252241(0x2c4)][_0x252241(0x119)] = !![]),
      (this[_0x252241(0x2c4)][_0x252241(0x338)] = VisuMZ[_0x252241(0x29c)][_0x252241(0x180)][_0x252241(0x19a)][_0x252241(0x161)]),
      (_0x254662 += VisuMZ[_0x252241(0x29c)][_0x252241(0x180)][_0x252241(0x19a)]['TurnOffsetX']),
      (_0x2a7b45 += VisuMZ[_0x252241(0x29c)][_0x252241(0x180)]['Buffs'][_0x252241(0xf1)]),
      this['drawText'](_0x4540e1, _0x254662, _0x2a7b45, _0x52332d, 'right'),
      (this[_0x252241(0x2c4)][_0x252241(0x119)] = ![]),
      this[_0x252241(0x310)]();
  }),
  (Window_Base['prototype'][_0x566724(0x2ec)] = function (_0x5206b1, _0x514f54, _0x46b115, _0xde53f7) {
    const _0x42577a = _0x566724;
    if (!VisuMZ[_0x42577a(0x29c)][_0x42577a(0x180)][_0x42577a(0x19a)][_0x42577a(0xe7)]) return;
    const _0x23294a = _0x5206b1[_0x42577a(0x301)](_0x514f54),
      _0x447012 = _0x5206b1[_0x42577a(0x2d4)](_0x514f54),
      _0x440f26 = ImageManager['iconWidth'],
      _0x2c51e9 = ImageManager[_0x42577a(0x142)] / 0x2,
      _0x301946 = _0x447012 > 0x0 ? ColorManager['buffColor']() : ColorManager[_0x42577a(0x33d)]();
    this['changeTextColor'](_0x301946),
      this[_0x42577a(0x209)](_0x42577a(0x25c)),
      (this[_0x42577a(0x2c4)][_0x42577a(0x119)] = !![]),
      (this['contents'][_0x42577a(0x338)] = VisuMZ[_0x42577a(0x29c)][_0x42577a(0x180)][_0x42577a(0x19a)][_0x42577a(0x18c)]),
      (_0x46b115 += VisuMZ[_0x42577a(0x29c)]['Settings'][_0x42577a(0x19a)][_0x42577a(0x27e)]),
      (_0xde53f7 += VisuMZ[_0x42577a(0x29c)]['Settings'][_0x42577a(0x19a)]['DataOffsetY']);
    const _0x713960 = _0x42577a(0x31d)[_0x42577a(0x109)](Math[_0x42577a(0xdc)](_0x23294a * 0x64));
    this[_0x42577a(0x1ea)](_0x713960, _0x46b115, _0xde53f7, _0x440f26, 'center'), (this['contents'][_0x42577a(0x119)] = ![]), this[_0x42577a(0x310)]();
  }),
  (VisuMZ['SkillsStatesCore'][_0x566724(0x1c6)] = Window_StatusBase[_0x566724(0x1a1)][_0x566724(0x231)]),
  (Window_StatusBase[_0x566724(0x1a1)]['placeGauge'] = function (_0x5ea6da, _0x593dae, _0x44af99, _0x260075) {
    const _0x1754ec = _0x566724;
    if (_0x5ea6da[_0x1754ec(0x117)]()) _0x593dae = this['convertGaugeTypeSkillsStatesCore'](_0x5ea6da, _0x593dae);
    this[_0x1754ec(0xc4)](_0x5ea6da, _0x593dae, _0x44af99, _0x260075);
  }),
  (Window_StatusBase[_0x566724(0x1a1)][_0x566724(0xc4)] = function (_0x2be099, _0x10edb3, _0x3f0d08, _0x2216bb) {
    const _0x4e1161 = _0x566724;
    if ([_0x4e1161(0x8f), _0x4e1161(0x213)][_0x4e1161(0x1f5)](_0x10edb3[_0x4e1161(0x129)]())) return;
    VisuMZ['SkillsStatesCore'][_0x4e1161(0x1c6)][_0x4e1161(0x8e)](this, _0x2be099, _0x10edb3, _0x3f0d08, _0x2216bb);
  }),
  (Window_StatusBase[_0x566724(0x1a1)][_0x566724(0x249)] = function (_0x213e51, _0x18cd37) {
    const _0x38ca9a = _0x566724,
      _0x43833d = _0x213e51[_0x38ca9a(0x1d2)]()[_0x38ca9a(0x26d)];
    if (_0x18cd37 === 'hp' && _0x43833d[_0x38ca9a(0x26f)](/<REPLACE HP GAUGE:[ ](.*)>/i)) return String(RegExp['$1']);
    else {
      if (_0x18cd37 === 'mp' && _0x43833d[_0x38ca9a(0x26f)](/<REPLACE MP GAUGE:[ ](.*)>/i)) return String(RegExp['$1']);
      else return _0x18cd37 === 'tp' && _0x43833d['match'](/<REPLACE TP GAUGE:[ ](.*)>/i) ? String(RegExp['$1']) : _0x18cd37;
    }
  }),
  (VisuMZ[_0x566724(0x29c)][_0x566724(0xa6)] = Window_StatusBase[_0x566724(0x1a1)][_0x566724(0x2bd)]),
  (Window_StatusBase['prototype'][_0x566724(0x2bd)] = function (_0x1c29f6, _0x27cc15, _0x2efda7, _0x1f223c) {
    const _0x59b81c = _0x566724;
    if (!_0x1c29f6) return;
    Window_Base[_0x59b81c(0x1a1)][_0x59b81c(0x2bd)][_0x59b81c(0x8e)](this, _0x1c29f6, _0x27cc15, _0x2efda7, _0x1f223c);
  }),
  (VisuMZ[_0x566724(0x29c)][_0x566724(0x315)] = Window_SkillType[_0x566724(0x1a1)]['initialize']),
  (Window_SkillType[_0x566724(0x1a1)][_0x566724(0x1e1)] = function (_0x566a71) {
    const _0x40b440 = _0x566724;
    VisuMZ['SkillsStatesCore'][_0x40b440(0x315)][_0x40b440(0x8e)](this, _0x566a71), this[_0x40b440(0x33f)](_0x566a71);
  }),
  (Window_SkillType[_0x566724(0x1a1)]['createCommandNameWindow'] = function (_0x3f29e0) {
    const _0x2762f7 = _0x566724,
      _0x562d84 = new Rectangle(0x0, 0x0, _0x3f29e0[_0x2762f7(0x280)], _0x3f29e0[_0x2762f7(0x263)]);
    (this[_0x2762f7(0x135)] = new Window_Base(_0x562d84)), (this[_0x2762f7(0x135)][_0x2762f7(0x128)] = 0x0), this['addChild'](this[_0x2762f7(0x135)]), this[_0x2762f7(0x238)]();
  }),
  (Window_SkillType[_0x566724(0x1a1)][_0x566724(0xf7)] = function () {
    const _0x33d3b6 = _0x566724;
    Window_Command[_0x33d3b6(0x1a1)][_0x33d3b6(0xf7)][_0x33d3b6(0x8e)](this);
    if (this[_0x33d3b6(0x135)]) this[_0x33d3b6(0x238)]();
  }),
  (Window_SkillType[_0x566724(0x1a1)][_0x566724(0x238)] = function () {
    const _0x22ab45 = _0x566724,
      _0x4306fc = this[_0x22ab45(0x135)];
    _0x4306fc[_0x22ab45(0x2c4)][_0x22ab45(0x33a)]();
    const _0x21ce2c = this[_0x22ab45(0x189)](this[_0x22ab45(0x29a)]());
    if (_0x21ce2c === _0x22ab45(0x1dd) && this[_0x22ab45(0x1bc)]() > 0x0) {
      const _0x39f9f2 = this[_0x22ab45(0x244)](this['index']());
      let _0x2a038b = this[_0x22ab45(0x21d)](this[_0x22ab45(0x29a)]());
      (_0x2a038b = _0x2a038b[_0x22ab45(0x150)](/\\I\[(\d+)\]/gi, '')),
        _0x4306fc[_0x22ab45(0x310)](),
        this[_0x22ab45(0x145)](_0x2a038b, _0x39f9f2),
        this[_0x22ab45(0x341)](_0x2a038b, _0x39f9f2),
        this[_0x22ab45(0x18e)](_0x2a038b, _0x39f9f2);
    }
  }),
  (Window_SkillType[_0x566724(0x1a1)][_0x566724(0x145)] = function (_0x284e55, _0x8e92ec) {}),
  (Window_SkillType[_0x566724(0x1a1)][_0x566724(0x341)] = function (_0x15bfec, _0x374172) {
    const _0x3f2815 = _0x566724,
      _0x4daf4a = this[_0x3f2815(0x135)];
    _0x4daf4a[_0x3f2815(0x1ea)](_0x15bfec, 0x0, _0x374172['y'], _0x4daf4a['innerWidth'], _0x3f2815(0xca));
  }),
  (Window_SkillType[_0x566724(0x1a1)][_0x566724(0x18e)] = function (_0x4055bf, _0x1442a0) {
    const _0x5a9767 = _0x566724,
      _0x2c3e5a = this[_0x5a9767(0x135)],
      _0x3b08ef = $gameSystem[_0x5a9767(0xcd)](),
      _0x241ec6 = _0x1442a0['x'] + Math[_0x5a9767(0xd6)](_0x1442a0['width'] / 0x2) + _0x3b08ef;
    (_0x2c3e5a['x'] = _0x2c3e5a[_0x5a9767(0x280)] / -0x2 + _0x241ec6), (_0x2c3e5a['y'] = Math[_0x5a9767(0xd6)](_0x1442a0[_0x5a9767(0x263)] / 0x2));
  }),
  (Window_SkillType[_0x566724(0x1a1)][_0x566724(0xb9)] = function () {
    const _0x5e8faf = _0x566724;
    return Imported[_0x5e8faf(0x1e5)] && Window_Command[_0x5e8faf(0x1a1)][_0x5e8faf(0xb9)][_0x5e8faf(0x8e)](this);
  }),
  (Window_SkillType['prototype']['makeCommandList'] = function () {
    const _0x3c0610 = _0x566724;
    if (!this[_0x3c0610(0x1b0)]) return;
    const _0x33af99 = this[_0x3c0610(0x1b0)][_0x3c0610(0x28b)]();
    for (const _0x44a3e6 of _0x33af99) {
      const _0x3b74a4 = this[_0x3c0610(0x226)](_0x44a3e6);
      this[_0x3c0610(0xfe)](_0x3b74a4, _0x3c0610(0xb0), !![], _0x44a3e6);
    }
  }),
  (Window_SkillType[_0x566724(0x1a1)][_0x566724(0x226)] = function (_0x509e50) {
    const _0x153599 = _0x566724;
    let _0x6ad86a = $dataSystem['skillTypes'][_0x509e50];
    if (_0x6ad86a['match'](/\\I\[(\d+)\]/i)) return _0x6ad86a;
    if (this['commandStyle']() === _0x153599(0x108)) return _0x6ad86a;
    const _0x41287b = VisuMZ['SkillsStatesCore'][_0x153599(0x180)][_0x153599(0x1a5)],
      _0x3dd3b7 = $dataSystem[_0x153599(0x28c)][_0x153599(0x1f5)](_0x509e50),
      _0x254c59 = _0x3dd3b7 ? _0x41287b['IconStypeMagic'] : _0x41287b[_0x153599(0xe5)];
    return '\x5cI[%1]%2'['format'](_0x254c59, _0x6ad86a);
  }),
  (Window_SkillType[_0x566724(0x1a1)][_0x566724(0x2e2)] = function () {
    const _0x2d66fa = _0x566724;
    return VisuMZ[_0x2d66fa(0x29c)]['Settings'][_0x2d66fa(0x1a5)][_0x2d66fa(0x1ad)];
  }),
  (Window_SkillType[_0x566724(0x1a1)][_0x566724(0x1b8)] = function (_0x4e16a2) {
    const _0x2e5aa8 = _0x566724,
      _0x4201af = this['commandStyleCheck'](_0x4e16a2);
    if (_0x4201af === 'iconText') this[_0x2e5aa8(0x302)](_0x4e16a2);
    else _0x4201af === _0x2e5aa8(0x1dd) ? this[_0x2e5aa8(0x2b8)](_0x4e16a2) : Window_Command['prototype']['drawItem'][_0x2e5aa8(0x8e)](this, _0x4e16a2);
  }),
  (Window_SkillType[_0x566724(0x1a1)][_0x566724(0x164)] = function () {
    const _0x34faf8 = _0x566724;
    return VisuMZ[_0x34faf8(0x29c)]['Settings']['Skills'][_0x34faf8(0x16e)];
  }),
  (Window_SkillType['prototype'][_0x566724(0x189)] = function (_0x33391a) {
    const _0x5a17a9 = _0x566724;
    if (_0x33391a < 0x0) return _0x5a17a9(0x108);
    const _0x738e28 = this['commandStyle']();
    if (_0x738e28 !== _0x5a17a9(0x2c8)) return _0x738e28;
    else {
      if (this[_0x5a17a9(0x1bc)]() > 0x0) {
        const _0x5c744b = this[_0x5a17a9(0x21d)](_0x33391a);
        if (_0x5c744b['match'](/\\I\[(\d+)\]/i)) {
          const _0xd11b3d = this['itemLineRect'](_0x33391a),
            _0xb59581 = this['textSizeEx'](_0x5c744b)[_0x5a17a9(0x280)];
          return _0xb59581 <= _0xd11b3d[_0x5a17a9(0x280)] ? _0x5a17a9(0x17b) : _0x5a17a9(0x1dd);
        }
      }
    }
    return _0x5a17a9(0x108);
  }),
  (Window_SkillType['prototype'][_0x566724(0x302)] = function (_0x560a66) {
    const _0x1a1020 = _0x566724,
      _0x35ae4c = this[_0x1a1020(0x244)](_0x560a66),
      _0x44732c = this[_0x1a1020(0x21d)](_0x560a66),
      _0x52ffd1 = this[_0x1a1020(0x1fe)](_0x44732c)['width'];
    this[_0x1a1020(0x279)](this[_0x1a1020(0x1ac)](_0x560a66));
    const _0x57e48f = this[_0x1a1020(0x2e2)]();
    if (_0x57e48f === 'right') this[_0x1a1020(0x2da)](_0x44732c, _0x35ae4c['x'] + _0x35ae4c[_0x1a1020(0x280)] - _0x52ffd1, _0x35ae4c['y'], _0x52ffd1);
    else {
      if (_0x57e48f === 'center') {
        const _0x43d6b4 = _0x35ae4c['x'] + Math[_0x1a1020(0xd6)]((_0x35ae4c[_0x1a1020(0x280)] - _0x52ffd1) / 0x2);
        this[_0x1a1020(0x2da)](_0x44732c, _0x43d6b4, _0x35ae4c['y'], _0x52ffd1);
      } else this[_0x1a1020(0x2da)](_0x44732c, _0x35ae4c['x'], _0x35ae4c['y'], _0x52ffd1);
    }
  }),
  (Window_SkillType[_0x566724(0x1a1)][_0x566724(0x2b8)] = function (_0x5b8bc4) {
    const _0xbd1783 = _0x566724;
    this['commandName'](_0x5b8bc4)[_0xbd1783(0x26f)](/\\I\[(\d+)\]/i);
    const _0x4a90f1 = Number(RegExp['$1']) || 0x0,
      _0xe14b72 = this['itemLineRect'](_0x5b8bc4),
      _0x2853e4 = _0xe14b72['x'] + Math[_0xbd1783(0xd6)]((_0xe14b72[_0xbd1783(0x280)] - ImageManager['iconWidth']) / 0x2),
      _0x4e14b6 = _0xe14b72['y'] + (_0xe14b72[_0xbd1783(0x263)] - ImageManager[_0xbd1783(0x142)]) / 0x2;
    this[_0xbd1783(0x16b)](_0x4a90f1, _0x2853e4, _0x4e14b6);
  }),
  (VisuMZ['SkillsStatesCore'][_0x566724(0x299)] = Window_SkillStatus[_0x566724(0x1a1)]['refresh']),
  (Window_SkillStatus['prototype'][_0x566724(0x309)] = function () {
    const _0x4e27bc = _0x566724;
    VisuMZ[_0x4e27bc(0x29c)][_0x4e27bc(0x299)]['call'](this);
    if (this[_0x4e27bc(0x1b0)]) this[_0x4e27bc(0x251)]();
  }),
  (Window_SkillStatus[_0x566724(0x1a1)][_0x566724(0x251)] = function () {
    const _0x391530 = _0x566724;
    if (!Imported[_0x391530(0x1e5)]) return;
    if (!Imported[_0x391530(0x15a)]) return;
    const _0x2363e5 = this[_0x391530(0x1cb)]();
    let _0x1d5240 = this[_0x391530(0x2e5)]() / 0x2 + 0xb4 + 0xb4 + 0xb4,
      _0x2b7e6c = this['innerWidth'] - _0x1d5240 - 0x2;
    if (_0x2b7e6c >= 0x12c) {
      const _0x426000 = VisuMZ[_0x391530(0x163)]['Settings'][_0x391530(0x265)][_0x391530(0x20b)],
        _0x17c0cb = Math[_0x391530(0xd6)](_0x2b7e6c / 0x2) - 0x18;
      let _0x5be2b4 = _0x1d5240,
        _0x3a21c1 = Math[_0x391530(0xd6)]((this[_0x391530(0x1d9)] - Math[_0x391530(0x298)](_0x426000[_0x391530(0x11b)] / 0x2) * _0x2363e5) / 0x2),
        _0x85b8dc = 0x0;
      for (const _0x560c61 of _0x426000) {
        this[_0x391530(0x288)](_0x5be2b4, _0x3a21c1, _0x17c0cb, _0x560c61),
          _0x85b8dc++,
          _0x85b8dc % 0x2 === 0x0 ? ((_0x5be2b4 = _0x1d5240), (_0x3a21c1 += _0x2363e5)) : (_0x5be2b4 += _0x17c0cb + 0x18);
      }
    }
    this['resetFontSettings']();
  }),
  (Window_SkillStatus[_0x566724(0x1a1)][_0x566724(0x288)] = function (_0x138977, _0x2b89c6, _0x4ee87b, _0x26f118) {
    const _0x19c538 = _0x566724,
      _0x7a91cb = this['gaugeLineHeight']();
    this['resetFontSettings'](), this['drawParamText'](_0x138977, _0x2b89c6, _0x4ee87b, _0x26f118, !![]), this[_0x19c538(0x30f)](), (this[_0x19c538(0x2c4)][_0x19c538(0x338)] -= 0x8);
    const _0x32abbd = this[_0x19c538(0x1b0)][_0x19c538(0x342)](_0x26f118, !![]);
    this[_0x19c538(0x2c4)][_0x19c538(0x1ea)](_0x32abbd, _0x138977, _0x2b89c6, _0x4ee87b, _0x7a91cb, 'right');
  }),
  (VisuMZ[_0x566724(0x29c)]['Window_SkillList_includes'] = Window_SkillList[_0x566724(0x1a1)][_0x566724(0x1f5)]),
  (Window_SkillList[_0x566724(0x1a1)][_0x566724(0x1f5)] = function (_0x4ebbcc) {
    const _0x2073b9 = _0x566724;
    if (this[_0x2073b9(0x221)] <= 0x0) return ![];
    return this[_0x2073b9(0x16f)](_0x4ebbcc);
  }),
  (VisuMZ[_0x566724(0x29c)]['Window_SkillList_maxCols'] = Window_SkillList['prototype'][_0x566724(0x22b)]),
  (Window_SkillList[_0x566724(0x1a1)][_0x566724(0x22b)] = function () {
    const _0x7446e4 = _0x566724;
    return SceneManager[_0x7446e4(0x2a9)][_0x7446e4(0x1e2)] === Scene_Battle
      ? VisuMZ['SkillsStatesCore'][_0x7446e4(0x12f)][_0x7446e4(0x8e)](this)
      : VisuMZ['SkillsStatesCore']['Settings']['Skills'][_0x7446e4(0x1ae)];
  }),
  (VisuMZ['SkillsStatesCore'][_0x566724(0x2c7)] = Window_SkillList[_0x566724(0x1a1)][_0x566724(0x1ef)]),
  (Window_SkillList[_0x566724(0x1a1)][_0x566724(0x1ef)] = function (_0x2b3e55) {
    const _0x1fd2c4 = _0x566724,
      _0x3fef93 = this[_0x1fd2c4(0x1b0)] !== _0x2b3e55;
    VisuMZ[_0x1fd2c4(0x29c)][_0x1fd2c4(0x2c7)][_0x1fd2c4(0x8e)](this, _0x2b3e55),
      _0x3fef93 && this['_statusWindow'] && this[_0x1fd2c4(0x24a)]['constructor'] === Window_ShopStatus && this[_0x1fd2c4(0x24a)][_0x1fd2c4(0x232)](this[_0x1fd2c4(0x1ca)](0x0));
  }),
  (Window_SkillList['prototype'][_0x566724(0x13d)] = function (_0x123e22) {
    const _0x2caed7 = _0x566724;
    if (this[_0x2caed7(0x221)] === _0x123e22) return;
    if (!_0x123e22) return;
    (this[_0x2caed7(0x221)] = _0x123e22),
      this['refresh'](),
      this['scrollTo'](0x0, 0x0),
      this['_statusWindow'] && this[_0x2caed7(0x24a)]['constructor'] === Window_ShopStatus && this[_0x2caed7(0x24a)][_0x2caed7(0x232)](this[_0x2caed7(0x1ca)](0x0));
  }),
  (Window_SkillList['prototype']['includesSkillsStatesCore'] = function (_0x461d1e) {
    const _0x57521c = _0x566724;
    if (!_0x461d1e) return VisuMZ[_0x57521c(0x29c)]['Window_SkillList_includes'][_0x57521c(0x8e)](this, _0x461d1e);
    if (!this[_0x57521c(0xfa)](_0x461d1e)) return ![];
    if (!this[_0x57521c(0x2f0)](_0x461d1e)) return ![];
    if (!this[_0x57521c(0x137)](_0x461d1e)) return ![];
    return !![];
  }),
  (Window_SkillList['prototype']['checkSkillTypeMatch'] = function (_0x41a691) {
    const _0x1b1cf6 = _0x566724;
    return DataManager[_0x1b1cf6(0x286)](_0x41a691)[_0x1b1cf6(0x1f5)](this[_0x1b1cf6(0x221)]);
  }),
  (Window_SkillList['prototype']['checkShowHideNotetags'] = function (_0x1e6ad6) {
    const _0x3849f7 = _0x566724;
    if (!VisuMZ[_0x3849f7(0x29c)][_0x3849f7(0x2d8)](this[_0x3849f7(0x1b0)], _0x1e6ad6)) return ![];
    if (!VisuMZ[_0x3849f7(0x29c)][_0x3849f7(0x1ec)](this[_0x3849f7(0x1b0)], _0x1e6ad6)) return ![];
    if (!VisuMZ['SkillsStatesCore']['CheckVisibleSkillNotetags'](this[_0x3849f7(0x1b0)], _0x1e6ad6)) return ![];
    return !![];
  }),
  (VisuMZ[_0x566724(0x29c)]['CheckVisibleBattleNotetags'] = function (_0x30cfc3, _0x46d54a) {
    const _0x1a0997 = _0x566724,
      _0x5aef45 = _0x46d54a[_0x1a0997(0x26d)];
    if (_0x5aef45[_0x1a0997(0x26f)](/<HIDE IN BATTLE>/i) && $gameParty[_0x1a0997(0x85)]()) return ![];
    else return _0x5aef45[_0x1a0997(0x26f)](/<HIDE OUTSIDE BATTLE>/i) && !$gameParty[_0x1a0997(0x85)]() ? ![] : !![];
  }),
  (VisuMZ[_0x566724(0x29c)][_0x566724(0x1ec)] = function (_0x2e23cf, _0x42d4e1) {
    const _0x334711 = _0x566724,
      _0x528fc7 = _0x42d4e1[_0x334711(0x26d)];
    if (_0x528fc7[_0x334711(0x26f)](/<SHOW[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)) {
      const _0x53d65d = JSON[_0x334711(0x28f)]('[' + RegExp['$1'][_0x334711(0x26f)](/\d+/g) + ']');
      for (const _0x116c57 of _0x53d65d) {
        if (!$gameSwitches[_0x334711(0xcf)](_0x116c57)) return ![];
      }
      return !![];
    }
    if (_0x528fc7[_0x334711(0x26f)](/<SHOW ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)) {
      const _0x2e6594 = JSON[_0x334711(0x28f)]('[' + RegExp['$1'][_0x334711(0x26f)](/\d+/g) + ']');
      for (const _0x1986ae of _0x2e6594) {
        if (!$gameSwitches[_0x334711(0xcf)](_0x1986ae)) return ![];
      }
      return !![];
    }
    if (_0x528fc7[_0x334711(0x26f)](/<SHOW ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)) {
      const _0x18cf68 = JSON[_0x334711(0x28f)]('[' + RegExp['$1']['match'](/\d+/g) + ']');
      for (const _0x31da79 of _0x18cf68) {
        if ($gameSwitches[_0x334711(0xcf)](_0x31da79)) return !![];
      }
      return ![];
    }
    if (_0x528fc7['match'](/<HIDE[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)) {
      const _0x4fe60a = JSON['parse']('[' + RegExp['$1'][_0x334711(0x26f)](/\d+/g) + ']');
      for (const _0x3c4a51 of _0x4fe60a) {
        if (!$gameSwitches[_0x334711(0xcf)](_0x3c4a51)) return !![];
      }
      return ![];
    }
    if (_0x528fc7['match'](/<HIDE ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)) {
      const _0x385c70 = JSON[_0x334711(0x28f)]('[' + RegExp['$1'][_0x334711(0x26f)](/\d+/g) + ']');
      for (const _0x290a84 of _0x385c70) {
        if (!$gameSwitches['value'](_0x290a84)) return !![];
      }
      return ![];
    }
    if (_0x528fc7[_0x334711(0x26f)](/<HIDE ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)) {
      const _0xf71f40 = JSON['parse']('[' + RegExp['$1'][_0x334711(0x26f)](/\d+/g) + ']');
      for (const _0x10b56e of _0xf71f40) {
        if ($gameSwitches[_0x334711(0xcf)](_0x10b56e)) return ![];
      }
      return !![];
    }
    return !![];
  }),
  (VisuMZ[_0x566724(0x29c)]['CheckVisibleSkillNotetags'] = function (_0x10816b, _0x4df6ec) {
    const _0x26afa0 = _0x566724,
      _0x496a15 = _0x4df6ec[_0x26afa0(0x26d)];
    if (_0x496a15[_0x26afa0(0x26f)](/<SHOW IF LEARNED[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)) {
      const _0x19554f = JSON['parse']('[' + RegExp['$1'][_0x26afa0(0x26f)](/\d+/g) + ']');
      for (const _0x29514b of _0x19554f) {
        if (!_0x10816b[_0x26afa0(0x2be)](_0x29514b)) return ![];
      }
      return !![];
    } else {
      if (_0x496a15[_0x26afa0(0x26f)](/<SHOW IF LEARNED[ ](?:SKILL|SKILLS):[ ](.*)>/i)) {
        const _0x51d6da = RegExp['$1'][_0x26afa0(0xc9)](',');
        for (const _0x486561 of _0x51d6da) {
          const _0x4f017f = DataManager['getSkillIdWithName'](_0x486561);
          if (!_0x4f017f) continue;
          if (!_0x10816b['isLearnedSkill'](_0x4f017f)) return ![];
        }
        return !![];
      }
    }
    if (_0x496a15[_0x26afa0(0x26f)](/<SHOW IF LEARNED ALL[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)) {
      const _0x369576 = JSON[_0x26afa0(0x28f)]('[' + RegExp['$1'][_0x26afa0(0x26f)](/\d+/g) + ']');
      for (const _0x35f160 of _0x369576) {
        if (!_0x10816b[_0x26afa0(0x2be)](_0x35f160)) return ![];
      }
      return !![];
    } else {
      if (_0x496a15[_0x26afa0(0x26f)](/<SHOW IF LEARNED ALL[ ](?:SKILL|SKILLS):[ ](.*)>/i)) {
        const _0x7c463c = RegExp['$1'][_0x26afa0(0xc9)](',');
        for (const _0x4bc31f of _0x7c463c) {
          const _0x25b0d3 = DataManager[_0x26afa0(0x1e8)](_0x4bc31f);
          if (!_0x25b0d3) continue;
          if (!_0x10816b[_0x26afa0(0x2be)](_0x25b0d3)) return ![];
        }
        return !![];
      }
    }
    if (_0x496a15[_0x26afa0(0x26f)](/<SHOW IF LEARNED ANY[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)) {
      const _0x64d130 = JSON[_0x26afa0(0x28f)]('[' + RegExp['$1'][_0x26afa0(0x26f)](/\d+/g) + ']');
      for (const _0x38026f of _0x64d130) {
        if (_0x10816b['isLearnedSkill'](_0x38026f)) return !![];
      }
      return ![];
    } else {
      if (_0x496a15[_0x26afa0(0x26f)](/<SHOW IF LEARNED ANY[ ](?:SKILL|SKILLS):[ ](.*)>/i)) {
        const _0x4e76dc = RegExp['$1'][_0x26afa0(0xc9)](',');
        for (const _0x21a095 of _0x4e76dc) {
          const _0x1a9c28 = DataManager['getSkillIdWithName'](_0x21a095);
          if (!_0x1a9c28) continue;
          if (_0x10816b[_0x26afa0(0x2be)](_0x1a9c28)) return !![];
        }
        return ![];
      }
    }
    if (_0x496a15['match'](/<HIDE IF LEARNED[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)) {
      const _0x3127fb = JSON[_0x26afa0(0x28f)]('[' + RegExp['$1'][_0x26afa0(0x26f)](/\d+/g) + ']');
      for (const _0x59a894 of _0x3127fb) {
        if (!_0x10816b[_0x26afa0(0x2be)](_0x59a894)) return !![];
      }
      return ![];
    } else {
      if (_0x496a15['match'](/<HIDE IF LEARNED[ ](?:SKILL|SKILLS):[ ](.*)>/i)) {
        const _0x117944 = RegExp['$1'][_0x26afa0(0xc9)](',');
        for (const _0x58957a of _0x117944) {
          const _0x4da391 = DataManager['getSkillIdWithName'](_0x58957a);
          if (!_0x4da391) continue;
          if (!_0x10816b[_0x26afa0(0x2be)](_0x4da391)) return !![];
        }
        return ![];
      }
    }
    if (_0x496a15['match'](/<HIDE IF LEARNED ALL[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)) {
      const _0xd3bcb5 = JSON['parse']('[' + RegExp['$1']['match'](/\d+/g) + ']');
      for (const _0x37d68b of _0xd3bcb5) {
        if (!_0x10816b['isLearnedSkill'](_0x37d68b)) return !![];
      }
      return ![];
    } else {
      if (_0x496a15[_0x26afa0(0x26f)](/<HIDE IF LEARNED ALL[ ](?:SKILL|SKILLS):[ ](.*)>/i)) {
        const _0x1132b4 = RegExp['$1'][_0x26afa0(0xc9)](',');
        for (const _0x709ab2 of _0x1132b4) {
          const _0x293fca = DataManager[_0x26afa0(0x1e8)](_0x709ab2);
          if (!_0x293fca) continue;
          if (!_0x10816b[_0x26afa0(0x2be)](_0x293fca)) return !![];
        }
        return ![];
      }
    }
    if (_0x496a15['match'](/<HIDE IF LEARNED ANY[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)) {
      const _0x4f3a3d = JSON[_0x26afa0(0x28f)]('[' + RegExp['$1']['match'](/\d+/g) + ']');
      for (const _0x2cd7cb of _0x4f3a3d) {
        if (_0x10816b['isLearnedSkill'](_0x2cd7cb)) return ![];
      }
      return !![];
    } else {
      if (_0x496a15[_0x26afa0(0x26f)](/<HIDE IF LEARNED ANY[ ](?:SKILL|SKILLS):[ ](.*)>/i)) {
        const _0xfd1152 = RegExp['$1'][_0x26afa0(0xc9)](',');
        for (const _0x526646 of _0xfd1152) {
          const _0x338a18 = DataManager[_0x26afa0(0x1e8)](_0x526646);
          if (!_0x338a18) continue;
          if (_0x10816b[_0x26afa0(0x2be)](_0x338a18)) return ![];
        }
        return !![];
      }
    }
    if (_0x496a15['match'](/<SHOW IF (?:HAS|HAVE)[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)) {
      const _0x256b05 = JSON[_0x26afa0(0x28f)]('[' + RegExp['$1']['match'](/\d+/g) + ']');
      for (const _0x449ba4 of _0x256b05) {
        if (!_0x10816b[_0x26afa0(0x2d3)](_0x449ba4)) return ![];
      }
      return !![];
    } else {
      if (_0x496a15[_0x26afa0(0x26f)](/<SHOW IF (?:HAS|HAVE)[ ](?:SKILL|SKILLS):[ ](.*)>/i)) {
        const _0x461c46 = RegExp['$1'][_0x26afa0(0xc9)](',');
        for (const _0x363eea of _0x461c46) {
          const _0x4857c0 = DataManager[_0x26afa0(0x1e8)](_0x363eea);
          if (!_0x4857c0) continue;
          if (!_0x10816b[_0x26afa0(0x2d3)](_0x4857c0)) return ![];
        }
        return !![];
      }
    }
    if (_0x496a15['match'](/<SHOW IF (?:HAS|HAVE) ALL[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)) {
      const _0x5a2e1a = JSON[_0x26afa0(0x28f)]('[' + RegExp['$1'][_0x26afa0(0x26f)](/\d+/g) + ']');
      for (const _0x5014d1 of _0x5a2e1a) {
        if (!_0x10816b['hasSkill'](_0x5014d1)) return ![];
      }
      return !![];
    } else {
      if (_0x496a15[_0x26afa0(0x26f)](/<SHOW IF (?:HAS|HAVE) ALL[ ](?:SKILL|SKILLS):[ ](.*)>/i)) {
        const _0x161a92 = RegExp['$1'][_0x26afa0(0xc9)](',');
        for (const _0x440974 of _0x161a92) {
          const _0x4d4e93 = DataManager[_0x26afa0(0x1e8)](_0x440974);
          if (!_0x4d4e93) continue;
          if (!_0x10816b[_0x26afa0(0x2d3)](_0x4d4e93)) return ![];
        }
        return !![];
      }
    }
    if (_0x496a15['match'](/<SHOW IF (?:HAS|HAVE) ANY[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)) {
      const _0x5ab1f0 = JSON[_0x26afa0(0x28f)]('[' + RegExp['$1'][_0x26afa0(0x26f)](/\d+/g) + ']');
      for (const _0x104686 of _0x5ab1f0) {
        if (_0x10816b[_0x26afa0(0x2d3)](_0x104686)) return !![];
      }
      return ![];
    } else {
      if (_0x496a15[_0x26afa0(0x26f)](/<SHOW IF (?:HAS|HAVE) ANY[ ](?:SKILL|SKILLS):[ ](.*)>/i)) {
        const _0x8381cf = RegExp['$1'][_0x26afa0(0xc9)](',');
        for (const _0x2ed5a6 of _0x8381cf) {
          const _0x160c11 = DataManager[_0x26afa0(0x1e8)](_0x2ed5a6);
          if (!_0x160c11) continue;
          if (_0x10816b['hasSkill'](_0x160c11)) return !![];
        }
        return ![];
      }
    }
    if (_0x496a15[_0x26afa0(0x26f)](/<HIDE IF (?:HAS|HAVE)[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)) {
      const _0x1235ae = JSON[_0x26afa0(0x28f)]('[' + RegExp['$1'][_0x26afa0(0x26f)](/\d+/g) + ']');
      for (const _0x2e33b0 of _0x1235ae) {
        if (!_0x10816b[_0x26afa0(0x2d3)](_0x2e33b0)) return !![];
      }
      return ![];
    } else {
      if (_0x496a15[_0x26afa0(0x26f)](/<HIDE IF (?:HAS|HAVE)[ ](?:SKILL|SKILLS):[ ](.*)>/i)) {
        const _0xc6d12b = RegExp['$1'][_0x26afa0(0xc9)](',');
        for (const _0xd0119d of _0xc6d12b) {
          const _0x189451 = DataManager[_0x26afa0(0x1e8)](_0xd0119d);
          if (!_0x189451) continue;
          if (!_0x10816b[_0x26afa0(0x2d3)](_0x189451)) return !![];
        }
        return ![];
      }
    }
    if (_0x496a15[_0x26afa0(0x26f)](/<HIDE IF (?:HAS|HAVE) ALL[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)) {
      const _0x309588 = JSON[_0x26afa0(0x28f)]('[' + RegExp['$1']['match'](/\d+/g) + ']');
      for (const _0x2e6443 of _0x309588) {
        if (!_0x10816b['hasSkill'](_0x2e6443)) return !![];
      }
      return ![];
    } else {
      if (_0x496a15[_0x26afa0(0x26f)](/<HIDE IF (?:HAS|HAVE) ALL[ ](?:SKILL|SKILLS):[ ](.*)>/i)) {
        const _0xa0006f = RegExp['$1'][_0x26afa0(0xc9)](',');
        for (const _0x2797c9 of _0xa0006f) {
          const _0x22353b = DataManager['getSkillIdWithName'](_0x2797c9);
          if (!_0x22353b) continue;
          if (!_0x10816b[_0x26afa0(0x2d3)](_0x22353b)) return !![];
        }
        return ![];
      }
    }
    if (_0x496a15[_0x26afa0(0x26f)](/<HIDE IF (?:HAS|HAVE) ANY[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)) {
      const _0x1e666c = JSON[_0x26afa0(0x28f)]('[' + RegExp['$1'][_0x26afa0(0x26f)](/\d+/g) + ']');
      for (const _0x246122 of _0x1e666c) {
        if (_0x10816b['hasSkill'](_0x246122)) return ![];
      }
      return !![];
    } else {
      if (_0x496a15[_0x26afa0(0x26f)](/<HIDE IF (?:HAS|HAVE) ANY[ ](?:SKILL|SKILLS):[ ](.*)>/i)) {
        const _0x3cf5f1 = RegExp['$1'][_0x26afa0(0xc9)](',');
        for (const _0x1c58b4 of _0x3cf5f1) {
          const _0x1afdc3 = DataManager[_0x26afa0(0x1e8)](_0x1c58b4);
          if (!_0x1afdc3) continue;
          if (_0x10816b[_0x26afa0(0x2d3)](_0x1afdc3)) return ![];
        }
        return !![];
      }
    }
    return !![];
  }),
  (Window_SkillList['prototype'][_0x566724(0x137)] = function (_0x7f59d7) {
    const _0x58cddb = _0x566724,
      _0x74875f = _0x7f59d7['note'],
      _0x901a44 = VisuMZ[_0x58cddb(0x29c)][_0x58cddb(0x166)];
    return _0x901a44[_0x7f59d7['id']] ? _0x901a44[_0x7f59d7['id']][_0x58cddb(0x8e)](this, _0x7f59d7) : !![];
  }),
  (VisuMZ[_0x566724(0x29c)][_0x566724(0x158)] = Window_SkillList['prototype'][_0x566724(0x2aa)]),
  (Window_SkillList['prototype'][_0x566724(0x2aa)] = function () {
    const _0x5ed723 = _0x566724;
    VisuMZ[_0x5ed723(0x29c)]['Window_SkillList_makeItemList'][_0x5ed723(0x8e)](this),
      this[_0x5ed723(0x24d)]() && this[_0x5ed723(0x30a)](),
      this['canChangeSkillsThroughStateEffects']() && this[_0x5ed723(0x134)]();
  }),
  (Window_SkillList[_0x566724(0x1a1)]['canSortSkillTypeList'] = function () {
    return !![];
  }),
  (Window_SkillList[_0x566724(0x1a1)][_0x566724(0x30a)] = function () {
    const _0x5d7567 = _0x566724,
      _0xb22d90 = VisuMZ[_0x5d7567(0x29c)]['Settings']['Skills'][_0x5d7567(0x32f)] || [];
    return (
      _0xb22d90 && _0xb22d90[_0x5d7567(0x1f5)](this['_stypeId'])
        ? this[_0x5d7567(0x2a5)][_0x5d7567(0x1d6)]((_0x36efb4, _0x853e44) => {
            const _0x42f8fa = _0x5d7567;
            if (!!_0x36efb4 && !!_0x853e44) return _0x36efb4[_0x42f8fa(0x1b1)][_0x42f8fa(0x2c2)](_0x853e44[_0x42f8fa(0x1b1)]);
            return 0x0;
          })
        : VisuMZ['SkillsStatesCore'][_0x5d7567(0x24b)](this['_data']),
      this[_0x5d7567(0x2a5)]
    );
  }),
  (VisuMZ[_0x566724(0x29c)][_0x566724(0x24b)] = function (_0x2c435) {
    return (
      _0x2c435['sort']((_0x21769a, _0x435967) => {
        const _0x274986 = _0x336d;
        if (!!_0x21769a && !!_0x435967) {
          if (_0x21769a[_0x274986(0x107)] === undefined) VisuMZ[_0x274986(0x29c)]['Parse_Notetags_Skill_Sorting'](_0x21769a);
          if (_0x435967[_0x274986(0x107)] === undefined) VisuMZ[_0x274986(0x29c)]['Parse_Notetags_Skill_Sorting'](_0x435967);
          const _0x548e08 = _0x21769a['sortPriority'],
            _0x4ad3b4 = _0x435967['sortPriority'];
          if (_0x548e08 !== _0x4ad3b4) return _0x4ad3b4 - _0x548e08;
          return _0x21769a['id'] - _0x435967['id'];
        }
        return 0x0;
      }),
      _0x2c435
    );
  }),
  (VisuMZ[_0x566724(0x29c)][_0x566724(0x1fa)] = function (_0x459b91) {
    const _0x495700 = _0x566724;
    return (
      _0x459b91[_0x495700(0x1d6)]((_0x1272dc, _0x4eb484) => {
        const _0x94cbdf = _0x495700,
          _0x3c652c = $dataSkills[_0x1272dc],
          _0x5d8647 = $dataSkills[_0x4eb484];
        if (!!_0x3c652c && !!_0x5d8647) {
          if (_0x3c652c[_0x94cbdf(0x107)] === undefined) VisuMZ['SkillsStatesCore'][_0x94cbdf(0x26b)](_0x3c652c);
          if (_0x5d8647[_0x94cbdf(0x107)] === undefined) VisuMZ[_0x94cbdf(0x29c)]['Parse_Notetags_Skill_Sorting'](_0x5d8647);
          const _0x4e2ab1 = _0x3c652c[_0x94cbdf(0x107)],
            _0x38cea9 = _0x5d8647['sortPriority'];
          if (_0x4e2ab1 !== _0x38cea9) return _0x38cea9 - _0x4e2ab1;
          return _0x1272dc - _0x4eb484;
        }
        return 0x0;
      }),
      _0x459b91
    );
  }),
  (Window_SkillList[_0x566724(0x1a1)]['canChangeSkillsThroughStateEffects'] = function () {
    const _0x281b28 = _0x566724;
    if (!this[_0x281b28(0x1b0)]) return ![];
    if ([_0x281b28(0x13a), 'equipBattleSkills', _0x281b28(0xa8)][_0x281b28(0x1f5)](this[_0x281b28(0x221)])) return ![];
    return !![];
  }),
  (Window_SkillList[_0x566724(0x1a1)][_0x566724(0x134)] = function () {
    const _0x61564c = _0x566724,
      _0x3e4544 = this[_0x61564c(0x1b0)][_0x61564c(0x124)]();
    for (const _0x4b787e of _0x3e4544) {
      const _0x79533c = DataManager[_0x61564c(0x1de)](_0x4b787e);
      for (const _0xa822ce in _0x79533c) {
        const _0x50c542 = $dataSkills[Number(_0xa822ce)] || null,
          _0x4b2d2a = $dataSkills[Number(_0x79533c[_0xa822ce])] || null;
        while (this[_0x61564c(0x2a5)]['includes'](_0x50c542)) {
          const _0x51c9a1 = this[_0x61564c(0x2a5)]['indexOf'](_0x50c542);
          this[_0x61564c(0x2a5)][_0x51c9a1] = _0x4b2d2a;
        }
      }
    }
  }),
  (VisuMZ['SkillsStatesCore'][_0x566724(0x173)] = Window_SkillList[_0x566724(0x1a1)][_0x566724(0x1b8)]),
  (Window_SkillList[_0x566724(0x1a1)][_0x566724(0x1b8)] = function (_0x5ec6d0) {
    const _0x3bc37b = _0x566724,
      _0x332936 = this['itemAt'](_0x5ec6d0),
      _0x6e3e49 = _0x332936 ? _0x332936[_0x3bc37b(0x1b1)] : '';
    if (_0x332936) this[_0x3bc37b(0xbf)](_0x332936);
    VisuMZ[_0x3bc37b(0x29c)][_0x3bc37b(0x173)]['call'](this, _0x5ec6d0);
    if (_0x332936) _0x332936[_0x3bc37b(0x1b1)] = _0x6e3e49;
  }),
  (Window_SkillList[_0x566724(0x1a1)][_0x566724(0xbf)] = function (_0x43b6cc) {
    const _0x295394 = _0x566724;
    if (_0x43b6cc && _0x43b6cc[_0x295394(0x26d)][_0x295394(0x26f)](/<LIST NAME:[ ](.*)>/i)) {
      _0x43b6cc[_0x295394(0x1b1)] = String(RegExp['$1'])[_0x295394(0x2a8)]();
      for (;;) {
        if (_0x43b6cc[_0x295394(0x1b1)][_0x295394(0x26f)](/\\V\[(\d+)\]/gi))
          _0x43b6cc[_0x295394(0x1b1)] = _0x43b6cc['name'][_0x295394(0x150)](/\\V\[(\d+)\]/gi, (_0x5dc41a, _0x45b396) => $gameVariables['value'](parseInt(_0x45b396)));
        else break;
      }
    }
  }),
  (Window_SkillList[_0x566724(0x1a1)][_0x566724(0xee)] = function (_0x1dcfd4, _0x55687f, _0x5c7cf6, _0x3299c9) {
    const _0x5346e6 = _0x566724;
    Window_Base[_0x5346e6(0x1a1)][_0x5346e6(0xee)][_0x5346e6(0x8e)](this, this[_0x5346e6(0x1b0)], _0x1dcfd4, _0x55687f, _0x5c7cf6, _0x3299c9);
  }),
  (Window_SkillList['prototype'][_0x566724(0x1a9)] = function (_0x4f7d11) {
    const _0x5d960a = _0x566724;
    (this[_0x5d960a(0x24a)] = _0x4f7d11), this['callUpdateHelp']();
  }),
  (VisuMZ['SkillsStatesCore'][_0x566724(0x1b2)] = Window_SkillList['prototype'][_0x566724(0x2ee)]),
  (Window_SkillList[_0x566724(0x1a1)][_0x566724(0x2ee)] = function () {
    const _0x46c971 = _0x566724;
    VisuMZ[_0x46c971(0x29c)]['Window_SkillList_updateHelp'][_0x46c971(0x8e)](this),
      this['_statusWindow'] && this[_0x46c971(0x24a)]['constructor'] === Window_ShopStatus && this[_0x46c971(0x24a)][_0x46c971(0x232)](this[_0x46c971(0x2cd)]());
  });
function _0x4410() {
  const _0xbc5641 = [
    'maxCols',
    'slipHp',
    'slice',
    'getStateData',
    'onExpireBuffGlobalJS',
    'process_VisuMZ_SkillsStatesCore_State_Notetags',
    'placeGauge',
    'setItem',
    'Game_BattlerBase_states',
    'getAuraPassiveStateIDs',
    'statesByCategory',
    'Game_Action_testApply',
    'Parse_Notetags_Skill_JS',
    'updateCommandNameWindow',
    'ANY',
    'VisuMZ_1_ElementStatusCore',
    'isSceneBattle',
    'skillEnableJS',
    'reset',
    'allSwitchOff',
    'increaseBuff',
    'createShopStatusWindow',
    'shift',
    'ActorIDs',
    'priority',
    'itemLineRect',
    'StateID',
    'prepareResetStateCounts',
    '_currentActor',
    'concat',
    'convertGaugeTypeSkillsStatesCore',
    '_statusWindow',
    'SortByIDandPriority',
    'ShowJS',
    'canSortSkillTypeList',
    'VisuMZ_2_ClassChangeSystem',
    '\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20enabled\x20=\x20true;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20enabled;\x0a\x20\x20\x20\x20\x20\x20\x20\x20',
    'Sprite_Gauge_gaugeRate',
    'drawExtendedSkillsStatesCoreStatus',
    'isRightInputMode',
    '704SkWDxR',
    'mpCost',
    'Game_Unit_isAllDead',
    'outlineColor',
    'isStateCategoryAffected',
    'frameCount',
    'ShowTurns',
    'textColor',
    'addDebuff',
    'rgba(0,\x200,\x200,\x201)',
    'stateTpSlipDamageJS',
    'exit',
    'boxWidth',
    'regenerateAll',
    'drawFullGauge',
    'multiClass',
    'height',
    'log',
    'Param',
    'TurnOffsetX',
    'ARRAYFUNC',
    'setDebuffTurns',
    '311373lTJkWZ',
    'valueOutlineColor',
    'Parse_Notetags_Skill_Sorting',
    'menuActor',
    'note',
    'AURA_SYSTEM_ENABLED',
    'match',
    'stateHpSlipHealJS',
    'clearStates',
    '_stateMaxTurns',
    'itemWindowRectSkillsStatesCore',
    'PresetLabelGaugeColor',
    'removeState',
    'EnemyIndex',
    'passiveStates',
    'indexOf',
    'changePaintOpacity',
    'bypassRemoveStatesByDamage',
    'CheckIncompatibleStates',
    'gaugeRate',
    'Gauge',
    'DataOffsetX',
    'MeetsAuraStateConditions',
    'width',
    'setupSkillsStatesCore',
    'isStateExpired',
    'map',
    'redraw',
    'Parse_Notetags_Skill_Cost',
    'getSkillTypes',
    '<member-%1>',
    'drawExtendedParameter',
    'drawActorStateData',
    'gainSilentTp',
    'skillTypes',
    'magicSkills',
    'allSwitchOn',
    'canPaySkillCost',
    'parse',
    '_cache',
    'labelFontFace',
    'createItemWindow',
    'Armor-%1-%2',
    'stypeId',
    'Parse_Notetags_State_Category',
    'actor',
    'Game_Variables_onChange',
    'ceil',
    'Window_SkillStatus_refresh',
    'index',
    'setBackgroundType',
    'SkillsStatesCore',
    'heal',
    'isMaxBuffAffected',
    'ARRAYEVAL',
    'actions',
    'clearStateData',
    'damage',
    'SkillID',
    'Sprite_Gauge_redraw',
    '_data',
    'return\x200',
    'MAXMP',
    'trim',
    '_scene',
    'makeItemList',
    'recover\x20all',
    'LabelOutlineWidth',
    'success',
    'bitmap',
    'MDF',
    'stateHpSlipDamageJS',
    'checkSkillConditionsNotetags',
    'Game_BattlerBase_clearStates',
    'MatchLabelGaugeColor',
    '_buffs',
    'Game_BattlerBase_initMembers',
    'addChild',
    'Weapon-%1-%2',
    'drawItemStyleIcon',
    'SkillMenuStatusRect',
    'allBattleMembers',
    'Game_Battler_onBattleEnd',
    'getPassiveStatesFromObj',
    'drawActorIcons',
    'isLearnedSkill',
    'meetsSkillConditions',
    'buffTurns',
    '_animationIndex',
    'localeCompare',
    'currentDisplayedValue',
    'contents',
    '_lastStatesActionEndFrameCount',
    'currentValueSkillsStatesCore',
    'Window_SkillList_setActor',
    'auto',
    'LabelFontMainType',
    'getStypeIdWithName',
    'Game_BattlerBase_eraseBuff',
    'mainFontFace',
    'item',
    'hpDamage',
    'getStateIdWithName',
    'stateCategoriesResisted',
    'DEF',
    '_buffTurns',
    'hasSkill',
    'buff',
    'mpDamage',
    'slipTp',
    'usableSkills',
    'CheckVisibleBattleNotetags',
    'Game_BattlerBase_refresh',
    'drawTextEx',
    'MAXHP',
    'Sprite_Gauge_setup',
    'removeStatesAuto',
    '_itemWindow',
    'hide',
    'Scene_Boot_onDatabaseLoaded',
    'onExpireStateGlobalJS',
    'itemTextAlign',
    'LUK',
    'Game_Battler_addState',
    'colSpacing',
    'LabelOutlineSolid',
    '<actor-%1>',
    'Game_Unit_deadMembers',
    'onEraseDebuffJS',
    'onBattleEnd',
    'addBuffTurns',
    'drawActorBuffRates',
    'mainCommandWidth',
    'updateHelp',
    '_cache_getPassiveStatesFromObj',
    'checkShowHideNotetags',
    'applyBuffTurnManipulationEffects',
    'applyDebuffTurnManipulationEffects',
    'updateFrame',
    'convertPassiveStates',
    'Game_BattlerBase_increaseBuff',
    'FUNC',
    'changeTextColor',
    'ParseAllNotetags',
    'passiveStateObjects',
    'updateStatesActionEnd',
    'valueFontFace',
    'clamp',
    'adjustSkillCost',
    'enemyId',
    '%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.',
    'Game_BattlerBase_traitsSet',
    'paramBuffRate',
    'drawItemStyleIconText',
    'HiddenSkillTypes',
    'target',
    '_endingBattle',
    '\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20visible\x20=\x20true;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20this._actor;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this._actor;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20this._actor;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this._actor;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20visible;\x0a\x20\x20\x20\x20\x20\x20\x20\x20',
    'PassiveStates',
    'onEraseBuffGlobalJS',
    'refresh',
    'sortSkillList',
    'VisuMZ_1_ItemsEquipsCore',
    'isDebuffAffected',
    'buffLength',
    'labelOutlineColor',
    'resetTextColor',
    'resetFontSettings',
    'max',
    'onEraseStateGlobalJS',
    'onAddState',
    'slipMp',
    'Window_SkillType_initialize',
    '_checkingTraitsSetSkillsStatesCore',
    'number',
    '_bypassRemoveStateDamage_value',
    'Item-%1-%2',
    'action',
    'ignore',
    'equips',
    '%1%',
    'addPassiveStatesByPluginParameters',
    'Sprite_Gauge_currentValue',
    '10117116tUVTeG',
    '5722135YfCUUJ',
    'aliveMembers',
    'Game_BattlerBase_meetsSkillConditions',
    'Parse_Notetags_State_PassiveJS',
    'EnableLayout',
    'Game_Battler_addBuff',
    'Game_BattlerBase_buffIconIndex',
    'removeBuff',
    'right',
    'meetsSkillConditionsEnableJS',
    'createSkillCostText',
    'getAuraPassiveStatesFromObj',
    'Name',
    'registerCommand',
    'SortSkillTypesAbc',
    'miasmaStateIDs',
    'getColor',
    'eraseBuff',
    'TextJS',
    'stateData',
    'Parse_Notetags_State_ApplyRemoveLeaveJS',
    'clearAllStateOrigins',
    '_skillChangesFromState',
    'fontSize',
    'setStateOrigin',
    'clear',
    'getCurrentStateOriginKey',
    '_checkingPassiveStates',
    'debuffColor',
    'isBottomHelpMode',
    'createCommandNameWindow',
    'getStateOrigin',
    'commandNameWindowDrawText',
    'paramValueByName',
    'CalcJS',
    'removeByDamage',
    'maxSlipDamage',
    'Game_Switches_onChange',
    'Sprite_Gauge_currentMaxValue',
    'addAuraPassiveStateIDs',
    'isBuffExpired',
    'Sprite_StateIcon_updateFrame',
    'applySkillsStatesCoreEffects',
    'STRUCT',
    'shopStatusWindowRectSkillsStatesCore',
    'inBattle',
    'refreshAllMembers',
    'Sprite_StateIcon_loadBitmap',
    'BattleManager_endAction',
    'createPassiveStatesCache',
    'categories',
    'statusWidth',
    'onDatabaseLoaded',
    'MeetsAuraNoteConditions',
    'call',
    'none',
    'traitsSet',
    'Scene_Skill_createItemWindow',
    '7120015CszFkD',
    'statusWindowRect',
    'isStateRemoved',
    'MatchLabelColor',
    'meetsSkillConditionsGlobalJS',
    'getCurrentStateActiveUser',
    '_result',
    'onExpireBuff',
    'stateExpireJS',
    'allIcons',
    'enemy',
    'totalStateCategory',
    'MultiplierJS',
    'isAllDead',
    'clearStatesWithStateRetain',
    'ColorPositive',
    'Actor-%1-%2',
    'meetsPassiveStateGlobalConditionJS',
    'currentValue',
    'stateEraseJS',
    'Window_StatusBase_drawActorIcons',
    'drawActorStateTurns',
    'equipPassives',
    '_checkingVisuMzPassiveStateObjects',
    'drawActorIconsAllTurnCounters',
    'isSkillHidden',
    'makeSuccess',
    'multiclasses',
    'checkSkillConditionsSwitchNotetags',
    'toUpperCase',
    'skill',
    'anySwitchOff',
    'ParseStateNotetags',
    'push',
    'setStateData',
    '_stateData',
    'createKeyJS',
    '_bypassRemoveStateDamage_user',
    'setStateDisplay',
    'isUseModernControls',
    'shopStatusWindowRect',
    'retrieveStateColor',
    '_stateIDs',
    'Game_Battler_isStateAddable',
    'isUseSkillsStatesCoreUpdatedLayout',
    'alterSkillName',
    'GroupDigits',
    '_stateRetainType',
    'isMaxDebuffAffected',
    'resetStateCounts',
    'placeExactGauge',
    'isTargetBypassRemoveStatesByDamage',
    'stateColor',
    'helpWindowRect',
    'addPassiveStatesTraitSets',
    'split',
    'center',
    'buffColor',
    '_currentTroopUniqueID',
    'windowPadding',
    'Game_BattlerBase_resetStateCounts',
    'value',
    '_stateOrigin',
    'ParseSkillNotetags',
    'onAddDebuffGlobalJS',
    '_cache_getAuraPassiveStatesFromObj',
    'ColorBuff',
    'Game_Actor_learnSkill',
    'floor',
    'checkCacheKey',
    'addWindow',
    'addDebuffTurns',
    'tpCost',
    'Parse_Notetags_State_SlipEffectJS',
    'round',
    'eraseState',
    'JSON',
    'process_VisuMZ_SkillsStatesCore_Skill_Notetags',
    'stateTpSlipHealJS',
    'Game_BattlerBase_decreaseBuff',
    'buffIconIndex',
    'labelOutlineWidth',
    'isPlaytest',
    'IconStypeNorm',
    '_hidden',
    'ShowData',
    'isAppeared',
    'statusWindowRectSkillsStatesCore',
    'stateId',
    'Game_BattlerBase_eraseState',
    'Game_BattlerBase_overwriteBuffTurns',
    'overwriteBuffTurns',
    'drawSkillCost',
    'StackDebuffMax',
    'initMembersSkillsStatesCore',
    'TurnOffsetY',
    '_costSettings',
    '_tempActor',
    'currentMaxValue',
    'iconIndex',
    'isBuffOrDebuffAffected',
    'callUpdateHelp',
    '_classIDs',
    '_stypeIDs',
    'checkSkillTypeMatch',
    'anySwitchOn',
    'skillCostSeparator',
    'isStateAddable',
    'addCommand',
    'Sprite_Gauge_initMembers',
    'testSkillStatesCoreNotetags',
    '_cache_CheckBypassRemoveStatesByDamage',
    'onAddBuffJS',
    'process_VisuMZ_SkillsStatesCore_Notetags',
    'MaxTurns',
    'PayJS',
    'removeStatesByCategory',
    'sortPriority',
    'text',
    'format',
    'isSkillUsableForAutoBattle',
    'ParseClassIDs',
    'active',
    'onExpireDebuff',
    'Costs',
    'redrawSkillsStatesCore',
    'Scene_Skill_statusWindowRect',
    'itemWindowRect',
    'onAddDebuff',
    'removeOtherStatesOfSameCategory',
    '_bypassRemoveStateDamage_action',
    'setup',
    'applyStateTurnManipulationEffects',
    'isActor',
    'gainMp',
    'fontBold',
    'meetsPassiveStateConditionSwitches',
    'length',
    'forgetSkill',
    '474zALhUz',
    'endAction',
    'addState',
    'LayoutStyle',
    'skillMpCost',
    'stateTurns',
    'updateStateTurns',
    'states',
    'updatedLayoutStyle',
    'stateAddJS',
    'Game_Battler_regenerateAll',
    'opacity',
    'toLowerCase',
    'onAddStateCustomJS',
    'Game_Action_executeHpDamage_bypassStateDmgRemoval',
    'POSITIVE',
    'canUse',
    'death',
    'Window_SkillList_maxCols',
    '_states',
    'setStateTurns',
    '_stateTurns',
    'onExpireState',
    'changeSkillsThroughStateEffects',
    '_commandNameWindow',
    'removeStatesByCategoryAll',
    'checkShowHideJS',
    'process_VisuMZ_SkillsStatesCore_CheckForAuras',
    'meetsPassiveStateConditions',
    'skillLearn',
    'makeAdditionalSkillCostText',
    'maxTurns',
    'setStypeId',
    'allowCreateShopStatusWindow',
    'learnSkill',
    'valueFontSize',
    'keys',
    'iconHeight',
    'MeetsAuraObjConditions',
    '_subject',
    'commandNameWindowDrawBackground',
    'ARRAYNUM',
    'stateMpSlipDamageJS',
    'updateVisibility',
    'onRemoveState',
    'user',
    'MAT',
    '_passiveStateResults',
    'getCurrentTroopUniqueID',
    'gradientFillRect',
    'Turns',
    'replace',
    'remove',
    'skillTpCost',
    'getPassiveStateConditionClassesData',
    'makeResistedStateCategories',
    'state',
    'Game_Player_refresh',
    '_phase',
    'Window_SkillList_makeItemList',
    'isSkillTypeMatchForUse',
    'VisuMZ_1_MainMenuCore',
    'getStateDisplay',
    'onEraseStateJS',
    '_battler',
    'AGI',
    'traitObjects',
    'autoRemovalTiming',
    'TurnFontSize',
    'passiveStateIDs',
    'CoreEngine',
    'commandStyle',
    'helpWindowRectSkillsStatesCore',
    'skillVisibleJS',
    'iconWidth',
    'setStateRetainType',
    'updateTurnDisplaySprite',
    'loadBitmap',
    'drawIcon',
    'skillTypeWindowRect',
    'isSkillCostShown',
    'CmdStyle',
    'includesSkillsStatesCore',
    '%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.',
    'Game_Action_applyItemUserEffect',
    'onExpireStateJS',
    'Window_SkillList_drawItem',
    'description',
    'onEraseStateCustomJS',
    'skills',
    '_skillTypeWindow',
    'clearStateRetainType',
    '_stored_buffColor',
    'ColorDebuff',
    'iconText',
    'Enemy-%1-%2',
    'getStateOriginByKey',
    '_skillIDs',
    'onExpireDebuffJS',
    'Settings',
    'ColorNegative',
    '<troop-%1>',
    'opponentsUnit',
    'addPassiveStates',
    'CmdWidth',
    'Scene_Skill_skillTypeWindowRect',
    'getPassiveStateConditionSwitchData',
    'removeBuffsAuto',
    'commandStyleCheck',
    'test',
    'Game_Troop_setup',
    'DataFontSize',
    'paySkillCost',
    'commandNameWindowCenter',
    'StateTurnsActorChangeBy',
    '_tempBattler',
    'Scene_Skill_itemWindowRect',
    'gaugeBackColor',
    'uiMenuStyle',
    'ValueFontMainType',
    'attacker',
    'Skill-%1-%2',
    '%1\x20%2\x20%3',
    'anchor',
    '%1-%2-%3',
    'Buffs',
    'skillId',
    'isStateCategoryResisted',
    'onEraseBuffJS',
    'applyStateCategoryRemovalEffects',
    'ValueOutlineSolid',
    'onExpireStateCustomJS',
    'prototype',
    'addPassiveStatesByNotetag',
    'currentMaxValueSkillsStatesCore',
    'executeHpDamage',
    'Skills',
    'Enemy',
    '_cache_getPassiveStateConditionSwitchData',
    'ColorNeutral',
    'setStatusWindow',
    'onEraseDebuffGlobalJS',
    'ARRAYSTR',
    'isCommandEnabled',
    'CmdTextAlign',
    'ListWindowCols',
    'meetsPassiveStateConditionClasses',
    '_actor',
    'name',
    'Window_SkillList_updateHelp',
    'ActionEndUpdate',
    'CheckBypassRemoveStatesByDamage',
    'onExpireDebuffGlobalJS',
    'getStateRetainType',
    'stateMpSlipHealJS',
    'drawItem',
    'getClassIdWithName',
    'labelColor',
    'isBuffPrevented',
    'maxItems',
    'convertTargetToStateOriginKey',
    'stateMaximumTurns',
    'groupDefeat',
    'recalculateSlipDamageJS',
    'uiHelpPosition',
    'onChange',
    'SkillEnemyPaySkillCost',
    'Game_BattlerBase_isStateResist',
    '_categoryWindow',
    'Window_StatusBase_placeGauge',
    'addStateTurns',
    'hasState',
    'mainAreaHeight',
    'itemAt',
    'gaugeLineHeight',
    'onAddStateMakeCustomSlipValues',
    'statePassiveConditionJS',
    '#%1',
    'applyItemUserEffect',
    'clearStateDisplay',
    'addPassiveStatesFromOtherPlugins',
    'currentClass',
    'uiInputPosition',
    'canClearState',
    'GaugeDrawJS',
    'sort',
    '1807676roVtjr',
    'mainFontSize',
    'innerHeight',
    'ParseSkillChangessIntoData',
    'getStateReapplyRulings',
    'filter',
    'icon',
    'getSkillChangesFromState',
    'members',
    'createTurnDisplaySprite',
    'initialize',
    'constructor',
    'removeStatesByDamage',
    'status',
    'VisuMZ_0_CoreEngine',
    'AutoAddState',
    '<enemy-%1>',
    'getSkillIdWithName',
    'Game_Actor_skillTypes',
    'drawText',
    'Game_Actor_forgetSkill',
    'CheckVisibleSwitchNotetags',
    'initMembers',
    'shopStatusWidth',
    'setActor',
    'hasStateCategory',
    'Scene_Skill_helpWindowRect',
    'setBuffTurns',
    'friendsUnit',
    'restriction',
    'includes',
    'meetsPassiveStateConditionJS',
    '\x0a\x20\x20\x20\x20\x20\x20\x20\x20let\x20%2\x20=\x200;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20origin\x20=\x20this.getStateOrigin(stateId);\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20state\x20=\x20$dataStates[stateId];\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20origin;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20origin;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20%2\x20=\x20Math.round(Math.max(0,\x20%2)\x20*\x20%3);\x0a\x20\x20\x20\x20\x20\x20\x20\x20this.setStateData(stateId,\x20\x27%4\x27,\x20%2);\x0a\x20\x20\x20\x20',
    'subject',
    '_stateDisplay',
    'SortByIDandPriorityUsingIDs',
    'deadMembers',
    '1000VdIFcI',
    'makeCurrentTroopUniqueID',
    'textSizeEx',
    'isBuffAffected',
    'Class-%1-%2',
    '_shopStatusWindow',
    '_colorCache',
    'isGroupDefeatStateAffected',
    'numberFontFace',
    'isAlive',
    '_turnDisplaySprite',
    'SkillSceneStatusBgType',
    'add',
    'changeOutlineColor',
    '_cache_getPassiveStateConditionClassesData',
    'DisplayedParams',
    'onEraseDebuff',
    'adjustItemWidthByShopStatus',
    'StackBuffMax',
    'rgba(0,\x200,\x200,\x200)',
    'Game_BattlerBase_die',
    'skillTypeWindowRectSkillsStatesCore',
    'drawActorBuffTurns',
    'untitled',
    'States',
    'isStateRestrict',
    'ConvertParams',
    'isUserBypassRemoveStatesByDamage',
    '530162kvUqII',
    'min',
    'isStateResist',
    'valueOutlineWidth',
    'gaugeColor1',
    'commandName',
    'normalColor',
    'recoverAll',
    'ReapplyRules',
    '_stypeId',
    'NEGATIVE',
    'helpAreaHeight',
    'onEraseBuff',
    'isPassiveStateStackable',
    'makeCommandName',
    'BattleHiddenSkillTypes',
    'getColorDataFromPluginParameters',
    'isStateAffected',
    'isDead',
  ];
  _0x4410 = function () {
    return _0xbc5641;
  };
  return _0x4410();
}
