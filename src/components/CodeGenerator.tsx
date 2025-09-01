"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ResponseData {
  status: number;
  statusText: string;
  headers: Record<string, string>;
  data: any;
  url: string;
  type: string;
}

interface RequestData {
  url: string;
  method: string;
  headers: Record<string, string>;
  body?: any;
}

interface CodeGeneratorProps {
  isVisible: boolean;
  onToggle: () => void;
  response: ResponseData | null;
  request: RequestData | null;
}

const LANGUAGES = {
  javascript: "JavaScript (Fetch)",
  typescript: "TypeScript (Fetch)",
  python: "Python (Requests)",
  curl: "cURL",
  php: "PHP (cURL)",
  java: "Java (HttpClient)",
  csharp: "C# (HttpClient)",
  go: "Go (net/http)",
  rust: "Rust (reqwest)",
  swift: "Swift (URLSession)",
};

export default function CodeGenerator({
  isVisible,
  onToggle,
  response,
  request,
}: CodeGeneratorProps) {
  const [selectedLanguage, setSelectedLanguage] =
    useState<keyof typeof LANGUAGES>("javascript");
  const [includeResponse, setIncludeResponse] = useState(true);

  const generateCode = () => {
    if (!request) return "// No request data available";

    const { url, method, headers, body } = request;
    const hasBody = body && method !== "GET";

    switch (selectedLanguage) {
      case "javascript":
        return generateJavaScript(url, method, headers, body, hasBody);
      case "typescript":
        return generateTypeScript(url, method, headers, body, hasBody);
      case "python":
        return generatePython(url, method, headers, body, hasBody);
      case "curl":
        return generateCurl(url, method, headers, body, hasBody);
      case "php":
        return generatePHP(url, method, headers, body, hasBody);
      case "java":
        return generateJava(url, method, headers, body, hasBody);
      case "csharp":
        return generateCSharp(url, method, headers, body, hasBody);
      case "go":
        return generateGo(url, method, headers, body, hasBody);
      case "rust":
        return generateRust(url, method, headers, body, hasBody);
      case "swift":
        return generateSwift(url, method, headers, body, hasBody);
      default:
        return "// Unsupported language";
    }
  };

  const generateJavaScript = (
    url: string,
    method: string,
    headers: Record<string, string>,
    body: any,
    hasBody: boolean
  ) => {
    let code = `const response = await fetch('${url}', {\n`;
    code += `  method: '${method}',\n`;

    if (Object.keys(headers).length > 0) {
      code += `  headers: {\n`;
      Object.entries(headers).forEach(([key, value]) => {
        code += `    '${key}': '${value}',\n`;
      });
      code += `  },\n`;
    }

    if (hasBody) {
      code += `  body: ${JSON.stringify(body, null, 2)},\n`;
    }

    code += `});\n\n`;
    code += `const data = await response.json();\n`;
    code += `console.log(data);`;

    if (includeResponse && response) {
      code += `\n\n// Response:\n`;
      code += `// Status: ${response.status} ${response.statusText}\n`;
      code += `// Data: ${JSON.stringify(response.data, null, 2)}`;
    }

    return code;
  };

  const generateTypeScript = (
    url: string,
    method: string,
    headers: Record<string, string>,
    body: any,
    hasBody: boolean
  ) => {
    let code = `interface ApiResponse {\n`;
    if (response?.data) {
      // Generate basic interface from response
      const sampleData = response.data;
      if (typeof sampleData === "object" && sampleData !== null) {
        Object.keys(sampleData).forEach((key) => {
          const value = sampleData[key];
          const type =
            typeof value === "string"
              ? "string"
              : typeof value === "number"
              ? "number"
              : typeof value === "boolean"
              ? "boolean"
              : "any";
          code += `  ${key}: ${type};\n`;
        });
      }
    }
    code += `}\n\n`;

    code += `const response = await fetch('${url}', {\n`;
    code += `  method: '${method}',\n`;

    if (Object.keys(headers).length > 0) {
      code += `  headers: {\n`;
      Object.entries(headers).forEach(([key, value]) => {
        code += `    '${key}': '${value}',\n`;
      });
      code += `  },\n`;
    }

    if (hasBody) {
      code += `  body: ${JSON.stringify(body, null, 2)},\n`;
    }

    code += `});\n\n`;
    code += `const data: ApiResponse = await response.json();\n`;
    code += `console.log(data);`;

    return code;
  };

  const generatePython = (
    url: string,
    method: string,
    headers: Record<string, string>,
    body: any,
    hasBody: boolean
  ) => {
    let code = `import requests\nimport json\n\n`;

    code += `url = '${url}'\n`;

    if (Object.keys(headers).length > 0) {
      code += `headers = {\n`;
      Object.entries(headers).forEach(([key, value]) => {
        code += `    '${key}': '${value}',\n`;
      });
      code += `}\n\n`;
    }

    if (hasBody) {
      code += `data = ${JSON.stringify(body, null, 2)}\n\n`;
    }

    code += `response = requests.${method.toLowerCase()}(${
      url.includes("${") ? "url" : `'${url}'`
    }`;

    if (Object.keys(headers).length > 0) {
      code += `, headers=headers`;
    }

    if (hasBody) {
      code += `, json=data`;
    }

    code += `)\n\n`;
    code += `print(response.json())`;

    return code;
  };

  const generateCurl = (
    url: string,
    method: string,
    headers: Record<string, string>,
    body: any,
    hasBody: boolean
  ) => {
    let code = `curl -X ${method} '${url}'`;

    Object.entries(headers).forEach(([key, value]) => {
      code += ` \\\n  -H '${key}: ${value}'`;
    });

    if (hasBody) {
      code += ` \\\n  -d '${JSON.stringify(body)}'`;
    }

    return code;
  };

  const generatePHP = (
    url: string,
    method: string,
    headers: Record<string, string>,
    body: any,
    hasBody: boolean
  ) => {
    let code = `<?php\n\n`;
    code += `$url = '${url}';\n`;
    code += `$ch = curl_init();\n\n`;
    code += `curl_setopt($ch, CURLOPT_URL, $url);\n`;
    code += `curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);\n`;
    code += `curl_setopt($ch, CURLOPT_CUSTOMREQUEST, '${method}');\n\n`;

    if (Object.keys(headers).length > 0) {
      code += `$headers = [\n`;
      Object.entries(headers).forEach(([key, value]) => {
        code += `    '${key}: ${value}',\n`;
      });
      code += `];\n`;
      code += `curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);\n\n`;
    }

    if (hasBody) {
      code += `$data = ${JSON.stringify(body, null, 2)};\n`;
      code += `curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));\n\n`;
    }

    code += `$response = curl_exec($ch);\n`;
    code += `curl_close($ch);\n\n`;
    code += `$data = json_decode($response, true);\n`;
    code += `print_r($data);\n`;
    code += `?>\n`;

    return code;
  };

  const generateJava = (
    url: string,
    method: string,
    headers: Record<string, string>,
    body: any,
    hasBody: boolean
  ) => {
    let code = `import java.net.http.HttpClient;\n`;
    code += `import java.net.http.HttpRequest;\n`;
    code += `import java.net.http.HttpResponse;\n`;
    code += `import java.net.URI;\n\n`;

    code += `HttpClient client = HttpClient.newHttpClient();\n\n`;

    code += `HttpRequest.Builder requestBuilder = HttpRequest.newBuilder()\n`;
    code += `    .uri(URI.create("${url}"))\n`;
    code += `    .${method.toLowerCase()}(`;

    if (hasBody) {
      code += `HttpRequest.BodyPublishers.ofString("${JSON.stringify(
        body
      ).replace(/"/g, '\\"')}")`;
    } else {
      code += `HttpRequest.BodyPublishers.noBody()`;
    }

    code += `);\n\n`;

    Object.entries(headers).forEach(([key, value]) => {
      code += `requestBuilder.header("${key}", "${value}");\n`;
    });

    code += `\nHttpRequest request = requestBuilder.build();\n\n`;
    code += `HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());\n`;
    code += `System.out.println(response.body());`;

    return code;
  };

  const generateCSharp = (
    url: string,
    method: string,
    headers: Record<string, string>,
    body: any,
    hasBody: boolean
  ) => {
    let code = `using System;\nusing System.Net.Http;\nusing System.Text;\nusing System.Threading.Tasks;\n\n`;
    code += `var client = new HttpClient();\n\n`;

    code += `var request = new HttpRequestMessage(HttpMethod.${method}, "${url}");\n\n`;

    Object.entries(headers).forEach(([key, value]) => {
      code += `request.Headers.Add("${key}", "${value}");\n`;
    });

    if (hasBody) {
      code += `\nvar json = ${JSON.stringify(body, null, 2)};\n`;
      code += `request.Content = new StringContent(json, Encoding.UTF8, "application/json");\n`;
    }

    code += `\nvar response = await client.SendAsync(request);\n`;
    code += `var content = await response.Content.ReadAsStringAsync();\n`;
    code += `Console.WriteLine(content);`;

    return code;
  };

  const generateGo = (
    url: string,
    method: string,
    headers: Record<string, string>,
    body: any,
    hasBody: boolean
  ) => {
    let code = `package main\n\n`;
    code += `import (\n`;
    code += `    "bytes"\n`;
    code += `    "encoding/json"\n`;
    code += `    "fmt"\n`;
    code += `    "net/http"\n`;
    code += `)\n\n`;

    code += `func main() {\n`;
    code += `    url := "${url}"\n\n`;

    if (hasBody) {
      code += `    data := map[string]interface{}{\n`;
      if (typeof body === "object" && body !== null) {
        Object.entries(body).forEach(([key, value]) => {
          code += `        "${key}": ${JSON.stringify(value)},\n`;
        });
      }
      code += `    }\n`;
      code += `    jsonData, _ := json.Marshal(data)\n\n`;
    }

    code += `    req, _ := http.NewRequest("${method}", url, `;
    if (hasBody) {
      code += `bytes.NewBuffer(jsonData)`;
    } else {
      code += `nil`;
    }
    code += `)\n\n`;

    Object.entries(headers).forEach(([key, value]) => {
      code += `    req.Header.Set("${key}", "${value}")\n`;
    });

    code += `\n    client := &http.Client{}\n`;
    code += `    resp, _ := client.Do(req)\n`;
    code += `    defer resp.Body.Close()\n\n`;
    code += `    fmt.Println("Response:", resp.Status)\n`;
    code += `}\n`;

    return code;
  };

  const generateRust = (
    url: string,
    method: string,
    headers: Record<string, string>,
    body: any,
    hasBody: boolean
  ) => {
    let code = `use reqwest;\nuse serde_json::json;\nuse std::collections::HashMap;\n\n`;
    code += `#[tokio::main]\n`;
    code += `async fn main() -> Result<(), Box<dyn std::error::Error>> {\n`;
    code += `    let client = reqwest::Client::new();\n\n`;

    code += `    let mut request = client.request(reqwest::Method::${method.toUpperCase()}, "${url}");\n\n`;

    Object.entries(headers).forEach(([key, value]) => {
      code += `    request = request.header("${key}", "${value}");\n`;
    });

    if (hasBody) {
      code += `\n    let body = json!(${JSON.stringify(body, null, 2)});\n`;
      code += `    request = request.json(&body);\n`;
    }

    code += `\n    let response = request.send().await?;\n`;
    code += `    let text = response.text().await?;\n`;
    code += `    println!("{}", text);\n\n`;
    code += `    Ok(())\n`;
    code += `}\n`;

    return code;
  };

  const generateSwift = (
    url: string,
    method: string,
    headers: Record<string, string>,
    body: any,
    hasBody: boolean
  ) => {
    let code = `import Foundation\n\n`;
    code += `let url = URL(string: "${url}")!\n`;
    code += `var request = URLRequest(url: url)\n`;
    code += `request.httpMethod = "${method}"\n\n`;

    Object.entries(headers).forEach(([key, value]) => {
      code += `request.setValue("${value}", forHTTPHeaderField: "${key}")\n`;
    });

    if (hasBody) {
      code += `\nlet jsonData = try JSONSerialization.data(withJSONObject: ${JSON.stringify(
        body,
        null,
        2
      )})\n`;
      code += `request.httpBody = jsonData\n`;
    }

    code += `\nURLSession.shared.dataTask(with: request) { data, response, error in\n`;
    code += `    if let data = data {\n`;
    code += `        let json = try? JSONSerialization.jsonObject(with: data)\n`;
    code += `        print(json)\n`;
    code += `    }\n`;
    code += `}.resume()\n`;

    return code;
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generateCode());
  };

  return (
    <>
      {/* Toggle Button */}
      <motion.button
        onClick={onToggle}
        className="fixed bottom-4 right-36 retro-button crt-glow z-50"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        CODE
      </motion.button>

      {/* Code Generator Panel */}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            className="fixed bottom-20 right-4 w-96 h-96 retro-border crt-glow bg-black bg-opacity-90 z-40"
          >
            <div className="p-4 h-full flex flex-col">
              <div className="flex justify-between items-center mb-4">
                <h3 className="crt-text font-bold">CODE GENERATOR</h3>
                <button
                  onClick={onToggle}
                  className="retro-button text-xs px-2"
                >
                  ×
                </button>
              </div>

              {/* Language Selection */}
              <div className="mb-4">
                <label className="block text-sm crt-text mb-2">LANGUAGE</label>
                <select
                  value={selectedLanguage}
                  onChange={(e) =>
                    setSelectedLanguage(
                      e.target.value as keyof typeof LANGUAGES
                    )
                  }
                  className="retro-input w-full text-sm"
                >
                  {Object.entries(LANGUAGES).map(([key, name]) => (
                    <option key={key} value={key}>
                      {name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Options */}
              <div className="mb-4">
                <label className="flex items-center gap-2 text-sm crt-text">
                  <input
                    type="checkbox"
                    checked={includeResponse}
                    onChange={(e) => setIncludeResponse(e.target.checked)}
                    className="retro-input"
                  />
                  Include response data
                </label>
              </div>

              {/* Generated Code */}
              <div className="flex-1 flex flex-col">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm crt-text">GENERATED CODE</span>
                  <button
                    onClick={copyToClipboard}
                    className="retro-button text-xs"
                  >
                    COPY
                  </button>
                </div>
                <div className="flex-1 retro-border p-3 bg-black bg-opacity-20 overflow-auto">
                  <pre className="text-xs crt-text whitespace-pre-wrap break-words">
                    {generateCode()}
                  </pre>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
