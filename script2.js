//Get data form TXT
let oridata = [];
let mangaData = [];

fetch('bp3.txt')
  .then(response => response.text())
  .then(oridata => {
    mangaData = oridata;
  });



//Manga Data, split to different pages

const regex = /DLRAW\.NET-\d+/;

mangaData = mangaData.reduce((acc, cur) => (regex.test(cur) ? acc.push([cur]) : acc[acc.length - 1].push(cur), acc), []);


console.log(mangaData.length);
console.log(mangaData[2]);



//Text Variable
	//var chatgpt = [];
	var textObj = {};

//CREATE BODY
		const body = document.querySelector('body');
		const pageLIST = Array.from(Array(mangaData.length).keys()).map(i => i + 1);
		//const containerLIST = [1,2,3];
		//const buttonLIST = [1,2];

	//Function create Element in HTML
		const createEl = (elType, classes) => {
		  const el = document.createElement(elType);
		  if (classes) el.className = classes;
		  return el;
		}

//Get Text Function
	const getText = (textObj, jisho = false) => {
	  let sortedObject = Object.fromEntries(
		Object.entries(textObj).sort(([, a], [, b]) => a - b)
		);
		//chatgpt = (Object.keys(sortedObject));
		jisho === true ? navigator.clipboard.writeText((Object.keys(sortedObject)).join("")) : navigator.clipboard.writeText("explain by breaking down: \n\n"+(Object.keys(sortedObject)).join("")); //copy to clipboard
}


//Set Page-Title and each page (container)

		pageLIST.forEach((page,ind) => {
			pageLIST[ind] =  createEl('p', 'pageTitle');
			pageLIST[ind].innerHTML = mangaData[ind][0];
				//`DLNET - 00${ind+1}`
				//pageLIST[ind].textContent = `DLNET - 00${index+1}`;
		
		body.append(pageLIST[ind])					
		
		

//continue here, edit the text
		mangatext = mangaData[ind].slice(1)
		containerLIST = Array.from(Array(mangatext.length).keys()).map(i => i + 1);
		
		containerLIST.forEach((container,index) => {
			containerLIST[index] =  createEl('div', 'container');
			containerLIST[index].appendChild(createEl('button', 'button')).innerHTML = `P${index+1}<span class="red-circle"></span>`;
			containerLIST[index].appendChild(createEl('div', 'text')).innerHTML = `${mangatext[index]}`;
		
		body.append(containerLIST[index])
									});
			
		});
		
		
		
////Set Click JS		

const containers = document.querySelectorAll(".container");
const resetbutton = document.querySelector("#reset-button");
const jishobutton = document.querySelector("#jisho-button");
let numLength = Math.max(...mangaData.map(innerArr => innerArr.length))
let num = Array.from(Array(numLength).keys()).map(i => i + 1);




   


//to set initial value to display for all red circle
containers.forEach((container,index) => {
  const button = container.querySelector(".button");
  const text = container.querySelector(".text");

// Do something with the button and text
  var redCircle = button.querySelector(".red-circle");
	redCircle.style.display = "none";
	console.log(index+redCircle.style.display)
   
});



containers.forEach((container,index) => {
  const button = container.querySelector(".button");
  const text = container.querySelector(".text");
  
//click event for each button
   button.addEventListener("click", () => {
    var redCircle = button.querySelector(".red-circle");
     if (redCircle.style.display === "none") {
	  redCircle.style.display = "flex";
      redCircle.innerHTML = num.shift();
	  //text.innerHTML = `Button ${index+1} is clicked!`; // Modify the text
	  textObj[text.innerHTML] = redCircle.innerHTML
	  //console.log(num)
	  //console.log(textObj)
	  //console.log(chatgpt)
	  getText(textObj) //Get Text


    } else {
	  redCircle.style.display = "none";
      num.unshift(parseInt(redCircle.innerHTML))
	  num.sort((a, b) => a - b);
	  //text.innerHTML = `Button ${index+1} is clicked!`; // Modify the text
	  delete textObj[text.innerHTML];
	  //console.log(num)
	  //console.log(textObj)
	  //console.log(chatgpt)
	  getText(textObj) //Get Text
    }
  });




});



//Reset Button
  
resetbutton.addEventListener("click", () => {
	//reset num
	numLength = Math.max(...mangaData.map(innerArr => innerArr.length))
	num = Array.from(Array(numLength).keys()).map(i => i + 1);
	navigator.clipboard.writeText(""); //copy to clipboard
   //chatgpt = [];
	textObj = {};
   //reset display and innerHTML
	containers.forEach((container,index) => {
		const button = container.querySelector(".button");
		const text = container.querySelector(".text");
		 var redCircle = button.querySelector(".red-circle");
			redCircle.innerHTML = ""
			redCircle.style.display = "none";
});
//console.log(num)
  });


//JISHO Button
  
jishobutton.addEventListener("click", () => {
	getText(textObj, true) //Get Text
  });











//split into different list by DLRAW.NET
// let mangaData = [
    // "DLRAW.NET-00001",
    // "\n山口つばさ",
    // "\nDLRAW.NET-00002",
    // "\nDLRAW.NET-00003",
    // "\n俺は",
	// "\n俺は口つ",
    // "\nピカソの絵の良さが"
// ]


// const regex = /DLRAW\.NET-\d+/;

