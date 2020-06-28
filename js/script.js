$(document).ready(function() {

/* Dog Breeds Page fade in */
    // first hide all section part and then let it fadein during 2 seconds
    $("section").hide().fadeIn(1000);
    // first hide the section with assigned class page-overview and then let it fadein during 2 seconds
    $(".overview").hide().fadeIn(1000);




/* Registration form in the community event page */
    // bind a event to the submit button
    $("#registration form").submit(function (event) {
        // create variable for first name input
        var firstName = $("#first_name").val();
        // create variable for last name input
        var lastName = $("#last_name").val();
        // create variable for phone number input
        var phoneNum = $("#phone_num").val();
        // create variable for event date input
        var eventDate = $("#event_date").val();
        // set the initial completion status to false
        var complete = false;


        // if all the inputs are not null or empty, set the completion status to true
        if (firstName != "" && lastName != "" && phoneNum != "" && eventDate != "") {
            complete = true;
        }

        // if the blanks are completed
        if (complete) {
            // change the text on the submit button
            $("#registration form button").html("Done").attr('disabled', true);
            // notify users the success from the browser
            alert("You have been registered successfully!\nPlease keep exploring ~");
            // reload the current page
            location.reload();
        } else {
            // if first name is empty
            if (firstName == "") {
                // add an error to corresponding textarea
                $("#first_name").addClass("error");
            }
            // if last name is empty
            if (lastName == "") {
                // add an error to corresponding textarea
                $("#last_name").addClass("error");
            }
            // if phone number is empty
            if (phoneNum == "") {
                // add an error to corresponding textarea
                $("#phone_num").addClass("error");
            }
            // if event date is empty
            if (eventDate == "") {
                // add an error to corresponding textarea
                $("#event_date").addClass("error");
            }
            // notify users the error from the browser
            alert("Incomplete Form.\nPlease complete your information and submit again.");
            // change the text on the submit button
            $("#registration form button").html("Try Again");
        }
        // prevent submitting the form
        event.preventDefault();
    });

    // if all these four textarea are not empty, press any key to trigger the event
    $("#first_name, #last_name, #phone_num, #event_date").keydown(function () {
        // remove the error from the textarea
        $(this).removeClass("error");
    });





    /* Back to top by one click on homepage
     * Referenced from https://codepen.io/Coding_Journey/pen/LMrLQV
     */
    // create a constant for the button which is assigned an id of back-to-top-btn
    const backToTopButton = document.querySelector("#back-to-top-btn");

    // add an scroll event on the window
    window.addEventListener("scroll", scrollBtnFunction);

    // write the function for the backToTopButton
    function scrollBtnFunction() {
        // show the backToTopButton when page vertical Offset > 300px
        if (window.pageYOffset > 300) {
            // if the button is not showing on the window
            if(!backToTopButton.classList.contains("btnEntrance")) {
                // remove the exit effect from the button
                backToTopButton.classList.remove("btnExit");
                // add the enter effect to the button
                backToTopButton.classList.add("btnEntrance");
                // display the button on the screen
                backToTopButton.style.display = "block";
            }
        }
        else {
            // hide the backToTopButton when page vertical Offset <= 300px
            if(backToTopButton.classList.contains("btnEntrance")) {
                // remove the enter effect from the button
                backToTopButton.classList.remove("btnEntrance");
                // add the exit effect to the button
                backToTopButton.classList.add("btnExit");
                // set the delay time for the button to disappear
                setTimeout(function() {
                    // hide the backToTopButton after 0.02s
                    backToTopButton.style.display = "none";
                }, 200);
            }
        }
    }

    // add a click event to the backToTopButton
    backToTopButton.addEventListener("click", smoothScrollBackToTop);

    // write a function to scroll back to top smoothly
    function smoothScrollBackToTop() {
        // create a constant for the realtime position
        const targetPosition = 0;
        // create a constant to store the offset
        const startPosition = window.pageYOffset;
        // create a constant to store the offset value
        const distance = targetPosition - startPosition;
        // set a time duration for going back to the top
        const duration = 600;
        // set an initial value
        let start = null;

        // call step function to show animation
        window.requestAnimationFrame(step);

        // write a step function
        function step(timestamp) {
            // if start with not null
            if (!start) {
                // set start value as timestamp
                start = timestamp;
            }
            // create a constant to store the difference
            const progress = timestamp - start;
            // call the scrollTo function
            window.scrollTo(0, easeInOut(progress, startPosition, distance, duration));
            // if progress < duration
            if (progress < duration) {
                // call step function to show animation
                window.requestAnimationFrame(step);
            }
        }
    }

    // write a function to get the y coordinate
    function easeInOut(a, b, c, d) {
        a /= d/2;
        if (a < 1) {
            return c/2*a*a*a + b;
        }
        a -= 2;
        return c/2*(a*a*a + 2) + b;
    }
});






