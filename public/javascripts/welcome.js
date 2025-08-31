const textArray = [
  "To The World’s Best Premium Bag Shop",
  "Handcrafted Luxury for the Modern Lifestyle",
  "Where Timeless Elegance Meets Everyday Style",
  "Designed for Those Who Carry Confidence",
  "Experience Premium Quality, Crafted Just for You"
];

let i = 0, j = 0;
let isDeleting = false;

function typeEffect() {
  let current = textArray[i];
  const typingElement = document.getElementById("typing");
  // Type current line
  if (!isDeleting) {
    typingElement.innerHTML = typingElement.innerHTML.split("<br>").slice(0, i).join("<br>") 
                              + (i > 0 ? "<br>" : "") 
                              + current.substring(0, j);

    j++;

    if (j > current.length) {
      i++;
      j = 0;

      // If all lines are done, start deleting
      if (i === textArray.length) {
        isDeleting = true;
        setTimeout(typeEffect, 1500);
        return;
      }
    }
  } 
  // Delete all lines together
  else {
    let text = typingElement.innerHTML;
    typingElement.innerHTML = text.substring(0, text.length - 1);

    if (typingElement.innerHTML === "") {
      isDeleting = false;
      i = 0;
      j = 0;
    }
  }

  setTimeout(typeEffect, isDeleting ? 50 : 120);
}

window.onload = typeEffect;
