# Nutanixps
# Git Commit AI

An AI-powered Git commit message generator that helps you write better commit messages automatically.

## Features

- Automatically generates commit message suggestions based on your staged changes
- Interactive CLI interface for selecting or editing commit messages
- Seamless Git integration
- Beautiful terminal UI with rich formatting

## Installation

1. Clone this repository:
bash
git clone https://github.com/divyansh-cyber/Nutanixps.git
cd Nutanixps


2. Create a virtual environment and activate it:
bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate


3. Install dependencies:
bash
pip install -r requirements.txt


4. Create a `.env` file in the project root and add your Cursor.ai API key:

CURSOR_AI_API_KEY=your_api_key_here


## Usage

1. Stage your changes as usual:
bash
git add .


2. Run the commit message generator:
bash
python git_commit_ai.py


3. Choose from the generated suggestions, edit the message, or generate new suggestions.

## Git Hook Integration (Optional)

To automatically use this tool before each commit, you can set up a Git hook:

1. Create a pre-commit hook:
bash
cp git_commit_ai.py .git/hooks/pre-commit
chmod +x .git/hooks/pre-commit


## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
