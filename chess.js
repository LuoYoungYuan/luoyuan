function $(id){
	return document.getElementById(id);
}

function init(){
	mycanvas = $("mycanvas");
	chess = mycanvas.getContext("2d");
	btn = $("btn");
	btn_white = $("btn_white");
	btn_black = $("btn_black");
	//初始棋盘（画格子，加载棋子，还有存棋子）
	canvasChecks();
	mycanvas.addEventListener('click', mycanvas_click, false);
	btn.addEventListener('click', btn_click, false);
	btn_white.addEventListener('click', btn_white_click, false);
	btn_black.addEventListener('click', btn_black_click, false);
}

//初始棋盘（画格子，加载棋子，存棋子）
function canvasChecks(){
	chess.beginPath();
	chess.strokeStyle = "#fff";
	//画格子
	for(var i = 0; i < 16; i++){
		n = i * 40;
		chess.moveTo(20 + n,20);
		chess.lineTo(20 + n,620);
		
		chess.moveTo(20, 20 + n);
		chess.lineTo(620, 20 + n);
	}
	chess.stroke();
	chess.closePath();
	//设置二维数组存放棋子
	array = new Array(16);
	lengths = array.length-1;
	for(var i = 0; i < 16; i++){
		array[i] = new Array(16);
		for(var j = 0; j < 16; j++){
			array[i][j] = 0;
		}
	}
	//加载棋子
	black = new Image();
	black.src = "black.png";
	white = new Image();
	white.src = "white.png";
}

//点击事件
function mycanvas_click(e){
	var e = e ? e : window.event;
	x = e.pageX;
	y = e.pageY;
	var p = $("p");
	//判断先下什么颜色的棋以及下到合适的位置上
	play();
	//p.innerHTML = "x:" + x + "y:" + y + ' 行row:' + row + ' 列col:' +col;
	
}

//判断先下什么颜色的棋以及下到合适的位置上
//var isBlack = true;
function play(){
	//获取棋子的范围值，对一定范围内的都加入到固定的行和列上
	//行
	row = (y % 40 <= (40/2+20)) ? parseInt(y/40): parseInt(y/40+1);
	//列
	col = (x % 40 <= (40/2+20)) ? parseInt(x/40) :parseInt(x/40+1);
	if(isBlack == true){
		if(array[row][col] == 1 || array[row][col] == 2){
			alert("不能放");
		}else{
			//确定棋子放的位置
			chess.drawImage(black, col*40, row*40);
			//等于1说明放了黑棋
			array[row][col] = 1;
			isWin(row, col, 1);
			isBlack = false;
		}
	}else{
		if(array[row][col] == 1 || array[row][col] == 2){
			alert("不能放");
		}else{
			chess.drawImage(white, col*40, row*40);
			//等于2说明放了白棋
			array[row][col] = 2;
			isWin(row, col, 2);
			isBlack = true;
		}
	}
}

//判断输赢
//row表示行，col表示列， num表示何种颜色的棋子
//注意，点击棋子从左往右点击，棋子会从右往左解析
function isWin(row, col, num){
	//棋子累计数，从0开始
	var sumX = 1;
	var sumY = 1;
	var sumXY = 1;
	var sumXY2 = 1;
	//从左边算
	//一行上有5个，所以列数变化
	var colX1 = col;
	//从左边找是否有5个相连的棋子
	for(colX1; colX1 > 0; colX1 --){
		//判断一行中是否有5个相连的棋子
		if(array[row][colX1 - 1] == num){
				sumX ++;
		}else{
			break;
		}
	}

	
	//从右边算
	//注意上面改变了colX1的值，所以要重新初始化
	var colX2 = col;
	for(colX2; colX2 < lengths; colX2 ++){
		if(array[row][colX2 + 1] == num){
			sumX ++;
		}else{
			break;
		}
	}
	
	//从上边算
	var rowY1 = row;
	//从左边找是否有5个相连的棋子
	for(rowY1; rowY1 > 0; rowY1 --){
		//判断一行中是否有5个相连的棋子
		if(array[rowY1 - 1][col] == num){
			sumY ++;
		}else{
			break;
		}
	}
	
	//从下边算 
	var rowY2 = row;
	for(rowY2; rowY2 < lengths; rowY2 ++){
		if(array[rowY2 + 1][col] == num){
			sumY ++;
		}else{
			break;
		}
	}
	
	//斜边(左上)
	var colXY1 = col;
	var rowXY1 = row;
	for(; colXY1 > 0 && rowXY1 > 0; colXY1 -- && rowXY1 --){
		if(array[rowXY1 - 1][colXY1 - 1] == num){
			sumXY ++;
		}else{
			break;
		}
	}
	
	//斜边(右下)
	var colXY2 = col;
	var rowXY2 = row;
	for(;colXY2 < lengths && rowXY2 < lengths; colXY2 ++ & rowXY2 ++){
		if(array[rowXY2 + 1][colXY2 + 1] == num){
			sumXY ++;
		}else{
			break;
		}
	}
	
	//斜边(右上)
	var colXY3 = col;
	var rowXY3 = row;
	for(; rowXY3 > 0 && colXY3 < lengths; rowXY3 -- && colXY3 ++){
		if(array[rowXY3 - 1][colXY3 + 1] == num){
			sumXY2 ++;
		}else{
			break;
		}
	}

//	//斜边（左下）
	var colXY4 = col;
	var rowXY4 = row;
	for(; rowXY4 < lengths && colXY4 > 0; rowXY4 ++ && colXY4 --){
		if(array[rowXY4 + 1][colXY4 - 1] == num){
			sumXY2 ++;
		}else{
			break;
		}
	}
	
	//$('p').innerHTML = sumX +':'+ sumY +':'+ sumXY + ':' + sumXY2;
	//判断输赢
	if(sumX >= 5 || sumY >=5 || sumXY >= 5 || sumXY2 >= 5){
		if(num == 1){
			alert("黑子赢");
		}else{
			alert("白子赢");
		}
	}
}

//点击重新开始
function btn_click(){
	location.reload();
}

function btn_black_click(){
	//黑子先
	isBlack = true;
}

function btn_white_click(){
	//白子先
	isBlack = false;
}

window.addEventListener('load',init,false);
