import React from "react";
import { useLocation } from "react-router-dom";
import Chart from "./Charts/Chart";
import "../../stylesheets/Stats.scss";
import PageChart from "./Charts/PagesChart";
import Star from "./Stars/Star";
import StarChart from "./Charts/StarChart";
import PubChart from "./Charts/PubChart";

//THIS WHOLE COMPONENT IS RESPONSIBLE FOR GENERATING ALL THE STATS ON OUR READING, AND ALL THE CHILD COMPONENT RENDERS
const Stats = () => {
  //WE USE THE USE LOCATION HOOK TO GET ACCESS TO THE PROPS THAT WERE PASSED DOWN USING REACT ROUTING LINKS
  const location = useLocation();
  const books = location.state;

  //YES THERE ARE ALOT OF VARIABLES HERE, BUT THEY ARE ALL NEEDED IF WE WANT TO GENERATE STATISTICS, SO IT IS WHAT IT IS. THE STATS ARE FOR PAGE LENGTH, RATINGS, YEAR OF PUBLICATION ETC ETC.
  let yourAvgRating = 0;
  let booksAvgRating = 0;
  let avgPageLength = 0;
  let shortestBook = "nothing";
  let shortestAuth = "nobody";
  let shortestBookPages = Infinity;
  let longestBook = "nothing";
  let longestAuth = "nobody";
  let longestBookLength = 0;
  let twenty19 = 0;
  let twenty20 = 0;
  let twenty21 = 0;
  let twenty22 = 0;
  let twenty23 = 0;
  let under100 = 0;
  let under250 = 0;
  let under500 = 0;
  let under750 = 0;
  let under1000 = 0;
  let under1500 = 0;
  let oneStar = 0;
  let twoStar = 0;
  let threeStar = 0;
  let fourStar = 0;
  let fiveStar = 0;
  let twenty20s = 0;
  let twenty10s = 0;
  let thousands = 0;
  let nineties = 0;
  let old = 0;

  //WE LOOP THROUGH OUR READ BOOKS AND INCREMENT THE CORRESPONDING STATS ACCORDINGLY
  for (let i = 0; i < books.length; i++) {
    const pubYear = Number(books[i].yearOfPub);
    if (pubYear > 2019) {
      twenty20s++;
    }
    if (pubYear < 2020 && pubYear > 2009) {
      twenty10s++;
    }
    if (pubYear < 2010 && pubYear > 1999) {
      thousands++;
    }
    if (pubYear < 2000 && pubYear > 1989) {
      nineties++;
    }
    if (pubYear < 1990) {
      old++;
    }
    const rating = Number(books[i].rating);
    if (rating === 1) {
      oneStar++;
    }
    if (rating === 2) {
      twoStar++;
    }
    if (rating === 3) {
      threeStar++;
    }
    if (rating === 4) {
      fourStar++;
    }
    if (rating === 5) {
      fiveStar++;
    }
    const pageCount = Number(books[i].pageCount);
    if (pageCount <= 100) {
      under100++;
    }
    if (pageCount > 100 && pageCount <= 250) {
      under250++;
    }
    if (pageCount > 250 && pageCount <= 500) {
      under500++;
    }
    if (pageCount > 500 && pageCount <= 750) {
      under750++;
    }
    if (pageCount > 750 && pageCount <= 1000) {
      under1000++;
    }
    if (pageCount > 1000 && pageCount <= 1500) {
      under1500++;
    }
    const yearRead = books[i].dateRead.slice(0, 4);
    if (Number(yearRead) === 2019) {
      twenty19++;
    }
    if (Number(yearRead) === 2020) {
      twenty20++;
    }
    if (Number(yearRead) === 2021) {
      twenty21++;
    }
    if (Number(yearRead) === 2022) {
      twenty22++;
    }
    if (Number(yearRead) === 2023) {
      twenty23++;
    }
    const yourRating = Number(books[i].rating);
    const pageLength = Number(books[i].pageCount);
    yourAvgRating += yourRating;
    booksAvgRating += Number(books[i].avgRating);
    avgPageLength += pageLength;

    if (pageLength < shortestBookPages) {
      shortestBookPages = pageLength;
      shortestAuth = books[i].author;
      shortestBook = books[i].title;
    }
    if (pageLength > longestBookLength) {
      longestBookLength = pageLength;
      longestAuth = books[i].author;
      longestBook = books[i].title;
    }
  }
  yourAvgRating = yourAvgRating / books.length;
  booksAvgRating = (booksAvgRating / books.length).toFixed(2);
  avgPageLength = Math.floor(avgPageLength / books.length);

  //IF NO BOOKS HAVE BEEN READING, THIS IS JUST AN EDGECASE TO HAVE A MESSAGE INSTEAD OF IT DISPLAYS NAN OR ANYTHING ELSE
  if (isNaN(yourAvgRating) || isNaN(booksAvgRating) || isNaN(avgPageLength)) {
    yourAvgRating = "n/a, because you haven't read anything yet :(";
    booksAvgRating = "n/a, because you haven't read anything yet :(";
    avgPageLength = "zero";
  }
  if (shortestBookPages === Infinity) {
    shortestBookPages = 0;
  }

  //CONSTRUCTING OBJECTS FOR EACH OF OUR STATISTIC COMPONENTS, SO THAT WE CAN PASS ALL THESE DOWN USING PROPS
  const yearsOfReading = {
    twenty19,
    twenty20,
    twenty21,
    twenty22,
    twenty23,
  };
  const pagesRead = {
    under100,
    under250,
    under500,
    under750,
    under1000,
    under1500,
  };
  const ratings = {
    oneStar,
    twoStar,
    threeStar,
    fourStar,
    fiveStar,
  };
  const pubYears = {
    twenty20s,
    twenty10s,
    thousands,
    nineties,
    old,
  };
  //JUST RENDERS SOME FUN FACTS AND THEN ALL OUR STAT CHARTS
  return (
    <React.Fragment>
      <h1 id="stats__header">Welcome to your Stats Page!</h1>
      <h2 id="stats__subheading">
        Checkout the stats below for an in-depth look at some of your reading
        habits!
      </h2>
      <div id="facts__div">
        <p id="fun__facts">Fun Facts:</p>
        <p id="fun__facts">
          Your average rating is: {yourAvgRating} <Star />.
        </p>
        <p id="fun__facts">
          The average rating of the books you read is: {booksAvgRating} <Star />
          .
        </p>
        <p id="fun__facts">
          The average length of the books you read is: {avgPageLength} pages.
        </p>
        <p id="fun__facts">
          The shortest book you have read is: {shortestBook}, which was{" "}
          {shortestBookPages} pages long, authored by {shortestAuth}.
        </p>
        <p id="fun__facts">
          The longest book you have read is: {longestBook}, which was{" "}
          {longestBookLength} pages long, authored by {longestAuth}.
        </p>
      </div>
      <div className="chart">
        <p>Your Reading over the past 5 years!</p>
        <Chart props={yearsOfReading} />
      </div>
      <div className="chart">
        <p>Some data on the length of books you read!</p>
        <PageChart props={pagesRead} />
      </div>
      <div className="chart">
        <p>Some data on how much you liked your books!</p>
        <StarChart props={ratings} />
      </div>
      <div className="chart">
        <p>How old are the books you read?</p>
        <PubChart props={pubYears} />
      </div>
    </React.Fragment>
  );
};

export default Stats;
