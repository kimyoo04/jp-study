import json
import sys
from pykakasi import kakasi

converter = kakasi()
words = json.load(sys.stdin)
print(json.dumps([
    ''.join(part['hepburn'] for part in converter.convert(word))
    for word in words
], ensure_ascii=False))
