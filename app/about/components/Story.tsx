import React from "react";

export const Story = (): React.ReactElement => {
  return (
    <section className="story-banner">
      <div className="story-inner">
        <h1 className="story-title">The Story Behind Palana</h1>
        <div className="story-content">
          <div className="story-image-wrap">
            <img
              src="/dubs.png"
              alt="Founders discussing Palana's mission"
              className="story-image"
            />
          </div>
          <div className="story-text">
            <p>
              The first time Palana founder, Crystal Shen, used the University of Washington's Husky SafeTrip service, she realized how difficult it could be to navigate. 
              After requesting a ride, Crystal waited outside for nearly two hours without clear guidance on where to stand, how long the wait might be, or who exactly she was waiting for.
              Eventually, Crystal decided to walk home, feeling more uncertain about getting home than when she had started. 
            </p>
            <p>
              Crystal's experience with Husky SafeTrip highlights how the current processes of many campus safety services across the nation can make students feel uncertain in moments when they need reassurance the most.
              Therefore, every feature that Palana ships is grounded in listening to the students who rely on it, the dispatchers who operate it, and universities who trust it to be a safe and reliable solution,
              so getting home at night feels thoughtful, intentional, and easier for everyone involved.
            </p>
            {/* <div className="story-quote">
              “With our experience and expertise, we decided to do it.”
            </div> */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Story;