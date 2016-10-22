class AdminController < ApplicationController
  
  def matched
    matchings = Matching.all.includes(:student, :teacher)
    @matching_info = []
    for matching in matchings do
      @matching_info.push({"matching": matching, "teacher": matching.teacher, "student": matching.student})
    end
  end

  def lessons
  	@lessons = Lesson.all.sort_by &:start_time
  end

  def roster
  end
end
