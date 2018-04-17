// Fill the DB with example data on startup

import { Meteor } from 'meteor/meteor'
import { Accounts } from 'meteor/accounts-base'
import Packages from '../../api/packages/packages'
import Types from '../../api/types/types'
import Users from '../../api/users/users'

const DEVELOPMENT = Meteor.isDevelopment

/** 分类结构
 * name           分类名称
 * slug           分类别名
 * description    分类描述
 */

/** 软件结构
 * title          软件名称
 * size           软件大小
 * author         上传用户
 * summary        软件摘要
 * description    软件描述
 * type           所属类型
 * tags           软件标签
 * rating         软件评分
 * imageUrl       软件图像
 * downloadUrl    下载地址
 * downloadTotal  下载次数
 * createdAt      创建时间
 * updatedAt      修改时间
 */

Meteor.startup(() => {
  // Types.remove({})
  // Users.remove({})
  // Packages.remove({})

  if (Users.find().count() === 0) {
    Accounts.createUser({
      username: 'admin',
      email: '1614146@qq.com',
      password: 'admin.123'
    })
  }

  if (Types.find().count() === 0) {
    Types.insert({
      name: '调试工具',
      slug: 'debugging',
      description: ''
    })
    Types.insert({
      name: '开发工具',
      slug: 'develop',
      description: ''
    })
    Types.insert({
      name: '图影图像',
      slug: 'image',
      description: ''
    })
    Types.insert({
      name: '远程工具',
      slug: 'remote',
      description: ''
    })
    Types.insert({
      name: '网络通讯',
      slug: 'network',
      description: ''
    })
    Types.insert({
      name: '运行时库',
      slug: 'runtime',
      description: ''
    })
    Types.insert({
      name: '文本办公',
      slug: 'office',
      description: ''
    })
    Types.insert({
      name: '操作系统',
      slug: 'system',
      description: ''
    })
  }

  // 只在开发环境写入测试数据
  if (Packages.find().count() === 0 && DEVELOPMENT) {
    const packageList = [{
      title: 'Process Explorer 16.2',
      size: 57946,
      summary: 'Ever wondered which program has a particular file or directory open? Now you can find out. Process Explorer shows you information about which handles and DLLs processes have opened or loaded.',
      description: `The Process Explorer display consists of two sub-windows. The top window always shows a list of the currently active processes, including the names of their owning accounts, whereas the information displayed in the bottom window depends on the mode that Process Explorer is in: if it is in handle mode you'll see the handles that the process selected in the top window has opened; if Process Explorer is in DLL mode you'll see the DLLs and memory-mapped files that the process has loaded. Process Explorer also has a powerful search capability that will quickly show you which processes have particular handles opened or DLLs loaded.`,
      tags: ['网络', '调试', '病毒', '跟踪'],
      rating: 5,
      imageUrl: 'https://vs-publisher-306627.gallerycdn.vsassets.io/extensions/vs-publisher-306627/redgatereadyroll-18319/1.16.18088.9228/1522759033857/Microsoft.VisualStudio.Services.Icons.Default',
      downloadUrl: 'https://vs-publisher-306627.gallerycdn.vsassets.io/extensions/vs-publisher-306627/redgatereadyroll-18319/1.16.18088.9228/1522759033857/Microsoft.VisualStudio.Services.Icons.Default',
      downloadTotal: 10,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      title: 'SonarQube',
      size: 65943,
      summary: 'Ever wondered which program has a particular file or directory open? Now you can find out. Process Explorer shows you information about which handles and DLLs processes have opened or loaded.',
      description: `The Process Explorer display consists of two sub-windows. The top window always shows a list of the currently active processes, including the names of their owning accounts, whereas the information displayed in the bottom window depends on the mode that Process Explorer is in: if it is in handle mode you'll see the handles that the process selected in the top window has opened; if Process Explorer is in DLL mode you'll see the DLLs and memory-mapped files that the process has loaded. Process Explorer also has a powerful search capability that will quickly show you which processes have particular handles opened or DLLs loaded.`,
      tags: ['网络', '调试', '病毒', '跟踪'],
      rating: 5,
      imageUrl: 'https://sonarsource.gallerycdn.vsassets.io/extensions/sonarsource/sonarqube/4.1.1/1521801149522/Microsoft.VisualStudio.Services.Icons.Small',
      downloadUrl: 'https://vs-publisher-306627.gallerycdn.vsassets.io/extensions/vs-publisher-306627/redgatereadyroll-18319/1.16.18088.9228/1522759033857/Microsoft.VisualStudio.Services.Icons.Default',
      downloadTotal: 10,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      title: 'Octopus Deploy Integration',
      size: 33264,
      summary: 'Ever wondered which program has a particular file or directory open? Now you can find out. Process Explorer shows you information about which handles and DLLs processes have opened or loaded.',
      description: `The Process Explorer display consists of two sub-windows. The top window always shows a list of the currently active processes, including the names of their owning accounts, whereas the information displayed in the bottom window depends on the mode that Process Explorer is in: if it is in handle mode you'll see the handles that the process selected in the top window has opened; if Process Explorer is in DLL mode you'll see the DLLs and memory-mapped files that the process has loaded. Process Explorer also has a powerful search capability that will quickly show you which processes have particular handles opened or DLLs loaded.`,
      tags: ['网络', '调试', '病毒', '跟踪'],
      rating: 5,
      imageUrl: 'https://octopusdeploy.gallerycdn.vsassets.io/extensions/octopusdeploy/octopus-deploy-build-release-tasks/2.0.106/1522182184499/Microsoft.VisualStudio.Services.Icons.Small',
      downloadUrl: 'https://vs-publisher-306627.gallerycdn.vsassets.io/extensions/vs-publisher-306627/redgatereadyroll-18319/1.16.18088.9228/1522759033857/Microsoft.VisualStudio.Services.Icons.Default',
      downloadTotal: 25,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      title: 'Timetracker',
      size: 256,
      summary: 'Ever wondered which program has a particular file or directory open? Now you can find out. Process Explorer shows you information about which handles and DLLs processes have opened or loaded.',
      description: `The Process Explorer display consists of two sub-windows. The top window always shows a list of the currently active processes, including the names of their owning accounts, whereas the information displayed in the bottom window depends on the mode that Process Explorer is in: if it is in handle mode you'll see the handles that the process selected in the top window has opened; if Process Explorer is in DLL mode you'll see the DLLs and memory-mapped files that the process has loaded. Process Explorer also has a powerful search capability that will quickly show you which processes have particular handles opened or DLLs loaded.`,
      tags: ['网络', '调试', '病毒', '跟踪'],
      rating: 5,
      imageUrl: 'https://berichthaus.gallerycdn.vsassets.io/extensions/berichthaus/tfstimetracker/4.5.6/1520432735236/Microsoft.VisualStudio.Services.Icons.Small',
      downloadUrl: 'https://vs-publisher-306627.gallerycdn.vsassets.io/extensions/vs-publisher-306627/redgatereadyroll-18319/1.16.18088.9228/1522759033857/Microsoft.VisualStudio.Services.Icons.Default',
      downloadTotal: 10,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      title: 'AWS Tools for Microsoft Visual Studio Team Services',
      size: 57946,
      summary: 'Ever wondered which program has a particular file or directory open? Now you can find out. Process Explorer shows you information about which handles and DLLs processes have opened or loaded.',
      description: `The Process Explorer display consists of two sub-windows. The top window always shows a list of the currently active processes, including the names of their owning accounts, whereas the information displayed in the bottom window depends on the mode that Process Explorer is in: if it is in handle mode you'll see the handles that the process selected in the top window has opened; if Process Explorer is in DLL mode you'll see the DLLs and memory-mapped files that the process has loaded. Process Explorer also has a powerful search capability that will quickly show you which processes have particular handles opened or DLLs loaded.`,
      tags: ['网络', '调试', '病毒', '跟踪'],
      rating: 5,
      imageUrl: 'https://amazonwebservices.gallerycdn.vsassets.io/extensions/amazonwebservices/aws-vsts-tools/1.0.21/1521739315168/Microsoft.VisualStudio.Services.Icons.Small',
      downloadUrl: 'https://vs-publisher-306627.gallerycdn.vsassets.io/extensions/vs-publisher-306627/redgatereadyroll-18319/1.16.18088.9228/1522759033857/Microsoft.VisualStudio.Services.Icons.Default',
      downloadTotal: 10,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      title: 'Code Quality NDepend for TFS 2017/TFS 2018 and VSTS ',
      size: 331689,
      summary: 'Ever wondered which program has a particular file or directory open? Now you can find out. Process Explorer shows you information about which handles and DLLs processes have opened or loaded.',
      description: `The Process Explorer display consists of two sub-windows. The top window always shows a list of the currently active processes, including the names of their owning accounts, whereas the information displayed in the bottom window depends on the mode that Process Explorer is in: if it is in handle mode you'll see the handles that the process selected in the top window has opened; if Process Explorer is in DLL mode you'll see the DLLs and memory-mapped files that the process has loaded. Process Explorer also has a powerful search capability that will quickly show you which processes have particular handles opened or DLLs loaded.`,
      tags: ['网络', '调试', '病毒', '跟踪'],
      rating: 5,
      imageUrl: 'https://ndepend.gallerycdn.vsassets.io/extensions/ndepend/ndependextension/1.0.56/1522699172937/Microsoft.VisualStudio.Services.Icons.Small',
      downloadUrl: 'https://vs-publisher-306627.gallerycdn.vsassets.io/extensions/vs-publisher-306627/redgatereadyroll-18319/1.16.18088.9228/1522759033857/Microsoft.VisualStudio.Services.Icons.Default',
      downloadTotal: 10,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      title: 'VSTS Open in Excel',
      size: 57946,
      summary: 'Ever wondered which program has a particular file or directory open? Now you can find out. Process Explorer shows you information about which handles and DLLs processes have opened or loaded.',
      description: `The Process Explorer display consists of two sub-windows. The top window always shows a list of the currently active processes, including the names of their owning accounts, whereas the information displayed in the bottom window depends on the mode that Process Explorer is in: if it is in handle mode you'll see the handles that the process selected in the top window has opened; if Process Explorer is in DLL mode you'll see the DLLs and memory-mapped files that the process has loaded. Process Explorer also has a powerful search capability that will quickly show you which processes have particular handles opened or DLLs loaded.`,
      tags: ['网络', '调试', '病毒', '跟踪'],
      rating: 5,
      imageUrl: 'https://blueprint.gallerycdn.vsassets.io/extensions/blueprint/vsts-open-work-items-in-excel/0.1.66/1495259267977/Microsoft.VisualStudio.Services.Icons.Small',
      downloadUrl: 'https://vs-publisher-306627.gallerycdn.vsassets.io/extensions/vs-publisher-306627/redgatereadyroll-18319/1.16.18088.9228/1522759033857/Microsoft.VisualStudio.Services.Icons.Default',
      downloadTotal: 10,
      createdAt: new Date(),
      updatedAt: new Date()
    }]

    const userId = Users.findOne()._id
    const typeId = Types.findOne()._id

    packageList.map(pack => {
      Packages.insert({
        ...pack,
        author: userId,
        type: typeId
      })
    })
  }
})
