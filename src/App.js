import React, { useState, useEffect } from 'react';
import { FiChevronRight, FiChevronLeft } from 'react-icons/fi';
import { FaQuoteRight } from 'react-icons/fa';
import data from './data';

function App() {
  const [people, setPeople] = useState(data);
  const [index, setIndex] = useState(0);

  // will be called again if index or people changes
  useEffect(() => {
    const lastIndex = people.length - 1;
    // needed for lastSlide to apply when prev button is clicked from first slide (since personIndex in the map arg will never be negative)
    if (index < 0) {
      setIndex(lastIndex);
    }

    // occurs when next button is clicked from last item in list
    if (index > lastIndex) {
      setIndex(0);
    }
  }, [index, people]);

  return (
    <section className="section">
      {/* title can go in separate component */}
      <div className="title">
        <h2>
          <span>/</span>Reviews
        </h2>
      </div>

      <div className="section-center">
        {people.map((person, personIndex) => {
          const { id, image, name, title, quote } = person;

          let position = 'nextSlide';
          if (personIndex === index) {
            position = 'activeSlide';
          }
          // if index - 1 or last item in list, set to lastSlide
          if (
            personIndex === index - 1 ||
            // When app initially renders/whenever viewing first item in list, place last item to left of first item in list
            (index === 0 && personIndex === people.length - 1)
          ) {
            position = 'lastSlide';
          }

          return (
            <article className={position} key={id}>
              <img src={image} alt={name} className="person-img" />
              <h4>{name}</h4>
              <p className="title">{title}</p>
              <p className="text">{quote}</p>
              <FaQuoteRight className="icon" />
            </article>
          );
        })}

        <button className="prev" onClick={() => setIndex(index - 1)}>
          <FiChevronLeft />
        </button>
        <button className="next" onClick={() => setIndex(index + 1)}>
          <FiChevronRight />
        </button>
      </div>
    </section>
  );
}

export default App;
