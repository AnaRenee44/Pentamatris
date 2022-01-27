import React from "react";

function Reviews(props) {
  const { onClick } = props;

  return (
    <div id='revs-view'>
      <h4>Your Reviews</h4>
      <button
        className='revs-to-faves'
        onClick={onClick}
      >SEE FAVORITES</button>
    </div>
  );
};

export default Reviews;