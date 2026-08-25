"""Tests for prompt-optimizer-mcp package."""
import pytest
from prompt_optimizer_mcp import __version__


def test_version():
    """Test that version is defined."""
    assert __version__ == "1.0.0"


def test_mcp_import():
    """Test that mcp instance can be imported."""
    from prompt_optimizer_mcp import mcp
    assert mcp is not None
    assert mcp.name == "prompt-optimizer"
