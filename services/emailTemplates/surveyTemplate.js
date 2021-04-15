module.exports = (survey) => {
  return `
  <html>
  <body>
    <div style="text-align: center">
      <h3>I'd like your input!</h3>
      <p>Please answer the following question</p>
      <p>${survey.body}</p>
      <div >
      <a style="margin: 12 16px" href="${process.env.REDIRECT_URI}api/surveys/thanks">Yes</a>
  
      </div>
      <div >
    
      <a style="margin: 12 16px" href="${process.env.REDIRECT_URI}api/surveys/thanks">No</a>
      </div>
      
    </div>
  </body>
</html>

  
  `;
};
