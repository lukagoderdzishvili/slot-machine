
# GAME - Slot Machine
An interactive slot machine game prototype with spinning reels and symbol-based outcomes.

Live Demo: [https://dreamy-narwhal-dc2270.netlify.app/](https://dreamy-narwhal-dc2270.netlify.app/)

## Installing / Getting started


```bash    
  git clone https://github.com/lukagoderdzishvili/slot-machine.git
  cd slot-machine
  
  npm install 
  npm run start
```
Open the game in your browser at [http://localhost:8080](http://localhost:8080)

## Build Production Version
```bash
npm run build
```
The bundled files will be located in the /dist folder.

### Docker Support

```markdown
### Build the Docker image

# using npm script
npm run build:docker

docker build -t slot-machine .
```


```markdown
### Run the container

# using npm script
npm run start:docker

# or directly
docker run -p 8080:80 slot-machine
```

## Time Spent (Approximate)

- **Project setup & initialization** → 1.5 h
- **File structure & configuration** → 1 h  
- **Asset loading & preloader implementation** → 0.5 h  
- **Asset search, selection & preparation (images, audio, spine files)** → 1 h  
- **Core game logic** → 2 h
- **Mock Server** → 0.5 h  
- **Animations** → 0.5 h  
- **Refactoring & code cleanup** → 1 h
- **Docker + final testing** → 0.5 h  

**Total:** ≈ 8.5 hours