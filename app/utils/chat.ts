// import heic2any from "heic2any";

// export function compressImage(file: File, maxSize: number): Promise<string> {
//   return new Promise((resolve, reject) => {
//     const reader = new FileReader();
//     reader.onload = (readerEvent: any) => {
//       const image = new Image();
//       image.onload = () => {
//         let canvas = document.createElement("canvas");
//         let ctx = canvas.getContext("2d");
//         let width = image.width;
//         let height = image.height;
//         let quality = 0.9;
//         let dataUrl;

//         do {
//           canvas.width = width;
//           canvas.height = height;
//           ctx?.clearRect(0, 0, canvas.width, canvas.height);
//           ctx?.drawImage(image, 0, 0, width, height);
//           dataUrl = canvas.toDataURL("image/jpeg", quality);

//           if (dataUrl.length < maxSize) break;

//           if (quality > 0.5) {
//             // Prioritize quality reduction
//             quality -= 0.1;
//           } else {
//             // Then reduce the size
//             width *= 0.9;
//             height *= 0.9;
//           }
//         } while (dataUrl.length > maxSize);

//         resolve(dataUrl);
//       };
//       image.onerror = reject;
//       image.src = readerEvent.target.result;
//     };
//     reader.onerror = reject;

//     if (file.type.includes("heic")) {
//       heic2any({ blob: file, toType: "image/jpeg" })
//         .then((blob) => {
//           reader.readAsDataURL(blob as Blob);
//         })
//         .catch((e) => {
//           reject(e);
//         });
//     }

//     reader.readAsDataURL(file);
//   });
// }


import heic2any from "heic2any";

export function compressImage(file: File, maxSize: number): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (readerEvent: any) => {
      if (file.type.includes("image")) {
        const image = new Image();
        image.onload = () => {
          let canvas = document.createElement("canvas");
          let ctx = canvas.getContext("2d");
          let width = image.width;
          let height = image.height;
          let quality = 0.9;
          let dataUrl;

          do {
            canvas.width = width;
            canvas.height = height;
            ctx?.clearRect(0, 0, canvas.width, canvas.height);
            ctx?.drawImage(image, 0, 0, width, height);
            dataUrl = canvas.toDataURL("image/jpeg", quality);

            if (dataUrl.length < maxSize) break;

            if (quality > 0.5) {
              quality -= 0.1;
            } else {
              width *= 0.9;
              height *= 0.9;
            }
          } while (dataUrl.length > maxSize);

          resolve(dataUrl);
        };
        image.onerror = reject;
        image.src = readerEvent.target.result;
      } else if (file.type === "application/pdf" || file.type === "text/csv") {
        console.log("excat data",file.type);
        const iconUrl = file.type === "application/pdf"
          ? "https://img.icons8.com/?size=100&id=mcyAsTDJNTI9&format=png&color=000000"
          : "https://img.icons8.com/?size=100&id=9LTQ9vunHbhK&format=png&color=000000"

        const iconImage = new Image();
        iconImage.crossOrigin = "Anonymous"; // This is important if the image is from a different origin
        iconImage.onload = () => {
          let canvas = document.createElement("canvas");
          let ctx = canvas.getContext("2d");
          canvas.width = iconImage.width;
          canvas.height = iconImage.height;
          ctx?.clearRect(0, 0, canvas.width, canvas.height);
          ctx?.drawImage(iconImage, 0, 0, iconImage.width, iconImage.height);
          const dataUrl = canvas.toDataURL("image/png");
          resolve(dataUrl);
        };
        iconImage.onerror = reject;
        iconImage.src = iconUrl;
      } else {
        reject(new Error("Unsupported file type"));
      }
    };

    reader.onerror = reject;

    if (file.type.includes("heic")) {
      heic2any({ blob: file, toType: "image/jpeg" })
        .then((blob) => {
          reader.readAsDataURL(blob as Blob);
        })
        .catch((e) => {
          reject(e);
        });
    } else {
      reader.readAsDataURL(file);
    }
  });
}
