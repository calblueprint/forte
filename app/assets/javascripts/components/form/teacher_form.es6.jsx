class TeacherForm extends React.Component {

  render () {
    return (
      <div className="page-wrapper">
        <Header />
          <div className="content-wrapper">
          <h1>Teacher Application</h1>
            <form>
              <FormGroup>
                <ControlLabel>First Name</ControlLabel>
                <FormControl type="text" 
                placeholder="Enter first name"/>
              </FormGroup>

              <FormGroup>
                <ControlLabel>Last Name</ControlLabel>
                <FormControl type="text" 
                placeholder="Enter last name"/>
              </FormGroup>

              <FormGroup>
                <ControlLabel>Gender</ControlLabel>
                <FormControl componentClass="select" placeholder="Select gender">
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </FormControl>
              </FormGroup>

              <FormGroup>
                <ControlLabel>Birth Day</ControlLabel>
                <FormControl componentClass="select" placeholder="Select birthday">
                  <option value="Date">1</option>
                  <option value="Date">2</option>
                  <option value="Date">3</option>
                  <option value="Date">4</option>
                  <option value="Date">5</option>
                  <option value="Date">6</option>
                  <option value="Date">7</option>
                  <option value="Date">8</option>
                  <option value="Date">9</option>
                  <option value="Date">10</option>
                  <option value="Date">11</option>
                  <option value="Date">12</option>
                  <option value="Date">13</option>
                  <option value="Date">14</option>
                  <option value="Date">15</option>
                  <option value="Date">16</option>
                  <option value="Date">17</option>
                  <option value="Date">18</option>
                  <option value="Date">19</option>
                  <option value="Date">20</option>
                  <option value="Date">21</option>
                  <option value="Date">22</option>
                  <option value="Date">23</option>
                  <option value="Date">24</option>
                  <option value="Date">25</option>
                  <option value="Date">26</option>
                  <option value="Date">27</option>
                  <option value="Date">28</option>
                  <option value="Date">29</option>
                  <option value="Date">30</option>
                  <option value="Date">31</option>

                </FormControl>
              </FormGroup>

              <FormGroup>
                <ControlLabel>Birth Month</ControlLabel>
                <FormControl componentClass="select" placeholder="Select birth month">
                  <option value="Month">1</option>
                  <option value="Month">2</option>
                  <option value="Month">3</option>
                  <option value="Month">4</option>
                  <option value="Month">5</option>
                  <option value="Month">6</option>
                  <option value="Month">7</option>
                  <option value="Month">8</option>
                  <option value="Month">9</option>
                  <option value="Month">10</option>
                  <option value="Month">11</option>
                  <option value="Month">12</option>
                </FormControl>
              </FormGroup>

              <FormGroup>
                <ControlLabel>Birth Year</ControlLabel>
                <FormControl componentClass="select" placeholder="Select birth year">
                  <option value="BYear">2002</option>
                  <option value="BYear">2003</option>
                  <option value="BYear">2004</option>
                  <option value="BYear">2005</option>
                  <option value="BYear">2006</option>
                  <option value="BYear">2007</option>
                  <option value="BYear">2008</option>
                  <option value="BYear">2009</option>
                  <option value="BYear">2010</option>
                  <option value="BYear">2011</option>
                  <option value="BYear">2012</option>
                </FormControl>
              </FormGroup>

              <FormGroup>
                <ControlLabel>School Name</ControlLabel>
                <FormControl type="text" 
                placeholder="School"/>
              </FormGroup>

              <FormGroup>
                <ControlLabel>Class Level</ControlLabel>
                <FormControl componentClass="select" placeholder="Select birth year">
                  <option value="Level">Freshman</option>
                  <option value="Level">Sophomore</option>
                  <option value="Level">Junior</option>
                  <option value="Level">Senior</option>
                  <option value="Level">Graduated</option>
                </FormControl>
              </FormGroup>

              <FormGroup>
                <ControlLabel>Graduation Year</ControlLabel>
                <FormControl componentClass="select" placeholder="Select birth year">
                  <option value="GYear">2016</option>
                  <option value="GYear">2017</option>
                  <option value="GYear">2018</option>
                  <option value="GYear">2019</option>
                  <option value="GYear">2020</option>
                  <option value="GYear">2021</option>
                  <option value="GYear">2022</option>
                  <option value="GYear">2023</option>
                  <option value="GYear">2024</option>
                </FormControl>
              </FormGroup>

              <FormGroup>
                <ControlLabel>Email</ControlLabel>
                <FormControl type="text" 
                placeholder="Email Address"/>
              </FormGroup>

              <FormGroup>
                <ControlLabel>Password</ControlLabel>
                <FormControl type="text" 
                placeholder="Password"/>
              </FormGroup>

              <FormControl.Feedback />
            </form>
          </div>
        <Footer />
      </div>
    );
  }
}
