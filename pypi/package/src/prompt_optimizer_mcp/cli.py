#!/usr/bin/env python
"""CLI entry point for prompt-optimizer-mcp."""
import sys
from .server import mcp

def main():
    mcp.run(transport="stdio")

if __name__ == "__main__":
    main()
