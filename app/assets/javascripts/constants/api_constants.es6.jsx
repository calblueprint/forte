(() => {
  class ApiConstants {

    get students() {
      return {
        index: '/api/students',
        unmatched: '/api/students/unmatched',
        delete: (id) => `/api/students/${id}`,
        update: (id) => `/api/students/${id}`,
        show: (id) => `/api/students/${id}`,
        upcomingLessons: (id) => `/api/students/upcoming_lessons/${id}`,
        recentLessons: (id) => `/api/students/recent_lessons/${id}`,
      };
    }

    get teachers() {
      return {
        index: '/api/teachers',
        delete: (id) => `/api/teachers/${id}`,
        update: (id) => `/api/teachers/${id}`,
        show: (id) => `/api/teachers/${id}`,
        possibleTeachers: (id) => `/api/teachers/possible_teachers/${id}`
      };
    }

    get searchables() {
      return {
        users: (prefix) => `/api/searchables/users/${prefix}`,
        roster: '/api/searchables/roster',
      }
    }

    get lessons() {
      return {
        create: '/api/lessons',
        index: '/api/lessons',
        delete: (id) => `/api/lessons/${id}`,
        update: (id) => `/api/lessons/${id}`,
        show: (id) => `/api/lessons/${id}`,
      };
    }

    get matchings() {
      return {
        create: '/api/matchings',
        index: '/api/matchings',
        delete: (id) => `/api/matchings/${id}`,
        update: (id) => `/api/matchings/${id}`,
        show: (id) => `/api/matchings/${id}`,
      };
    }
  }
  this.ApiConstants = new ApiConstants();
})();
