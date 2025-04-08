#!/usr/bin/env python3

import os
import sys
import subprocess
from typing import List, Optional
import click
from rich.console import Console
from rich.prompt import Prompt
from rich.panel import Panel
from git import Repo
import requests
from dotenv import load_dotenv

load_dotenv()

console = Console()

class GitCommitAI:
    def __init__(self):
        self.repo = Repo(os.getcwd())
        self.console = Console()
        
    def get_staged_diff(self) -> str:
        try:
            diff = self.repo.git.diff('--cached')
            return diff
        except Exception as e:
            self.console.print(f"[red]Error getting staged diff: {str(e)}[/red]")
            sys.exit(1)

    def generate_commit_message(self, diff: str) -> List[str]:
        try:
            return [
                "feat: Add new feature",
                "fix: Fix bug in existing feature",
                "docs: Update documentation"
            ]
        except Exception as e:
            self.console.print(f"[red]Error generating commit message: {str(e)}[/red]")
            sys.exit(1)

    def display_suggestions(self, suggestions: List[str]) -> Optional[str]:
        self.console.print("\n[bold]Generated Commit Message Suggestions:[/bold]")
        
        for idx, suggestion in enumerate(suggestions, 1):
            self.console.print(Panel(suggestion, title=f"Suggestion {idx}"))
        
        choice = Prompt.ask(
            "\nSelect a suggestion number, or type 'e' to edit, 'n' for new suggestions, or 'q' to quit",
            choices=[str(i) for i in range(1, len(suggestions) + 1)] + ['e', 'n', 'q']
        )
        
        if choice == 'q':
            return None
        elif choice == 'e':
            return Prompt.ask("Enter your commit message")
        elif choice == 'n':
            return self.display_suggestions(self.generate_commit_message(self.get_staged_diff()))
        else:
            return suggestions[int(choice) - 1]

@click.command()
def main():
    try:
        commit_ai = GitCommitAI()
        
        if not commit_ai.repo.index.diff('HEAD'):
            console.print("[yellow]No staged changes found. Stage some changes first.[/yellow]")
            sys.exit(0)
        
        diff = commit_ai.get_staged_diff()
        suggestions = commit_ai.generate_commit_message(diff)
        commit_message = commit_ai.display_suggestions(suggestions)
        
        if commit_message:
            commit_ai.repo.index.commit(commit_message)
            console.print(f"[green]Successfully committed with message:[/green]\n{commit_message}")
        else:
            console.print("[yellow]Commit cancelled.[/yellow]")
            
    except Exception as e:
        console.print(f"[red]Error: {str(e)}[/red]")
        sys.exit(1)

if __name__ == "__main__":
    main()
