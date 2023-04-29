fetch('bp3.txt')
  .then(response => response.text())
  .then(data => {
    
    // Parse the text content into an array
    const dataArray = data.split('\n');
    let mangaData = dataArray
    console.log(dataArray);
    console.log(mangaData);
    console.log(mangaData.length);
    console.log(mangaData[3]);
    console.log("first test");
	

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


//end fetch
}); 
