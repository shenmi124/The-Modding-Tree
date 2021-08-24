addLayer("$", {
    name: "$", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "R-$", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#FFFF6F",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "$", // Name of prestige currency
    baseResource: "time", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0, // Prestige currency exponent
	position:1,
		doReset(resettingLayer) {
            layerDataReset(this.layer ,["upgrades","points","best", "total", "upgrades"])
		},
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "$", description: "$: Reset for prestige points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},
		upgrades: {
		11:{
		title: "start",
		description: "You found a free idle game",
		cost: new Decimal(0),
		},
		12:{
		title: "java?",
		description: "You can buy some coffee to stay up late to play The Game Tree (sleep time 12 hours> 9 hours).",
		cost: new Decimal(5),
		unlocked(){
			return hasUpgrade("$",11)
		},
		},
		13:{
		title: "Don't sleep in hell!",
		description: "You can buy a new bed to Improve sleep quality (sleep time 9 hours> 6 hours).",
		cost: new Decimal(20),
		unlocked(){
			return hasUpgrade("$",12)
		},
		},
		14:{
		title: "Adrenaline",
		description: "You can buy some adrenalines to Improve sleep quality (sleep time 6 hours> 3 hours).",
		cost: new Decimal(200),
		unlocked(){
			return hasUpgrade("$",13)
		},
		},
		21:{
		title: "Investment is risky",
		description: "You can unlock a milestone",
		cost: new Decimal(50),
		unlocked(){
		return hasUpgrade("$",12)
		},
		},
		},
		milestones: {
		0: {
        requirementDescription: "75$",
        effectDescription: "Get 5% $ every second",
		unlocked(){return hasUpgrade("$",21)},
        done() {
		return player.$.points.gte(75) && hasUpgrade("$",21)},
		},
		},
		passiveGeneration() { return hasMilestone("$", 0)?0.05:0 },
})


addLayer("w", {
    name: "wood",
    symbol: "V-W",
    position: 1,
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#FF8000",
    requires: new Decimal(5), 
    resource: "wood",
    baseResource: "time", 
    baseAmount() {return player.points},
    type: "normal",
    exponent: 0.55,
	position:0,
    gainMult() {
        mult = new Decimal(1)
        return mult
    },
    gainExp() { 
        return new Decimal(1)
    },
    row: 0, 
    hotkeys: [
        {key: "w", description: "w: Reset for prestige points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},
		upgrades:{
		11:{
		title: "wood!",
		description: "You got wood, which makes you feel excited, you want to spend more time playing this game",
		cost: new Decimal(5),
		effect() {
        let eff = player[this.layer].points.add(1).pow(0.10)
		if (hasUpgrade("w", 12)) eff = player[this.layer].points.add(1).pow(0.15);
		if (hasUpgrade('w', 13)) eff = eff.times(upgradeEffect('w', 13));
		if (hasUpgrade('w', 21)) eff = eff.times(upgradeEffect('w', 21));
		return eff
		},
		effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, 
		},
		12:{
		title: "Crafts",
		description: "The upgrade effect in the up, down, left, and right directions is increased by the power of 0.05",
		cost: new Decimal(20),
		unlocked(){
		return hasUpgrade("w",13)
		},
		},
		13:{
		title: "The Game Tree is AWESOME!",
		description: "Strengthen “wood”" ,
		cost: new Decimal(10),
		unlocked(){
		return hasUpgrade("w",11)
		},
		effect() {
        let eff = player[this.layer].points.add(1).pow(0.01)
		if (hasUpgrade("w", 12)) eff = player[this.layer].points.add(1).pow(0.06);
		if (hasUpgrade('w', 21)) eff = eff.times(upgradeEffect('w', 21));
		return eff
		},
		effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, 
		},
		14:{
		title: "Only used three times",
		description: "Make wooden_pickaxe",
		cost: new Decimal(new Decimal("30")),
		unlocked(){
		return hasUpgrade("w",13)
		},
		},
		15:{
		title: "too much!",
		description: "You can sell your woods(not made)",
		cost: new Decimal (50),
		unlocked(){
		return hasUpgrade("w",13)
		},
		},
		21:{
		title: "too too much!",
		description: "Strengthen “wood” & ”The Game Tree is AWESOME!“",
				effect() {
        let eff = player[this.layer].points.add(1).pow(0.03)
		return eff
		},
				effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, 
		cost: new Decimal (150),
		unlocked(){
		return hasChallenge("s",11)
		},
		},
		},
		clickables: {
		11: {
        display() {return "5wood -> 2$"},
		cost: new Decimal(10),
		unlocked(){
		return hasUpgrade("w",15)
		},
		canClick() {
		let wc = player[this.layer].points
		if (wc >= 10) 
		return true
		},
		onClick(){
		player.w.points = player.w.points.sub(5)
		player.$.points = player.$.points.add(2)
		},
		},
		},
})


addLayer("s", {
    name: "stone",
    symbol: "V-S",
    position: 0,
    startData() { return {
        unlocked:false,
		points: new Decimal(0),
    }},
    color: "#ADADAD",
    requires:new Decimal(30),
    resource: "stone",
    baseResource: "wood", 
    baseAmount() {return player.w.points},
    type: "normal",
    exponent: 0.5,
	branches: ["w"],
    gainMult() {
        mult = new Decimal(1)
        return mult
    },
    gainExp() { 
        return new Decimal(1)
    },
    row: 1, 
    hotkeys: [
        {key: "s", description: "s: Reset for prestige points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return player[this.layer].unlocked || (hasUpgrade("w",14))},
			milestones: {
		0: {
			requirementDescription: "1stone",
			effectDescription: "Unlock a new challenge",
		done() {
			return player.s.points.gte(1)},
		},
		},
			challenges: {
		11: {
			name: "No wood in the mine",
			challengeDescription: "This makes you negative, the Time acquisition is only 30%",
			unlocked() { return hasMilestone("s",0) },
			canComplete: function() {return player.w.points.gte(50)},
			goalDescription:"50 wood",
			rewardDescription: "Unlock a new wood upgrade",
			},
		}
})
