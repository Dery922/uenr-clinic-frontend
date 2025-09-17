<ul>
{patientRecords.history.map((record) => (
  <li key={record.id}>
    <strong>
      {new Date(record.date).toLocaleDateString()}
    </strong>{" "}
    -{record.working_diagnosis} (Record by {record.recorded_by})
    <br />
    <em>Differential Dx:</em>{" "}
    {record.differential_diagnosis}
    <p><strong>working_diagnosis </strong>: {record.working_diagnosis}</p>
  </li>
))}
</ul>