(() => {
  class RouteConstants {

    get staticPages() {
      return {
        home: '/',
        program: '/program',
        involvement: '/involvement',
        contact: '/contact',
        about: '/about',
        terms: '/terms',
      }
    }

    get admin() {
      return {
        matched: '/admin/matched',
        unmatched: '/admin/unmatched',
        roster: '/admin/roster',
        matchedLesson: (id) => `/admin/matched/${id}/lessons`,
        studentProfile: (id) => `/admin/roster/students/${id}`,
        teacherProfile: (id) => `/admin/roster/teachers/${id}`,
      }
    }

    get student() {
      return {
        dashboard: '/student/dashboard',
        lessons: '/student/lessons',
        profile: '/student/profile',
        settings: '/student/settings',
      }
    }

    get teacher() {
      return {
        lessons: '/teacher/lessons',
        profile: '/teacher/profile',
      }
    }

    get form() {
      return {
        student: '/form/student',
        teacher: '/form/teacher',
      }
    }
  }
this.RouteConstants = new RouteConstants();
})();
