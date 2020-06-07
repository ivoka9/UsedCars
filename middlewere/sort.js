function Sort(allCars,what){
    let flag=false
        for(let i=0; i<allCars.length ; i++){
            
            for(let j=0; j<allCars.length; j++){
                if(what=="price"){
                     if(allCars[i].price>allCars[j].price){
                         let temp = allCars[j]
                         allCars[j]=allCars[i]
                         allCars[i]= temp  
                        }
                    }
                if(what=="mil"){
                    if(allCars[i].mileage>allCars[j].mileage){
                        let temp = allCars[j]
                        allCars[j]=allCars[i]
                        allCars[i]= temp
                    }
                }
                if(what=="year"){
                    if(allCars[i].year>allCars[j].year){
                        let temp = allCars[j]
                        allCars[j]=allCars[i]
                        allCars[i]= temp                      
                    }
                }
                
            }
        }
   
    }

    module.exports=Sort 