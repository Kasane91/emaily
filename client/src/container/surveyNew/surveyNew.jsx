import React, { useState } from "react";
import SurveyForm from "../../components/surveys/surveyForm";

import SurveyFormReview from "../../components/surveys/surveyFormReview";

//PARENT CONTAINER FOR SURVEYFORM AND SURVEYREVIEW

const SurveyNew = (props) => {
  const [showFormReview, setShowFormReview] = useState(false);

  let renderContent = (
    <div>
      <SurveyForm
        onSurveySubmit={() => {
          console.log(showFormReview);
          setShowFormReview(!showFormReview);
        }}
      />
    </div>
  );

  if (showFormReview) {
    renderContent = (
      <SurveyFormReview onCancel={() => setShowFormReview(false)} />
    );
  }

  return <div>{renderContent}</div>;
};

export default SurveyNew;
