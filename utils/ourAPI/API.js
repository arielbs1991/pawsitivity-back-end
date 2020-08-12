//ARE WE GOING TO USE THIS FILE?? WHO KNOWS

import axios from "axios";

export default {
    getMatches: function() {
      return axios.get("/api/matches");
    },
    getMatch: function(id) {
      return axios.get("/api/match/" + id);
    },
    deleteMatch: function(id) {
      return axios.delete("/api/match/" + id);
    },
    saveMatch: function(matchData) {
      return axios.post("/api/matches", matchData);
    }
  };
  