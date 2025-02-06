let modInfo = {
	name: "时间树",
	id: "TTTBB",
	author: "mathnerdfromfrance",
	pointsName: "",
	modFiles: ["layers.js", "tree.js"],
	discordName: "",
	discordLink: "",
	initialStartPoints: new Decimal(0), // 用于硬重置和新玩家
	offlineLimit: 0,  // 离线限制，单位为小时
}

// 设置版本号和版本名称
let VERSION = {
	num: "0.2",
	name: "快了一点点",
}

let changelog = `<h1>更新日志:</h1><br>
    <br><h3>v0.2 : 快了一点点 ( 12月17日 )</h3><br>
	<br><h3>v0.1 : 旅程开始 ( 12月15日 )</h3><br>`

let winText = `恭喜！你已经完成了这个版本的最终目标！<br>
              不幸的是，这是游戏的结束...暂时`

// 如果你在任何层级中添加了新函数，并且这些函数在调用时会产生效果，请在这里添加它们。
// （这里的是一些示例，所有官方函数都已经处理好了）
var doNotCallTheseFunctionsEveryTick = ["blowUpEverything"]

function getStartPoints(){
    return new Decimal(modInfo.initialStartPoints)
}

// 决定是否显示点数/秒
function canGenPoints(){
	return true
}

// 计算点数/秒！
function getPointGen() {
	if(!canGenPoints())
		return new Decimal(0)

	let gain = new Decimal(1)
	return gain
}

// 你可以在这里添加与层级无关的变量，这些变量应该存入 "player" 并保存，同时设置默认值
function addedPlayerData() { return {
}}

// 在页面顶部显示额外内容
var displayThings = [
]

// 决定游戏何时“结束”
function isEndgame() {
	return hasUpgrade("t", 14)
}

// Less important things beyond this point!

// Style for the background, can be a function
var backgroundStyle = {

}

// You can change this if you have things that can be messed up by long tick lengths
function maxTickLength() {
	return(3600) // Default is 1 hour which is just arbitrarily large
}

// Use this if you need to undo inflation from an older version. If the version is older than the version that fixed the issue,
// you can cap their current resources with this.
function fixOldSave(oldVersion){
}
