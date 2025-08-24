let board = [     //3 e 3lük oyun tahtası oluşturur
  ['','',''],
  ['','',''],
  ['','',''],
]

let players=['X','O']; //oyuncular dizisi

let currentPlayer;      //şuanda sırası olan oyuncuyu tutar
let available=[];      // oynanmamış hücreleri tutucak
function setup(){
  createCanvas(400,400);  //400*400lük piksel alanı açar
  frameRate(1);        //saniyede 1 hamle
  currentPlayer =floor(random(players.length)); //oyuncu dizisinin uzunluğu(0-2) random bir ondalık sayı seçiyor bu aralıktan sonra 0 ya da 1 olan indis seçiliyor yani x ya da o
  for (let j=0;j<3;j++){
    for (let i=0;i<3;i++){      // ive j sütun ve satırı temsil ediyor ve tüm hücreler push komutu ile available dizisine aktarılıyor
      available.push([i,j]);  
    }
}
}
function equals3(a,b,c){          //eşitlik fonksiyonu,fonksiyona gönderilecek üç hücre birbirine eşit ve boş değilse diğer fonk geçilecek değilse return ile tekrar kontrol edilecek
  return (a==b && b==c && a!='');
}
function checkWinner(){  //winner ile kazanan tutuluyor ve şuan boş
  let winner =null;
  
  //horizontal
  for(let i=0;i<3;i++){               //yatayda 3   hücrede aynı mı diye kontrol ediyoruz
    if(equals3(board[i][0],board[i][1],board[i][2])){
      winner=board[i][0]; //eğer aynıysa x yada o hangisiyse kazanan o oluyor
    }
  }
  //vertical
  for(let i=0;i<3;i++){ //dikeyde 3 hücre aynı mı değil mi kontrolü
    if(equals3(board[0][i],board[1][i],board[2][i])){
      winner=board[0][i];
    }
  }
  //diagonal
    if(equals3(board[0][0],board[1][1],board[2][2])){ //çapraz soldan sağa kontrolü
      winner=board[0][0];
    }
  if(equals3(board[2][0],board[1][1],board[0][2])){ //çapraz sağdan sola kontrolü
      winner=board[2][0];
    }
  if(winner==null && available.length==0){      //eğer kazanan b-kısmı boş ve başka boş hücre yoksa berabere
    return 'tie';
  }
  else{
    return winner;        //değilse kazanan var
  }
}

function nextTurn(){
  let index = floor(random(available.length)); // index değişkeni available dizisinin içindeki rastgele boş bir hücreyi işaret eder
  let spot = available.splice(index,1)[0];  //spot ile seçilen indecxteki çıkardığımız elemanı saklıyoruz,[0] yerine o eleman yazılmış oluyor
  let i=spot[0];    //çıkan spot noktasını parçaladık satır ve sütun olarak
  let j=spot[1];
  board[i][j]=players[currentPlayer];  //o satır ve sütuna şuandaki oyuncunun işaretinin konulmasını sağlar
  currentPlayer=(currentPlayer+1)%players.length;// oyuncu sayısı indexi 0 ve 1 arsaında 1 artarsa 1 ve 2 olur 2nin 2ye göre modu 0 dır yani oyun hep 0ve 1 indis arasında döner 3 oyuncu olsaydı 3 e bölerdik
}
function draw(){
  background(255); //arka planı beyaz yaptı
  let w=width /3; //sütün oluşumu ölçüsü
  let h=height /3;    //satır oluşumu ölçüsü
  strokeWeight(4); //kalem kalınlığı
  
  line(w,0,w,height); //  ilk nokta w,0  w,height ikinci nokta yani w 133,33 de sabit y 0 dan 400 e  kadar ilk dikey çizgiyi çekiyor
  line(w*2,0,w*2,height);   //ilk nokta w*2,0  w*2,height ikinci nokta yani w 266,66 de sabit y 0 dan 400 e  kadar ikinci dikey çizgiyi çekiyor
  line(0,h,width,h);
  line(0,h*2,width,h*2);
  
  for (let j=0;j<3;j++){    
    for (let i=0;i<3;i++){
      let x = w*i+w/2;    //burada w yi i ile çarparak hücrenin hangi pikselden başladığını buluyoruz w*0 =0.piksel gibi sonra w/2 ekleyip yatay merkez noktasını buluyoruz
      let y = h*j+h/2;    //burada h yi j ile çarparak hücrenin hangi pikselden başladığını buluyoruz h*0 =0.piksel gibi sonra h/2 ekleyip dikey merkez noktasını buluyoruz
      
      let spot=board[i][j];  //o an yazılacak oyuncuyu spota aktardık çünkü boarddaydı
      textSize(32);
      strokeWeight(4);
      if(spot==players[1]){ //eğer 1 .oyuncuysa elips yani o çiziyor
        noFill(); //dairenin içi boş olsun demek
        ellipse(x,y,w/2);     //x,y merkez  noktası w/2 çap
      }
      else if (spot==players[0]){   //eğer ikinci oyuncu x varsa
        let xr=w/4;      //çizgilerin yarı uzunluğu
        line(x-xr,y-xr,x+xr,y+xr); //burada   \ oluşuyor
        line(x+xr,y-xr,x-xr,y+xr); //burada / oluşuyor ve birleşip merkezden x oluşturulmuş olunuyor
      }
    }
  }
 
  let result = checkWinner(); fonksiyonun sonucunu resulta attık
  if (result != null){
    noLoop();  // resultta sonuç varsa oyunu durdurur
    let resultP=createP(''); //büyük punto anlamına geliyor
 resultP.style('font-size','32pt');
    if(result=='tie'){ //berabereyse tie yazdı
      resultP.html("Tie!")
    }
    else{     //değilse kazanan yazıldı
      resultP.html(`${result} wins!`)
    }
  }else{
    nextTurn();// kazanan yoksa ve oyun devam ediyorsa diğerinin sırasına geçer 
  }
}
