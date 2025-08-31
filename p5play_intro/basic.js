function setup() {
  new Canvas(800,600);
  background(250);
  textSize(16);
  fill(0);

  // write your codes here
  // let a = 5;
  // let b = 10;
  // let sum = a +b ;
  // let product = a * b;
  // console.log('The sum is ', sum);
  // console.log('The Product is', product);
  // text('The sum is' + sum,20,30);

  // --- Exercise: Area of Triangle ---
  // write your codes here
  let base = 10; //declare variable base
  let height = 5; //declare variable height
  let area = 0.5 * base * height;
  console.log("Area of triangle is:", area);
  text("Area of triangle:" +area, 20,30);
  // --- Exercise: Sum of first 10 even numbers ---
  // write your codes here
  // for(let i = 10; i<=20; i++){
  //   console.log("counting:", i);
  // }
  // for(let i=20; i>=1;i--){
  //   console.log(i)
  // }
  // print multiples of 3 between 3 and 46
  for(let i =3; i<=46; i+=3){
    console.log(i)
  }
  let sum = 0;
  let yeven = 60;
  for(let i=2; i<=20; i+=2){
    sum += i;
    text(i, 20 + i *50, yeven);
  }
  text("Sum of first 10 even numbers:" + sum,20,yeven+30);
  // --- Exercise: Age category classification ---
  // write your codes here
  // let score= 100;
  // if(score>90){
  //   console.log('Excellent');
  // }else if (score >70){
  //   console.log('Good');
  // }else{
  //   console.log('keep Improving')
  // }
  //Math.floor(Math.random() * (max value -min value +1 )) + min value
  let age = Math.floor(Math.random() * (16 -7 +1 )) +7;
  let category = "";
  if(age<=9){
    category="Lower Primary";
  }else if(age<=12){
    category = "Upper Primary";
  }else{
    category = "Secondary";
  }
  text("You are "+ age+"in"+category,20,130);

  // --- Exercise: Display odd numbers backward using while loop ---
  // write your codes here
  // let count = 0
  // while(count<5){
  //   console.log(count);
  //   count+=1;
  // }

  let odd = 19;
  let oddsum = 0;
  let yodd = yeven +100;
  let xodd = 20
  while(odd>=1){
    text(odd,xodd,yodd);
    xodd +=50;
    oddsum+=odd;
    odd-=2;
  }
  text("Total Sum of Odd number is"+ oddsum,20,180);
  // --- Exercise: Array operations (groceries) ---
  // write your codes here
  let groceries = ["Apple","Bread","Milk"];
  groceries.push("Orange");
  groceries.push("Butter");
  groceries.shift();
  groceries.splice(1,1,"Kaya");
  console.log(groceries);
  
  text("Groceries:", 20, yodd+40);
  for(let i=0;i< groceries.length;i++){
    text(groceries[i], 40+ i *100, yodd +70);
  };
}