// mangaData = mangaData.reduce((acc, cur) => {
  // if (regex.test(cur)) {
    // acc.push([cur]);
  // } else {
    // acc[acc.length - 1].push(cur);
  // }
  // return acc;
// }, []);


// let mangaData = [
    // "DLRAW.NET-001",
    // "山口つばさ 3",
    // "DLRAW.NET-002",
    // "ブルーピリオド",
    // "山口つばさ Tsubasa Yamaguchi",
    // "描くときに着るヤツは",
    // "人それぞれ(",
    // "つなぎ",
    // "DLRAW.NET-003",
    // "たかはしよたすけ",
    // "高橋世田介",
    // "八虎と同じ予備校に通う 高校3年生。 その才能と 技術と孤高の性格は八虎 を発奮させる。",
    // "さえきせんせい",
    // "佐伯先生",
    // "美術部の顧問。 技術と見 識と人間力で、やる気のあ る生徒には確かな指導を、 そうでない生徒にはそれな りに楽しく",
    // "【人物紹介】",
    // "あゆかわりゅうじ",
    // "鮎川龍二",
    // "通称ユカ。 女装男子。 八 虎と同じクラスの美術部 員 八虎を美術部へ誘っ た。",
    // "やくちゃとら",
    // "矢口八虎",
    // "高校3年。 森先輩の絵を 見て絵を描く楽しさにハマ る。 美術を志す以上最難 関の東京藝大を志望校に 定める。",
    // "おおばせんせい",
    // "大葉先生",
    // "はしだはるか",
    // "橋田 悠",
    // "八虎が通う美術予備校の 講師。 体と声がデカい。",
    // "世田介の同級生。 八虎と 同じ予備校に通う。",
    // "【目次】",
    // "【9筆目】 課題が見えてもどうしようもねぇ",
    // "【10筆目】 言いたいことも言えないこんな絵じゃ",
    // "【11筆目】 褒められが発生しました",
    // "おつ",
    // "【12筆目】 イキリ乙",
    // "DLRAW.NET-004",
    // "角はやめてよ",
    // "角は!",
    // "お前の補講の",
    // "ためにこっちは 残業なんだよ!",
    // "いってえ",
    // "だってぇー",
    // "わっかんね",
    // "んだもん!",
    // "※この作品はフィクションです。実在の人物・団体名称等とは一切関係ありません。",
    // "とら",
    // "頑張ってっかなあ",
    // "真面目に聞け!",
    // "受験大変",
    // "だな・・・",
    // "2巻もアツい! 3月2日金発売です!!!",
    // "DLRAW.NET-005",
    // "[九筆目] 課題が見えてもどうしようもねえ",
    // "ド",
    // "from www.a-zmanga.net",
    // "山口つばさ",
    // "DLRAW.NET-006",
    // "余裕なんで",
    // "よそ見して",
    // "生きてたら、",
    // "自分の人生を",
    // "人生のモチベがアガる!",
    // "読むと未来を模索したくなる激アツ美大受験漫画!",
    // "ブルーピリオ",
    // "DLRAW.NET-007",
    // "冬の匂いが",
    // "し始める頃",
    // "11月",
    // "東京美術学",
    // "やぐちや とら",
    // "成績優秀な高校2年生。",
    // "予備校も",
    // "緊張感で",
    // "満ちていく",
    // "クラスでも派手な存在。",
    // "はーい",
    // "聞いて",
    // "今から クラス分け しまーす",
    // "DLRAW.NET-008",
    // "来た・・・",
    // "掲示板",
    // "見てないなー?",
    // "これから",
    // "この30人を",
    // "受験が本格的に",
    // "始まるでしょ?",
    // "5つのクラスに分けて",
    // "少人数制の指導に",
    // "切り替えます~",
    // "1クラスにつき",
    // "1人の先生が",
    // "クラス分け?",
    // "担当!",
    // "成績優秀、 世渡り上手の矢口八虎は美術の授業で絵を描く楽しさにハマってしまい、美大進学を真剣に考え始める。 学費の安さと難度(目標は高いほうがロマン)で東京藝大を 前回まで 第一志望に親の理解も勝ち取って美大専門の予備校へも通い始める。 3年になり受験勉強も本格化した矢先、ライバルの世田介が「受験絵画」と逆上して予備校を止めてしまう。",
    // "DLRAW.NET-009",
    // "はしだ",
    // "八虎と同じ予備校に通う。",
    // "世田介と同じ高校 美術館巡りなど 人の作品を鑑賞するのが好き。",
    // "より",
    // "川",
    // "桑名は...",
    // "一人一人に合った",
    // "Cクラス",
    // "やり方を探していける ようにねー",
    // "木下",
    // "Dクラス",
    // "んじゃ",
    // "呼びます",
    // "は",
    // "はい!",
    // "おおた",
    // "Bクラス",
    // "さわぐち",
    // "澤口・",
    // "Aクラス",
    // "DLRAW.NET-010",
    // "やぐち",
    // "橋田・・・",
    // "はあーい",
    // "矢口",
    // "Dクラスは",
    // "4階か...",
    // "受験が",
    // "始まる",
    // "じゃ 教室",
    // "世田介くんは あれから一度も",
    // "来ていない",
    // "移動始めー",
    // "作者近況",
    // "山口つばさ アシスタントさんが連載をすることになり、今からとても楽しみです!うおおー!!!",
    // "結局"
// ]