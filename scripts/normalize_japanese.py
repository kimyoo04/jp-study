import json
import sys
from pykakasi import kakasi

converter = kakasi()
sentences = json.load(sys.stdin)
print(json.dumps([
    ''.join(part['hira'] for part in converter.convert(sentence))
    for sentence in sentences
], ensure_ascii=False))
