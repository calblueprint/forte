class Api::SearchablesController < Api::BaseController
  def users
    results = PgSearch.multisearch(params[:prefix])
    filter = params[:filter]
    people_array = []
    for result in results
      if result.searchable_type == "Teacher" and filter != "Students"
        people_array.push(Teacher.find(result.searchable_id))
      elsif result.searchable_type == "Student" and filter != "Teachers"
        people_array.push(Student.find(result.searchable_id))
      end
    end
    render json: people_array
  end

  def roster
    students = Student.all
    teachers = Teacher.all
    people = (students + teachers).sort_by &:first_name
    render json: people
  end
end
