import subprocess
import sys
import os
import signal
import time

def run_backend():
    print("Starting backend server...")
    backend_process = subprocess.Popen(
        [sys.executable, "server.py"],
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
        text=True
    )
    return backend_process

def run_frontend():
    print("Starting frontend server...")
    os.chdir("nutanix-frontend")
    frontend_process = subprocess.Popen(
        ["npm", "run", "dev"],
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
        text=True
    )
    os.chdir("..")
    return frontend_process

def main():
    try:
        # Start backend
        backend = run_backend()
        time.sleep(2)  # Wait for backend to start
        
        # Start frontend
        frontend = run_frontend()
        
        print("Both servers are running. Press Ctrl+C to stop.")
        print("Backend: http://localhost:8000")
        print("Frontend: http://localhost:5173")
        
        # Keep the script running
        while True:
            time.sleep(1)
            
    except KeyboardInterrupt:
        print("\nStopping servers...")
        backend.terminate()
        frontend.terminate()
        backend.wait()
        frontend.wait()
        print("Servers stopped.")

if __name__ == "__main__":
    main() 