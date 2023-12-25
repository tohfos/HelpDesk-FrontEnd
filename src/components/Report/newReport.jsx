import newReportDiv from "./newReportDiv"
const newReport = (report) => {
  return (
    <div className="newReport">
      <>
        <newReportDiv key = {report.id} report = {report}/>
      </>
    </div>
  )
}

export default newReport
