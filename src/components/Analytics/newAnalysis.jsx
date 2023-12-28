import Analysis from "./Analysis.jsx"
const newAnalysis= (analysis) => {
  return (
    <div>
      <>
        <Analysis key = {analysis.id} analysis = {analysis}/>
      </>
    </div>
  )
}

export default newAnalysis
