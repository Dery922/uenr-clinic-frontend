     <div className="col-12 col-md-6 col-lg-6 col-xl-6">
            <div className="card">
              <div className="card-body">
                <div className="chart-title">
                  <h4>Patients In</h4>
                  {/* <div className="float-right">
                    <ul className="chat-user-total">
                      <li>
                        <i
                          className="fa fa-circle current-users"
                          aria-hidden="true"
                        ></i>
                        ICU
                      </li>
                      <li>
                        <i
                          className="fa fa-circle old-users"
                          aria-hidden="true"
                        ></i>{" "}
                        OPD
                      </li>
                    </ul>
                  </div> */}
                </div>
    

                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={data}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="patients" stroke="#82ca9d" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>