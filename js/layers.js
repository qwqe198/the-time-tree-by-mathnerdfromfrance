addLayer("t", {
    tabFormat: {
        "Main": {
            content:[
                "main-display",
                "blank",
                ["display-text", function() { return "你每秒获得 <h2><b>" + format(getResetGain("t")) + "</b></h2> 时间点数" },],
                "blank",
                ["display-text", function() { return "时间点数增益公式 : Log10(时间 + 1)" + (tmp.t.getExp.eq(1) ? "":"<sup>" + format(tmp.t.getExp) + "</sup>") + ((tmp.t.getMult.eq(1) ? "":" * " + format(tmp.t.getMult))) },],
            ],
        },
        "Upgrades": {
            content: [
                "main-display",
                "blank",
                ["display-text", function() { return "警告 : 购买时间点数升级将重置时间和其他层级" },],
                "blank",
                ["display-text", function() { return "你需要 " + player.t.upgradesUnlock[player.t.upgrades.length] + " 才能解锁下一个升级"},],
                "blank",
                "upgrades",
            ],
        },
    },
    name: "时间点数", // 这是可选的，仅在少数地方使用。如果省略，则使用层级ID。
    symbol: "TP", // 显示在层级节点上的符号。默认是层级ID的首字母大写
    row: "side", // 层级在树中的行（0是第一行）
    position: 0, // 行内的水平位置。默认使用层级ID并按字母顺序排序
    color: "#159d15",
    layerShown(){return true},
    startData() { return {
        unlocked: true,
        points: new Decimal(0),
        best: new Decimal(0),
        upgradesUnlock: ["3次第一点可购买", "20次第一点可购买", "第一次速度升级购买", "30次第一点可购买"],
    }},
    requires() { return new Decimal(1) }, // 可以是一个函数，考虑需求增加
    resource: "时间点数", // 声望货币的名称
    type: "custom", // normal: 获得货币的成本取决于获得的量。static: 成本取决于你已经拥有的量
    getResetGain() {
        gain = player.points.add(1).log10()
        gain = gain.pow(tmp.t.getExp)
        gain = gain.times(tmp.t.getMult)
        return gain
    },
    getMult() {
        let mult = new Decimal(1)
        if(hasUpgrade("t", 12)) mult = mult.times(tmp.t.upgrades[12].effect)
        if(hasUpgrade("t", 13)) mult = mult.times(tmp.t.upgrades[13].effect)
        return mult
    },
    getExp() {
        let exp = new Decimal(1)
        return exp
    },
	effect() {
		eff = new Decimal(1)
		return eff
	},
	effectDescription() { return "" },
    passiveGeneration() { return true },
    doReset(resettingLayer){
        let keep = []
        if (layers[resettingLayer].row > this.row) layerDataReset(this.layer, keep)
    },
    upgrades: {
        11: {
            title: "第一次重置",
            description: "获得3倍点数",
            cost() { return new Decimal(1000) },
            unlocked() { return getBuyableAmount("p", 11).gte(3) || hasUpgrade("t", 11) },
            onPurchase() { TimeUpgradePurchase() },
        },
        12: {
            title: "第二次重置",
            description: "时间点数提升其自身增益",
            cost() { return new Decimal(2000) },
            unlocked() { return (getBuyableAmount("p", 11).gte(20) || hasUpgrade("t", 12)) && hasUpgrade("t", 11) },
            effect() { 
				eff = new Decimal(player.t.points.add(1).log10().add(1))
                return eff
            },
            effectDisplay() { return "*" + format(tmp.t.upgrades[12].effect) + " 时间点数增益" },
            onPurchase() { TimeUpgradePurchase() },
        },
        13: {
            title: "第三次重置",
            description: "点数提升时间点数增益",
            cost() { return new Decimal(8000) },
            unlocked() { return (hasUpgrade("s", 11) || hasUpgrade("t", 13)) && hasUpgrade("t", 12) },
            effect() { 
				eff = new Decimal(player.p.points.add(1).log10().add(1).pow(0.25))
                return eff
            },
            effectDisplay() { return "*" + format(tmp.t.upgrades[13].effect) + " 时间点数增益" },
            onPurchase() { TimeUpgradePurchase() },
        },
        14: {
            title: "第四次重置",
            description: "时间点数提升点数增益",
            cost() { return new Decimal(17500) },
            unlocked() { return (getBuyableAmount("p", 11).gte(30) || hasUpgrade("t", 14)) && hasUpgrade("t", 13) },
            effect() { 
				eff = new Decimal(player.t.points.add(1).log10().add(1).log10().add(1).pow(5))
                return eff
            },
            effectDisplay() { return "*" + format(tmp.t.upgrades[14].effect) + " 点数增益" },
            onPurchase() { TimeUpgradePurchase() },
        },
    },
})
addLayer("p", {
    tabFormat: {
        "Main": {
            content:[
                "main-display",
                "blank",
                ["display-text", function() { return "你每秒获得 <h2><b>" + format(getResetGain("p")) + "</b></h2> 点数" },],
                "blank",
                ["display-text", function() { return "点数增益公式 : Log10(时间点数 + 1)" + (tmp.p.getExp.eq(1) ? "":"<sup>" + format(tmp.p.getExp) + "</sup>") + ((tmp.p.getMult.eq(1) ? "":" * " + format(tmp.p.getMult))) },],
            ],
        },
        "Upgrades": {
            content: [
                "main-display",
                "blank",
                "upgrades",
            ],
        },
        "Buyables": {
            content: [
                "main-display",
                "blank",
                "buyables",
            ],
            unlocked() { return hasUpgrade("p", 13) },
        },
    },
    name: "点数", // 这是可选的，仅在少数地方使用。如果省略，则使用层级ID。
    symbol: "P", // 显示在层级节点上的符号。默认是层级ID的首字母大写
    row: 0, // 层级在树中的行（0是第一行）
    position: 0, // 行内的水平位置。默认使用层级ID并按字母顺序排序
    color: "#e66666",
    layerShown(){return true},
    startData() { return {
        unlocked: true,
        points: new Decimal(0),
        best: new Decimal(0),
    }},
    requires() { return new Decimal(1) }, // 可以是一个函数，考虑需求增加
    resource: "点数", // 声望货币的名称
    type: "custom", // normal: 获得货币的成本取决于获得的量。static: 成本取决于你已经拥有的量
    getResetGain() {
        gain = player.t.points.add(1).log10()
        gain = gain.pow(tmp.p.getExp)
        gain = gain.times(tmp.p.getMult)
        return gain
    },
    getMult() {
        let mult = new Decimal(1)
        if(hasUpgrade("p", 11)) mult = mult.times(tmp.p.upgrades[11].effect)
        if(hasUpgrade("p", 12)) mult = mult.times(tmp.p.upgrades[12].effect)
        if(hasUpgrade("p", 21)) mult = mult.times(5)
        if(hasUpgrade("t", 11)) mult = mult.times(3)
        mult = mult.times(tmp.p.buyables[11].effect)
        mult = mult.times(tmp.s.effect)
        return mult
    },
    getExp() {
        let exp = new Decimal(1)
        if(hasUpgrade("p", 14)) exp = exp.times(tmp.p.upgrades[14].effect)
        if(hasUpgrade("p", 23)) exp = exp.add(tmp.p.upgrades[23].effect)
        return exp
    },
	effect() {
		eff = new Decimal(1)
		return eff
	},
	effectDescription() { return "" },
    passiveGeneration() { return true },
    doReset(resettingLayer){
        let keep = []
        if (layers[resettingLayer].row > this.row) layerDataReset(this.layer, keep)
    },
    upgrades: {
        11: {
            title: "P",
            description: "点数提升点数增益",
            cost() { return new Decimal(50) },
            unlocked() { return player.p.unlocked || hasUpgrade("p", 11) },
            effect() { 
				eff = new Decimal(player.p.points.add(1).log10().add(1))
                return eff
            },
            effectDisplay() { return "*" + format(tmp.p.upgrades[11].effect) + " 点数增益" },
        },
        12: {
            title: "O",
            description: "时间提升点数增益",
            cost() { return new Decimal(500) },
            unlocked() { return player.p.unlocked || hasUpgrade("p", 12) },
            effect() { 
				eff = new Decimal(player.points.add(1).log10().add(1).log10().add(1).pow(3))
                return eff
            },
            effectDisplay() { return "*" + format(tmp.p.upgrades[12].effect) + " 点数增益" },
        },
        13: {
            title: "I",
            description: "解锁一个点数可购买项",
            cost() { return new Decimal(1000) },
            unlocked() { return player.p.unlocked || hasUpgrade("p", 13) },
        },
        14: {
            title: "N",
            description: "点数基础增益根据时间点数提升",
            cost() { return new Decimal(50000) },
            unlocked() { return hasUpgrade("t", 11) || hasUpgrade("p", 14) },
            effect() { 
				eff = new Decimal(5).minus(new Decimal(4).div(player.t.points.add(1).pow(0.05)))
                return eff
            },
            effectDisplay() { return "^" + format(tmp.p.upgrades[14].effect) + " 基础点数增益" },
        },
        15: {
            title: "T",
            description: "第一个可购买项的基础效果增加0.1",
            cost() { return new Decimal("5e6") },
            unlocked() { return hasUpgrade("t", 11) || hasUpgrade("p", 15) },
        },
        21: {
            title: "更多点数",
            description: "点数增益乘以5",
            cost() { return new Decimal("1e8") },
            unlocked() { return (hasUpgrade("t", 11) && player.p.points.gte("1e7")) || hasUpgrade("t", 12) || hasUpgrade("p", 21) },
        },
        22: {
            title: "新层级",
            description: "解锁下一个层级",
            cost() { return new Decimal("1e10") },
            unlocked() { return (hasUpgrade("t", 12) && hasUpgrade("p", 21)) || hasUpgrade("t", 13) || hasUpgrade("p", 22) },
        },
        23: {
            title: "快速点数",
            description: "速度点数提升基础增益指数",
            cost() { return new Decimal("1e12") },
            unlocked() { return (hasUpgrade("t", 13) && hasUpgrade("s", 11)) || hasUpgrade("t", 14) || hasUpgrade("p", 23) },
            effect() { 
				eff = new Decimal(player.s.points.add(1).log10().add(1).log10().add(1).pow(0.75))
                return eff
            },
            effectDisplay() { return "+" + format(tmp.p.upgrades[23].effect) + " 基础点数增益指数" },
        },
    },
    buyables: {
        11: {
            title: "点数+",
            display() {
                return "提升点数增益 " + format(tmp.p.buyables[11].effect) + "x<br>成本 : " + format(this.cost(getBuyableAmount("p", 11))) + " 点数"
            },
            unlocked() { return hasUpgrade("p", 13) },
            cost(x) {
                return new Decimal(1000).times(new Decimal(2).add(x.times(0.01)).pow(x))
            },
            canAfford() { 
                return player.p.points.gte(this.cost(getBuyableAmount("p", 11)))
            },
            buy() { 
                player.p.points = player.p.points.minus(this.cost(getBuyableAmount("p", 11)))
                setBuyableAmount("p", 11, getBuyableAmount("p", 11).add(1))
            },
            effect() { 
                eff = new Decimal(1.5)
                if(hasUpgrade("p", 15)) eff = eff.add(0.1)
                eff = eff.pow(getBuyableAmount("p", 11))
                return eff
            }
        },
    },
})
addLayer("s", {
    tabFormat: {
        "Main": {
            content:[
                "main-display",
                "blank",
                ["display-text", function() { return "你每秒获得 <h2><b>" + format(getResetGain("s")) + "</b></h2> 速度点数" },],
                "blank",
                ["display-text", function() { return "速度点数增益公式 : Log10(Log10(点数 + 1) * 时间点数<sup>0.5</sup> + 1)" + (tmp.s.getExp.eq(1) ? "":"<sup>" + format(tmp.s.getExp) + "</sup>") + ((tmp.s.getMult.eq(1) ? "":" * " + format(tmp.s.getMult))) },],
            ],
        },
        "Upgrades": {
            content: [
                "main-display",
                "blank",
                "upgrades",
            ],
        },
    },
    name: "速度点数", // 这是可选的，仅在少数地方使用。如果省略，则使用层级ID。
    symbol: "S", // 显示在层级节点上的符号。默认是层级ID的首字母大写
    row: 1, // 层级在树中的行（0是第一行）
    position: 0, // 行内的水平位置。默认使用层级ID并按字母顺序排序
    color: "#e77e00",
    layerShown(){return hasUpgrade("p", 22)},
    startData() { return {
        unlocked: true,
        points: new Decimal(0),
        best: new Decimal(0),
    }},
    requires() { return new Decimal(1) }, // 可以是一个函数，考虑需求增加
    resource: "速度点数", // 声望货币的名称
    type: "custom", // normal: 获得货币的成本取决于获得的量。static: 成本取决于你已经拥有的量
    getResetGain() {
        gain = player.p.points.add(1).log10().times(player.t.points.pow(0.5)).add(1).log10()
        gain = gain.pow(tmp.s.getExp)
        gain = gain.times(tmp.s.getMult)
        return gain
    },
    getMult() {
        let mult = new Decimal(1)
        if(hasUpgrade("s", 11)) mult = mult.times(tmp.s.upgrades[11].effect)
        if(hasUpgrade("s", 12)) mult = mult.times(tmp.s.upgrades[12].effect)
        return mult
    },
    getExp() {
        let exp = new Decimal(1)
        return exp
    },
	effect() {
		eff = new Decimal(1)
        eff = eff.times(player.s.points.add(1).log10().add(1))
		return eff
	},
	effectDescription() { return "提升点数增益 " + format(tmp.s.effect) + "x" },
    passiveGeneration() { return hasUpgrade("p", 22) },
    doReset(resettingLayer){
        let keep = []
        if (layers[resettingLayer].row > this.row) layerDataReset(this.layer, keep)
    },
    upgrades: {
        11: {
            title: "我是速度",
            description: "速度点数根据时间更快获得",
            cost() { return new Decimal(250) },
            unlocked() { return (hasUpgrade("t", 12) && hasUpgrade("p", 22)) || hasUpgrade("t", 13) || hasUpgrade("s", 11) },
            effect() { 
				eff = new Decimal(player.points.add(1).log10().pow(1/3).add(1))
                return eff
            },
            effectDisplay() { return "*" + format(tmp.s.upgrades[11].effect) + " 速度点数增益" },
        },
        12: {
            title: "更快",
            description: "时间点数提升速度点数增益",
            cost() { return new Decimal(500) },
            unlocked() { return (hasUpgrade("t", 13) && hasUpgrade("s", 11)) || hasUpgrade("t", 14) || hasUpgrade("s", 12) },
            effect() { 
				eff = new Decimal(player.t.points.add(1).log10().add(1).log10().add(1).pow(2))
                return eff
            },
            effectDisplay() { return "*" + format(tmp.s.upgrades[12].effect) + " 速度点数增益" },
        },
    },
})