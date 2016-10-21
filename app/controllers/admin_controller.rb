class AdminController < ApplicationController
  
  def matched
  end

  def lessons
  	@lessons = Lesson.all.sort_by &:start_time
  end

  def roster
  end
end
