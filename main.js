

let inputImg = document.getElementById('imgRecizer');
//
let imgChanging = document.getElementById('imgChanging');
console.log(imgChanging)

inputImg.addEventListener( 'change', (e) => {
  let width = 125;
  let height = 120;
  let fileName = e.target.files[0].name;
  let reader = new FileReader();
  reader.readAsDataURL(e.target.files[0])
//   console.log(e.target.files[0]);
  reader.onload = event => {

      const img = new Image();
            img.src = event.target.result;            
            img.onload = () => {
                const element = document.createElement('canvas');
                element.width = width;
                element.height = height;

                const ctx = element.getContext('2d');
                ctx.drawImage(img, 0, 0 , width, height);
                
                var image = ctx.canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");          
                console.log(image);
                ctx.canvas.toBlob( (blob) => {
                    const file = new File([blob], fileName, {
                        type: 'image/jpeg',
                        lastModified: Date.now()
                    });
                    if(file.size < 20000){
                        console.log(inputImg.value)        
                        imgChanging.setAttribute('src', image);
                        var newinput = document.getElementById("imgbs64");
                        newinput.value = image;
                        console.log('lower thatn 2mb')
                    }else{
                        console.log('to high');                    
                    }
                }, 'image/jpeg', 1);
                reader.onerror = error => console.log(error);
        }
  }
})

//
// let imgShow = document.getElementById('img');
// let inputImg = document.getElementById('imgRecizer');
// let send = document.getElementById('send');
// let imgChanging = document.getElementById('imgChanging');
// console.log(imgChanging)

// send.addEventListener('click', (e) => {
//     e.preventDefault();
// });

// inputImg.addEventListener( 'change', (e) => {
//   let width = 200;
//   let height = 100;
//   let fileName = e.target.files[0].name;
//   let reader = new FileReader();
//   reader.readAsDataURL(e.target.files[0])
//   console.log(reader);
//   reader.onload = event => {
//       const img = new Image();
//       img.src = event.target.result;
//       img.onload = () => {
//           const canvas = document.createElement('canvas');
//           canvas.width = width;
//           canvas.height = height;
//           const ctx = canvas.getContext('2d');
//           ctx.drawImage(img, 0, 0 , width, height);
//           const image = ctx.canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
//           console.log(image);
//           ctx.canvas.toBlob( (blob) => {
//             const file = new File([blob], fileName, {
//                 type: 'image/jpeg',
//                 lastModified: Date.now()
//             })
//           }, 'image/jpeg', 1);
//           reader.onerror = error => console.log(error)
//           console.log(img.getAttribute('src'))
//           imgShow.setAttribute('src', image)
          
//       }
//   }
// })

function compress(source_img_obj, quality, maxWidth, output_format) {
    var mime_type = "image/jpeg";
    if (typeof output_format !== "undefined" && output_format == "png") {
        mime_type = "image/png";
    }

    maxWidth = maxWidth || 1000;
    var natW = source_img_obj.naturalWidth;
    var natH = source_img_obj.naturalHeight;
    var ratio = natH / natW;
    if (natW > maxWidth) {
        natW = maxWidth;
        natH = ratio * maxWidth;
    }
    var cvs = document.createElement('canvas');
    cvs.width = natW;
    cvs.height = natH;
    var ctx = cvs.getContext("2d").drawImage(source_img_obj, 0, 0, natW, natH);
    console.log(ctx);
    var newImageData = cvs.toDataURL(mime_type, quality / 100);
    console.log(newImageData);
    var result_image_obj = new Image();
    result_image_obj.src = newImageData;
    return result_image_obj;
}