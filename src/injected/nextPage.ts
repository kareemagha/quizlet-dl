(function() {

    const button1Selector = '#mainContainer > main > div > div > div > div > main > div > div > div > div:nth-child(3) > div > div.b1opuclq > div > div.n5cc71p > div > a';
    const button2Selector = '#mainContainer > main > div > div > div > div > main > div > div > div > div:nth-child(2) > div > div.b1opuclq > div > div.n5cc71p > div > a';

    const element = document.querySelectorAll(".s1i7awl8")
    const elementLength = element.length;

    const button1 = document.querySelector(button1Selector) as HTMLElement | null;
    const button2 = document.querySelector(button2Selector) as HTMLElement | null;
    if (elementLength > 1 && button1) {
        button1.click();
    } else if (button2) {
        button2.click();
    }
})()