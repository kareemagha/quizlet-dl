import { button1Selector, button2Selector } from "../utils/constants";

(function() {

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