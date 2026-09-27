    groceries = ['Milk', 'Bread' ,'Apples', 'Meat' , 'Chicken'];
    console.log(groceries);
    console.log(groceries.length);
    groceries[1] = 'Bananas';
    console.log(groceries);
    groceries[4] = 'Beef';
    console.log(groceries);
    console.log(groceries[1].length);
    groceries.push('Goats', 'Water' , 'Sheep' ,'Vegetables', 'Millet');
    console.log(groceries);
    groceries.splice(6,0, 'Cow', 'Rice', 'Oranges', 'Onions')
    console.log(groceries);*/
    /* shoppingList = ['Milk','Bread','Apples'];
    console.log(shoppingList);
    shoppingList.splice(1,1);
    shoppingList.splice(1,0,'Bananas','Eggs');
    console.log(shoppingList);
    let remove = shoppingList.pop();
    console.log(remove);
    console.log(shoppingList);
    shoppingList.sort();
    console.log(shoppingList);
    let findMilk = shoppingList.indexOf('Milk');
    console.log(findMilk);
    shoppingList.splice(1,0,'Carrots','Lettuce');
    console.log(shoppingList);
    shoppingList2 = ['Juice','Pop'];
    let shoppingList3 = shoppingList.concat(shoppingList2);
    console.log(shoppingList3);
    let lastIndex = shoppingList3.lastIndexOf('Pop');
    console.log(lastIndex);

    const date = new Date();
    console.log(date);
    console.log(date.toLocaleTimeString());

    const normal = [
        'Ronnie',
         23,
      'Ugandan'
]
 

function isName() {
    let name = "Ronnie";
     if(name === "Ronnie"){
        console.log("is name");
     }else{
        console.log("is other name");
     }
}
isName(); 






