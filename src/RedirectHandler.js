// src/RedirectHandler.js
import React, { useEffect, useState } from "react";

const RedirectHandler = () => {
  const [stopRedirect, setStopRedirect] = useState(false); // State to control redirection
  const [secondsLeft, setSecondsLeft] = useState(5); // State for countdown timer

  useEffect(() => {
    const handleKeyPress = (event) => {
      // If the Escape key is pressed, stop the redirection
      if (event.key === "Escape") {
        setStopRedirect(true);
        console.log("Redirection canceled by user.");
        document.getElementById("noRedirect").style.display = "block";
      }
    };

    // Add event listener for key presses
    window.addEventListener("keydown", handleKeyPress);

    // Countdown timer for redirection
    const countdownInterval = setInterval(() => {
      setSecondsLeft((prev) => Math.max(prev - 1, 0));
    }, 1000);

    // Set a 5-second delay before executing the redirection logic
    const timer = setTimeout(() => {
      if (!stopRedirect) {
        const fetchRedirects = async () => {
          try {
            // Load the JSON file containing the old-to-new URL mappings
            const response = await fetch("/urlList.json");
            const redirects = await response.json();

            // Get the current URL
            const currentURL = window.location.href;

            // List of URLs to exclude from redirection
            const excludeURLs = ["https://gareyhouse.georgetown.org"];

            // Check if the current URL is in the exclusion list
            if (excludeURLs.includes(currentURL)) {
              console.log("URL is excluded from redirection.");
              return;
            }

            let matchFound = false;

            const noRedirect = document.getElementById("noRedirect");

            // Loop through the redirects list and perform the redirection if a match is found
            redirects.forEach((redirect) => {
              if (currentURL === redirect.oldURL) {
                matchFound = true;
                window.location.replace(redirect.newURL);
                noRedirect.href = redirect.newURL;
                noRedirect.style.display = "block";
              }
            });

            // If no match is found, redirect to the default URL
            if (!matchFound) {
              const defaultURL = "https://georgetowntexas.gov";
              window.location.replace(defaultURL);
            }
          } catch (error) {
            console.error("Error fetching redirect data:", error);
          }
        };

        fetchRedirects();
      }
    }, 5000);

    // Cleanup function to remove the event listener and clear timers
    return () => {
      clearTimeout(timer);
      clearInterval(countdownInterval);
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [stopRedirect]);

  return (
    <div className="vh-100">
      <div className="navBar">
        <a
          href="https://signup.e2ma.net/signup/1756517/1734270/?v=a"
          className="sml"
          target="_blank"
          rel="noreferrer"
        >
          <img src="/imgs/newsletter6-24-24.png" alt="newsletter"></img>
        </a>
        <a
          href="http://www.facebook.com/CityofGeorgetown"
          className="sml"
          target="_blank"
          rel="noreferrer"
        >
          <img src="/imgs/facebook-app-symbol.png" alt="facebook"></img>
        </a>
        <a
          href="https://www.instagram.com/georgetowntx"
          className="sml"
          target="_blank"
          rel="noreferrer"
        >
          <img src="/imgs/instagram%20(1).png" alt="instagram"></img>
        </a>
        <a
          href="http://www.twitter.com/georgetowntx"
          className="sml"
          target="_blank"
          rel="noreferrer"
        >
          <img src="/imgs/twitter.png" alt="twitter"></img>
        </a>
        <a
          href="http://www.youtube.com/user/TheCityofGeorgetown"
          className="sml"
          target="_blank"
          rel="noreferrer"
        >
          <img src="/imgs/youtube.png" alt="YouTube"></img>
        </a>
      </div>
      <div className="container custContainer">
        <div className="row text-center align-items-center">
          <div className="col">
            <img
              src="/imgs/GeorgetownTX_Logo[Primary-Tagline]RGB.png"
              alt="Georgetown Logo - More Than Welcome"
              id="img"
              className="img-fluid"
            ></img>
          </div>
        </div>
        <div className="row text-center">
          <div className="col-12">
            <h3 className="h3">The City of Georgetown website has moved</h3>
            <h5 className="h5">
              You will be redirected to{" "}
              <a href="https://georgetowntexas.gov">georgetowntexas.gov</a> in{" "}
              <span id="seconds">{secondsLeft}</span>
            </h5>
            <p id="noRedirect">
              If you were not redirected, please click{" "}
              <a href="https://georgetowntexas.gov">here</a>.
            </p>
          </div>
        </div>
      </div>
      <div id="footer" className="footer fixed-bottom">
        <img
          src="/imgs/border-footer.png"
          alt="Georgetown Footer"
          className="img-fluid"
        ></img>
      </div>
    </div>
  );
};

export default RedirectHandler;
