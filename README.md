# snippet-builder
Cumtomize Snippets for Code Rhythm

写Code Rhythm衍生出的一个小工具。可以将YAML的代码片段文件转为VSCode支持的code-snippet片段，方便大家快速生成自己需要的代码片段。

#### 功能

**YAML片段创建**

```
# 在当前目录创建名为`codeRhythm.yaml`的代码片段模板
$ sn create

# 在指定目录创建指定名称如(yamlFileName)的代码片段模板
$ sn create --out yaml/file/path --name yamlFileName
```

**YAML片段转为code snippet**

```
# 输入目录为必填，默认输出到当前目录的snippets文件夹
$ sn convert --entry entry/yaml/path

# 指定输入，输出目录
$ sn convert --entry entry/yaml/path --out output/code-snippet/path
```

备注：`sn convert`可以支持输入目录(`entry`)下全为yaml文件或者全为文件夹

* 全为文件夹 - 所有文件夹下的yaml代码片段合并成一个文件，为文件夹名
* 全为文件 - 所有文件最终合成一个名为`codeRhythm`的代码片段文件
* 既包含文件夹又包含文件 - 考虑到输出名可能会冲突覆盖，这里不支持，会报错提醒

**code snippet转为YAML片段**

```
# 输入目录为必填， 默认out到当前目录的modules文件夹
$ sn restore --entry entry/code-snippet/path

# 指定输入，输出目录
$ sn restore --entry entry/code-snippet/path --out output/yaml/filepath
```



#### Todo

* 增加模板
* Convert功能目前还不能指定为单一文件