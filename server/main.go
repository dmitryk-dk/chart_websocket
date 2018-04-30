package main

import (
	"flag"
	"log"
	"net/http"
)

var addr = flag.String("addr", ":3030", "http service address")

type User struct {
	Nickname string
	Messages []string
}

var dbUsers = map[string]User{}      // user ID, user
var dbSessions = map[string]string{}

func serveHome(w http.ResponseWriter, r *http.Request) {
	log.Println(r.URL)
	fs := http.FileServer(http.Dir("../dist"))
	http.Handle("/dist/", http.StripPrefix("/dist/", fs))
	http.Handle("/favicon.ico", http.NotFoundHandler())
	// if r.URL.Path != "/" {
	// 	http.Error(w, "Not found", http.StatusNotFound)
	// 	return
	// }
	if r.Method != "GET" {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}
	http.ServeFile(w, r, "../dist/index.html")
	log.Printf("Connection established to address: %s", r.RemoteAddr)
}

func main() {
	flag.Parse()
	hub := newHub()
	go hub.run()
	http.HandleFunc("/", serveHome)
	http.HandleFunc("/ws", func(w http.ResponseWriter, r *http.Request) {
		serveWs(hub, w, r)
	})
	err := http.ListenAndServe(*addr, nil)
	if err != nil {
		log.Fatal("ListenAndServe: ", err)
	}
}
