const btn = document.querySelector('.changeColorBtn');

//here we are accessing colorgrid and colorvalue elements from html
const colorGrid = document.querySelector('.colorGrid');
const colorValue = document.querySelector('.colorValue');


// here => is the call back
btn.addEventListener('click', async()  => {

    //here the color object is received from background.js
    chrome.storage.sync.get('color', ({color}) => {
       console.log('color:', color);
    });


    let [tab] = await chrome.tabs.query({active: true, currentWindow: true});
    

     // we are using a method and passing in an object(target) with tab id. to inject scrpit in webpage//
    chrome.scripting.executeScript({
        target: { tabId: tab.id},
        function: pickColor,

    } ,
    //so after picking a color we get an array of objects having various values, like frameid and result(has color). we can accest this result object using the following. here injectionResults is the array. sRGBHex is the key for color value

     async(injectionResults) => {
        const [data] = injectionResults;
        if(data.result) {
            const color = data.result.sRGBHex;
            colorGrid.style.backgroundColor = color;
            colorValue.innerText = color;

            //now to copy the selected color and copy to the computer's clipboard using navigator api's

            try {
                await navigator.clipboard.writeText(color);
            }catch(err) {
               console.error(err);
            }

            
        }
      
    }
    );
});


async function pickColor() {
    try{
         const eyeDropper = new EyeDropper();
         return await eyeDropper.open();
        
    } catch(err) {
        console.error(err);
    }
}



