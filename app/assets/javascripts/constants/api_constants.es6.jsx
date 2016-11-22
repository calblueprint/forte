(() => {
  class ApiConstants {

    get authentication() {
      return {
        login:
        {
          student: '/students/sign_in',
          teacher: '/teachers/sign_in',
          admin: '/admins/sign_in',
        },
        logout:
        {
          student: '/students/sign_out',
          teacher: '/teachers/sign_out',
          admin: '/admins/sign_out',
        },
        signup:
        {
          student: '/students',
          teacher: '/teachers',
        }
      }
    }

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
        possibleTeachers: (id) => `/api/teachers/possible_teachers/${id}`,
        upcomingLessons: (id) => `/api/teachers/upcoming_lessons/${id}`,
        recentLessons: (id) => `/api/teachers/recent_lessons/${id}`,
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