/* Home Page scroll down and fade out */
$(function() {
    //retrieve the elements(images and paragraphs in the section with an assigned id story) that supposed to fadeout
    var documentEl = $(document),
        fadeElem = $('#story img, p');

    //place in scroll function
    documentEl.on('scroll', function() {
        //get the position of how far it has been scrolled from the top
        var currScrollPos = documentEl.scrollTop();

        //iterate through every fade scroll element on the page
        fadeElem.each(function() {
            //create variable "this" which refers to the elements we are currently iterating through
            var $this = $(this),
                //retrieve and save the fade scroll elements position from the top of document
                elemOffsetTop = $this.offset().top;
            //check whether those elements have reached the top of the page
            if (currScrollPos > elemOffsetTop)
                //change their opacity to let them fade away gradually
                $this.css('opacity', 1 - (currScrollPos-elemOffsetTop)/700);
        });
    });
});





/* Community Event Page image rotating */
//number of times of image changing
var count = 0;
//direction of the animation running
var isgo = false;
//create a timer object
var timer;

//trigger the event after the page finishing loading
window.onload = function () {
    //get the image in ul
    var ul_img = document.getElementsByClassName("ul_img")[0];
    //get all the images in li
    var li_img = document.getElementsByClassName("li_img");
    //create an arrow element to control direction
    var arrow = document.getElementsByClassName("arrow");
    //create the buttons under the images
    var div_btn = document.getElementsByClassName("div_btn");
    //set the default color for the first button
    div_btn[0].style.backgroundColor = "lightsteelblue";


    /* define the timer to control the rotating of images */
    //add the timer
    showtime();
    function showtime() {
        //define the timer and set the interval to 4 seconds
        timer = setInterval(function () {
            //check the direction is to the right at first
            if (isgo === false) {
                //increment in count
                count++;
                //let all the images move to the left with an offset of 1000px
                ul_img.style.transform = "translate(" + -1000 * count + "px)";
                //check if it comes to the last image
                if (count >= li_img.length - 1) {
                    //set count to the max rotate times
                    count = li_img.length - 1;
                    // reverse the current direction
                    isgo = true;
                }
            }
            //when the direction is to the left
            else {
                //decrement in count
                count--;
                //let all the images move to the right with an offset of 1000px
                ul_img.style.transform = "translate(" + -1000 * count + "px)";
                //check if it comes back to the first image
                if (count <= 0) {
                    //set count to zero
                    count = 0;
                    //reverse the direction again
                    isgo = false;
                }
            }

            // let the buttons change colors along with the change of image
            for (var i = 0; i < div_btn.length; i++) {
                //set color for non-current buttons
                div_btn[i].style.backgroundColor = "lavender";
            }
            //set the color for the current button
            div_btn[count].style.backgroundColor = "lightsteelblue";

            // delay for 4 seconds and then change to the next image
        }, 4000);
    }

    /* click arrow symbol to change images */
    //use for loop to get 2 arrows and create events on them
    for (var i = 0; i < arrow.length; i++) {
        //when the mouse is on the arrow
        arrow[i].onmouseover = function () {
            //stop the timer, the current image wouldn't change
            clearInterval(timer);
        };
        //when the mouse is away from arrows
        arrow[i].onmouseout = function () {
            //add back the timer
            showtime();
        };
        //when click on one of the arrows
        arrow[i].onclick = function () {
            //check which arrow it is,if it's the right arrow
            if (this.title === 0) {
                //increment in count
                count++;
                //when it comes to the last image
                if (count > 3) {
                    //set count to 0, jump back to the first image if keep clicking
                    count = 0;
                }
            }
            //if it's the left arrow
            else {
                //decrement in count
                count--;
                //when it comes to the first image
                if (count < 0) {
                    //set count to 3, jump back to the last image if keep clicking
                    count = 3;
                }
            }
            //move the images with a certain offset according to the count
            ul_img.style.transform = "translate(" + -1000 * count + "px)";

            // let the buttons change colors along with the change of image
            for (var i = 0; i < div_btn.length; i++) {
                //set color for non-current buttons
                div_btn[i].style.backgroundColor = "lavender";
            }
            //set the color for the current button
            div_btn[count].style.backgroundColor = "lightsteelblue";
        }
    }

    /* hover on the buttons underneath to change images */
    //use for loop to get 4 buttons and create event on them
    for (var b = 0; b < div_btn.length; b++) {
        //set the index to the last printed value
        div_btn[b].index = b;
        //when the mouse is hover on one of the buttons
        div_btn[b].onmouseover = function () {
            //stop the timer
            clearInterval(timer);

            // let the buttons change colors along with the change of image
            for (var a = 0; a < div_btn.length; a++) {
                //set color for non-current buttons
                div_btn[a].style.backgroundColor = "lavender";
            }
            //set the color for the current button
            div_btn[this.index].style.backgroundColor = "lightsteelblue";

            //check the index
            if (this.index === 3) {
                //set direction to right
                isgo = true;
            }
            //check the index
            if (this.index === 0) {
                //set direction to left
                isgo = false;
            }
            //correspond the count with index
            count = this.index;
            //move the images with a certain offset according to the index
            ul_img.style.transform = "translate(" + -1000 * this.index + "px)";
        };

        //when the mouse is away from the buttons
        div_btn[b].onmouseout = function () {
            //add the timer
            showtime();
        }
    }
};















